
/*
 * Copyright (c) Aista Ltd, 2021 - 2022 info@aista.com, all rights reserved.
 */

/**
 * Encapsulates a payment method, or a payment card of some sort.
 */
export interface Card {
  // for get method
  payment_method?: string,
  card_no?: string,
  card_type?: string,
  // for post method
  card_number?: string,
  card_exp_month?: string,
  card_exp_year?: string,
  card_cvs?: string
}
