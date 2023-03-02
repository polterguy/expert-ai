
/*
 * Copyright (c) Aista Ltd, 2021 - 2022 info@aista.com, all rights reserved.
 */

import { Component, OnDestroy } from '@angular/core';
import { HttpTransportType, HubConnection, HubConnectionBuilder } from '@aspnet/signalr';
import { CommonErrorMessages } from 'src/app/_general/classes/common-error-messages';
import { AuthService } from 'src/app/_general/services/auth.service';
import { GeneralService } from 'src/app/_general/services/general.service';
import { OpenAIService } from 'src/app/_general/services/openai.service';
import { environment } from 'src/environments/environment';
import { CommonRegEx } from '../../../_general/classes/common-regex';

/**
 * Helper component for importing training data becoming foundation of AI model.
 */
@Component({
  selector: 'app-import',
  templateUrl: './import.component.html',
  styleUrls: ['./import.component.scss']
})
export class ImportComponent implements OnDestroy {

  hubConnection: HubConnection = null;
  uploading: boolean = false;
  trainingFileModel: string = '';
  url: string = null;
  delay: number = 2;
  max: number = 200;
  prompt: string = 'prompt';
  completion: string = 'completion';
  advanced: boolean = false;
  threshold: number = 150;
  showCrawler: boolean = false;
  messages: any[] = [];
  doneCrawling: boolean = false;

  CommonRegEx = CommonRegEx;
  CommonErrorMessages = CommonErrorMessages;

  constructor(
    private authService: AuthService,
    private openAIService: OpenAIService,
    private generalService: GeneralService) { }

  ngOnDestroy() {

    this.hubConnection?.stop();
  }
  
  importUrl() {

    if (!this.url ||
      this.url.length === 0 ||
      this.delay < 1 ||
      this.max > 2500 ||
      this.threshold < 25 ||
      !this.CommonRegEx.domain.test(this.url)) {

      this.generalService.showFeedback('Not valid input', 'errorMessage');
      return;
    }

    if (this.url.endsWith('/')) {
      this.url = this.url.substring(0, this.url.length - 1);
    }

    const splits = this.url.split('://');
    if (splits[0] !== 'http' && splits[0] !== 'https' && splits.length !== 2) {

      this.generalService.showFeedback('Provide a domain name with its http(s) prefix', 'errorMessage');
      return;
    }
    if (splits[1].includes('/')) {

      this.generalService.showFeedback('For now we only support domains', 'errorMessage');
      return;
    }

    let builder = new HubConnectionBuilder();
    this.hubConnection = builder.withUrl(environment.backendUrl + 'sockets', {
      accessTokenFactory: () => this.authService.getJwtToken(),
      skipNegotiation: true,
      transport: HttpTransportType.WebSockets,
    }).build();

    this.hubConnection.on('magic.backend.chatbot', (args) => {

      args = JSON.parse(args);
      this.messages.push(args);
      this.doneCrawling = args.type === 'success' || args.type === 'error';

      if (args.type === 'done_crawling') {

        this.generalService.showFeedback('Done crawling site', 'successMessage');
        this.openAIService.vectorise(environment.type).subscribe({
          next: () => {

            //this.generalService.showFeedback('Importing and generating ');
          },
          error: () => {
    
            this.generalService.showFeedback('Something went wrong as we tried to start vectorising your model', 'errorMessage');
          }
        });

      } else if (args.type === 'error') {

        this.generalService.showFeedback('Something went wrong when creating your bot', 'errorMessage');
      }
      setTimeout(() => {

        const domEl = document.getElementById('m_' + (this.messages.length - 1));
        if (domEl) {

          domEl.scrollIntoView();
        }
      }, 50);
    });

    this.hubConnection.start().then(() => {

      this.showCrawler = true;
      this.openAIService.importUrl(
        this.url,
        environment.type,
        this.delay * 1000,
        this.max,
        this.threshold).subscribe({
          next: () => {
    
            this.generalService.showFeedback('Crawling started, you will be notified when it is finished', 'successMessage');
          },
          error: () => {
    
            this.generalService.showFeedback('Something went wrong as we tried to start crawling your site', 'errorMessage');
          }
        });
    });
  }

  closeCrawler() {

    this.showCrawler = false;
  }

  getFile(event: any) {

    if (!event || !event.target.files || event.target.files.length === 0) {
      return;
    }

    this.uploading = true;

    const formData = new FormData();
    formData.append('file', event.target.files[0], event.target.files[0].name);
    formData.append('type', environment.type);
    formData.append('prompt', this.prompt);
    formData.append('completion', this.completion);

    this.openAIService.uploadTrainingFile(formData).subscribe({
      next: (result: any) => {

        this.uploading = false;
        this.generalService.showFeedback(`${result.count} training snippets successfully uploaded`, 'successMessage');

        setTimeout(() => {

          this.trainingFileModel = '';
        }, 1000);
      },
      error: (error: any) => {

        this.uploading = false;
        this.trainingFileModel = '';
        this.generalService.showFeedback(error?.error?.message, 'errorMessage', 'Ok');
        this.generalService.hideLoading();
      }
    });
  }

  getFileName() {

    return this.trainingFileModel.split('\\').pop().split('/').pop();
  }
}
