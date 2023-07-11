
/*
 * Copyright (c) Arta-Marketing AS, 2023 team@ainiro.io, all rights reserved.
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

  /**
   * Uploads the specified form data that must include a file and a type.
   * 
   * If the file is a structured file, it must contain prompt and completion,
   * that are references to entities being the equivalent field.
   * 
   * If the file is a PDF file, it can optionally contain massage argument,
   * that is being used to 'clean' the PDF file using ChatGPT.
   */
  uploadTrainingFile(data: FormData) {

    return this.httpService.post('magic/system/openai/upload-training-data', data);
  }

  /**
   * Crawls the specified URL to create training data for the specified type.
   */
  importUrl(url: string, type: string, delay: number, max: number, threshold: number) {

    return this.httpService.post('magic/system/openai/import-url', {
      url,
      type,
      delay,
      max,
      threshold,
    });
  }

  /**
   * Vectorising the specified type.
   */
  vectorise(type: string) {

    return this.httpService.post('magic/system/openai/vectorise', {
      type,
    });
  }
}
