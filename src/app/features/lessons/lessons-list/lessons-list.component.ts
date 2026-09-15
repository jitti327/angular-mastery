import { Component, inject, OnInit, signal, computed } from '@angular/core';
import { RouterLink, ActivatedRoute, Router } from '@angular/router';
import { LessonService, LessonCategory } from '../../../core/services/lesson.service';
import { ProgressService } from '../../../core/services/progress.service';

@Component({
  selector: 'app-lessons-list',
  standalone: true,
  imports: [RouterLink],
  template: `
    <div class="lessons-container">
      <header class="lessons-header">
        <h1>{{ pageTitle() }}</h1>
        <p>{{ pageDescription() }}</p>
        <div class="category-tabs">
          <button 
            [class.active]="activeCategory() === 'angular'" 
            (click)="setCategory('angular')"
            class="category-tab angular">
            🅰️ Angular
          </button>
          <button 
            [class.active]="activeCategory() === 'javascript'" 
            (click)="setCategory('javascript')"
            class="category-tab javascript">
            📜 JavaScript
          </button>
          <button 
            [class.active]="activeCategory() === 'typescript'" 
            (click)="setCategory('typescript')"
            class="category-tab typescript">
            🔷 TypeScript
          </button>
        </div>
      </header>

      <div class="level-section">
        <h2 class="level-title beginner">🟢 Beginner Level</h2>
        <div class="lessons-grid">
          @for (lesson of beginnerLessons(); track lesson.id) {
            <a [routerLink]="['/lesson', lesson.id]" class="lesson-card">
              <div class="lesson-number">{{ lesson.id }}</div>
              <div class="lesson-info">
                <h3>{{ lesson.title }}</h3>
                <p>{{ lesson.description }}</p>
                <div class="lesson-meta">
                  <span>⏱ {{ lesson.duration }}</span>
                  <span>📚 {{ lesson.topics.length }} topics</span>
                </div>
              </div>
              @if (progressService.isLessonCompleted(lesson.id)) {
                <span class="completed-badge">✓</span>
              }
            </a>
          }
        </div>
      </div>

      <div class="level-section">
        <h2 class="level-title intermediate">🟠 Intermediate Level</h2>
        <div class="lessons-grid">
          @for (lesson of intermediateLessons(); track lesson.id) {
            <a [routerLink]="['/lesson', lesson.id]" class="lesson-card">
              <div class="lesson-number">{{ lesson.id }}</div>
              <div class="lesson-info">
                <h3>{{ lesson.title }}</h3>
                <p>{{ lesson.description }}</p>
                <div class="lesson-meta">
                  <span>⏱ {{ lesson.duration }}</span>
                  <span>📚 {{ lesson.topics.length }} topics</span>
                </div>
              </div>
              @if (progressService.isLessonCompleted(lesson.id)) {
                <span class="completed-badge">✓</span>
              }
            </a>
          }
        </div>
      </div>

      <div class="level-section">
        <h2 class="level-title advanced">🔴 Advanced Level</h2>
        <div class="lessons-grid">
          @for (lesson of advancedLessons(); track lesson.id) {
            <a [routerLink]="['/lesson', lesson.id]" class="lesson-card">
              <div class="lesson-number">{{ lesson.id }}</div>
              <div class="lesson-info">
                <h3>{{ lesson.title }}</h3>
                <p>{{ lesson.description }}</p>
                <div class="lesson-meta">
                  <span>⏱ {{ lesson.duration }}</span>
                  <span>📚 {{ lesson.topics.length }} topics</span>
                </div>
              </div>
              @if (progressService.isLessonCompleted(lesson.id)) {
                <span class="completed-badge">✓</span>
              }
            </a>
          }
        </div>
      </div>
    </div>
  `,
  styles: [`
    .lessons-container {
      max-width: 1000px;
      margin: 0 auto;
      padding: 40px 24px;
    }
    .lessons-header {
      text-align: center;
      margin-bottom: 60px;
    }
    .lessons-header h1 {
      font-size: 42px;
      margin: 0 0 12px;
      color: #1a1a1a;
    }
    .lessons-header p {
      font-size: 18px;
      color: #666;
      margin: 0 0 24px;
    }
    .category-tabs {
      display: flex;
      justify-content: center;
      gap: 12px;
      flex-wrap: wrap;
    }
    .category-tab {
      padding: 12px 24px;
      border: 2px solid #e0e0e0;
      border-radius: 24px;
      background: white;
      cursor: pointer;
      font-size: 16px;
      font-weight: 500;
      transition: all 0.2s;
    }
    .category-tab:hover {
      border-color: #dd0031;
      color: #dd0031;
    }
    .category-tab.active.angular {
      background: #dd0031;
      border-color: #dd0031;
      color: white;
    }
    .category-tab.active.javascript {
      background: #f7df1e;
      border-color: #f7df1e;
      color: #1a1a1a;
    }
    .category-tab.active.typescript {
      background: #3178c6;
      border-color: #3178c6;
      color: white;
    }
    .level-section {
      margin-bottom: 60px;
    }
    .level-title {
      display: flex;
      align-items: center;
      gap: 12px;
      font-size: 24px;
      margin-bottom: 24px;
      padding-bottom: 12px;
      border-bottom: 2px solid #eee;
    }
    .lessons-grid {
      display: flex;
      flex-direction: column;
      gap: 16px;
    }
    .lesson-card {
      display: flex;
      align-items: center;
      gap: 20px;
      padding: 24px;
      background: white;
      border-radius: 12px;
      box-shadow: 0 2px 8px rgba(0,0,0,0.06);
      text-decoration: none;
      transition: all 0.2s;
      position: relative;
    }
    .lesson-card:hover {
      transform: translateX(8px);
      box-shadow: 0 4px 16px rgba(0,0,0,0.1);
    }
    .lesson-number {
      width: 48px;
      height: 48px;
      background: linear-gradient(135deg, #dd0031, #c3002f);
      color: white;
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      font-weight: 700;
      font-size: 20px;
      flex-shrink: 0;
    }
    .lesson-info {
      flex: 1;
    }
    .lesson-info h3 {
      margin: 0 0 8px;
      color: #1a1a1a;
      font-size: 20px;
    }
    .lesson-info p {
      margin: 0 0 12px;
      color: #666;
      line-height: 1.5;
    }
    .lesson-meta {
      display: flex;
      gap: 16px;
      color: #888;
      font-size: 14px;
    }
    .completed-badge {
      position: absolute;
      top: 16px;
      right: 16px;
      width: 32px;
      height: 32px;
      background: #4caf50;
      color: white;
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      font-weight: bold;
    }
    :host-context(.dark-theme) {
      .lessons-header h1, .lesson-info h3 { color: #fff; }
      .lessons-header p { color: #aaa; }
      .lesson-card { background: #2a2a2a; }
      .level-title { border-bottom-color: #444; }
      .category-tab { background: #333; border-color: #555; color: #fff; }
    }
  `]
})
export class LessonsListComponent implements OnInit {
  private lessonService = inject(LessonService);
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  progressService = inject(ProgressService);

