import { Component, inject } from '@angular/core';
import { ThemeService } from '../../../core/services/theme.service';
import { SearchService } from '../../../core/services/search.service';

@Component({
  selector: 'app-header',
  standalone: true,
  template: `
    <header class="header">
      <div class="header-left">
        <button class="menu-btn" (click)="toggleMobileMenu()">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <line x1="3" y1="12" x2="21" y2="12"/>
            <line x1="3" y1="6" x2="21" y2="6"/>
            <line x1="3" y1="18" x2="21" y2="18"/>
          </svg>
        </button>
        <span class="breadcrumb-text">Angular Mastery</span>
      </div>

      <div class="header-center">
        <button class="search-trigger" (click)="openSearch()">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <circle cx="11" cy="11" r="8"/>
            <path d="m21 21-4.35-4.35"/>
          </svg>
          <span>Search...</span>
          <kbd>⌘K</kbd>
        </button>
      </div>

      <div class="header-right">
        <button class="icon-btn" (click)="toggleTheme()" [title]="themeService.theme() === 'light' ? 'Dark Mode' : 'Light Mode'">
          @if (themeService.theme() === 'light') {
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/>
            </svg>
          } @else {
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <circle cx="12" cy="12" r="5"/>
              <line x1="12" y1="1" x2="12" y2="3"/>
              <line x1="12" y1="21" x2="12" y2="23"/>
              <line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/>
              <line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/>
              <line x1="1" y1="12" x2="3" y2="12"/>
              <line x1="21" y1="12" x2="23" y2="12"/>
              <line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/>
              <line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/>
            </svg>
          }
        </button>

        <a href="https://github.com/angular/angular" target="_blank" class="icon-btn" title="GitHub">
          <svg viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
          </svg>
        </a>

        <a href="https://angular.dev" target="_blank" class="icon-btn" title="Angular Docs">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/>
            <polyline points="15,3 21,3 21,9"/>
            <line x1="10" y1="14" x2="21" y2="3"/>
          </svg>
        </a>
      </div>
    </header>
  `,
  styles: [`
    .header {
      height: 56px;
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 0 16px;
      background: var(--bg-header);
      border-bottom: 1px solid var(--border-color);
      position: sticky;
      top: 0;
      z-index: 40;
    }
    .header-left {
      display: flex;
      align-items: center;
      gap: 12px;
    }
    .menu-btn {
      display: none;
      width: 36px;
      height: 36px;
      align-items: center;
      justify-content: center;
      background: transparent;
      border: none;
      border-radius: 8px;
      cursor: pointer;
      color: var(--text-secondary);
    }
    .menu-btn:hover {
      background: var(--bg-secondary);
    }
    .menu-btn svg {
      width: 20px;
      height: 20px;
    }
    .breadcrumb-text {
      font-weight: 600;
      color: var(--text-primary);
    }
    .header-center {
      flex: 1;
      max-width: 480px;
      margin: 0 24px;
    }
    .search-trigger {
      width: 100%;
      display: flex;
      align-items: center;
      gap: 10px;
      padding: 8px 14px;
      background: var(--bg-secondary);
      border: 1px solid var(--border-color);
      border-radius: 10px;
      cursor: pointer;
      color: var(--text-secondary);
      font-size: 14px;
      transition: all 0.2s;
    }
    .search-trigger:hover {
      border-color: var(--accent);
      box-shadow: 0 0 0 3px var(--accent-light);
    }
    .search-trigger svg {
      width: 16px;
      height: 16px;
      flex-shrink: 0;
    }
    .search-trigger span {
      flex: 1;
      text-align: left;
    }
    .search-trigger kbd {
      background: var(--bg-primary);
      border: 1px solid var(--border-color);
      padding: 2px 8px;
      border-radius: 4px;
      font-size: 12px;
      font-family: monospace;
    }
    .header-right {
      display: flex;
      align-items: center;
      gap: 8px;
    }
    .icon-btn {
      width: 36px;
      height: 36px;
      display: flex;
      align-items: center;
      justify-content: center;
      background: transparent;
      border: 1px solid transparent;
      border-radius: 8px;
      cursor: pointer;
      color: var(--text-secondary);
      text-decoration: none;
      transition: all 0.2s;
    }
    .icon-btn:hover {
      background: var(--bg-secondary);
      border-color: var(--border-color);
      color: var(--text-primary);
    }
    .icon-btn svg {
      width: 18px;
      height: 18px;
    }

    @media (max-width: 768px) {
      .menu-btn { display: flex; }
      .header-center { display: none; }
    }
  `]
})
export class HeaderComponent {
  themeService = inject(ThemeService);
  searchService = inject(SearchService);

  toggleTheme(): void {
    this.themeService.toggleTheme();
  }

  openSearch(): void {
    this.searchService.openSearch();
  }

  toggleMobileMenu(): void {
    // Will be connected to sidebar
  }
}
