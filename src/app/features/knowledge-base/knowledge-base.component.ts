import { Component, inject, signal, computed } from '@angular/core';
import { RouterLink } from '@angular/router';
import { KnowledgeBaseService, SearchResult, KnowledgeNode } from '../../core/services/knowledge-base.service';
import { LessonCategory } from '../../core/services/lesson.service';
import { Lesson } from '../../core/models/lesson.model';

@Component({
  selector: 'app-knowledge-base',
  standalone: true,
  imports: [RouterLink],
  template: `
    <div class="kb-page">
      <header class="kb-header">
        <h1>Knowledge Base</h1>
        <p>Explore {{ stats().totalLessons }} lessons across {{ stats().totalCategories }} categories</p>
      </header>

      <div class="kb-search">
        <div class="search-box">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" class="search-icon">
            <circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/>
          </svg>
          <input
            type="text"
            placeholder="Search lessons, concepts, tags..."
            [value]="searchQuery()"
            (input)="onSearch($event)"
            class="search-input"
          />
          @if (searchQuery()) {
            <button class="clear-btn" (click)="clearSearch()">&times;</button>
          }
        </div>
      </div>

      @if (searchQuery()) {
        <div class="search-results">
          <h2>{{ searchResults().length }} results for "{{ searchQuery() }}"</h2>
          @for (result of searchResults(); track result.lesson.id) {
            <a [routerLink]="['/lesson', result.lesson.id]" class="result-card">
              <div class="result-score">{{ result.score }}pts</div>
              <div class="result-info">
                <h3>{{ result.lesson.title }}</h3>
                <p>{{ result.lesson.description }}</p>
                <div class="result-meta">
                  <span class="match-type" [class]="result.matchType">{{ result.matchType }}</span>
                  <span class="level-badge" [class]="result.lesson.level">{{ result.lesson.level }}</span>
                </div>
              </div>
            </a>
          }
        </div>
      } @else {
        <div class="kb-stats">
          <div class="stat-card">
            <span class="stat-number">{{ stats().byLevel['beginner'] }}</span>
            <span class="stat-label">Beginner</span>
          </div>
          <div class="stat-card">
            <span class="stat-number">{{ stats().byLevel['intermediate'] }}</span>
            <span class="stat-label">Intermediate</span>
          </div>
          <div class="stat-card">
            <span class="stat-number">{{ stats().byLevel['advanced'] }}</span>
            <span class="stat-label">Advanced</span>
          </div>
        </div>

        <div class="kb-tags">
          <h2>Popular Topics</h2>
          <div class="tag-cloud">
            @for (tag of topTags(); track tag) {
              <button class="tag-btn" (click)="searchByTag(tag)">{{ tag }}</button>
            }
          </div>
        </div>

        <div class="kb-categories">
          <h2>Browse by Category</h2>
          <div class="category-grid">
            @for (cat of categories; track cat.id) {
              <a [routerLink]="['/lessons', cat.id]" class="category-card" [style.border-left-color]="cat.color">
                <span class="cat-icon">{{ cat.icon }}</span>
                <div class="cat-info">
                  <h3>{{ cat.label }}</h3>
                  <span class="cat-count">{{ getCategoryCount(cat.id) }} lessons</span>
                </div>
              </a>
            }
          </div>
        </div>

        @if (selectedCategory()) {
          <div class="learning-path">
            <h2>Learning Path: {{ selectedCategory() }}</h2>
            <div class="path-timeline">
              @for (node of learningPath(); track node.id) {
                <a [routerLink]="['/lesson', node.id]" class="path-node" [class]="node.level">
                  <div class="node-dot"></div>
                  <div class="node-content">
                    <span class="node-level">{{ node.level }}</span>
                    <h4>{{ node.title }}</h4>
                    <span class="node-difficulty">Difficulty: {{ node.difficulty }}/10</span>
                  </div>
                </a>
              }
            </div>
          </div>
        }
      }
    </div>
  `,
  styles: [`
    .kb-page {
      max-width: 1000px;
      margin: 0 auto;
      padding: 32px 24px;
    }
    .kb-header {
      text-align: center;
      margin-bottom: 40px;
    }
    .kb-header h1 {
      font-size: 36px;
      margin: 0 0 8px;
      background: linear-gradient(135deg, #667eea, #764ba2);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
    }
    .kb-header p {
      color: var(--text-secondary);
      margin: 0;
    }
    .kb-search { margin-bottom: 40px; }
    .search-box {
      position: relative;
      display: flex;
      align-items: center;
    }
    .search-icon {
      position: absolute;
      left: 16px;
      width: 20px;
      height: 20px;
      color: var(--text-secondary);
    }
    .search-input {
      width: 100%;
      padding: 16px 48px;
      font-size: 16px;
      border: 2px solid var(--border-color);
      border-radius: 12px;
      background: var(--bg-primary);
      color: var(--text-primary);
      outline: none;
      transition: border-color 0.2s;
      box-sizing: border-box;
    }
    .search-input:focus { border-color: #667eea; }
    .clear-btn {
      position: absolute;
      right: 12px;
      background: none;
      border: none;
      font-size: 24px;
      color: var(--text-secondary);
      cursor: pointer;
    }
    .kb-stats {
      display: grid;
      grid-template-columns: repeat(3, 1fr);
      gap: 16px;
      margin-bottom: 40px;
    }
    .stat-card {
      text-align: center;
      padding: 24px;
      background: var(--bg-secondary);
      border-radius: 12px;
    }
    .stat-number {
      display: block;
      font-size: 32px;
      font-weight: 700;
      color: #667eea;
    }
    .stat-label {
      color: var(--text-secondary);
      font-size: 14px;
    }
    .kb-tags { margin-bottom: 40px; }
    .kb-tags h2 {
      font-size: 20px;
      margin: 0 0 16px;
    }
    .tag-cloud {
      display: flex;
      flex-wrap: wrap;
      gap: 8px;
    }
    .tag-btn {
      padding: 6px 14px;
      background: var(--bg-secondary);
      border: 1px solid var(--border-color);
      border-radius: 20px;
      color: var(--text-primary);
      font-size: 13px;
      cursor: pointer;
      transition: all 0.2s;
    }
    .tag-btn:hover {
      background: #667eea;
      color: #fff;
      border-color: #667eea;
    }
    .kb-categories { margin-bottom: 40px; }
    .kb-categories h2 {
      font-size: 20px;
      margin: 0 0 16px;
    }
    .category-grid {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
      gap: 12px;
    }
    .category-card {
      display: flex;
      align-items: center;
      gap: 12px;
      padding: 16px;
      background: var(--bg-secondary);
      border-left: 4px solid;
      border-radius: 8px;
      text-decoration: none;
      color: inherit;
      transition: transform 0.2s;
    }
    .category-card:hover { transform: translateX(4px); }
    .cat-icon { font-size: 24px; }
    .cat-info h3 {
      margin: 0 0 4px;
      font-size: 15px;
      color: var(--text-primary);
    }
    .cat-count {
      font-size: 12px;
      color: var(--text-secondary);
    }
    .search-results { margin-top: 24px; }
    .search-results h2 {
      font-size: 16px;
      color: var(--text-secondary);
      margin: 0 0 16px;
    }
    .result-card {
      display: flex;
      gap: 16px;
      padding: 16px;
      background: var(--bg-secondary);
      border-radius: 8px;
      text-decoration: none;
      color: inherit;
      margin-bottom: 8px;
      transition: transform 0.2s;
    }
    .result-card:hover { transform: translateX(4px); }
    .result-score {
      font-size: 12px;
      color: #667eea;
      font-weight: 600;
      white-space: nowrap;
    }
    .result-info h3 {
      margin: 0 0 4px;
      font-size: 15px;
    }
    .result-info p {
      margin: 0 0 8px;
      font-size: 13px;
      color: var(--text-secondary);
    }
    .result-meta {
      display: flex;
      gap: 8px;
    }
    .match-type {
      font-size: 11px;
      padding: 2px 8px;
      border-radius: 4px;
      background: rgba(102, 126, 234, 0.15);
      color: #667eea;
    }
    .level-badge {
      font-size: 11px;
      padding: 2px 8px;
      border-radius: 4px;
    }
    .level-badge.beginner { background: rgba(76, 175, 80, 0.15); color: #4caf50; }
    .level-badge.intermediate { background: rgba(255, 152, 0, 0.15); color: #ff9800; }
    .level-badge.advanced { background: rgba(244, 67, 54, 0.15); color: #f44336; }
    .learning-path { margin-top: 40px; }
    .learning-path h2 {
      font-size: 20px;
      margin: 0 0 24px;
    }
    .path-timeline {
      position: relative;
      padding-left: 32px;
    }
    .path-timeline::before {
      content: '';
      position: absolute;
      left: 12px;
      top: 0;
      bottom: 0;
      width: 2px;
      background: var(--border-color);
    }
    .path-node {
      position: relative;
      display: flex;
      gap: 16px;
      padding: 16px;
      margin-bottom: 8px;
      background: var(--bg-secondary);
      border-radius: 8px;
      text-decoration: none;
      color: inherit;
      transition: transform 0.2s;
    }
    .path-node:hover { transform: translateX(4px); }
    .node-dot {
      position: absolute;
      left: -28px;
      top: 50%;
      transform: translateY(-50%);
      width: 12px;
      height: 12px;
      border-radius: 50%;
      border: 2px solid var(--border-color);
      background: var(--bg-primary);
    }
    .path-node.beginner .node-dot { border-color: #4caf50; background: #4caf50; }
    .path-node.intermediate .node-dot { border-color: #ff9800; background: #ff9800; }
    .path-node.advanced .node-dot { border-color: #f44336; background: #f44336; }
    .node-level {
      font-size: 11px;
      text-transform: uppercase;
      color: var(--text-secondary);
    }
    .node-content h4 {
      margin: 4px 0;
      font-size: 14px;
    }
    .node-difficulty {
      font-size: 12px;
      color: var(--text-secondary);
    }
    @media (max-width: 600px) {
      .kb-stats { grid-template-columns: 1fr; }
      .category-grid { grid-template-columns: 1fr; }
    }
  `]
})
export class KnowledgeBaseComponent {
  private kb = inject(KnowledgeBaseService);

