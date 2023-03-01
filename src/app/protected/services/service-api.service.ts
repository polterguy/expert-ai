
/*
 * Copyright (c) Aista Ltd, 2021 - 2022 info@aista.com, all rights reserved.
 */

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { HttpService } from 'src/app/_general/services/http.service';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  /**
   *
   * @param httpService api services
   */
  constructor(private httpService: HttpService, private httpClient: HttpClient) { }

  getPlans(token: string) {
    return this.httpService.get('magic/modules/hub/plans?recaptcha_response=' + encodeURIComponent(token));
  }

  deleteFreeCloudlet(name: string, token: string) {
    return this.httpService.delete(
      'magic/modules/hub/cloudlets?name=' +
      encodeURIComponent(name) +
      '&recaptcha_response=' +
      encodeURIComponent(token));
  }

  deletePaidCloudlet(subscription: string) {
    return this.httpService.delete(
      'magic/modules/stripe/subscriptions?subscription=' +
      encodeURIComponent(subscription));
  }

  getCloudlets(token: string) {
    return this.httpService.get('magic/modules/hub/cloudlets?recaptcha_response=' + encodeURIComponent(token));
  }

  createCloudlet(data: any) {
    return this.httpService.post('magic/modules/hub/cloudlets', data);
  }

  getDataCenters() {
    return this.httpService.get('magic/modules/hub/clusters');
  }

  getRandomName() {
    return this.httpService.get('magic/modules/hub/animals');
  }

  getPaymentMethods() {
    return this.httpService.get('magic/modules/stripe/payment-methods');
  }

  savePaymentMethods(data: any) {
    return this.httpService.post('magic/modules/stripe/payment-methods', data);
  }

  deletePaymentMethods(data: any) {
    return this.httpService.delete('magic/modules/stripe/payment-methods?' + data);
  }

  getSubscriptions() {
    return this.httpService.get('magic/modules/stripe/subscriptions');
  }

  upgradeService(data: any) {
    return this.httpService.post('magic/modules/stripe/subscriptions', data);
  }

  getPaymentToken() {
    return this.httpService.get('magic/modules/hub/payment-link-token');
  }
}
