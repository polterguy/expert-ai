
/*
 * Copyright (c) Aista Ltd, 2021 - 2022 info@aista.com, all rights reserved.
 */

import { Component, OnDestroy, OnInit } from '@angular/core';
import { ReCaptchaV3Service } from 'ng-recaptcha';
import { BehaviorSubject, Subject, Subscription } from 'rxjs';
import { Clipboard } from '@angular/cdk/clipboard';
import { QueryService } from 'src/app/public/authentication/services/query.service';
import { GeneralService } from 'src/app/_general/services/general.service';
import { Reference } from './models/reference-model';

/**
 * Dashboard component displaying main user interface.
 */
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit, OnDestroy {

  private loadingSubscription: Subscription;
  loading$: Subject<any> = new BehaviorSubject(true);
  isLoading: boolean = false;
  query: string;
  answer: string = null;
  references: Reference[] = null;
  models: any[] = [];

  constructor(
    private clipboard: Clipboard,
    private generalService: GeneralService,
    private queryService: QueryService,
    private recaptchaV3Service: ReCaptchaV3Service) { }

  ngOnInit() {

    this.loadingSubscription = this.generalService.loading$.subscribe((res: any) => {

      this.isLoading = res;
      this.loading$.next(res);
    });

    this.queryService.models().subscribe({
      next: (result: any[]) => {

        this.models = result;
      },

      error: () => {
        this.generalService.showFeedback('Something went wrong as we tried to retrieve models from backend', 'errorMessage');
      }
    });
  }

  ngOnDestroy() {

    this.loadingSubscription?.unsubscribe();
  }

  prompt(model: string) {

    if (!this.query || this.query.length === 0) {

      this.generalService.showFeedback('You need to supply a question', 'errorMessage');
      return;
    }

    this.recaptchaV3Service.execute('formSubmission').subscribe({
      next: (token) => {

        this.queryService.query(model, this.query, token).subscribe({
          next: (result: any) => {

            this.answer = result.result;
            this.references = result.references;
          },
          error:() => {

            this.generalService.showFeedback('Something went wrong while querying your model', 'errorMessage');
          }
        });
      },
      error:() => {

        this.generalService.showFeedback('Something went wrong while querying your model', 'errorMessage');
      }});
  }

  copyResult() {

    this.clipboard.copy(this.answer);
    this.generalService.showFeedback('Content can be found on your clipboard', 'successMessage');
  }
}