  searchQuery = signal('');
  searchResults = signal<SearchResult[]>([]);
  selectedCategory = signal<string>('');
  learningPath = signal<KnowledgeNode[]>([]);

  stats = computed(() => this.kb.getStats());
  topTags = computed(() => this.kb.tags().slice(0, 20));

  categories = [
    { id: 'angular' as LessonCategory, label: 'Angular', icon: '🅰️', color: '#dd0031' },
    { id: 'javascript' as LessonCategory, label: 'JavaScript', icon: '🟨', color: '#f7df1e' },
    { id: 'typescript' as LessonCategory, label: 'TypeScript', icon: '🔷', color: '#3178c6' },
    { id: 'html' as LessonCategory, label: 'HTML & CSS', icon: '🎨', color: '#e34f26' },
    { id: 'react' as LessonCategory, label: 'React', icon: '⚛️', color: '#61dafb' },
    { id: 'vue' as LessonCategory, label: 'Vue', icon: '💚', color: '#42b883' },
    { id: 'system-design' as LessonCategory, label: 'System Design', icon: '🏗️', color: '#9c27b0' },
    { id: 'database' as LessonCategory, label: 'Databases', icon: '🗄️', color: '#795548' },
    { id: 'networking' as LessonCategory, label: 'Networking', icon: '🌐', color: '#2196f3' },
    { id: 'browser' as LessonCategory, label: 'Browser', icon: '🌍', color: '#ff5722' },
    { id: 'performance' as LessonCategory, label: 'Performance', icon: '⚡', color: '#ffc107' },
    { id: 'tooling' as LessonCategory, label: 'Tooling', icon: '🔧', color: '#607d8b' },
    { id: 'testing' as LessonCategory, label: 'Testing', icon: '🧪', color: '#4caf50' },
    { id: 'design-systems' as LessonCategory, label: 'Design Systems', icon: '🎯', color: '#e91e63' },
    { id: 'dsa-frontend' as LessonCategory, label: 'DSA', icon: '🧮', color: '#00bcd4' },
    { id: 'soft-skills' as LessonCategory, label: 'Soft Skills', icon: '🤝', color: '#ff9800' },
    { id: 'security' as LessonCategory, label: 'Security', icon: '🔒', color: '#f44336' },
  ];

  onSearch(event: Event): void {
    const input = event.target as HTMLInputElement;
    this.searchQuery.set(input.value);
    if (input.value.trim()) {
      this.searchResults.set(this.kb.search(input.value.trim()));
    } else {
      this.searchResults.set([]);
    }
  }

  clearSearch(): void {
    this.searchQuery.set('');
    this.searchResults.set([]);
  }

  searchByTag(tag: string): void {
    this.searchQuery.set(tag);
    this.searchResults.set(this.kb.search(tag));
  }

  getCategoryCount(category: LessonCategory): number {
    return this.kb.getLessonsByCategory(category).length;
  }
}
