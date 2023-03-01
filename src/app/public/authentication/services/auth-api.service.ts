
/*
 * Copyright (c) Aista Ltd, 2021 - 2022 info@aista.com, all rights reserved.
 */

import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { HttpService } from 'src/app/_general/services/http.service';
import { ExtraUserData, User } from '../models/user-model';

/**
 * Authentication HTTP service, allowing user to authenticate and change passwords, etc.
 */
@Injectable({
  providedIn: 'root'
})
export class AuthApiService {

  constructor(private httpService: HttpService) { }

  login(data: string) {

    return this.httpService.get('magic/system/auth/authenticate', data);
  }

  forgotPass(data: User) {

    return this.httpService.post('magic/system/auth/send-reset-password-link', data);
  }

  changePass(data: User, auth_token?: string) {

    const headers = new HttpHeaders({
      'Authorization': `Bearer ${auth_token}`
    });

    return this.httpService.put('magic/system/auth/change-password', data, { headers: headers });
  }

  verifyCode(data: any) {

    return this.httpService.post('magic/system/auth/verify-code', data);
  }

  updateExtraField(data: ExtraUserData) {

    return this.httpService.put('magic/system/auth/update-extra-info', data);
  }

  refreshToken() {

    return this.httpService.get('magic/system/auth/refresh-ticket');
  }
}
