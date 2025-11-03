import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class ConfigService {
  private config: Record<string, any> = {};

  load(): Promise<void> {
    return fetch('/assets/config.json')
      .then((res) => {
        if (!res.ok)
          throw new Error(`Failed to load config.json: ${res.status}`);
        return res.json();
      })
      .then((data) => {
        this.config = data;
        console.log('✅ Runtime config loaded:', data);
      })
      .catch((err) => {
        console.warn('⚠️ Could not load config.json:', err);
        this.config = {};
      });
  }

  get(key: string): string {
    return this.config[key] || '';
  }

  getAll(): Record<string, any> {
    return this.config;
  }
}
