import { Component, inject, OnInit, signal, computed } from '@angular/core';
import { RouterLink, ActivatedRoute, Router } from '@angular/router';
import { LessonService, LessonCategory } from '../../../core/services/lesson.service';
import { ProgressService } from '../../../core/services/progress.service';
import { trigger, transition, style, animate, query, stagger } from '@angular/animations';

interface CategoryInfo {
  id: LessonCategory;
  label: string;
  icon: string;
  color: string;
}

@Component({
  selector: 'app-lessons-list',
  standalone: true,
  imports: [RouterLink],
  animations: [
    trigger('staggerLessons', [
      transition('* => *', [
        query(':enter', [
          style({ opacity: 0, transform: 'translateX(-20px)' }),
          stagger(40, [
            animate('350ms cubic-bezier(0.35, 0, 0.25, 1)', style({ opacity: 1, transform: 'translateX(0)' }))
          ])
        ], { optional: true })
      ])
    ]),
    trigger('fadeIn', [
      transition(':enter', [
        style({ opacity: 0, transform: 'translateY(20px)' }),
        animate('400ms ease-out', style({ opacity: 1, transform: 'translateY(0)' }))
      ])
    ])
  ],
  template: `
    <div class="lessons-container">
      <header class="lessons-header" @fadeIn>
        <h1>{{ pageTitle() }}</h1>
        <p>{{ pageDescription() }}</p>
        <div class="category-tabs">
          @for (cat of categories; track cat.id) {
            <button 
              [class.active]="activeCategory() === cat.id" 
              (click)="setCategory(cat.id)"
              class="category-tab"
              [style.--cat-color]="cat.color">
              <span class="tab-icon">{{ cat.icon }}</span>
              <span class="tab-label">{{ cat.label }}</span>
            </button>
          }
        </div>
      </header>

      @if (bookmarkedLessons().length > 0) {
        <div class="level-section">
          <h2 class="level-title bookmarked">Bookmarked Lessons</h2>
          <div class="lessons-grid" [@staggerLessons]="bookmarkedLessons().length">
            @for (lesson of bookmarkedLessons(); track lesson.id; let i = $index) {
              <a [routerLink]="['/lesson', lesson.id]" class="lesson-card">
                <div class="lesson-number" [style.background]="getCategoryColor(lesson.id)">{{ i + 1 }}</div>
                <div class="lesson-info">
                  <h3>{{ lesson.title }}</h3>
                  <p>{{ lesson.description }}</p>
                  <div class="lesson-meta">
                    <span>{{ lesson.duration }}</span>
                    <span>{{ lesson.topics.length }} topics</span>
                    <span class="level-badge" [class]="lesson.level">{{ lesson.level }}</span>
                  </div>
                </div>
                @if (progressService.isLessonCompleted(lesson.id)) {
                  <span class="completed-badge">✓</span>
                }
              </a>
            }
          </div>
        </div>
      }

      @if (beginnerLessons().length > 0) {
        <div class="level-section">
          <h2 class="level-title beginner">Beginner Level</h2>
          <div class="lessons-grid" [@staggerLessons]="beginnerLessons().length">
            @for (lesson of beginnerLessons(); track lesson.id; let i = $index) {
              <a [routerLink]="['/lesson', lesson.id]" class="lesson-card">
                <div class="lesson-number" [style.background]="getCategoryColor(lesson.id)">{{ i + 1 }}</div>
                <div class="lesson-info">
                  <h3>{{ lesson.title }}</h3>
                  <p>{{ lesson.description }}</p>
                  <div class="lesson-meta">
                    <span>{{ lesson.duration }}</span>
                    <span>{{ lesson.topics.length }} topics</span>
                  </div>
                </div>
                @if (progressService.isLessonCompleted(lesson.id)) {
                  <span class="completed-badge">✓</span>
                }
              </a>
            }
          </div>
        </div>
      }

      @if (intermediateLessons().length > 0) {
        <div class="level-section">
          <h2 class="level-title intermediate">Intermediate Level</h2>
          <div class="lessons-grid" [@staggerLessons]="intermediateLessons().length">
            @for (lesson of intermediateLessons(); track lesson.id; let i = $index) {
              <a [routerLink]="['/lesson', lesson.id]" class="lesson-card">
                <div class="lesson-number" [style.background]="getCategoryColor(lesson.id)">{{ i + 1 }}</div>
                <div class="lesson-info">
                  <h3>{{ lesson.title }}</h3>
                  <p>{{ lesson.description }}</p>
                  <div class="lesson-meta">
                    <span>{{ lesson.duration }}</span>
                    <span>{{ lesson.topics.length }} topics</span>
                  </div>
                </div>
                @if (progressService.isLessonCompleted(lesson.id)) {
                  <span class="completed-badge">✓</span>
                }
              </a>
            }
          </div>
        </div>
      }

      @if (advancedLessons().length > 0) {
        <div class="level-section">
          <h2 class="level-title advanced">Advanced Level</h2>
          <div class="lessons-grid" [@staggerLessons]="advancedLessons().length">
            @for (lesson of advancedLessons(); track lesson.id; let i = $index) {
              <a [routerLink]="['/lesson', lesson.id]" class="lesson-card">
                <div class="lesson-number" [style.background]="getCategoryColor(lesson.id)">{{ i + 1 }}</div>
                <div class="lesson-info">
                  <h3>{{ lesson.title }}</h3>
                  <p>{{ lesson.description }}</p>
                  <div class="lesson-meta">
                    <span>{{ lesson.duration }}</span>
                    <span>{{ lesson.topics.length }} topics</span>
                  </div>
                </div>
                @if (progressService.isLessonCompleted(lesson.id)) {
                  <span class="completed-badge">✓</span>
                }
              </a>
            }
          </div>
        </div>
      }

      @if (beginnerLessons().length === 0 && intermediateLessons().length === 0 && advancedLessons().length === 0) {
        <div class="empty-state">
          <p>No lessons available for this category yet.</p>
        </div>
      }
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
      margin-bottom: 48px;
    }
    .lessons-header h1 {
      font-size: 36px;
      margin: 0 0 8px;
      color: var(--text-primary);
    }
    .lessons-header p {
      font-size: 16px;
      color: var(--text-secondary);
      margin: 0 0 24px;
    }
    .category-tabs {
      display: flex;
      gap: 8px;
      overflow-x: auto;
      padding: 4px 0;
      justify-content: center;
      flex-wrap: wrap;
    }
    .category-tab {
      display: flex;
      align-items: center;
      gap: 6px;
      padding: 8px 16px;
      border: 2px solid var(--border-color);
      border-radius: 20px;
      background: var(--bg-primary);
      cursor: pointer;
      font-size: 13px;
      font-weight: 500;
      transition: all 0.2s;
      white-space: nowrap;
      color: var(--text-secondary);
    }
    .category-tab:hover {
      border-color: var(--cat-color);
      color: var(--cat-color);
    }
    .category-tab.active {
      background: var(--cat-color);
      border-color: var(--cat-color);
      color: white;
    }
    .tab-icon {
      font-size: 14px;
    }
    .level-section {
      margin-bottom: 48px;
    }
    .level-title {
      display: flex;
      align-items: center;
      gap: 8px;
      font-size: 20px;
      margin-bottom: 20px;
      padding-bottom: 12px;
      border-bottom: 2px solid var(--border-color);
      color: var(--text-primary);
    }
    .level-title.beginner { color: #22c55e; border-bottom-color: #22c55e; }
    .level-title.intermediate { color: #f97316; border-bottom-color: #f97316; }
    .level-title.advanced { color: #ef4444; border-bottom-color: #ef4444; }
    .level-title.bookmarked { color: var(--accent); border-bottom-color: var(--accent); }
    .lessons-grid {
      display: flex;
      flex-direction: column;
      gap: 12px;
    }
    .lesson-card {
      display: flex;
      align-items: center;
      gap: 16px;
      padding: 20px;
      background: var(--bg-primary);
      border-radius: 12px;
      box-shadow: var(--shadow-sm);
      text-decoration: none;
      transition: all 0.2s;
      position: relative;
      border: 1px solid var(--border-color);
    }
    .lesson-card:hover {
      transform: translateX(4px);
      box-shadow: var(--shadow-md);
      border-color: var(--accent);
    }
    .lesson-number {
      width: 40px;
      height: 40px;
      color: white;
      border-radius: 10px;
      display: flex;
      align-items: center;
      justify-content: center;
      font-weight: 700;
      font-size: 14px;
      flex-shrink: 0;
    }
    .lesson-info {
      flex: 1;
      min-width: 0;
    }
    .lesson-info h3 {
      margin: 0 0 4px;
      color: var(--text-primary);
      font-size: 16px;
    }
    .lesson-info p {
      margin: 0 0 8px;
      color: var(--text-secondary);
      font-size: 14px;
      line-height: 1.4;
      display: -webkit-box;
      -webkit-line-clamp: 2;
      -webkit-box-orient: vertical;
      overflow: hidden;
    }
    .lesson-meta {
      display: flex;
      gap: 12px;
      color: var(--text-secondary);
      font-size: 13px;
    }
    .level-badge {
      padding: 1px 8px;
      border-radius: 4px;
      font-size: 11px;
      font-weight: 600;
      text-transform: uppercase;
    }
    .level-badge.beginner { background: #dcfce7; color: #166534; }
    .level-badge.intermediate { background: #fed7aa; color: #9a3412; }
    .level-badge.advanced { background: #fecaca; color: #991b1b; }
    .completed-badge {
      position: absolute;
      top: 12px;
      right: 12px;
      width: 28px;
      height: 28px;
      background: #22c55e;
      color: white;
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      font-weight: bold;
      font-size: 14px;
    }
    .empty-state {
      text-align: center;
      padding: 60px 20px;
      color: var(--text-secondary);
    }
    @media (max-width: 768px) {
      .category-tabs {
        justify-content: flex-start;
        flex-wrap: nowrap;
      }
      .lessons-header h1 {
        font-size: 28px;
      }
    }
  `]
})
export class LessonsListComponent implements OnInit {
  private lessonService = inject(LessonService);
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  progressService = inject(ProgressService);

