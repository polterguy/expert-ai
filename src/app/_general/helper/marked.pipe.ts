
/*
 * Copyright (c) Arta-Marketing AS, 2023 team@ainiro.io, all rights reserved.
 */

// Angular imports.
import { Pipe, PipeTransform } from '@angular/core';

// Utility 3rd party imports.
import { marked } from "marked";

/**
 * Markdown pipe, transforming Markdown to HTML.
 */
@Pipe({
  name: 'marked'
})
export class MarkedPipe implements PipeTransform {

  transform(value: any): any {
    if (!value || value.length === 0) {
      return '';
    }
    return marked(value);
  }
}
