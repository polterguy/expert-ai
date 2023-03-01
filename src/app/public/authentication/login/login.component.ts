
/*
 * Copyright (c) Aista Ltd, 2021 - 2022 info@aista.com, all rights reserved.
 */

import { Component } from '@angular/core';
import { Validators, UntypedFormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/_general/services/auth.service';
import { GeneralService } from 'src/app/_general/services/general.service';
import { UserService } from 'src/app/_general/services/user.service';
import { AuthApiService } from '../services/auth-api.service';
import { ReCaptchaV3Service } from 'ng-recaptcha';

/**
 * Login component allowing the user to authenticate towards the system.
 */
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html'
})
export class LoginComponent {

  viewPassword: boolean = false;
  rememberPassword: boolean = false;
  waiting: boolean = false;

  loginForm = this.formBuilder.group({
    username: ['', [Validators.required]],
    password: ['', [Validators.required]]
  });

  constructor(
    private formBuilder: UntypedFormBuilder,
    private authApiService: AuthApiService,
    private generalService: GeneralService,
    private router: Router,
    private authService: AuthService,
    private userService: UserService,
    private recaptchaV3Service: ReCaptchaV3Service) { }

  login() {

    if (!this.loginForm.valid) {

      this.generalService.showFeedback('All fields are required', 'errorMessage', 'Ok');;
      return;
    }

    this.waiting = true;

    this.recaptchaV3Service.execute('loginFormSubmission').subscribe({
      next: (token) => {

        const data: string = '?recaptcha_response=' + token + '&username=' + encodeURIComponent(this.loginForm.value.username) + '&password=' + encodeURIComponent(this.loginForm.value.password)

        this.authApiService.login(data).subscribe({
          next: (res: any) => {

            this.waiting = false;
            if (res && res?.Error) {

              this.generalService.showFeedback('Something went wrong as we tried to verify your reCAPTCHA token', 'errorMessage');
              console.log(res);

            } else {

              const jwtPayload = JSON.parse(window.atob(res.ticket.split('.')[1]));

              this.userService.setUserData({
                username: jwtPayload.name,
                extra: res.extra,
                role: jwtPayload.role
              });

              this.authService.setJwtToken(res.ticket);
              this.router.navigate(['/']);
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
    });
  }
}
