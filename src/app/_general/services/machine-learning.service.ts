
/*
 * Copyright (c) Aista Ltd, 2021 - 2023 info@aista.com, all rights reserved.
 */

// Angular and system imports.
import { Injectable } from '@angular/core';
import { HttpService } from './http.service';

/**
 * OpenAI service, allowing user to interact with OpenAI.
 */
@Injectable({
  providedIn: 'root'
})
export class MachineLearningService {

  constructor(private httpService: HttpService) { }

  uploadTrainingFile(data: FormData) {

    return this.httpService.post('magic/system/openai/upload-training-data', data);
  }

  importUrl(url: string, type: string, delay: number, max: number, threshold: number) {

    return this.httpService.post('magic/system/openai/import-url', {
      url,
      type,
      delay,
      max,
      threshold,
    });
  }

  vectorise(type: string) {

    return this.httpService.post('magic/system/openai/vectorise', {
      type,
    });
  }
}
