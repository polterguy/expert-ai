
/*
 * Copyright (c) Arta-Marketing AS, 2023 team@ainiro.io, all rights reserved.
 */

import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { BehaviorSubject, Observable } from 'rxjs';

/**
 * General service for displaying error messages and showing feedback to user,
 * plus misc other helper  methods.
 */
@Injectable({
  providedIn: 'root'
})
export class GeneralService {

  private loading = new BehaviorSubject<boolean>(false);
  private largeScreen = new BehaviorSubject<boolean>(undefined!);
  readonly loading$ = this.loading.asObservable();

  constructor(private snackBar: MatSnackBar) { }

  showLoading() {

    this.loading.next(true);
  }

  hideLoading() {

    this.loading.next(false);
  }

  showFeedback(message: string, panelClass?: string, actionButton?: string, duration?: number) {

    if (message?.startsWith('Guru meditation')) {
      return;
    }
    this.snackBar.open(message, actionButton, {
      duration: duration || 2000,
      panelClass: [panelClass!]
    });
  }

  getScreenSize(): Observable<boolean> {

    return this.largeScreen.asObservable();
  }

  setScreenSize(status: boolean) {

    this.largeScreen.next(status);
  }
}
