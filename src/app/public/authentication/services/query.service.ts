
/*
 * Copyright (c) Aista Ltd, 2021 - 2022 info@aista.com, all rights reserved.
 */

import { Injectable } from '@angular/core';
import { HttpService } from 'src/app/_general/services/http.service';
import { environment } from 'src/environments/environment';

/**
 * Authentication HTTP service, allowing user to authenticate and change passwords, etc.
 */
@Injectable({
  providedIn: 'root'
})
export class QueryService {

  constructor(private httpService: HttpService) { }

  query(prompt: string, recaptcha_response: string) {

    let query = '?prompt=' + encodeURIComponent(prompt);
    query += '&type=' + encodeURIComponent(environment.type);
    query += '&references=true';
    query += '&chat=true';
    query += '&recaptcha_response=' + encodeURIComponent(recaptcha_response);

    return this.httpService.get('magic/system/openai/prompt', query);
  }
}
