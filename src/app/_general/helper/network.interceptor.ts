
/*
 * Copyright (c) Aista Ltd, 2021 - 2022 info@aista.com, all rights reserved.
 */

import { Injectable } from '@angular/core';
import {
  HttpEvent,
  HttpInterceptor,
  HttpHandler,
  HttpRequest,
  HttpErrorResponse
} from "@angular/common/http";
import { throwError, Observable } from "rxjs";
import { catchError, finalize, map } from 'rxjs/operators';
import { GeneralService } from '../services/general.service';

/**
 * Network HTTP interceptor who's purpose it is to display the loader, and if an
 * error occurs display the error to the user.
 */
@Injectable()
export class NetworkInterceptor implements HttpInterceptor {

  constructor(private generalService: GeneralService) { }

  intercept(request: HttpRequest<Response>, next: HttpHandler) : Observable<HttpEvent<Response>> {

    this.generalService.showLoading();

    return next.handle(request)
      .pipe(
        map(res => {
          return res
        }),
        catchError((error: HttpErrorResponse) => {

          let errorMsg = '';
          errorMsg = error.error.message || "Guru meditation, come back when Universe is in order!";
          this.generalService.showFeedback(errorMsg);
          return throwError(() => new Error(errorMsg))
        }),
        finalize(() => {

          this.generalService.hideLoading();
        }));
  }
}
