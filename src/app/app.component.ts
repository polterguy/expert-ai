
/*
 * Copyright (c) Arta-Marketing AS, 2023 team@ainiro.io, all rights reserved.
 */

import { AfterContentChecked, ChangeDetectionStrategy, Component } from '@angular/core';
import { Subject, BehaviorSubject } from 'rxjs';
import { GeneralService } from './_general/services/general.service';

/**
 * Root component for AI Expert System.
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
    });
  }
}
