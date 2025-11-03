// src/app/app.config.ts
import { ApplicationConfig, APP_INITIALIZER } from '@angular/core';
import { provideHttpClient } from '@angular/common/http';
import { ConfigService } from './config.service';

export function initApp(cfg: ConfigService) { return () => cfg.load(); }

export const appConfig: ApplicationConfig = {
  providers: [
    provideHttpClient(),
    ConfigService,
    { provide: APP_INITIALIZER, useFactory: initApp, deps: [ConfigService], multi: true }
  ]
};
