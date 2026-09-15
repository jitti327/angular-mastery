import { Component, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-weather-project',
  standalone: true,
  imports: [FormsModule],
  template: `
    <div class="project-container">
      <header class="project-header">
        <a routerLink="/" class="back-link">← Back to Home</a>
        <h1>🌤️ Weather Dashboard - Practice Project</h1>
        <p>Learn HTTP calls, services, and async data handling</p>
        <div class="concepts">
          <span class="concept">HttpClient</span>
          <span class="concept">Services</span>
          <span class="concept">Async/Await</span>
          <span class="concept">Resource API</span>
        </div>
      </header>

      <div class="app-container">
        <div class="search-section">
          <input
            type="text"
            [(ngModel)]="searchCity"
            placeholder="Enter city name..."
            (keyup.enter)="searchWeather()"
          />
          <button (click)="searchWeather()">Search</button>
        </div>

        @if (loading()) {
          <div class="loading">
            <div class="spinner"></div>
            <p>Loading weather data...</p>
          </div>
        }

        @if (error()) {
          <div class="error-message">
            <p>{{ error() }}</p>
            <button (click)="error.set('')">Dismiss</button>
          </div>
        }

        @if (weatherData()) {
          <div class="weather-card">
            <div class="weather-main">
              <span class="weather-icon">{{ getWeatherIcon(weatherData()!.condition) }}</span>
              <div class="temperature">
                <span class="temp-value">{{ weatherData()!.temperature }}°</span>
                <span class="temp-unit">C</span>
              </div>
            </div>
            <h2 class="city-name">{{ weatherData()!.city }}</h2>
            <p class="condition">{{ weatherData()!.condition }}</p>
            
            <div class="weather-details">
              <div class="detail">
                <span class="detail-label">Humidity</span>
                <span class="detail-value">{{ weatherData()!.humidity }}%</span>
              </div>
              <div class="detail">
                <span class="detail-label">Wind</span>
                <span class="detail-value">{{ weatherData()!.wind }} km/h</span>
              </div>
              <div class="detail">
                <span class="detail-label">Feels Like</span>
                <span class="detail-value">{{ weatherData()!.feelsLike }}°C</span>
              </div>
            </div>
          </div>

          <div class="forecast-section">
            <h3>5-Day Forecast</h3>
            <div class="forecast-grid">
              @for (day of weatherData()!.forecast; track day.date) {
                <div class="forecast-card">
                  <span class="forecast-day">{{ day.day }}</span>
                  <span class="forecast-icon">{{ getWeatherIcon(day.condition) }}</span>
                  <span class="forecast-temp">{{ day.high }}° / {{ day.low }}°</span>
                </div>
              }
            </div>
          </div>
        }

        <section class="code-explanation">
          <h2>How This App Works</h2>
          <div class="code-block">
            <h3>1. Weather Service with HttpClient</h3>
            <pre><code>{{ codeExample1 }}</code></pre>
          </div>
          <div class="code-block">
            <h3>2. Using Resource API (Angular 22)</h3>
            <pre><code>{{ codeExample2 }}</code></pre>
          </div>
        </section>
      </div>
    </div>
  `,
  styles: [`
    .project-container {
      max-width: 800px;
      margin: 0 auto;
      padding: 24px;
    }
    .back-link {
      display: inline-block;
      margin-bottom: 16px;
      color: #2196f3;
      text-decoration: none;
    }
    .project-header {
      text-align: center;
      margin-bottom: 40px;
    }
    .project-header h1 { margin: 0 0 8px; color: #1a1a1a; }
    .project-header p { color: #666; margin: 0 0 16px; }
    .concepts { display: flex; justify-content: center; gap: 8px; flex-wrap: wrap; }
    .concept {
      background: #e3f2fd;
      color: #1565c0;
      padding: 6px 12px;
      border-radius: 16px;
      font-size: 12px;
      font-weight: 600;
    }
    .app-container {
      background: white;
      border-radius: 16px;
      box-shadow: 0 4px 12px rgba(0,0,0,0.1);
      padding: 24px;
      margin-bottom: 40px;
    }
    .search-section {
      display: flex;
      gap: 12px;
      margin-bottom: 24px;
    }
    .search-section input {
      flex: 1;
      padding: 14px 18px;
      border: 2px solid #e0e0e0;
      border-radius: 8px;
      font-size: 16px;
    }
    .search-section input:focus { outline: none; border-color: #2196f3; }
    .search-section button {
      padding: 14px 24px;
      background: #2196f3;
      color: white;
      border: none;
      border-radius: 8px;
      font-size: 16px;
      font-weight: 600;
      cursor: pointer;
    }
    .loading {
      text-align: center;
      padding: 40px;
    }
    .spinner {
      width: 48px;
      height: 48px;
      border: 4px solid #e0e0e0;
      border-top-color: #2196f3;
      border-radius: 50%;
      animation: spin 1s linear infinite;
      margin: 0 auto 16px;
    }
    @keyframes spin { to { transform: rotate(360deg); } }
    .error-message {
      background: #ffebee;
      padding: 16px;
      border-radius: 8px;
      display: flex;
      justify-content: space-between;
      align-items: center;
      color: #c62828;
    }
    .error-message button {
      background: transparent;
      border: none;
      color: #c62828;
      cursor: pointer;
      font-weight: 600;
    }
    .weather-card {
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
      border-radius: 16px;
      padding: 32px;
      color: white;
      text-align: center;
      margin-bottom: 24px;
    }
    .weather-main {
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 24px;
      margin-bottom: 16px;
    }
    .weather-icon { font-size: 72px; }
    .temperature { display: flex; align-items: flex-start; }
    .temp-value { font-size: 64px; font-weight: 700; }
    .temp-unit { font-size: 24px; margin-top: 8px; }
    .city-name { margin: 0 0 8px; font-size: 28px; }
    .condition { margin: 0 0 24px; opacity: 0.9; }
    .weather-details {
      display: flex;
      justify-content: center;
      gap: 48px;
    }
    .detail { text-align: center; }
    .detail-label { display: block; opacity: 0.8; font-size: 14px; }
    .detail-value { font-size: 20px; font-weight: 600; }
    .forecast-section h3 { margin-bottom: 16px; color: #1a1a1a; }
    .forecast-grid {
      display: grid;
      grid-template-columns: repeat(5, 1fr);
      gap: 12px;
    }
    .forecast-card {
      background: #f5f5f5;
      padding: 16px;
      border-radius: 12px;
      text-align: center;
    }
    .forecast-day { display: block; font-weight: 600; margin-bottom: 8px; }
    .forecast-icon { font-size: 32px; display: block; margin-bottom: 8px; }
    .forecast-temp { font-size: 14px; color: #666; }
    .code-explanation { margin-top: 40px; }
    .code-explanation h2 { margin-bottom: 24px; color: #1a1a1a; }
    .code-block {
      background: #1e1e1e;
      border-radius: 12px;
      overflow: hidden;
      margin-bottom: 24px;
    }
    .code-block h3 {
      margin: 0;
      padding: 16px 20px;
      background: #2d2d2d;
      color: #fff;
      font-size: 14px;
    }
    .code-block pre { margin: 0; padding: 20px; overflow-x: auto; }
    .code-block code {
      color: #d4d4d4;
      font-family: 'Consolas', monospace;
      font-size: 14px;
      line-height: 1.6;
    }
  `]
})
export class WeatherProjectComponent {
  searchCity = '';
  loading = signal(false);
  error = signal('');
  weatherData = signal<any>(null);

