
/*
 * Copyright (c) Aista Ltd, 2021 - 2022 info@aista.com, all rights reserved.
 */

import { AfterContentChecked, ChangeDetectionStrategy, Component } from '@angular/core';
import { Subject, BehaviorSubject } from 'rxjs';
import { GeneralService } from './_general/services/general.service';

/**
 * Root component for AI Expert.
 */
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AppComponent implements AfterContentChecked {

  loading$: Subject<any> = new BehaviorSubject(true);

  constructor(private generalService: GeneralService) { }

  ngAfterContentChecked() {

    this.generalService.loading$.subscribe((res: any) => {

      this.loading$.next(res)
    })
  }
}
