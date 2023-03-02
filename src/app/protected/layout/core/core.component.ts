
/*
 * Copyright (c) Aista Ltd, 2021 - 2022 info@aista.com, all rights reserved.
 */

import { Component, OnDestroy, OnInit } from '@angular/core';
import { HttpTransportType, HubConnection, HubConnectionBuilder } from '@aspnet/signalr';
import { AuthService } from 'src/app/_general/services/auth.service';
import { GeneralService } from 'src/app/_general/services/general.service';
import { environment } from 'src/environments/environment';

/**
 * Core component containing the prinary router outlet.
 */
@Component({
  selector: 'app-core',
  templateUrl: './core.component.html'
})
export class CoreComponent implements OnInit, OnDestroy {

  hubConnection: HubConnection = null;

  constructor(
    private authService: AuthService,
    private generalService: GeneralService) { }

  ngOnInit() {

    let builder = new HubConnectionBuilder();
    this.hubConnection = builder.withUrl(environment.backendUrl + 'sockets', {
      accessTokenFactory: () => this.authService.getJwtToken(),
      skipNegotiation: true,
      transport: HttpTransportType.WebSockets,
    }).build();

    this.hubConnection.start();
    this.hubConnection.on('magic.backend.message', (args) => {

      args = JSON.parse(args);

      switch (args.type) {

        case 'success':
          this.generalService.showFeedback(args.message, 'successMessage', 'OK');
          break;

        case 'error':
          this.generalService.showFeedback(args.message, 'errorMessage', 'OK');
          break;
      }
    });
  }

  ngOnDestroy() {

    this.hubConnection?.stop();
  }
}
