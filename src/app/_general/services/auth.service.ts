
/*
 * Copyright (c) Aista Ltd, 2021 - 2022 info@aista.com, all rights reserved.
 */

import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { AuthApiService } from 'src/app/public/authentication/services/auth-api.service';
import { GeneralService } from './general.service';

/**
 * Authentication service allowing user to authenticate towards backend.
 */
@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(
    private router: Router,
    private generalService: GeneralService,
    private authApiService: AuthApiService) { }

  getJwtToken() {

    return sessionStorage.getItem('token');
  }

  setJwtToken(token?: string) {

    if (token) {

      sessionStorage.setItem('token', token);

    } else {

      sessionStorage.removeItem('token');
    }
  }

  refreshTicket() {

    this.authApiService.refreshToken().subscribe({
      next: (res: any) => {

        if (res && res.ticket) {

          this.setJwtToken(res.ticket);
          this.watchForExpiration(res.ticket);
        }
      },
      error: () => {
        
        this.generalService.showFeedback('Something went bad as we tried to refresh your JWT token, please login again', 'errorMessage');
      }
    });
  }

  watchForExpiration(token: string) {

    if (!token) {
      this.router.navigateByUrl('/authentication');
      return;
    }
    const payload: any = JSON.parse(atob(token.split('.')[1]));

    const expiration = new Date(payload.exp * 1000);
    const now = new Date();
    const fiveMinutes = 5000 * 60 * 5;
    const timeout = expiration.getTime() - now.getTime() - fiveMinutes;

    setTimeout(() => {
      this.refreshTicket();
    }, timeout);
  }
}
