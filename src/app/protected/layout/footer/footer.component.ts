
/*
 * Copyright (c) Aista Ltd, 2021 - 2022 info@aista.com, all rights reserved.
 */

import { Component, OnInit } from '@angular/core';

/**
 * Footer component for displaying footer and copyright information.
 */
@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent implements OnInit {

  currentYear: number = 0;

  constructor() { }

  ngOnInit() {

    this.currentYear = new Date().getFullYear();
  }
}
