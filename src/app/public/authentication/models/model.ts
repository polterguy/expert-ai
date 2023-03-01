
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
  subscribe?: string // being yes OR no,
  country?: string,
  country_calling_code?: string,
  phone?: string,
  backend?: string,
  cluster?: string,
  "registration-ip-address"?: string,
  occupation?: string,
  city?: string,
  postcode?: string,
  address?: string,
  companyName?: string,
  affiliate_percent?: string,
  affiliate?: string
}