  activeCategory = signal<LessonCategory>('angular');

  categories: CategoryInfo[] = [
    { id: 'angular', label: 'Angular', icon: '🅰️', color: '#dd0031' },
    { id: 'javascript', label: 'JavaScript', icon: '📜', color: '#f7df1e' },
    { id: 'typescript', label: 'TypeScript', icon: '🔷', color: '#3178c6' },
    { id: 'react', label: 'React', icon: '⚛️', color: '#61dafb' },
    { id: 'vue', label: 'Vue', icon: '💚', color: '#42b883' },
    { id: 'html-css', label: 'HTML & CSS', icon: '🎨', color: '#e44d26' },
    { id: 'system-design', label: 'System Design', icon: '🏗️', color: '#8b5cf6' },
    { id: 'database', label: 'Databases', icon: '🗄️', color: '#06b6d4' },
    { id: 'networking', label: 'Networking', icon: '🌐', color: '#10b981' },
    { id: 'browser', label: 'Browser', icon: '🌍', color: '#f59e0b' },
    { id: 'design-systems', label: 'Design Systems', icon: '🎯', color: '#ec4899' },
    { id: 'dsa-frontend', label: 'DSA', icon: '🧮', color: '#6366f1' },
    { id: 'soft-skills', label: 'Soft Skills', icon: '🤝', color: '#14b8a6' },
    { id: 'performance', label: 'Performance', icon: '⚡', color: '#f97316' },
    { id: 'testing', label: 'Testing', icon: '🧪', color: '#22c55e' },
    { id: 'tooling', label: 'Tooling', icon: '🔧', color: '#64748b' },
  ];

