
/*
 * Copyright (c) Aista Ltd, 2021 - 2022 info@aista.com, all rights reserved.
 */

import { Component } from '@angular/core';
import { CommonErrorMessages } from 'src/app/_general/classes/common-error-messages';
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
export class ImportComponent {

  uploading: boolean = false;
  trainingFileModel: string = '';
  url: string = null;
  delay: number = 2;
  max: number = 200;
  prompt: string = 'prompt';
  completion: string = 'completion';
  advanced: boolean = false;
  threshold: number = 150;

  CommonRegEx = CommonRegEx;
  CommonErrorMessages = CommonErrorMessages;

  constructor(
    private openAIService: OpenAIService,
    private generalService: GeneralService) { }

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

        this.generalService.showFeedback('Something went wrong as we tried to start training', 'errorMessage');
      }
    });
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
