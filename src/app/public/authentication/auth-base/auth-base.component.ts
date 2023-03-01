
/*
 * Copyright (c) Aista Ltd, 2021 - 2022 info@aista.com, all rights reserved.
 */

import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';

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
