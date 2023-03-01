
/*
 * Copyright (c) Aista Ltd, 2021 - 2022 info@aista.com, all rights reserved.
 */

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardRoutingModule } from './dashboard.routing.module';
import { MatButtonModule } from '@angular/material/button';
import { DashboardComponent } from '../dashboard.component';
import { MaterialModule } from 'src/app/material.module';
import { FormsModule } from '@angular/forms';
import { MarkedPipe } from 'src/app/_general/helper/marked.pipe';

@NgModule({
  declarations: [
    DashboardComponent,
    MarkedPipe,
  ],
  imports: [
    CommonModule,
    DashboardRoutingModule,
    MatButtonModule,
    MaterialModule,
    FormsModule,
  ]
})
export class DashboardModule { }
