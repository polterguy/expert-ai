
/*
 * Copyright (c) Aista Ltd, 2021 - 2022 info@aista.com, all rights reserved.
 */

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ServicesRoutingModule } from './import.routing.module';
import { MatButtonModule } from '@angular/material/button';
import { MaterialModule } from 'src/app/material.module';
import { ImportComponent } from '../import.component';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    ImportComponent,
  ],
  imports: [
    CommonModule,
    ServicesRoutingModule,
    MatButtonModule,
    MaterialModule,
    FormsModule,
  ]
})
export class ServicesModule { }