  async searchWeather(): Promise<void> {
    if (!this.searchCity.trim()) return;

    this.loading.set(true);
    this.error.set('');
    this.weatherData.set(null);

    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));

    // Mock weather data
    this.weatherData.set({
      city: this.searchCity,
      temperature: 24,
      condition: 'Partly Cloudy',
      humidity: 65,
      wind: 12,
      feelsLike: 23,
      forecast: [
        { day: 'Mon', date: '2026-09-15', condition: 'Sunny', high: 26, low: 18 },
        { day: 'Tue', date: '2026-09-16', condition: 'Cloudy', high: 22, low: 16 },
        { day: 'Wed', date: '2026-09-17', condition: 'Rainy', high: 19, low: 14 },
        { day: 'Thu', date: '2026-09-18', condition: 'Sunny', high: 25, low: 17 },
        { day: 'Fri', date: '2026-09-19', condition: 'Partly Cloudy', high: 24, low: 18 }
      ]
    });

    this.loading.set(false);
  }

  getWeatherIcon(condition: string): string {
    const icons: { [key: string]: string } = {
      'Sunny': '☀️',
      'Cloudy': '☁️',
      'Rainy': '🌧️',
      'Partly Cloudy': '⛅',
      'Stormy': '⛈️',
      'Snowy': '❄️'
    };
    return icons[condition] || '🌤️';
  }

  codeExample1 = `import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class WeatherService {
  private http = inject(HttpClient);
  private apiUrl = 'https://api.weather.com';

  getWeather(city: string): Observable<WeatherData> {
    return this.http.get<WeatherData>(
      \`\${this.apiUrl}/weather?city=\${city}\`
    );
  }

  getForecast(city: string): Observable<ForecastDay[]> {
    return this.http.get<ForecastDay[]>(
      \`\${this.apiUrl}/forecast?city=\${city}\`
    );
  }
}`;

  codeExample2 = `import { httpResource } from '@angular/common/http';
import { Component, inject } from '@angular/core';

@Component({
  selector: 'app-weather',
  standalone: true,
  template: \`
    @if (weather.isLoading()) {
      <div class="spinner">Loading...</div>
    }
    
    @if (weather.value(); as data) {
      <h2>{{ data.city }}</h2>
      <p>{{ data.temperature }}°C</p>
    }
    
    @if (weather.error(); as err) {
      <p class="error">{{ err.message }}</p>
    }
  \`
})
export class WeatherComponent {
  private city = signal('London');
  
  weather = httpResource(() => ({
    url: \`/api/weather?city=\${this.city()}\`,
    method: 'GET' as const
  }));
}`;
}