  private titles: Record<LessonCategory, string> = {
    angular: 'Angular Learning Path',
    javascript: 'JavaScript Mastery',
    typescript: 'TypeScript Mastery',
    'html-css': 'HTML & CSS Mastery',
    react: 'React Learning Path',
    vue: 'Vue Learning Path',
    tooling: 'Developer Tooling',
    performance: 'Performance Optimization',
    testing: 'Testing Mastery',
    'system-design': 'System Design',
    database: 'Databases (MySQL & PostgreSQL)',
    networking: 'Networking & APIs',
    browser: 'Browser Internals',
    'design-systems': 'Design Systems',
    'dsa-frontend': 'DSA for Frontend',
    'soft-skills': 'Soft Skills & Leadership',
    security: 'Web Security'
  };

  private descriptions: Record<LessonCategory, string> = {
    angular: 'Master Angular from beginner to advanced with comprehensive lessons',
    javascript: 'Master JavaScript from fundamentals to advanced patterns',
    typescript: 'Master TypeScript from basics to type-level programming',
    'html-css': 'Master HTML & CSS from semantic markup to modern layouts',
    react: 'Master React from fundamentals to advanced patterns',
    vue: 'Master Vue from basics to composition API',
    tooling: 'Master developer tools for efficient workflows',
    performance: 'Optimize applications for speed and efficiency',
    testing: 'Master testing strategies for reliable applications',
    'system-design': 'Learn frontend system design and architecture patterns',
    database: 'Master SQL, MySQL, PostgreSQL and database integration',
    networking: 'Master HTTP, REST, GraphQL, WebSockets and security',
    browser: 'Understand browser internals, rendering, and Web APIs',
    'design-systems': 'Build and maintain scalable design systems',
    'dsa-frontend': 'Data structures and algorithms for frontend interviews',
    'soft-skills': 'Engineering leadership and communication skills',
    security: 'Master web security: XSS, CSRF, CSP, authentication, and OWASP'
  };

  pageTitle = computed(() => this.titles[this.activeCategory()]);
  pageDescription = computed(() => this.descriptions[this.activeCategory()]);

  beginnerLessons = computed(() => this.lessonService.getLessonsByLevel('beginner', this.activeCategory()));
  intermediateLessons = computed(() => this.lessonService.getLessonsByLevel('intermediate', this.activeCategory()));
  advancedLessons = computed(() => this.lessonService.getLessonsByLevel('advanced', this.activeCategory()));

  bookmarkedLessons = computed(() => {
    const bookmarkIds = this.progressService.getBookmarkedLessons();
    return bookmarkIds
      .map(id => this.lessonService.getLesson(id))
      .filter((l): l is NonNullable<typeof l> => l != null)
      .filter(l => this.lessonService.getLessonCategory(l.id) === this.activeCategory());
  });

  getCategoryColor(lessonId: number): string {
    const category = this.lessonService.getLessonCategory(lessonId);
    return this.categories.find(c => c.id === category)?.color || '#64748b';
  }

  ngOnInit() {
    this.route.params.subscribe(params => {
      const cat = params['category'] as LessonCategory;
      if (cat && this.categories.some(c => c.id === cat)) {
        this.activeCategory.set(cat);
      }
    });
  }

  setCategory(category: LessonCategory) {
    this.activeCategory.set(category);
    this.router.navigate(['/lessons', category]);
  }
}
