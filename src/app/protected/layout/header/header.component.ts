
/*
 * Copyright (c) Aista Ltd, 2021 - 2022 info@aista.com, all rights reserved.
 */

import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/_general/services/auth.service';
import { UserService } from 'src/app/_general/services/user.service';

/**
 * Header component displaying the navbar, the logo and other header information.
 */
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {

  sideExpanded: boolean = false;
  username: string = '';

  constructor(
    private authService: AuthService,
    private userService: UserService,
    private router: Router) {

    this.username = this.userService.getUserData().username;
  }

  toggleSidebar() {

    this.sideExpanded = !this.sideExpanded;
  }

  closeSidebarInSidePanel() {

    if (!this.sideExpanded) {
      return;
    }
    this.toggleSidebar();
  }

  logout() {

    this.authService.setJwtToken();
    this.userService.setUserData();
    this.router.navigate(['authentication']);
    sessionStorage.clear();
  }

  isRoot() {

    const role = this.userService.getUserData().role;
    return role && (role === 'root' || role.indexOf('root') !== -1);
  }
}
