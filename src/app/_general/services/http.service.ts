
/*
 * Copyright (c) Aista Ltd, 2021 - 2022 info@aista.com, all rights reserved.
 */

import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

/**
 * HTTP helper service to invoke the backend.
 */
@Injectable({
  providedIn: 'root'
})
export class HttpService {

  constructor(private http: HttpClient) { }

  get(url: string, queryParams?: string, responseType: any = 'json') : Observable<any> {

    if (queryParams) {

      return this.http.get(environment.backendUrl + url + queryParams, { responseType: responseType });

    } else {

      return this.http.get(environment.backendUrl + url, { responseType: responseType });
    }
  }

  post(url: string, data?: any, options?: any): Observable<any> {

    return this.http.post(environment.backendUrl + url, data, options);
  }

  put(url: string, data: any, options?: any): Observable<any> {

    return this.http.put(environment.backendUrl + url, data, options);
  }

  delete(url: string, data?: any): Observable<any> {

    return this.http.delete(environment.backendUrl + url, data);
  }
}
