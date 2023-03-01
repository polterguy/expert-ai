
/*
 * Copyright (c) Aista Ltd, 2021 - 2022 info@aista.com, all rights reserved.
 */

import { Component } from '@angular/core';
import { Validators, UntypedFormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { CommonErrorMessages } from 'src/app/_general/classes/common-error-messages';
import { AuthService } from 'src/app/_general/services/auth.service';
import { GeneralService } from 'src/app/_general/services/general.service';
import { UserService } from 'src/app/_general/services/user.service';
import { AuthApiService } from '../services/auth-api.service';
import { ReCaptchaV3Service } from 'ng-recaptcha';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html'
})
export class LoginComponent {

  /**
   * defining the login form fields
   */
  loginForm = this.formBuilder.group({
    username: ['', [Validators.required]],
    password: ['', [Validators.required]]
  });

  /**
   * handling errors
   */
  errors = CommonErrorMessages;

  /**
   * let user view the entered password
   */
  viewPassword: boolean = false;

  /**
   * remeber me checkbox value
   */
  rememberPassword: boolean = false;

  waiting: boolean = false;

  constructor(
    private formBuilder: UntypedFormBuilder,
    private authApiService: AuthApiService,
    private generalService: GeneralService,
    private router: Router,
    private authService: AuthService,
    private userService: UserService,
    private recaptchaV3Service: ReCaptchaV3Service) { }

  /**
   * login form
   */
  login() {
    if (this.loginForm.valid) {
      this.waiting = true;
      this.recaptchaV3Service.execute('loginFormSubmission').subscribe({
        next: (token) => {
          const data: string = '?recaptcha_response=' + token + '&username=' + encodeURIComponent(this.loginForm.value.username) + '&password=' + encodeURIComponent(this.loginForm.value.password)

          this.authApiService.login(data).subscribe({
            next: (res: any) => {
              this.waiting = false;
              if (res && res?.Error) {
                console.log(res);
              } else {
                const jwtPayload = JSON.parse(window.atob(res.ticket.split('.')[1]));
                this.userService.setUserData({
                  username: jwtPayload.name,
                  extra: res.extra,
                  role: jwtPayload.role
                });
                if (jwtPayload.role === 'guest' || (jwtPayload.role.filter && jwtPayload.role.filter((x: string) => x === 'guest')?.length > 0)) {
                  this.authService.setJwtToken(res.ticket);
                  this.router.navigate(['/']);
                } else {
                  this.generalService.showFeedback('Please confirm your email first', 'warningMessage', 'Ok', 5000);
                }
              }
            },
            error: () => {
              this.waiting = false;
              this.generalService.showFeedback('We could not authenticate you', 'warningMessage', 'Ok', 5000);
            }
          })
        },
        error: (error: any) => {
          this.generalService.showFeedback('Sorry, but we could not authenticated you');
          this.waiting = false;
          return error;
        },
        complete: () => { }
      })

    } else {
      this.generalService.showFeedback('All fields are required', 'errorMessage', 'Ok');;
    }
  }

}