  activeCategory = signal<LessonCategory>('angular');

  pageTitle = computed(() => {
    const titles: Record<LessonCategory, string> = {
      angular: 'Angular Learning Path',
      javascript: 'JavaScript Mastery',
      typescript: 'TypeScript Mastery'
    };
    return titles[this.activeCategory()];
  });

  pageDescription = computed(() => {
    const descriptions: Record<LessonCategory, string> = {
      angular: 'Master Angular from beginner to advanced with comprehensive lessons',
      javascript: 'Master JavaScript from fundamentals to advanced patterns',
      typescript: 'Master TypeScript from basics to type-level programming'
    };
    return descriptions[this.activeCategory()];
  });

  beginnerLessons = computed(() => this.lessonService.getLessonsByLevel('beginner', this.activeCategory()));
  intermediateLessons = computed(() => this.lessonService.getLessonsByLevel('intermediate', this.activeCategory()));
  advancedLessons = computed(() => this.lessonService.getLessonsByLevel('advanced', this.activeCategory()));

  ngOnInit() {
    this.route.params.subscribe(params => {
      if (params['category'] && ['angular', 'javascript', 'typescript'].includes(params['category'])) {
        this.activeCategory.set(params['category'] as LessonCategory);
      }
    });
  }

  setCategory(category: LessonCategory) {
    this.activeCategory.set(category);
    this.router.navigate(['/lessons', category]);
  }
}
