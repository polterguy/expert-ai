
/*
 * Copyright (c) Aista Ltd, 2021 - 2022 info@aista.com, all rights reserved.
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
