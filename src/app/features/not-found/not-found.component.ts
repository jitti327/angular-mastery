import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { trigger, transition, style, animate, query, stagger } from '@angular/animations';

@Component({
  selector: 'app-not-found',
  standalone: true,
  imports: [RouterLink],
  animations: [
    trigger('fadeInUp', [
      transition(':enter', [
        query('.not-found-content > *', [
          style({ opacity: 0, transform: 'translateY(30px)' })
        ], { optional: true }),
        query('.not-found-content > *', [
          stagger(100, [
            animate('500ms cubic-bezier(0.35, 0, 0.25, 1)', style({ opacity: 1, transform: 'translateY(0)' }))
          ])
        ], { optional: true })
      ])
    ]),
    trigger('floatAnimation', [
      transition(':enter', [
        animate('3s ease-in-out infinite', style({ transform: 'translateY(-10px)' }))
      ])
    ])
  ],
  template: `
    <div class="not-found" @fadeInUp>
      <div class="not-found-content">
        <div class="error-code" @floatAnimation>
          <span class="digit">4</span>
          <span class="zero">0</span>
          <span class="digit">4</span>
        </div>
        <div class="glow-orb"></div>
        <h1>Page Not Found</h1>
        <p>The page you're looking for doesn't exist or has been moved.</p>
        <div class="actions">
          <a routerLink="/" class="btn-home">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/>
              <polyline points="9 22 9 12 15 12 15 22"/>
            </svg>
            Back to Home
          </a>
          <a routerLink="/lessons" class="btn-lessons">Browse Lessons</a>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .not-found {
      display: flex;
      align-items: center;
      justify-content: center;
      min-height: 80vh;
      text-align: center;
      padding: 40px 24px;
    }
    .not-found-content {
      position: relative;
      z-index: 1;
    }
    .error-code {
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 8px;
      margin-bottom: 32px;
    }
    .digit {
      font-size: 120px;
      font-weight: 800;
      background: linear-gradient(135deg, #dd0031, #ff6b6b);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      background-clip: text;
      line-height: 1;
    }
    .zero {
      font-size: 120px;
      font-weight: 800;
      background: linear-gradient(135deg, #667eea, #764ba2);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      background-clip: text;
      line-height: 1;
    }
    .glow-orb {
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      width: 200px;
      height: 200px;
      background: radial-gradient(circle, rgba(221, 0, 49, 0.1) 0%, transparent 70%);
      border-radius: 50%;
      animation: orbPulse 3s ease-in-out infinite;
      pointer-events: none;
    }
    @keyframes orbPulse {
      0%, 100% { transform: translate(-50%, -50%) scale(1); opacity: 0.5; }
      50% { transform: translate(-50%, -50%) scale(1.3); opacity: 0.8; }
    }
    h1 {
      font-size: 36px;
      color: var(--text-primary);
      margin: 0 0 16px;
    }
    p {
      font-size: 18px;
      color: var(--text-secondary);
      margin: 0 0 40px;
      max-width: 400px;
      margin-left: auto;
      margin-right: auto;
    }
    .actions {
      display: flex;
      gap: 16px;
      justify-content: center;
    }
    .btn-home, .btn-lessons {
      display: inline-flex;
      align-items: center;
      gap: 10px;
      padding: 14px 28px;
      border-radius: 12px;
      font-weight: 600;
      text-decoration: none;
      transition: all 0.3s;
    }
    .btn-home {
      background: linear-gradient(135deg, #dd0031, #c3002f);
      color: white;
    }
    .btn-home:hover {
      transform: translateY(-2px);
      box-shadow: 0 8px 24px rgba(221, 0, 49, 0.3);
    }
    .btn-lessons {
      background: var(--bg-secondary);
      color: var(--text-primary);
      border: 2px solid var(--border-color);
    }
    .btn-lessons:hover {
      border-color: #dd0031;
      color: #dd0031;
      transform: translateY(-2px);
    }
    @media (max-width: 768px) {
      .digit, .zero { font-size: 72px; }
      h1 { font-size: 28px; }
      .actions { flex-direction: column; align-items: center; }
    }
    :host-context(.dark-theme) {
      h1 { color: #fff; }
    }
  `]
})
export class NotFoundComponent {}
