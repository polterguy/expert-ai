
/*
 * Copyright (c) Aista Ltd, 2021 - 2022 info@aista.com, all rights reserved.
 */

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardRoutingModule } from './dashboard.routing.module';
import { MatButtonModule } from '@angular/material/button';
import { DashboardComponent } from '../dashboard.component';
import { MaterialModule } from 'src/app/material.module';

@NgModule({
  declarations: [
    DashboardComponent,
  ],
  imports: [
    CommonModule,
    DashboardRoutingModule,
    MatButtonModule,
    MaterialModule,
  ]
})
export class DashboardModule { }
