
/*
 * Copyright (c) Arta-Marketing AS, 2023 team@ainiro.io, all rights reserved.
 */

import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';

/**
 * Authentication base component, being the base component for
 * everything related to authentication.
 */
@Component({
  selector: 'app-auth-base',
  templateUrl: './auth-base.component.html',
  styleUrls: ['./auth-base.component.scss']
})
export class AuthBaseComponent implements OnInit {

  currentYear: number = 0;
  passwordToken: string = '';

  constructor(private dialog: MatDialog){}

  ngOnInit() {

    this.currentYear = new Date().getFullYear();
  }
}
