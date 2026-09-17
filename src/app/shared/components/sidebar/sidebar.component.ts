import { Component, inject, signal, computed } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { ThemeService } from '../../../core/services/theme.service';
import { SearchService } from '../../../core/services/search.service';
import { ProgressService } from '../../../core/services/progress.service';
import { LessonService } from '../../../core/services/lesson.service';
import { MobileMenuService } from '../../../core/services/mobile-menu.service';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [RouterLink, RouterLinkActive],
  template: `
    <aside class="sidebar" [class.collapsed]="isCollapsed()" [class.mobile-open]="mobileMenuService.isOpen()">
      <div class="sidebar-header">
        <a routerLink="/" class="brand" (click)="closeMobileMenu()">
          <span class="brand-icon">🅰️</span>
          @if (!isCollapsed()) {
            <span class="brand-text">Angular Mastery</span>
          }
        </a>
        <button class="toggle-btn" (click)="toggleSidebar()">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" [style.transform]="isCollapsed() ? 'rotate(180deg)' : ''">
            <path d="M15 18l-6-6 6-6"/>
          </svg>
        </button>
      </div>

      <nav class="sidebar-nav">
        <div class="nav-section">
          <a routerLink="/" routerLinkActive="active" [routerLinkActiveOptions]="{exact: true}" class="nav-item" (click)="closeMobileMenu()">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9,22 9,12 15,12 15,22"/></svg>
            @if (!isCollapsed()) { <span>Home</span> }
          </a>
        </div>

        <div class="nav-section">
          <span class="nav-label">FRAMEWORKS</span>
          <a routerLink="/lessons/angular" routerLinkActive="active" class="nav-item" (click)="closeMobileMenu()">
            <span class="nav-emoji">🅰️</span>
            @if (!isCollapsed()) { <span>Angular</span> }
          </a>
          <a routerLink="/lessons/javascript" routerLinkActive="active" class="nav-item" (click)="closeMobileMenu()">
            <span class="nav-emoji">📜</span>
            @if (!isCollapsed()) { <span>JavaScript</span> }
          </a>
          <a routerLink="/lessons/typescript" routerLinkActive="active" class="nav-item" (click)="closeMobileMenu()">
            <span class="nav-emoji">🔷</span>
            @if (!isCollapsed()) { <span>TypeScript</span> }
          </a>
          <a routerLink="/lessons/react" routerLinkActive="active" class="nav-item" (click)="closeMobileMenu()">
            <span class="nav-emoji">⚛️</span>
            @if (!isCollapsed()) { <span>React</span> }
          </a>
          <a routerLink="/lessons/vue" routerLinkActive="active" class="nav-item" (click)="closeMobileMenu()">
            <span class="nav-emoji">💚</span>
            @if (!isCollapsed()) { <span>Vue</span> }
          </a>
          <a routerLink="/lessons/html-css" routerLinkActive="active" class="nav-item" (click)="closeMobileMenu()">
            <span class="nav-emoji">🎨</span>
            @if (!isCollapsed()) { <span>HTML & CSS</span> }
          </a>
        </div>

        <div class="nav-section">
          <span class="nav-label">SENIOR ENGINEER</span>
          <a routerLink="/lessons/system-design" routerLinkActive="active" class="nav-item" (click)="closeMobileMenu()">
            <span class="nav-emoji">🏗️</span>
            @if (!isCollapsed()) { <span>System Design</span> }
          </a>
          <a routerLink="/lessons/database" routerLinkActive="active" class="nav-item" (click)="closeMobileMenu()">
            <span class="nav-emoji">🗄️</span>
            @if (!isCollapsed()) { <span>Databases</span> }
          </a>
          <a routerLink="/lessons/networking" routerLinkActive="active" class="nav-item" (click)="closeMobileMenu()">
            <span class="nav-emoji">🌐</span>
            @if (!isCollapsed()) { <span>Networking & APIs</span> }
          </a>
          <a routerLink="/lessons/browser" routerLinkActive="active" class="nav-item" (click)="closeMobileMenu()">
            <span class="nav-emoji">🌍</span>
            @if (!isCollapsed()) { <span>Browser Internals</span> }
          </a>
          <a routerLink="/lessons/design-systems" routerLinkActive="active" class="nav-item" (click)="closeMobileMenu()">
            <span class="nav-emoji">🎯</span>
            @if (!isCollapsed()) { <span>Design Systems</span> }
          </a>
          <a routerLink="/lessons/dsa-frontend" routerLinkActive="active" class="nav-item" (click)="closeMobileMenu()">
            <span class="nav-emoji">🧮</span>
            @if (!isCollapsed()) { <span>DSA for Frontend</span> }
          </a>
          <a routerLink="/lessons/soft-skills" routerLinkActive="active" class="nav-item" (click)="closeMobileMenu()">
            <span class="nav-emoji">🤝</span>
            @if (!isCollapsed()) { <span>Soft Skills</span> }
          </a>
        </div>

        <div class="nav-section">
          <span class="nav-label">TOOLING & QUALITY</span>
          <a routerLink="/lessons/performance" routerLinkActive="active" class="nav-item" (click)="closeMobileMenu()">
            <span class="nav-emoji">⚡</span>
            @if (!isCollapsed()) { <span>Performance</span> }
          </a>
          <a routerLink="/lessons/testing" routerLinkActive="active" class="nav-item" (click)="closeMobileMenu()">
            <span class="nav-emoji">🧪</span>
            @if (!isCollapsed()) { <span>Testing</span> }
          </a>
          <a routerLink="/lessons/tooling" routerLinkActive="active" class="nav-item" (click)="closeMobileMenu()">
            <span class="nav-emoji">🔧</span>
            @if (!isCollapsed()) { <span>Tooling & DevOps</span> }
          </a>
          <a routerLink="/lessons" routerLinkActive="active" class="nav-item" (click)="closeMobileMenu()">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"/><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"/></svg>
            @if (!isCollapsed()) { <span>All Lessons</span> }
          </a>
          <a routerLink="/lessons/security" routerLinkActive="active" class="nav-item" (click)="closeMobileMenu()">
            <span class="nav-emoji">🔒</span>
            @if (!isCollapsed()) { <span>Security</span> }
          </a>
        </div>

        <div class="nav-section">
          <span class="nav-label">RESOURCES</span>
          <a routerLink="/knowledge-base" routerLinkActive="active" class="nav-item" (click)="closeMobileMenu()">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/></svg>
            @if (!isCollapsed()) { <span>Knowledge Base</span> }
          </a>
          <a routerLink="/version-comparison" routerLinkActive="active" class="nav-item" (click)="closeMobileMenu()">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 20V10"/><path d="M18 20V4"/><path d="M6 20v-4"/></svg>
            @if (!isCollapsed()) { <span>Version Comparison</span> }
          </a>
          <a routerLink="/visuals" routerLinkActive="active" class="nav-item" (click)="closeMobileMenu()">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="3" width="18" height="18" rx="2"/><circle cx="8.5" cy="8.5" r="1.5"/><polyline points="21,15 16,10 5,21"/></svg>
            @if (!isCollapsed()) { <span>Visual Learning</span> }
          </a>
        </div>

        <div class="nav-section">
          <span class="nav-label">PRACTICE PROJECTS</span>
          <a routerLink="/practice/todo" routerLinkActive="active" class="nav-item" (click)="closeMobileMenu()">
            <span class="nav-emoji">✅</span>
            @if (!isCollapsed()) { <span>Todo App</span> }
          </a>
          <a routerLink="/practice/weather" routerLinkActive="active" class="nav-item" (click)="closeMobileMenu()">
            <span class="nav-emoji">🌤️</span>
            @if (!isCollapsed()) { <span>Weather Dashboard</span> }
          </a>
          <a routerLink="/practice/ecommerce" routerLinkActive="active" class="nav-item" (click)="closeMobileMenu()">
            <span class="nav-emoji">🛒</span>
            @if (!isCollapsed()) { <span>E-commerce</span> }
          </a>
          <a routerLink="/practice/chat" routerLinkActive="active" class="nav-item" (click)="closeMobileMenu()">
            <span class="nav-emoji">💬</span>
            @if (!isCollapsed()) { <span>Real-time Chat</span> }
          </a>
        </div>

        @if (!isCollapsed()) {
          <div class="nav-section">
            <span class="nav-label">PROGRESS</span>
            <div class="progress-widget">
              <div class="progress-ring">
                <svg viewBox="0 0 36 36">
                  <path class="progress-ring-bg"
                    d="M18 2.0845
                      a 15.9155 15.9155 0 0 1 0 31.831
                      a 15.9155 15.9155 0 0 1 0 -31.831"
                    fill="none"
                    stroke="currentColor"
                    stroke-width="3"/>
                  <path class="progress-ring-fill"
                    d="M18 2.0845
                      a 15.9155 15.9155 0 0 1 0 31.831
                      a 15.9155 15.9155 0 0 1 0 -31.831"
                    fill="none"
                    stroke="currentColor"
                    stroke-width="3"
                    [attr.stroke-dasharray]="progressService.percentage() + ', 100'"/>
                </svg>
                <span class="progress-text">{{ progressService.percentage() }}%</span>
              </div>
              <div class="progress-info">
                <span class="progress-label">Completed</span>
                <span class="progress-detail">{{ progressService.completedCount() }}/{{ totalLessons() }} lessons</span>
              </div>
            </div>
          </div>
        }
      </nav>
    </aside>
  `,
  styles: [`
    .sidebar {
      width: 260px;
      height: 100vh;
      background: var(--bg-sidebar);
      border-right: 1px solid var(--border-color);
      display: flex;
      flex-direction: column;
      position: fixed;
      left: 0;
      top: 0;
      z-index: 50;
      transition: width 0.3s cubic-bezier(0.4, 0, 0.2, 1);
    }
    .sidebar.collapsed {
      width: 72px;
    }
    .sidebar-header {
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 16px;
      border-bottom: 1px solid var(--border-color);
    }
    .brand {
      display: flex;
      align-items: center;
      gap: 12px;
      text-decoration: none;
      color: var(--text-primary);
    }
    .brand-icon {
      font-size: 28px;
      flex-shrink: 0;
    }
    .brand-text {
      font-size: 16px;
      font-weight: 700;
      white-space: nowrap;
    }
    .toggle-btn {
      width: 32px;
      height: 32px;
      display: flex;
      align-items: center;
      justify-content: center;
      background: transparent;
      border: 1px solid var(--border-color);
      border-radius: 8px;
      cursor: pointer;
      color: var(--text-secondary);
      transition: all 0.2s;
    }
    .toggle-btn:hover {
      background: var(--bg-secondary);
      color: var(--text-primary);
    }
    .toggle-btn svg {
      width: 16px;
      height: 16px;
      transition: transform 0.3s;
    }
    .sidebar-nav {
      flex: 1;
      overflow-y: auto;
      padding: 12px 8px;
    }
    .nav-section {
      margin-bottom: 24px;
    }
    .nav-label {
      display: block;
      padding: 8px 12px;
      font-size: 11px;
      font-weight: 600;
      color: var(--text-secondary);
      text-transform: uppercase;
      letter-spacing: 0.5px;
    }
    .nav-item {
      display: flex;
      align-items: center;
      gap: 12px;
      padding: 10px 12px;
      border-radius: 8px;
      color: var(--text-secondary);
      text-decoration: none;
      font-size: 14px;
      font-weight: 500;
      transition: all 0.15s;
      white-space: nowrap;
    }
    .nav-item:hover {
      background: var(--bg-secondary);
      color: var(--text-primary);
    }
    .nav-item.active {
      background: var(--accent-light);
      color: var(--accent);
    }
    .nav-item svg {
      width: 20px;
      height: 20px;
      flex-shrink: 0;
    }
    .nav-emoji {
      font-size: 18px;
      width: 20px;
      text-align: center;
    }
    .progress-widget {
      display: flex;
      align-items: center;
      gap: 12px;
      padding: 12px;
      margin: 0 8px;
      background: var(--bg-secondary);
      border-radius: 12px;
    }
    .progress-ring {
      position: relative;
      width: 48px;
      height: 48px;
      flex-shrink: 0;
    }
    .progress-ring svg {
      transform: rotate(-90deg);
    }
    .progress-ring-bg {
      color: var(--border-color);
    }
    .progress-ring-fill {
      color: var(--accent);
      stroke-linecap: round;
      transition: stroke-dasharray 0.3s;
    }
    .progress-text {
      position: absolute;
      inset: 0;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 12px;
      font-weight: 700;
      color: var(--accent);
    }
    .progress-info {
      min-width: 0;
    }
    .progress-label {
      display: block;
      font-size: 13px;
      font-weight: 600;
      color: var(--text-primary);
    }
    .progress-detail {
      display: block;
      font-size: 12px;
      color: var(--text-secondary);
    }

    @media (max-width: 1024px) {
      .sidebar {
        transform: translateX(-100%);
      }
      .sidebar.mobile-open {
        transform: translateX(0);
        box-shadow: 0 0 40px rgba(0,0,0,0.2);
      }
    }
  `]
})
export class SidebarComponent {
  themeService = inject(ThemeService);
  searchService = inject(SearchService);
  progressService = inject(ProgressService);
  private lessonService = inject(LessonService);
  mobileMenuService = inject(MobileMenuService);

  isCollapsed = signal(false);
  totalLessons = signal(0);

  constructor() {
    this.totalLessons.set(this.lessonService.getLessonCount());
  }

  toggleSidebar(): void {
    this.isCollapsed.update(v => !v);
  }

  closeMobileMenu(): void {
    this.mobileMenuService.close();
  }
}
