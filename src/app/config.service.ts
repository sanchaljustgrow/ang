import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ConfigService {
  private config: Record<string, any> = {};

  // Load config.json from the assets folder
  load(): Promise<void> {
    return fetch('/assets/config.json') // ✅ FIXED PATH
      .then(response => {
        if (!response.ok) {
          throw new Error(`Failed to load config.json: ${response.statusText}`);
        }
        return response.json();
      })
      .then(data => {
        this.config = data;
        console.log('✅ Runtime config loaded:', data);
      })
      .catch(err => {
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
