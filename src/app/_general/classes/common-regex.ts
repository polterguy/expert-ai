
/*
 * Copyright (c) Arta-Marketing AS, 2023 team@ainiro.io, all rights reserved.
 */

/**
 * Collection of reusable regular expressions.
 */
export const CommonRegEx: { [key: string]: RegExp } = {

  domain: /(^https?:\/\/)([\w\-])+\.{1}([a-zA-Z]{2,63})([\/\w-]*)*\/?\??([^#\n\r]*)?#?([^\n\r]*)/,
};
