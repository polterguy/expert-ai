
/*
 * Copyright (c) Arta-Marketing AS, 2023 team@ainiro.io, all rights reserved.
 */

export interface User {
  username: string,
  password?: string,
  extra?: ExtraUserData,
  frontendUrl?: string,
  template?: string,
  role?: string,
  recaptcha_response?: string
}

export interface ExtraUserData {
  name?: string,
  email?: string,
}
