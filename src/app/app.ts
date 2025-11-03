import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { JsonPipe } from '@angular/common';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, JsonPipe],
  templateUrl: './app.html',
  styleUrls: ['./app.css'],
})
export class App implements OnInit {
  title = 'TestEnv';
  data: any = null;

  // ✅ Runtime API URL (loaded from config.json or environment)
  private testURL = (window as any).__APP_CONFIG__?.NG_APP_API_URL || 'https://task.thingsrms.com/v1';

  constructor(private http: HttpClient) {}

  ngOnInit() {
    console.log('API URL:', this.testURL);
    this.http.get<any>(this.testURL).subscribe({
      next: (data) => (this.data = data),
      error: (err) => console.error('API call failed:', err),
    });
  }
}
