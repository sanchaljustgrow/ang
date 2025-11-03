import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { App } from './app/app';
import { ConfigService } from './app/config.service';

fetch('/assets/config.json')
  .then(response => response.json())
  .then(config => {
    // Store globally or provide to Angular’s DI
    (window as any).__APP_CONFIG__ = config;

    bootstrapApplication(App, {
      ...appConfig,
      providers: [
        ...appConfig.providers || [],
        { provide: ConfigService, useValue: new ConfigService() }
      ]
    });
  })
  .catch(err => {
    console.error('Failed to load config.json', err);
    bootstrapApplication(App, appConfig);
  });
