
/*
 * Copyright (c) Arta-Marketing AS, 2023 team@ainiro.io, all rights reserved.
 */

import { Injectable } from '@angular/core';
import { HttpService } from 'src/app/_general/services/http.service';

/**
 * Authentication HTTP service, allowing user to authenticate and change passwords, etc.
 */
@Injectable({
  providedIn: 'root'
})
export class QueryService {

  constructor(private httpService: HttpService) { }

  /**
   * Returns a new unique session identifier.
   */
  createSession() {

    return this.httpService.get('magic/system/misc/gibberish');
  }

  /**
   * Returns all models from your backend.
   */
  models() {

    return this.httpService.get('magic/system/magic/ml_types');
  }

  /**
   * Invokes model with the specified promptand the given captcha token.
   */
  query(model: string, prompt: string, recaptcha_response: string, session: string) {

    let query = '?prompt=' + encodeURIComponent(prompt);
    query += '&type=' + encodeURIComponent(model);
    query += '&references=true';
    query += '&chat=true';
    query += '&session=sdfoujgsdf'; // TODO: FIX!!
    query += '&recaptcha_response=' + encodeURIComponent(recaptcha_response);
    query += '&session=' + encodeURIComponent(session);

    return this.httpService.get('magic/system/openai/chat', query);
  }
}
