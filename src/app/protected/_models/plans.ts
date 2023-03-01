
/*
 * Copyright (c) Aista Ltd, 2021 - 2022 info@aista.com, all rights reserved.
 */

export interface Plans {
  cpu: number,
  description: string,
  memory: number,
  name: string,
  price: number,
  storage: number,
  max_upload?: number,
  max_timeout?: number,
  isActivePlan?: boolean, // for in app use only
  price_reference?: string,
  frontend?: boolean
}

export interface Cloudlets {
  id: number;
  name: number;
  plan: string;
  node_name: string;
  price: number;
  country: string;
  description: string;
  cpu?: number,
  created?: Date,
  destruction_date?: Date,
  memory?: number,
  cluster?: string,
  storage?: number,
  url?: string,
  frontend?: boolean,
  countryName?: string, // to be used in app only
  nextPayment?: Date  // to be used in app only
}
