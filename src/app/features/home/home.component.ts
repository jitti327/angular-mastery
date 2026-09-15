import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ProgressTrackerComponent } from '../../shared/components/progress-tracker/progress-tracker.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [RouterLink, ProgressTrackerComponent],
  template: `
    <div class="home-container">
      <section class="hero">
        <div class="hero-content">
          <h1>Learn Angular <span class="highlight">Step by Step</span></h1>
          <p class="hero-subtitle">
            Master Angular 22 with interactive lessons, live code examples,
            visual diagrams, and real-world practice projects.
          </p>
          <div class="hero-actions">
            <a routerLink="/lessons" class="btn-primary">Start Learning →</a>
            <a routerLink="/version-comparison" class="btn-secondary">Version Comparison</a>
          </div>
          <div class="hero-stats">
            <div class="stat">
              <span class="stat-number">42</span>
              <span class="stat-label">Lessons</span>
            </div>
            <div class="stat">
              <span class="stat-number">4</span>
              <span class="stat-label">Practice Projects</span>
            </div>
            <div class="stat">
              <span class="stat-number">22</span>
              <span class="stat-label">Angular Version</span>
            </div>
          </div>
        </div>
        <div class="hero-visual">
          <div class="angular-logo">
            <svg viewBox="0 0 250 250" xmlns="http://www.w3.org/2000/svg">
              <path fill="#DD0031" d="M125 30L31.9 63.2l14.2 123.1L125 230l78.9-43.7 14.2-123.1z"/>
              <path fill="#C3002F" d="M125 30v22.2-.1V230l78.9-43.7 14.2-123.1L125 30z"/>
              <path fill="#FFFFFF" d="M125 52.1L66.8 182.6h21.7l11.7-29.2h49.4l11.7 29.2H183L125 52.1zm17 83.3h-34l17-40.9 17 40.9z"/>
            </svg>
          </div>
        </div>
      </section>

      <section class="progress-section">
        <app-progress-tracker [totalLessons]="42" />
      </section>

      <section class="features">
        <h2>What You'll Learn</h2>
        <div class="features-grid">
          <div class="feature-card">
            <span class="feature-icon">📦</span>
            <h3>Components & Templates</h3>
            <p>Master Angular's building blocks with live examples</p>
          </div>
          <div class="feature-card">
            <span class="feature-icon">🔄</span>
            <h3>Reactive Programming</h3>
            <p>Learn Signals, RxJS, and Zoneless architecture</p>
          </div>
          <div class="feature-card">
            <span class="feature-icon">📝</span>
            <h3>Forms & Validation</h3>
            <p>Template-driven, Reactive, and Signal Forms</p>
          </div>
          <div class="feature-card">
            <span class="feature-icon">🌐</span>
            <h3>HTTP & Data</h3>
            <p>HttpClient, Resource API, and Observables</p>
          </div>
          <div class="feature-card">
            <span class="feature-icon">🧭</span>
            <h3>Routing</h3>
            <p>Navigation, guards, and lazy loading</p>
          </div>
          <div class="feature-card">
            <span class="feature-icon">⚡</span>
            <h3>Performance</h3>
            <p>Optimization strategies and best practices</p>
          </div>
        </div>
      </section>

      <section class="projects-preview">
        <h2>Practice Projects</h2>
        <div class="projects-grid">
          <a routerLink="/practice/todo" class="project-card">
            <div class="project-icon">✅</div>
            <h3>Todo App</h3>
            <span class="project-level beginner">Beginner</span>
            <p>Learn components, events, and basic state management</p>
          </a>
          <a routerLink="/practice/weather" class="project-card">
            <div class="project-icon">🌤️</div>
            <h3>Weather Dashboard</h3>
            <span class="project-level intermediate">Intermediate</span>
            <p>HTTP calls, services, and async data handling</p>
          </a>
          <a routerLink="/practice/ecommerce" class="project-card">
            <div class="project-icon">🛒</div>
            <h3>E-commerce</h3>
            <span class="project-level intermediate">Intermediate</span>
            <p>Routing, forms, and component communication</p>
          </a>
          <a routerLink="/practice/chat" class="project-card">
            <div class="project-icon">💬</div>
            <h3>Real-time Chat</h3>
            <span class="project-level advanced">Advanced</span>
            <p>Signals, WebSockets, and advanced patterns</p>
          </a>
        </div>
      </section>

      <section class="angular-versions">
        <h2>Angular Version Comparison</h2>
        <p>Compare features across Angular versions 14 through 22</p>
        <a routerLink="/version-comparison" class="btn-primary">View Comparison →</a>
      </section>
    </div>
  `,
  styles: [`
    .home-container {
      max-width: 1200px;
      margin: 0 auto;
      padding: 0 24px;
    }
    .hero {
      display: flex;
      align-items: center;
      gap: 60px;
      padding: 80px 0;
      min-height: 80vh;
    }
    .hero-content {
      flex: 1;
    }
    .hero-content h1 {
      font-size: 56px;
      line-height: 1.1;
      margin: 0 0 24px;
      color: #1a1a1a;
    }
    .highlight {
      background: linear-gradient(135deg, #dd0031, #c3002f);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      background-clip: text;
    }
    .hero-subtitle {
      font-size: 20px;
      color: #666;
      line-height: 1.6;
      margin: 0 0 32px;
    }
    .hero-actions {
      display: flex;
      gap: 16px;
      margin-bottom: 48px;
    }
    .btn-primary {
      display: inline-block;
      padding: 16px 32px;
      background: linear-gradient(135deg, #dd0031, #c3002f);
      color: white;
      text-decoration: none;
      border-radius: 8px;
      font-weight: 600;
      font-size: 18px;
      transition: transform 0.2s, box-shadow 0.2s;
    }
    .btn-primary:hover {
      transform: translateY(-2px);
      box-shadow: 0 8px 20px rgba(221, 0, 49, 0.3);
    }
    .btn-secondary {
      display: inline-block;
      padding: 16px 32px;
      background: white;
      color: #333;
      text-decoration: none;
      border-radius: 8px;
      font-weight: 600;
      font-size: 18px;
      border: 2px solid #ddd;
      transition: all 0.2s;
    }
    .btn-secondary:hover {
      border-color: #dd0031;
      color: #dd0031;
    }
    .hero-stats {
      display: flex;
      gap: 48px;
    }
    .stat {
      display: flex;
      flex-direction: column;
    }
    .stat-number {
      font-size: 48px;
      font-weight: 700;
      color: #dd0031;
    }
    .stat-label {
      font-size: 14px;
      color: #888;
      text-transform: uppercase;
    }
    .hero-visual {
      flex: 1;
      display: flex;
      justify-content: center;
    }
    .angular-logo svg {
      width: 300px;
      height: 300px;
      animation: pulse 2s ease-in-out infinite;
    }
    @keyframes pulse {
      0%, 100% { transform: scale(1); }
      50% { transform: scale(1.05); }
    }
    .progress-section {
      margin: 40px 0;
    }
    .features, .projects-preview, .angular-versions {
      margin: 80px 0;
    }
    .features h2, .projects-preview h2, .angular-versions h2 {
      text-align: center;
      font-size: 36px;
      margin-bottom: 48px;
      color: #1a1a1a;
    }
    .features-grid {
      display: grid;
      grid-template-columns: repeat(3, 1fr);
      gap: 24px;
    }
    .feature-card {
      background: white;
      padding: 32px;
      border-radius: 16px;
      box-shadow: 0 4px 12px rgba(0,0,0,0.08);
      transition: transform 0.2s, box-shadow 0.2s;
    }
    .feature-card:hover {
      transform: translateY(-4px);
      box-shadow: 0 8px 24px rgba(0,0,0,0.12);
    }
    .feature-icon {
      font-size: 48px;
    }
    .feature-card h3 {
      margin: 16px 0 8px;
      color: #1a1a1a;
    }
    .feature-card p {
      margin: 0;
      color: #666;
    }
    .projects-grid {
      display: grid;
      grid-template-columns: repeat(4, 1fr);
      gap: 24px;
    }
    .project-card {
      background: white;
      padding: 32px;
      border-radius: 16px;
      box-shadow: 0 4px 12px rgba(0,0,0,0.08);
      text-decoration: none;
      text-align: center;
      transition: transform 0.2s, box-shadow 0.2s;
    }
    .project-card:hover {
      transform: translateY(-4px);
      box-shadow: 0 8px 24px rgba(0,0,0,0.12);
    }
    .project-icon {
      font-size: 64px;
    }
    .project-card h3 {
      margin: 16px 0 8px;
      color: #1a1a1a;
    }
    .project-level {
      display: inline-block;
      padding: 4px 12px;
      border-radius: 12px;
      font-size: 12px;
      font-weight: 600;
      text-transform: uppercase;
    }
    .project-level.beginner {
      background: #e8f5e9;
      color: #2e7d32;
    }
    .project-level.intermediate {
      background: #fff3e0;
      color: #e65100;
    }
    .project-level.advanced {
      background: #fce4ec;
      color: #c62828;
    }
    .project-card p {
      margin: 12px 0 0;
      color: #666;
      font-size: 14px;
    }
    .angular-versions {
      text-align: center;
      background: linear-gradient(135deg, #f5f5f5 0%, #eeeeee 100%);
      padding: 60px;
      border-radius: 24px;
    }
    .angular-versions p {
      color: #666;
      font-size: 18px;
      margin-bottom: 24px;
    }
  `]
})
export class HomeComponent {}
