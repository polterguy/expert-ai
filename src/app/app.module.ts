
/*
 * Copyright (c) Aista Ltd, 2021 - 2022 info@aista.com, all rights reserved.
 */

import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { RECAPTCHA_V3_SITE_KEY, RecaptchaV3Module } from "ng-recaptcha";
import {NgxImageCompressService} from "ngx-image-compress";

// Material imports
import { MaterialModule } from './material.module';

import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { NetworkInterceptor } from './_general/helper/network.interceptor';
import { AuthInterceptor } from './_general/helper/auth.interceptor';
import { TokenInterceptor } from './_general/helper/token.interceptor';

import { AuthBaseComponent } from './public/authentication/auth-base/auth-base.component';
import { LoginComponent } from './public/authentication/login/login.component';
import { ForgotPasswordComponent } from './public/authentication/forgot-password/forgot-password.component';
import { ResetPasswordComponent } from './public/authentication/reset-password/reset-password.component';

import { AppComponent } from './app.component';
import { CoreComponent } from './protected/layout/core/core.component';
import { HeaderComponent } from './protected/layout/header/header.component';
import { FooterComponent } from './protected/layout/footer/footer.component';
import { CheckEmailComponent } from './public/authentication/check-email/check-email.component';

@NgModule({
  declarations: [
    AppComponent,
    AuthBaseComponent,
    LoginComponent,
    ForgotPasswordComponent,
    ResetPasswordComponent,
    CheckEmailComponent,
    CoreComponent,
    HeaderComponent,
    FooterComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    FormsModule,
    MaterialModule,
    RecaptchaV3Module,
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: NetworkInterceptor,
      multi: true,
    },
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: TokenInterceptor, multi: true },
    { provide: RECAPTCHA_V3_SITE_KEY, useValue: "6LfVd20fAAAAAC2tcJ55RvOEkraQL390cDw2yiT2" },
    NgxImageCompressService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
