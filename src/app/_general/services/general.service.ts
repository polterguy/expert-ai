
/*
 * Copyright (c) Aista Ltd, 2021 - 2022 info@aista.com, all rights reserved.
 */

import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GeneralService {

  private _loading = new BehaviorSubject<boolean>(false);
  private largeScreen = new BehaviorSubject<boolean>(undefined!);
  readonly loading$ = this._loading.asObservable();

  constructor(private _snackBar: MatSnackBar) { }

  showLoading() {

    this._loading.next(true);
  }
  hideLoading() {

    this._loading.next(false);
  }

  showFeedback(message: string, panelClass?: string, actionButton?: string, duration?: number) {

    if (message?.startsWith('Guru meditation')) {
      return;
    }
    this._snackBar.open(message, actionButton, {
      duration: duration || 2000, // if exists use it, otherwise use default
      panelClass: [panelClass!] // if available
    });
  }

  getScreenSize(): Observable<boolean> {

    return this.largeScreen.asObservable();
  }

  setScreenSize(status: boolean) {

    this.largeScreen.next(status);
  }
}
