import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class ConfigService {
  private config: Record<string, any> = {};

  async load(): Promise<void> {
    try {
      const res = await fetch('/assets/config.json');
      if (!res.ok) throw new Error('Failed to load config.json');
      this.config = await res.json();
      console.log('✅ Runtime config loaded', this.config);
    } catch (err) {
      console.warn('⚠️ Could not load config.json', err);
      this.config = {};
    }
  }

  get(key: string) {
    return this.config[key];
  }

  getAll() {
    return this.config;
  }
}
