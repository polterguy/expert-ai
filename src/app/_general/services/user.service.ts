
/*
 * Copyright (c) Aista Ltd, 2021 - 2022 info@aista.com, all rights reserved.
 */

import { Injectable } from '@angular/core';
import { User } from 'src/app/public/authentication/models/user-model';

/**
 * User service to persist user data into the current session.
 */
@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor() { }

  setUserData(user?: User) {

    user ? sessionStorage.setItem('user', JSON.stringify(user)) : sessionStorage.removeItem('user');
  }

  getUserData() {

    return JSON.parse(sessionStorage.getItem('user') || '{}');
  }
}
