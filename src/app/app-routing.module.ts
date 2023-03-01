
/*
 * Copyright (c) Aista Ltd, 2021 - 2022 info@aista.com, all rights reserved.
 */

import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './auth.guard';
import { CoreComponent } from './protected/layout/core/core.component';

import { AuthBaseComponent } from './public/authentication/auth-base/auth-base.component';
import { CheckEmailComponent } from './public/authentication/check-email/check-email.component';
import { ForgotPasswordComponent } from './public/authentication/forgot-password/forgot-password.component';
import { LoginComponent } from './public/authentication/login/login.component';
import { ResetPasswordComponent } from './public/authentication/reset-password/reset-password.component';

const routes: Routes = [
  {
    path: 'authentication',
    component: AuthBaseComponent,
    children: [
      {
        path: 'sign-in',
        component: LoginComponent
      },
      {
        path: 'check-email',
        component: CheckEmailComponent,
      },
      {
        path: 'forgot-password',
        component: ForgotPasswordComponent
      },
      {
        path: 'reset-password',
        component: ResetPasswordComponent
      },
      {
        path: '**',
        redirectTo: 'sign-in'
      },
    ]
  },
  {
    path: 'r/:ref',
    component: AuthBaseComponent
  },
  {
    path: '',
    component: CoreComponent,
    children: [
      {
        path: '',
        loadChildren: () => import('./protected/pages/dashboard/_modules/dashboard.module').then(m => m.DashboardModule)
      },
      {
        path: 'import',
        loadChildren: () => import('./protected/pages/import/_modules/import.module').then(m => m.ServicesModule)
      },
    ],
    canActivate: [AuthGuard],
    canActivateChild: [AuthGuard]
  },
  {
    path: 'not-found',
    loadChildren: () => import('./public/not-found/lazy-loading/notfound.module').then(m => m.NotfoundModule),
  },
  {
    path: '**',
    redirectTo: 'not-found'
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
