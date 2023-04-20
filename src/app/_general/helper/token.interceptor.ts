
/*
 * Copyright (c) Arta-Marketing AS, 2023 team@ainiro.io, all rights reserved.
 */

import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { AuthService } from '../services/auth.service';

/**
 * Authentication HTTP interceptor who's purpose it is to attach the JWT token to
 * the request before invoking the backend.
 */
@Injectable()
export class TokenInterceptor implements HttpInterceptor {

  constructor(public authService: AuthService) { }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    if (this.authService.getJwtToken()) {
      request = this.addToken(request, this.authService.getJwtToken()!);
    }

    return next.handle(request).pipe(
      catchError((error: HttpErrorResponse) => {

        return throwError(() => error);

      })
    ) as Observable<HttpEvent<any>>;
  }

  /*
   * Private helper methods.
   */

  private addToken(request: HttpRequest<any>, token: string) {

    return request.clone({
      setHeaders: {
        'Authorization': `Bearer ${token}`
      },
    });
  }
}
