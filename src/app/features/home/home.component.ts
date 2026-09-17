import { Component, inject, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ProgressTrackerComponent } from '../../shared/components/progress-tracker/progress-tracker.component';
import { LessonService } from '../../core/services/lesson.service';
import { ScrollRevealDirective } from '../../shared/directives/scroll-reveal.directive';
import { CountUpDirective } from '../../shared/directives/count-up.directive';
import { trigger, transition, style, animate, query, stagger, state } from '@angular/animations';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [RouterLink, ProgressTrackerComponent, ScrollRevealDirective, CountUpDirective],
  animations: [
    trigger('heroStagger', [
      transition(':enter', [
        query('.hero-title, .hero-subtitle, .hero-actions, .hero-stats, .hero-visual', [
          style({ opacity: 0, transform: 'translateY(40px)' })
        ], { optional: true }),
        query('.hero-title', [
          animate('700ms 100ms cubic-bezier(0.35, 0, 0.25, 1)', style({ opacity: 1, transform: 'translateY(0)' }))
        ], { optional: true }),
        query('.hero-subtitle', [
          animate('700ms 300ms cubic-bezier(0.35, 0, 0.25, 1)', style({ opacity: 1, transform: 'translateY(0)' }))
        ], { optional: true }),
        query('.hero-actions', [
          animate('700ms 500ms cubic-bezier(0.35, 0, 0.25, 1)', style({ opacity: 1, transform: 'translateY(0)' }))
        ], { optional: true }),
        query('.hero-stats', [
          animate('700ms 700ms cubic-bezier(0.35, 0, 0.25, 1)', style({ opacity: 1, transform: 'translateY(0)' }))
        ], { optional: true }),
        query('.hero-visual', [
          animate('800ms 500ms cubic-bezier(0.35, 0, 0.25, 1)', style({ opacity: 1, transform: 'translateY(0)' }))
        ], { optional: true })
      ])
    ]),
    trigger('logoFloat', [
      transition(':enter', [
        query('.logo-card', [
          style({ opacity: 0, transform: 'translateY(30px) scale(0.9)' })
        ], { optional: true }),
        query('.logo-card', [
          stagger(150, [
            animate('600ms cubic-bezier(0.35, 0, 0.25, 1)', style({ opacity: 1, transform: 'translateY(0) scale(1)' }))
          ])
        ], { optional: true })
      ])
    ]),
    trigger('categoryStagger', [
      transition(':enter', [
        query('.category-card', [
          style({ opacity: 0, transform: 'translateY(40px) scale(0.95)' })
        ], { optional: true }),
        query('.category-card', [
          stagger(120, [
            animate('500ms cubic-bezier(0.35, 0, 0.25, 1)', style({ opacity: 1, transform: 'translateY(0) scale(1)' }))
          ])
        ], { optional: true })
      ])
    ]),
    trigger('featureStagger', [
      transition(':enter', [
        query('.feature-card', [
          style({ opacity: 0, transform: 'translateY(30px)' })
        ], { optional: true }),
        query('.feature-card', [
          stagger(80, [
            animate('500ms cubic-bezier(0.35, 0, 0.25, 1)', style({ opacity: 1, transform: 'translateY(0)' }))
          ])
        ], { optional: true })
      ])
    ]),
    trigger('projectStagger', [
      transition(':enter', [
        query('.project-card', [
          style({ opacity: 0, transform: 'scale(0.9)' })
        ], { optional: true }),
        query('.project-card', [
          stagger(100, [
            animate('500ms cubic-bezier(0.175, 0.885, 0.32, 1.275)', style({ opacity: 1, transform: 'scale(1)' }))
          ])
        ], { optional: true })
      ])
    ]),
    trigger('pulseGlow', [
      state('idle', style({ boxShadow: '0 0 0 0 rgba(221, 0, 49, 0)' })),
      state('glow', style({ boxShadow: '0 0 30px 10px rgba(221, 0, 49, 0.15)' })),
      transition('idle <=> glow', animate('1.5s ease-in-out'))
    ])
  ],
  template: `
    <div class="home-container">
      <!-- Hero Section -->
      <section class="hero" @heroStagger>
        <div class="hero-content">
          <div class="hero-badge">
            <span class="badge-dot"></span>
            Angular 22 — Latest Release
          </div>
          <h1 class="hero-title">
            Master <span class="highlight">Web Development</span>
            <span class="cursor-blink">|</span>
          </h1>
          <p class="hero-subtitle">
            Complete learning platform covering Angular, JavaScript, and TypeScript.
            Interactive lessons, live code examples, visual diagrams, and real-world practice projects.
          </p>
          <div class="hero-actions">
            <a routerLink="/lessons" class="btn-primary">
              <span>Start Learning</span>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M5 12h14M12 5l7 7-7 7"/>
              </svg>
            </a>
            <a routerLink="/version-comparison" class="btn-secondary">Version Comparison</a>
          </div>
          <div class="hero-stats">
            <div class="stat">
              <span class="stat-number" [appCountUp]="totalLessons()" [countDuration]="2000">0</span>
              <span class="stat-label">Lessons</span>
            </div>
            <div class="stat-divider"></div>
            <div class="stat">
              <span class="stat-number" [appCountUp]="3" [countDuration]="1500">0</span>
              <span class="stat-label">Languages</span>
            </div>
            <div class="stat-divider"></div>
            <div class="stat">
              <span class="stat-number" [appCountUp]="4" [countDuration]="1200">0</span>
              <span class="stat-label">Projects</span>
            </div>
          </div>
        </div>
        <div class="hero-visual">
          <div class="language-logos" @logoFloat>
            <div class="logo-card angular">
              <div class="logo-glow angular-glow"></div>
              <svg viewBox="0 0 250 250" xmlns="http://www.w3.org/2000/svg" class="angular-svg">
                <path fill="#DD0031" d="M125 30L31.9 63.2l14.2 123.1L125 230l78.9-43.7 14.2-123.1z"/>
                <path fill="#C3002F" d="M125 30v22.2-.1V230l78.9-43.7 14.2-123.1L125 30z"/>
                <path fill="#FFFFFF" d="M125 52.1L66.8 182.6h21.7l11.7-29.2h49.4l11.7 29.2H183L125 52.1zm17 83.3h-34l17-40.9 17 40.9z"/>
              </svg>
              <span>Angular</span>
            </div>
            <div class="logo-card javascript">
              <div class="logo-glow js-glow"></div>
              <span class="js-icon">JS</span>
              <span>JavaScript</span>
            </div>
            <div class="logo-card typescript">
              <div class="logo-glow ts-glow"></div>
              <span class="ts-icon">TS</span>
              <span>TypeScript</span>
            </div>
          </div>
          <!-- Floating code snippet decoration -->
          <div class="floating-code">
            <div class="code-line"><span class="kw">const</span> <span class="var">app</span> = <span class="fn">signal</span>(<span class="num">0</span>);</div>
            <div class="code-line"><span class="kw">const</span> <span class="var">double</span> = <span class="fn">computed</span>(() => <span class="var">app</span>() * <span class="num">2</span>);</div>
            <div class="code-line"><span class="fn">effect</span>(() => <span class="fn">console</span>.<span class="fn">log</span>(<span class="var">double</span>()));</div>
          </div>
        </div>
      </section>

      <!-- Progress Section -->
      <section class="progress-section" appScrollReveal="fadeInUp">
        <app-progress-tracker [totalLessons]="totalLessons()" />
      </section>

      <!-- Categories Section -->
      <section class="categories" @categoryStagger appScrollReveal="fadeInUp">
        <h2>Choose Your Path</h2>
        <div class="categories-grid">
          <a routerLink="/lessons/angular" class="category-card angular">
            <div class="category-icon-wrap">
              <span class="category-icon">🅰️</span>
              <div class="icon-ring"></div>
            </div>
            <h3>Angular</h3>
            <p>Master Angular 22 with {{ angularCount() }} comprehensive lessons</p>
            <div class="category-footer">
              <span class="category-count">{{ angularCount() }} lessons</span>
              <span class="category-arrow">→</span>
            </div>
          </a>
          <a routerLink="/lessons/javascript" class="category-card javascript">
            <div class="category-icon-wrap">
              <span class="category-icon">📜</span>
              <div class="icon-ring"></div>
            </div>
            <h3>JavaScript</h3>
            <p>Master JavaScript from fundamentals to advanced patterns</p>
            <div class="category-footer">
              <span class="category-count">{{ jsCount() }} lessons</span>
              <span class="category-arrow">→</span>
            </div>
          </a>
          <a routerLink="/lessons/typescript" class="category-card typescript">
            <div class="category-icon-wrap">
              <span class="category-icon">🔷</span>
              <div class="icon-ring"></div>
            </div>
            <h3>TypeScript</h3>
            <p>Master TypeScript from basics to type-level programming</p>
            <div class="category-footer">
              <span class="category-count">{{ tsCount() }} lessons</span>
              <span class="category-arrow">→</span>
            </div>
          </a>
        </div>
      </section>

      <!-- Features Section -->
      <section class="features" @featureStagger appScrollReveal="fadeInUp">
        <h2>What You'll Learn</h2>
        <div class="features-grid">
          <div class="feature-card">
            <div class="feature-icon-wrap">
              <span class="feature-icon">📦</span>
            </div>
            <h3>Components & Templates</h3>
            <p>Master Angular's building blocks with live examples</p>
          </div>
          <div class="feature-card">
            <div class="feature-icon-wrap">
              <span class="feature-icon">🔄</span>
            </div>
            <h3>Reactive Programming</h3>
            <p>Learn Signals, RxJS, and Zoneless architecture</p>
          </div>
          <div class="feature-card">
            <div class="feature-icon-wrap">
              <span class="feature-icon">📝</span>
            </div>
            <h3>Forms & Validation</h3>
            <p>Template-driven, Reactive, and Signal Forms</p>
          </div>
          <div class="feature-card">
            <div class="feature-icon-wrap">
              <span class="feature-icon">🌐</span>
            </div>
            <h3>HTTP & Data</h3>
            <p>HttpClient, Resource API, and Observables</p>
          </div>
          <div class="feature-card">
            <div class="feature-icon-wrap">
              <span class="feature-icon">🧭</span>
            </div>
            <h3>Routing</h3>
            <p>Navigation, guards, and lazy loading</p>
          </div>
          <div class="feature-card">
            <div class="feature-icon-wrap">
              <span class="feature-icon">⚡</span>
            </div>
            <h3>Performance</h3>
            <p>Optimization strategies and best practices</p>
          </div>
        </div>
      </section>

      <!-- Projects Section -->
      <section class="projects-preview" @projectStagger appScrollReveal="scaleIn">
        <h2>Practice Projects</h2>
        <div class="projects-grid">
          <a routerLink="/practice/todo" class="project-card">
            <div class="project-icon">✅</div>
            <h3>Todo App</h3>
            <span class="project-level beginner">Beginner</span>
            <p>Learn components, events, and basic state management</p>
            <div class="project-arrow">→</div>
          </a>
          <a routerLink="/practice/weather" class="project-card">
            <div class="project-icon">🌤️</div>
            <h3>Weather Dashboard</h3>
            <span class="project-level intermediate">Intermediate</span>
            <p>HTTP calls, services, and async data handling</p>
            <div class="project-arrow">→</div>
          </a>
          <a routerLink="/practice/ecommerce" class="project-card">
            <div class="project-icon">🛒</div>
            <h3>E-commerce</h3>
            <span class="project-level intermediate">Intermediate</span>
            <p>Routing, forms, and component communication</p>
            <div class="project-arrow">→</div>
          </a>
          <a routerLink="/practice/chat" class="project-card">
            <div class="project-icon">💬</div>
            <h3>Real-time Chat</h3>
            <span class="project-level advanced">Advanced</span>
            <p>Signals, WebSockets, and advanced patterns</p>
            <div class="project-arrow">→</div>
          </a>
        </div>
      </section>

      <!-- CTA Section -->
      <section class="angular-versions" appScrollReveal="scaleIn">
        <div class="cta-content">
          <h2>Angular Version Comparison</h2>
          <p>Compare features across Angular versions 14 through 22</p>
          <a routerLink="/version-comparison" class="btn-primary">
            <span>View Comparison</span>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M5 12h14M12 5l7 7-7 7"/>
            </svg>
          </a>
        </div>
      </section>
    </div>
  `,
  styles: [`
    .home-container {
      max-width: 1200px;
      margin: 0 auto;
      padding: 0 24px;
    }

    /* ─── Hero Section ─────────────────────────────── */
    .hero {
      display: flex;
      align-items: center;
      gap: 60px;
      padding: 60px 0 80px;
      min-height: 85vh;
    }
    .hero-content { flex: 1; }
    .hero-badge {
      display: inline-flex;
      align-items: center;
      gap: 8px;
      padding: 8px 16px;
      background: rgba(221, 0, 49, 0.08);
      border: 1px solid rgba(221, 0, 49, 0.15);
      border-radius: 100px;
      font-size: 13px;
      font-weight: 600;
      color: #dd0031;
      margin-bottom: 24px;
      animation: badgePulse 3s ease-in-out infinite;
    }
    @keyframes badgePulse {
      0%, 100% { box-shadow: 0 0 0 0 rgba(221, 0, 49, 0.1); }
      50% { box-shadow: 0 0 20px 4px rgba(221, 0, 49, 0.15); }
    }
    .badge-dot {
      width: 8px;
      height: 8px;
      background: #dd0031;
      border-radius: 50%;
      animation: dotPulse 2s ease-in-out infinite;
    }
    @keyframes dotPulse {
      0%, 100% { opacity: 1; transform: scale(1); }
      50% { opacity: 0.5; transform: scale(0.8); }
    }
    .hero-content h1 {
      font-size: 62px;
      line-height: 1.1;
      margin: 0 0 24px;
      color: var(--text-primary);
      letter-spacing: -1px;
    }
    .highlight {
      background: linear-gradient(135deg, #dd0031, #c3002f, #ff6b6b);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      background-clip: text;
      background-size: 200% 200%;
      animation: gradientShift 4s ease-in-out infinite;
    }
    @keyframes gradientShift {
      0%, 100% { background-position: 0% 50%; }
      50% { background-position: 100% 50%; }
    }
    .cursor-blink {
      display: inline-block;
      color: #dd0031;
      font-weight: 300;
      animation: blink 1s step-end infinite;
      margin-left: 2px;
    }
    @keyframes blink {
      0%, 100% { opacity: 1; }
      50% { opacity: 0; }
    }
    .hero-subtitle {
      font-size: 20px;
      color: var(--text-secondary);
      line-height: 1.7;
      margin: 0 0 36px;
      max-width: 520px;
    }
    .hero-actions {
      display: flex;
      gap: 16px;
      margin-bottom: 56px;
    }
    .btn-primary {
      display: inline-flex;
      align-items: center;
      gap: 10px;
      padding: 16px 32px;
      background: linear-gradient(135deg, #dd0031, #c3002f);
      color: white;
      text-decoration: none;
      border-radius: 12px;
      font-weight: 600;
      font-size: 17px;
      transition: all 0.3s cubic-bezier(0.35, 0, 0.25, 1);
      position: relative;
      overflow: hidden;
    }
    .btn-primary::before {
      content: '';
      position: absolute;
      top: 0;
      left: -100%;
      width: 100%;
      height: 100%;
      background: linear-gradient(90deg, transparent, rgba(255,255,255,0.2), transparent);
      transition: left 0.5s;
    }
    .btn-primary:hover::before { left: 100%; }
    .btn-primary:hover {
      transform: translateY(-3px);
      box-shadow: 0 12px 32px rgba(221, 0, 49, 0.35);
    }
    .btn-primary svg { transition: transform 0.3s; }
    .btn-primary:hover svg { transform: translateX(4px); }
    .btn-secondary {
      display: inline-flex;
      align-items: center;
      padding: 16px 32px;
      background: var(--bg-secondary);
      color: var(--text-primary);
      text-decoration: none;
      border-radius: 12px;
      font-weight: 600;
      font-size: 17px;
      border: 2px solid var(--border-color);
      transition: all 0.3s;
    }
    .btn-secondary:hover {
      border-color: #dd0031;
      color: #dd0031;
      transform: translateY(-2px);
    }
    .hero-stats {
      display: flex;
      gap: 32px;
      align-items: center;
    }
    .stat {
      display: flex;
      flex-direction: column;
      align-items: flex-start;
    }
    .stat-number {
      font-size: 44px;
      font-weight: 800;
      color: #dd0031;
      line-height: 1;
      font-variant-numeric: tabular-nums;
    }
    .stat-label {
      font-size: 13px;
      color: var(--text-secondary);
      text-transform: uppercase;
      letter-spacing: 0.5px;
      margin-top: 4px;
    }
    .stat-divider {
      width: 1px;
      height: 40px;
      background: var(--border-color);
    }

    /* ─── Hero Visual ──────────────────────────────── */
    .hero-visual {
      flex: 1;
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 32px;
    }
    .language-logos {
      display: flex;
      gap: 20px;
      align-items: center;
    }
    .logo-card {
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 12px;
      padding: 28px 24px;
      background: var(--bg-primary);
      border-radius: 20px;
      box-shadow: var(--shadow-md);
      transition: all 0.4s cubic-bezier(0.35, 0, 0.25, 1);
      position: relative;
      overflow: hidden;
      cursor: pointer;
    }
    .logo-card:hover {
      transform: translateY(-12px) scale(1.02);
      box-shadow: 0 20px 40px rgba(0,0,0,0.12);
    }
    .logo-glow {
      position: absolute;
      top: -50%;
      left: -50%;
      width: 200%;
      height: 200%;
      border-radius: 50%;
      opacity: 0;
      transition: opacity 0.4s;
      pointer-events: none;
    }
    .logo-card:hover .logo-glow { opacity: 1; }
    .angular-glow { background: radial-gradient(circle, rgba(221, 0, 49, 0.1) 0%, transparent 70%); }
    .js-glow { background: radial-gradient(circle, rgba(247, 223, 30, 0.15) 0%, transparent 70%); }
    .ts-glow { background: radial-gradient(circle, rgba(49, 120, 198, 0.15) 0%, transparent 70%); }
    .logo-card.angular svg { width: 72px; height: 72px; }
    .angular-svg { transition: transform 0.4s; }
    .logo-card.angular:hover .angular-svg { transform: rotate(5deg) scale(1.1); }
    .js-icon, .ts-icon {
      width: 72px;
      height: 72px;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 28px;
      font-weight: 800;
      border-radius: 16px;
      transition: transform 0.4s;
    }
    .logo-card:hover .js-icon,
    .logo-card:hover .ts-icon { transform: scale(1.1); }
    .js-icon { background: #f7df1e; color: #1a1a1a; }
    .ts-icon { background: #3178c6; color: white; }
    .logo-card span:last-child {
      font-weight: 600;
      color: var(--text-primary);
      font-size: 14px;
    }

    /* ─── Floating Code Snippet ────────────────────── */
    .floating-code {
      background: #1e1e1e;
      border-radius: 16px;
      padding: 20px 24px;
      font-family: 'SF Mono', 'Fira Code', monospace;
      font-size: 14px;
      line-height: 1.8;
      box-shadow: 0 20px 60px rgba(0,0,0,0.3);
      animation: floatCode 4s ease-in-out infinite;
      max-width: 380px;
      border: 1px solid #333;
    }
    @keyframes floatCode {
      0%, 100% { transform: translateY(0) rotate(0deg); }
      50% { transform: translateY(-8px) rotate(0.5deg); }
    }
    .code-line { color: #d4d4d4; }
    .kw { color: #569cd6; }
    .var { color: #4ec9b0; }
    .fn { color: #dcdcaa; }
    .num { color: #b5cea8; }

    /* ─── Categories ───────────────────────────────── */
    .categories, .features, .projects-preview {
      margin: 80px 0;
    }
    .categories h2, .features h2, .projects-preview h2 {
      text-align: center;
      font-size: 40px;
      margin-bottom: 56px;
      color: var(--text-primary);
      letter-spacing: -0.5px;
    }
    .categories-grid {
      display: grid;
      grid-template-columns: repeat(3, 1fr);
      gap: 28px;
    }
    .category-card {
      display: flex;
      flex-direction: column;
      align-items: center;
      padding: 44px 32px;
      background: var(--bg-primary);
      border-radius: 20px;
      box-shadow: var(--shadow-sm);
      text-decoration: none;
      text-align: center;
      transition: all 0.4s cubic-bezier(0.35, 0, 0.25, 1);
      border: 2px solid transparent;
      position: relative;
      overflow: hidden;
    }
    .category-card::before {
      content: '';
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      height: 4px;
      background: transparent;
      transition: background 0.3s;
    }
    .category-card:hover {
      transform: translateY(-8px);
      box-shadow: 0 20px 40px rgba(0,0,0,0.1);
    }
    .category-card.angular:hover { border-color: #dd0031; }
    .category-card.angular:hover::before { background: linear-gradient(90deg, #dd0031, #ff6b6b); }
    .category-card.javascript:hover { border-color: #f7df1e; }
    .category-card.javascript:hover::before { background: linear-gradient(90deg, #f7df1e, #ffd700); }
    .category-card.typescript:hover { border-color: #3178c6; }
    .category-card.typescript:hover::before { background: linear-gradient(90deg, #3178c6, #60a5fa); }
    .category-icon-wrap {
      position: relative;
      margin-bottom: 20px;
    }
    .icon-ring {
      position: absolute;
      top: -8px;
      left: -8px;
      right: -8px;
      bottom: -8px;
      border: 2px solid transparent;
      border-radius: 50%;
      transition: all 0.3s;
    }
    .category-card:hover .icon-ring {
      border-color: currentColor;
      opacity: 0.2;
      animation: ringPulse 1.5s ease-in-out infinite;
    }
    @keyframes ringPulse {
      0%, 100% { transform: scale(1); opacity: 0.2; }
      50% { transform: scale(1.1); opacity: 0.1; }
    }
    .category-icon { font-size: 56px; }
    .category-card h3 {
      margin: 0 0 12px;
      font-size: 24px;
      color: var(--text-primary);
    }
    .category-card p {
      margin: 0 0 20px;
      color: var(--text-secondary);
      line-height: 1.5;
    }
    .category-footer {
      display: flex;
      align-items: center;
      gap: 12px;
    }
    .category-count {
      padding: 8px 16px;
      background: var(--bg-secondary);
      border-radius: 20px;
      font-size: 13px;
      font-weight: 600;
      color: var(--text-primary);
    }
    .category-arrow {
      font-size: 18px;
      color: var(--text-secondary);
      transition: transform 0.3s;
    }
    .category-card:hover .category-arrow { transform: translateX(4px); }

    /* ─── Features ─────────────────────────────────── */
    .features-grid {
      display: grid;
      grid-template-columns: repeat(3, 1fr);
      gap: 24px;
    }
    .feature-card {
      background: var(--bg-primary);
      padding: 36px 28px;
      border-radius: 20px;
      box-shadow: var(--shadow-sm);
      transition: all 0.4s cubic-bezier(0.35, 0, 0.25, 1);
      position: relative;
      overflow: hidden;
    }
    .feature-card::after {
      content: '';
      position: absolute;
      bottom: 0;
      left: 0;
      right: 0;
      height: 3px;
      background: linear-gradient(90deg, #dd0031, #ff6b6b);
      transform: scaleX(0);
      transition: transform 0.3s;
    }
    .feature-card:hover {
      transform: translateY(-6px);
      box-shadow: 0 16px 32px rgba(0,0,0,0.1);
    }
    .feature-card:hover::after { transform: scaleX(1); }
    .feature-icon-wrap {
      width: 56px;
      height: 56px;
      display: flex;
      align-items: center;
      justify-content: center;
      background: var(--bg-secondary);
      border-radius: 14px;
      margin-bottom: 16px;
      transition: transform 0.3s;
    }
    .feature-card:hover .feature-icon-wrap { transform: scale(1.1) rotate(-5deg); }
    .feature-icon { font-size: 28px; }
    .feature-card h3 {
      margin: 0 0 8px;
      color: var(--text-primary);
      font-size: 18px;
    }
    .feature-card p {
      margin: 0;
      color: var(--text-secondary);
      line-height: 1.5;
      font-size: 14px;
    }

    /* ─── Projects ─────────────────────────────────── */
    .projects-grid {
      display: grid;
      grid-template-columns: repeat(4, 1fr);
      gap: 24px;
    }
    .project-card {
      background: var(--bg-primary);
      padding: 32px 24px;
      border-radius: 20px;
      box-shadow: var(--shadow-sm);
      text-decoration: none;
      text-align: center;
      transition: all 0.4s cubic-bezier(0.35, 0, 0.25, 1);
      position: relative;
      overflow: hidden;
    }
    .project-card:hover {
      transform: translateY(-8px);
      box-shadow: 0 20px 40px rgba(0,0,0,0.1);
    }
    .project-icon {
      font-size: 56px;
      margin-bottom: 16px;
      display: block;
      transition: transform 0.4s;
    }
    .project-card:hover .project-icon { transform: scale(1.15) rotate(-5deg); }
    .project-card h3 {
      margin: 0 0 12px;
      color: var(--text-primary);
      font-size: 18px;
    }
    .project-level {
      display: inline-block;
      padding: 4px 14px;
      border-radius: 100px;
      font-size: 11px;
      font-weight: 700;
      text-transform: uppercase;
      letter-spacing: 0.5px;
    }
    .project-level.beginner { background: #dcfce7; color: #166534; }
    .project-level.intermediate { background: #fef3c7; color: #92400e; }
    .project-level.advanced { background: #fee2e2; color: #991b1b; }
    .project-card p {
      margin: 16px 0 0;
      color: var(--text-secondary);
      font-size: 13px;
      line-height: 1.5;
    }
    .project-arrow {
      position: absolute;
      bottom: 16px;
      right: 16px;
      font-size: 18px;
      color: var(--text-secondary);
      transition: all 0.3s;
      opacity: 0;
      transform: translateX(-8px);
    }
    .project-card:hover .project-arrow {
      opacity: 1;
      transform: translateX(0);
    }

    /* ─── CTA Section ──────────────────────────────── */
    .angular-versions {
      text-align: center;
      background: linear-gradient(135deg, var(--bg-secondary) 0%, var(--bg-primary) 100%);
      padding: 80px 60px;
      border-radius: 28px;
      margin-bottom: 80px;
      position: relative;
      overflow: hidden;
    }
    .angular-versions::before {
      content: '';
      position: absolute;
      top: -50%;
      right: -20%;
      width: 400px;
      height: 400px;
      background: radial-gradient(circle, rgba(221, 0, 49, 0.05) 0%, transparent 70%);
      border-radius: 50%;
    }
    .cta-content { position: relative; z-index: 1; }
    .angular-versions h2 {
      font-size: 40px;
      margin: 0 0 16px;
      color: var(--text-primary);
    }
    .angular-versions p {
      color: var(--text-secondary);
      font-size: 18px;
      margin-bottom: 32px;
    }

    /* ─── Progress ─────────────────────────────────── */
    .progress-section {
      margin: 40px 0;
    }

    /* ─── Responsive ───────────────────────────────── */
    @media (max-width: 1024px) {
      .hero { flex-direction: column; text-align: center; min-height: auto; padding: 40px 0 60px; }
      .hero-subtitle { margin: 0 auto 36px; }
      .hero-actions { justify-content: center; }
      .hero-stats { justify-content: center; }
      .hero-visual { margin-top: 40px; }
      .categories-grid { grid-template-columns: repeat(2, 1fr); }
      .features-grid { grid-template-columns: repeat(2, 1fr); }
      .projects-grid { grid-template-columns: repeat(2, 1fr); }
    }
    @media (max-width: 768px) {
      .hero-content h1 { font-size: 40px; }
      .stat-number { font-size: 36px; }
      .categories-grid, .features-grid { grid-template-columns: 1fr; }
      .projects-grid { grid-template-columns: 1fr 1fr; }
      .language-logos { flex-direction: column; gap: 16px; }
      .floating-code { display: none; }
      .angular-versions { padding: 48px 24px; }
    }

    /* ─── Dark Theme ───────────────────────────────── */
    :host-context(.dark-theme) {
      .hero-content h1, .category-card h3, .feature-card h3, .project-card h3,
      .categories h2, .features h2, .projects-preview h2, .angular-versions h2 { color: #fff; }
      .hero-subtitle, .feature-card p, .project-card p { color: #aaa; }
      .logo-card, .feature-card, .project-card, .category-card { background: #1e1e1e; }
      .category-count { background: #333; color: #fff; }
      .btn-secondary { background: #2a2a2a; border-color: #444; color: #fff; }
      .angular-versions { background: linear-gradient(135deg, #1a1a1a 0%, #222 100%); }
      .floating-code { border-color: #444; }
      .project-level.beginner { background: rgba(22, 101, 52, 0.2); color: #4ade80; }
      .project-level.intermediate { background: rgba(146, 64, 14, 0.2); color: #fbbf24; }
      .project-level.advanced { background: rgba(153, 27, 27, 0.2); color: #f87171; }
    }
  `]
})
export class HomeComponent {
  private lessonService = inject(LessonService);

  totalLessons = () => this.lessonService.getLessonCount();
  angularCount = () => this.lessonService.getLessonCountByCategory('angular');
  jsCount = () => this.lessonService.getLessonCountByCategory('javascript');
  tsCount = () => this.lessonService.getLessonCountByCategory('typescript');
}
