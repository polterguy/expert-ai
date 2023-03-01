
/*
 * Copyright (c) Aista Ltd, 2021 - 2023 info@aista.com, all rights reserved.
 */

/**
 * Collection of reusable regular expressions.
 */
export const CommonRegEx: { [key: string]: RegExp } = {

  domain: /(^https?:\/\/)([\w\-])+\.{1}([a-zA-Z]{2,63})([\/\w-]*)*\/?\??([^#\n\r]*)?#?([^\n\r]*)/,
};
