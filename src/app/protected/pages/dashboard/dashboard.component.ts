
/*
 * Copyright (c) Aista Ltd, 2021 - 2022 info@aista.com, all rights reserved.
 */

import { Component } from '@angular/core';
import { ReCaptchaV3Service } from 'ng-recaptcha';
import { QueryService } from 'src/app/public/authentication/services/query.service';
import { GeneralService } from 'src/app/_general/services/general.service';

/**
 * Dashboard component displaying main user interface.
 */
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent {

  query: string;
  answer: string = null;

  constructor(
    private generalService: GeneralService,
    private queryService: QueryService,
    private recaptchaV3Service: ReCaptchaV3Service) { }

  ask() {

    if (!this.query || this.query.length === 0) {

      this.generalService.showFeedback('You need to supply a question', 'errorMessage');
    }


    this.recaptchaV3Service.execute('loginFormSubmission').subscribe({
      next: (token) => {

        this.queryService.query(this.query, token).subscribe({
          next: (result: any) => {

            this.answer = result.result;
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
}
