import { Component, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { RouterOutlet } from '@angular/router';
import { JsonPipe } from '@angular/common';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, JsonPipe],
  templateUrl: './app.html',
  styleUrls: ['./app.css']
})
export class App {
  title = 'TestEnv';
  data: any = null;
  config: any = null;

  // ✅ use Angular’s new inject() syntax instead of constructor injection
  private http = inject(HttpClient);

  ngOnInit() {
    // Load configuration from assets/config.json
    this.http.get<any>('assets/config.json').subscribe({
      next: (config) => {
        this.config = config;
        console.log('Loaded config:', config);
        this.fetchData(config.NG_APP_API_URL);
      },
      error: (err) => console.error('Failed to load config:', err)
    });
  }

  fetchData(url: string) {
    this.http.get<any>(url).subscribe((data) => {
      this.data = data;
      console.log('API response:', data);
    });
  }
}
