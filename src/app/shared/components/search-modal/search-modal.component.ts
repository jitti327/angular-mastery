import { Component, inject, ElementRef, ViewChild, effect, HostListener } from '@angular/core';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { SearchService } from '../../../core/services/search.service';

@Component({
  selector: 'app-search-modal',
  standalone: true,
  imports: [FormsModule],
  template: `
    @if (searchService.isSearchOpen()) {
      <div class="search-overlay" (click)="closeSearch()">
        <div class="search-modal" (click)="$event.stopPropagation()">
          <div class="search-header">
            <svg class="search-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <circle cx="11" cy="11" r="8"/>
              <path d="m21 21-4.35-4.35"/>
            </svg>
            <input
              #searchInput
              type="text"
              placeholder="Search lessons, projects, concepts..."
              [ngModel]="searchService.searchQuery()"
              (ngModelChange)="onSearch($event)"
              class="search-input"
            />
            <button class="close-btn" (click)="closeSearch()">
              <kbd>ESC</kbd>
            </button>
          </div>

          <div class="search-results">
            @if (searchService.searchResults().length === 0 && searchService.searchQuery()) {
              <div class="no-results">
                <span class="no-results-icon">🔍</span>
                <p>No results found for "{{ searchService.searchQuery() }}"</p>
                <p class="no-results-hint">Try different keywords or check spelling</p>
              </div>
            }

            @if (searchService.searchResults().length > 0) {
              <div class="results-section">
                <span class="results-count">{{ searchService.searchResults().length }} results</span>
                @for (result of searchService.searchResults(); track result.id) {
                  <a [href]="result.path" class="result-item" (click)="navigateTo(result.path)">
                    <span class="result-type" [class]="result.type">
                      {{ result.type === 'lesson' ? '📚' : '🛠️' }}
                    </span>
                    <div class="result-content">
                      <span class="result-title">{{ result.title }}</span>
                      <span class="result-description">{{ result.description }}</span>
                    </div>
                    <span class="result-arrow">→</span>
                  </a>
                }
              </div>
            }

            @if (!searchService.searchQuery()) {
              <div class="search-hints">
                <p class="hint-title">Quick Links</p>
                <a routerLink="/lesson/1" class="hint-item" (click)="closeSearch()">
                  <span>📖</span> Start with Lesson 1
                </a>
                <a routerLink="/version-comparison" class="hint-item" (click)="closeSearch()">
                  <span>🔄</span> Version Comparison
                </a>
                <a routerLink="/practice/todo" class="hint-item" (click)="closeSearch()">
                  <span>✅</span> Todo Practice Project
                </a>
              </div>
            }
          </div>

          <div class="search-footer">
            <span><kbd>↑↓</kbd> Navigate</span>
            <span><kbd>↵</kbd> Select</span>
            <span><kbd>ESC</kbd> Close</span>
          </div>
        </div>
      </div>
    }
  `,
  styles: [`
    .search-overlay {
      position: fixed;
      inset: 0;
      background: rgba(0, 0, 0, 0.5);
      backdrop-filter: blur(4px);
      z-index: 1000;
      display: flex;
      align-items: flex-start;
      justify-content: center;
      padding-top: 10vh;
      animation: fadeIn 0.15s ease-out;
    }
    @keyframes fadeIn {
      from { opacity: 0; }
      to { opacity: 1; }
    }
    .search-modal {
      width: 100%;
      max-width: 640px;
      background: var(--bg-primary);
      border-radius: 16px;
      box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.25);
      overflow: hidden;
      animation: slideDown 0.2s ease-out;
    }
    @keyframes slideDown {
      from { opacity: 0; transform: translateY(-10px) scale(0.98); }
      to { opacity: 1; transform: translateY(0) scale(1); }
    }
    .search-header {
      display: flex;
      align-items: center;
      padding: 16px 20px;
      border-bottom: 1px solid var(--border-color);
      gap: 12px;
    }
    .search-icon {
      width: 20px;
      height: 20px;
      color: var(--text-secondary);
      flex-shrink: 0;
    }
    .search-input {
      flex: 1;
      border: none;
      background: transparent;
      font-size: 18px;
      color: var(--text-primary);
      outline: none;
    }
    .search-input::placeholder {
      color: var(--text-secondary);
    }
    .close-btn {
      background: var(--bg-secondary);
      border: 1px solid var(--border-color);
      padding: 4px 8px;
      border-radius: 6px;
      cursor: pointer;
    }
    kbd {
      background: var(--bg-secondary);
      border: 1px solid var(--border-color);
      padding: 2px 6px;
      border-radius: 4px;
      font-size: 12px;
      font-family: monospace;
      color: var(--text-secondary);
    }
    .search-results {
      max-height: 400px;
      overflow-y: auto;
      padding: 8px;
    }
    .no-results {
      text-align: center;
      padding: 40px 20px;
      color: var(--text-secondary);
    }
    .no-results-icon {
      font-size: 48px;
      display: block;
      margin-bottom: 12px;
    }
    .no-results p { margin: 4px 0; }
    .no-results-hint { font-size: 14px; opacity: 0.7; }
    .results-section { padding: 4px 0; }
    .results-count {
      display: block;
      padding: 8px 12px;
      font-size: 12px;
      color: var(--text-secondary);
      text-transform: uppercase;
      letter-spacing: 0.5px;
    }
    .result-item {
      display: flex;
      align-items: center;
      gap: 12px;
      padding: 12px;
      border-radius: 8px;
      cursor: pointer;
      transition: background 0.15s;
      text-decoration: none;
      color: inherit;
    }
    .result-item:hover {
      background: var(--bg-secondary);
    }
    .result-type {
      width: 36px;
      height: 36px;
      display: flex;
      align-items: center;
      justify-content: center;
      background: var(--bg-secondary);
      border-radius: 8px;
      font-size: 18px;
    }
    .result-content {
      flex: 1;
      min-width: 0;
    }
    .result-title {
      display: block;
      font-weight: 600;
      color: var(--text-primary);
      margin-bottom: 2px;
    }
    .result-description {
      display: block;
      font-size: 14px;
      color: var(--text-secondary);
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }
    .result-arrow {
      color: var(--text-secondary);
      opacity: 0;
      transition: opacity 0.15s;
    }
    .result-item:hover .result-arrow { opacity: 1; }
    .search-hints {
      padding: 12px;
    }
    .hint-title {
      font-size: 12px;
      color: var(--text-secondary);
      text-transform: uppercase;
      letter-spacing: 0.5px;
      margin-bottom: 8px;
    }
    .hint-item {
      display: flex;
      align-items: center;
      gap: 12px;
      padding: 10px 12px;
      border-radius: 8px;
      color: var(--text-primary);
      text-decoration: none;
      transition: background 0.15s;
    }
    .hint-item:hover { background: var(--bg-secondary); }
    .search-footer {
      display: flex;
      gap: 16px;
      padding: 12px 20px;
      border-top: 1px solid var(--border-color);
      font-size: 13px;
      color: var(--text-secondary);
    }
    .search-footer span {
      display: flex;
      align-items: center;
      gap: 6px;
    }
  `]
})
export class SearchModalComponent {
  searchService = inject(SearchService);
  private router = inject(Router);

  @ViewChild('searchInput') searchInput!: ElementRef<HTMLInputElement>;

  constructor() {
    effect(() => {
      if (this.searchService.isSearchOpen()) {
        setTimeout(() => this.searchInput?.nativeElement.focus(), 50);
      }
    });
  }

  onSearch(query: string): void {
    this.searchService.searchQuery.set(query);
    this.searchService.searchResults.set(this.searchService.search(query));
  }

  navigateTo(path: string): void {
    this.router.navigateByUrl(path);
    this.closeSearch();
  }

  closeSearch(): void {
    this.searchService.closeSearch();
  }

  @HostListener('document:keydown.escape')
  onEscape(): void {
    this.closeSearch();
  }
}
