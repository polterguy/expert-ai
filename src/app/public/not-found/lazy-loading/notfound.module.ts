
/*
 * Copyright (c) Arta-Marketing AS, 2023 team@ainiro.io, all rights reserved.
 */

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NotfoundRoutingModule } from './notfound.routing.module';
import { MatButtonModule } from '@angular/material/button';
import { NotFoundComponent } from '../not-found.component';

@NgModule({
  declarations: [NotFoundComponent],
  imports: [
    CommonModule,
    NotfoundRoutingModule,
    MatButtonModule
  ]
})
export class NotfoundModule { }
