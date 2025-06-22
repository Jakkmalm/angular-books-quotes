// src/main.ts

import { bootstrapApplication } from '@angular/platform-browser';
import { importProvidersFrom } from '@angular/core';
import { provideRouter } from '@angular/router';
import {
  provideHttpClient,
  withInterceptorsFromDi,
  HTTP_INTERCEPTORS,
} from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AppComponent } from './app/app.component';
import { routes } from './app/app.routes';
import { AuthInterceptor } from './app/interceptors/auth.interceptor';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';

bootstrapApplication(AppComponent, {
  providers: [
    // 1) Routing
    provideRouter(routes),

    // 2) HttpClient med interceptor plockad från DI
    provideHttpClient(withInterceptorsFromDi()),

    // 3) FormsModule & ReactiveFormsModule
    importProvidersFrom(FormsModule, ReactiveFormsModule),

    // 4) Registrera din AuthInterceptor
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true,
    }, provideAnimationsAsync(),
  ],
}).catch((err) => console.error(err));
