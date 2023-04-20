
/*
 * Copyright (c) Arta-Marketing AS, 2023 team@ainiro.io, all rights reserved.
 */

import { Component, Input } from '@angular/core';
import { Validators, UntypedFormBuilder } from '@angular/forms';
import { PasswordsMatchingValidator } from 'src/app/_general/classes/passwords-matching-validator';
import { CommonErrorMessages } from 'src/app/_general/classes/common-error-messages';
import { GeneralService } from 'src/app/_general/services/general.service';
import { AuthApiService } from '../services/auth-api.service';
import { ActivatedRoute, Router } from '@angular/router';

/**
 * Reset password form allowing users to punch in their new password from a "reset-password" link.
 */
@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html'
})
export class ResetPasswordComponent {

  @Input() passwordToken: string = '';

  errors = CommonErrorMessages;
  viewPassword: boolean = false;
  waiting: boolean = false;

  resetPassForm = this.formBuilder.group({
    passwordGroup: this.formBuilder.group({
      password: ['', [
        Validators.required
      ]],
      confirmPassword: ['', Validators.required]
    }, { validator: PasswordsMatchingValidator('password', 'confirmPassword') })
  });

  constructor(
    private formBuilder: UntypedFormBuilder,
    private authApiService: AuthApiService,
    private generalService: GeneralService,
    private activatedRouer: ActivatedRoute,
    private router: Router) { 

      this.activatedRouer.queryParams.subscribe(params => {
        if (params) {
          if (params.token) {
            if (params.token.indexOf('.') > -1) {

              this.passwordToken = params.token;
            } else {

              this.router.navigateByUrl('/authentication');
            }
          } 
        }
      });
    }

  resetPass() {

    if (!this.resetPassForm.valid) {

      this.generalService.showFeedback('All fields are required', 'errorMessage', 'Ok');
    }

    const data: any = {
      password: this.resetPassForm.value.passwordGroup.password
    }

    this.waiting = true;

    this.authApiService.changePass(data, this.passwordToken).subscribe({
      next: (res: any) => {

        this.waiting = false;
        if (res && res?.Error) {

        } else {
          this.generalService.showFeedback('Password successfully changed', 'successMessage', 'Ok', 10000);
          this.router.navigateByUrl('/');
        }
      },
      error: () => {

        this.generalService.showFeedback('Something went wrong while we tried to update your password', 'errorMessage');
        this.waiting = false;
      }});
  }
}
