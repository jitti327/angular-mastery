import { Component, inject, computed, signal, HostListener } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { LessonService } from '../../../core/services/lesson.service';
import { ProgressService } from '../../../core/services/progress.service';
import { CodeViewerComponent } from '../../../shared/components/code-viewer/code-viewer.component';
import { QuizComponent } from '../../../shared/components/quiz/quiz.component';
import { map } from 'rxjs/operators';
import { toSignal } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-lesson-page',
  standalone: true,
  imports: [RouterLink, CodeViewerComponent, QuizComponent],
  template: `
    @if (lesson(); as lesson) {
      <div class="lesson-layout">
        <aside class="lesson-sidebar">
          <div class="toc-header">
            <span class="toc-icon">📑</span>
            <span class="toc-title">On this page</span>
          </div>
          <nav class="toc-nav">
            @for (topic of lesson.topics; track topic.id) {
              <a [href]="'#' + topic.id"
                 class="toc-link"
                 [class.active]="activeSection() === topic.id"
                 (click)="scrollTo(topic.id, $event)">
                {{ topic.title }}
              </a>
            }
          </nav>

          <div class="lesson-progress">
            <div class="progress-bar">
              <div class="progress-fill" [style.width.%]="readingProgress()"></div>
            </div>
            <span class="progress-text">{{ readingProgress() }}% read</span>
          </div>
        </aside>

        <div class="lesson-container">
          <nav class="breadcrumb">
            <a routerLink="/">Home</a>
            <span class="breadcrumb-sep">/</span>
            <a [routerLink]="['/lessons', lessonCategory()]">{{ categoryLabel() }} Lessons</a>
            <span class="breadcrumb-sep">/</span>
            <span class="breadcrumb-current">{{ lesson.title }}</span>
          </nav>

          <header class="lesson-header">
            <div class="lesson-badges">
              <span class="lesson-level" [class]="'level-' + lesson.level">{{ lesson.level }}</span>
              <span class="lesson-number">Lesson {{ lessonIndex() }} of {{ categoryLessonCount() }}</span>
            </div>
            <h1>{{ lesson.title }}</h1>
            <p class="lesson-description">{{ lesson.description }}</p>
            <div class="lesson-meta">
              <span class="meta-item">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><polyline points="12,6 12,12 16,14"/></svg>
                {{ lesson.duration }}
              </span>
              <span class="meta-item">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"/><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"/></svg>
                {{ lesson.topics.length }} topics
              </span>
              <span class="meta-item" [class.completed]="isCompleted()">
                @if (isCompleted()) {
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22,4 12,14.01 9,11.01"/></svg>
                  Completed
                } @else {
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="16"/><line x1="8" y1="12" x2="16" y2="12"/></svg>
                  In Progress
                }
              </span>
            </div>
          </header>

          <div class="lesson-objectives">
            <h2>🎯 What you'll learn</h2>
            <ul>
              @for (objective of lesson.objectives; track objective) {
                <li>{{ objective }}</li>
              }
            </ul>
          </div>

          <div class="lesson-content">
            @for (topic of lesson.topics; track topic.id; let i = $index) {
              <section class="topic-section" [id]="topic.id">
                <div class="topic-header">
                  <span class="topic-number">{{ i + 1 }}</span>
                  <h2>{{ topic.title }}</h2>
                </div>
                <div class="topic-content" [innerHTML]="formatContent(topic.content)"></div>

                @if (topic.codeExample) {
                  <app-code-viewer
                    [title]="topic.codeExample.title"
                    [typescript]="topic.codeExample.typescript"
                    [html]="topic.codeExample.html"
                    [css]="topic.codeExample.css || ''"
                    [description]="topic.codeExample.description" />
                }

                @if (topic.diagram) {
                  <div class="diagram-placeholder">
                    <p>📊 Interactive diagram: {{ topic.diagram.title }}</p>
                  </div>
                }
              </section>
            }
          </div>

          <div class="lesson-quiz">
            @if (quizQuestions().length > 0) {
              <app-quiz
                [questions]="quizQuestions()"
                (quizComplete)="onQuizComplete($event)" />
            }
          </div>

          <footer class="lesson-footer">
            @if (prevLesson(); as prev) {
              <a [routerLink]="['/lesson', prev.id]" class="nav-btn prev">
                <span class="nav-direction">Previous</span>
                <span class="nav-title">{{ prev.title }}</span>
              </a>
            } @else {
              <div></div>
            }
            <button class="complete-btn" (click)="markComplete()" [class.completed]="isCompleted()">
              @if (isCompleted()) {
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="20,6 9,17 4,12"/></svg>
                Completed
              } @else {
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><polyline points="16,12 12,12 12,8"/><line x1="12" y1="16" x2="12" y2="12"/></svg>
                Mark Complete
              }
            </button>
            @if (nextLesson(); as next) {
              <a [routerLink]="['/lesson', next.id]" class="nav-btn next">
                <span class="nav-direction">Next</span>
                <span class="nav-title">{{ next.title }}</span>
              </a>
            } @else {
              <div></div>
            }
          </footer>
        </div>
      </div>
    } @else {
      <div class="not-found">
        <span class="not-found-icon">📭</span>
        <h2>Lesson not found</h2>
        <p>The lesson you're looking for doesn't exist.</p>
        <a routerLink="/lessons" class="back-btn">← Back to Lessons</a>
      </div>
    }
  `,
  styles: [`
    .lesson-layout {
      display: flex;
      max-width: 1400px;
      margin: 0 auto;
    }
    .lesson-sidebar {
      width: 220px;
      flex-shrink: 0;
      padding: 24px 16px;
      position: sticky;
      top: 56px;
      height: calc(100vh - 56px);
      overflow-y: auto;
      border-right: 1px solid var(--border-color);
    }
    .toc-header {
      display: flex;
      align-items: center;
      gap: 8px;
      margin-bottom: 16px;
    }
    .toc-icon { font-size: 18px; }
    .toc-title {
      font-size: 13px;
      font-weight: 600;
      color: var(--text-secondary);
      text-transform: uppercase;
      letter-spacing: 0.5px;
    }
    .toc-nav {
      display: flex;
      flex-direction: column;
      gap: 4px;
    }
    .toc-link {
      display: block;
      padding: 8px 12px;
      font-size: 13px;
      color: var(--text-secondary);
      text-decoration: none;
      border-radius: 6px;
      border-left: 2px solid transparent;
      transition: all 0.15s;
    }
    .toc-link:hover {
      color: var(--text-primary);
      background: var(--bg-secondary);
    }
    .toc-link.active {
      color: var(--accent);
      background: var(--accent-light);
      border-left-color: var(--accent);
      font-weight: 500;
    }
    .lesson-progress {
      margin-top: 24px;
      padding-top: 24px;
      border-top: 1px solid var(--border-color);
    }
    .progress-bar {
      height: 4px;
      background: var(--border-color);
      border-radius: 2px;
      overflow: hidden;
      margin-bottom: 8px;
    }
    .progress-fill {
      height: 100%;
      background: var(--accent);
      border-radius: 2px;
      transition: width 0.3s;
    }
    .progress-text {
      font-size: 12px;
      color: var(--text-secondary);
    }
    .lesson-container {
      flex: 1;
      min-width: 0;
      max-width: 900px;
      padding: 32px 48px;
    }
    .breadcrumb {
      display: flex;
      align-items: center;
      gap: 8px;
      margin-bottom: 32px;
      font-size: 14px;
    }
    .breadcrumb a {
      color: var(--text-secondary);
      text-decoration: none;
      transition: color 0.15s;
    }
    .breadcrumb a:hover { color: var(--accent); }
    .breadcrumb-sep { color: var(--text-secondary); opacity: 0.5; }
    .breadcrumb-current { color: var(--text-primary); font-weight: 500; }
    .lesson-header {
      margin-bottom: 48px;
    }
    .lesson-badges {
      display: flex;
      align-items: center;
      gap: 12px;
      margin-bottom: 16px;
    }
    .lesson-level {
      display: inline-block;
      padding: 6px 14px;
      border-radius: 20px;
      font-size: 12px;
      font-weight: 600;
      text-transform: uppercase;
      letter-spacing: 0.5px;
    }
    .level-beginner { background: #dcfce7; color: #166534; }
    .level-intermediate { background: #fef3c7; color: #92400e; }
    .level-advanced { background: #fee2e2; color: #991b1b; }
    .lesson-number {
      font-size: 13px;
      color: var(--text-secondary);
    }
    .lesson-header h1 {
      font-size: 40px;
      line-height: 1.2;
      margin: 0 0 12px;
      color: var(--text-primary);
      letter-spacing: -0.5px;
    }
    .lesson-description {
      font-size: 18px;
      color: var(--text-secondary);
      margin: 0 0 20px;
      line-height: 1.6;
    }
    .lesson-meta {
      display: flex;
      gap: 24px;
    }
    .meta-item {
      display: flex;
      align-items: center;
      gap: 8px;
      font-size: 14px;
      color: var(--text-secondary);
    }
    .meta-item svg { width: 16px; height: 16px; }
    .meta-item.completed { color: var(--success); }
    .lesson-objectives {
      background: var(--bg-secondary);
      padding: 24px 28px;
      border-radius: 12px;
      margin-bottom: 48px;
      border: 1px solid var(--border-color);
    }
    .lesson-objectives h2 {
      margin: 0 0 16px;
      font-size: 18px;
      color: var(--text-primary);
    }
    .lesson-objectives ul {
      margin: 0;
      padding-left: 20px;
    }
    .lesson-objectives li {
      margin-bottom: 8px;
      color: var(--text-secondary);
      line-height: 1.6;
    }
    .topic-section {
      margin-bottom: 56px;
    }
    .topic-header {
      display: flex;
      align-items: center;
      gap: 16px;
      margin-bottom: 24px;
    }
    .topic-number {
      width: 40px;
      height: 40px;
      display: flex;
      align-items: center;
      justify-content: center;
      background: var(--accent);
      color: white;
      border-radius: 10px;
      font-weight: 700;
      font-size: 18px;
      flex-shrink: 0;
    }
    .topic-header h2 {
      margin: 0;
      font-size: 28px;
      color: var(--text-primary);
    }
    .topic-content {
      line-height: 1.8;
      color: var(--text-secondary);
      font-size: 16px;
    }
    .topic-content ::ng-deep {
      strong { color: var(--text-primary); font-weight: 600; }
      code {
        background: var(--bg-secondary);
        padding: 2px 6px;
        border-radius: 4px;
        font-size: 14px;
        color: var(--accent);
      }
      pre {
        background: var(--code-bg);
        color: var(--code-text);
        padding: 20px;
        border-radius: 12px;
        overflow-x: auto;
        margin: 20px 0;
        border: 1px solid var(--border-color);
      }
    }
    .diagram-placeholder {
      background: var(--bg-secondary);
      border: 2px dashed var(--border-color);
      padding: 48px;
      border-radius: 12px;
      text-align: center;
      margin: 24px 0;
      color: var(--text-secondary);
    }
    .lesson-quiz { margin: 48px 0; }
    .lesson-footer {
      display: flex;
      justify-content: space-between;
      align-items: stretch;
      margin-top: 48px;
      padding-top: 32px;
      border-top: 1px solid var(--border-color);
      gap: 16px;
    }
    .nav-btn {
      display: flex;
      flex-direction: column;
      padding: 16px 24px;
      border-radius: 12px;
      text-decoration: none;
      transition: all 0.2s;
      min-width: 160px;
    }
    .nav-btn.prev {
      background: var(--bg-secondary);
      align-items: flex-start;
    }
    .nav-btn.next {
      background: var(--accent);
      color: white;
      align-items: flex-end;
    }
    .nav-btn:hover {
      transform: translateY(-2px);
      box-shadow: var(--shadow-md);
    }
    .nav-direction {
      font-size: 12px;
      opacity: 0.7;
      text-transform: uppercase;
      letter-spacing: 0.5px;
    }
    .nav-title {
      font-size: 15px;
      font-weight: 600;
      max-width: 160px;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }
    .complete-btn {
      display: flex;
      align-items: center;
      gap: 8px;
      padding: 14px 28px;
      background: var(--bg-secondary);
      color: var(--text-primary);
      border: 1px solid var(--border-color);
      border-radius: 12px;
      font-size: 15px;
      font-weight: 600;
      cursor: pointer;
      transition: all 0.2s;
    }
    .complete-btn svg { width: 18px; height: 18px; }
    .complete-btn:hover {
      background: var(--success);
      color: white;
      border-color: var(--success);
    }
    .complete-btn.completed {
      background: var(--success);
      color: white;
      border-color: var(--success);
    }
    .not-found {
      text-align: center;
      padding: 120px 24px;
    }
    .not-found-icon { font-size: 64px; }
    .not-found h2 { margin: 16px 0 8px; color: var(--text-primary); }
    .not-found p { color: var(--text-secondary); margin-bottom: 24px; }
    .back-btn {
      display: inline-block;
      padding: 12px 24px;
      background: var(--accent);
      color: white;
      border-radius: 8px;
      text-decoration: none;
      font-weight: 600;
    }

    @media (max-width: 1200px) {
      .lesson-sidebar { display: none; }
    }
    @media (max-width: 768px) {
      .lesson-container { padding: 24px 20px; }
      .lesson-header h1 { font-size: 28px; }
      .lesson-footer { flex-direction: column; }
      .nav-btn { min-width: auto; }
    }
  `]
})
export class LessonPageComponent {
  private route = inject(ActivatedRoute);
  private lessonService = inject(LessonService);
  private progressService = inject(ProgressService);

  activeSection = signal('');
  readingProgress = signal(0);

  lesson = toSignal(
    this.route.paramMap.pipe(
      map(params => {
        const id = Number(params.get('id'));
        return this.lessonService.getLesson(id);
      })
    )
  );

  lessonCategory = computed(() => {
    const l = this.lesson();
    return l ? this.lessonService.getLessonCategory(l.id) || 'angular' : 'angular';
  });

  categoryLabel = computed(() => {
    const labels: Record<string, string> = {
      angular: 'Angular',
      javascript: 'JavaScript',
      typescript: 'TypeScript'
    };
    return labels[this.lessonCategory()];
  });

  lessonIndex = computed(() => {
    const l = this.lesson();
    return l ? this.lessonService.getLessonIndexInCategory(l.id) : 0;
  });

  categoryLessonCount = computed(() => {
    const l = this.lesson();
    return l ? this.lessonService.getLessonCountInCategory(l.id) : 0;
  });

  prevLesson = computed(() => {
    const l = this.lesson();
    return l ? this.lessonService.getPrevLesson(l.id) : undefined;
  });

  nextLesson = computed(() => {
    const l = this.lesson();
    return l ? this.lessonService.getNextLesson(l.id) : undefined;
  });

  isCompleted = computed(() => {
    const l = this.lesson();
    return l ? this.progressService.isLessonCompleted(l.id) : false;
  });

  quizQuestions = computed(() => {
    const l = this.lesson();
    if (!l) return [];
    return l.quiz || [];
  });

  constructor() {
    if (typeof window !== 'undefined') {
      this.updateReadingProgress();
    }
  }

  @HostListener('window:scroll')
  onScroll(): void {
    this.updateReadingProgress();
    this.updateActiveSection();
  }

  private updateReadingProgress(): void {
    const scrollTop = window.scrollY;
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    const progress = docHeight > 0 ? Math.min(100, Math.round((scrollTop / docHeight) * 100)) : 0;
    this.readingProgress.set(progress);
  }

  private updateActiveSection(): void {
    const sections = document.querySelectorAll('.topic-section');
    let current = '';
    sections.forEach(section => {
      const rect = section.getBoundingClientRect();
      if (rect.top <= 150) {
        current = section.id;
      }
    });
    if (current) this.activeSection.set(current);
  }

  scrollTo(id: string, event: Event): void {
    event.preventDefault();
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
      this.activeSection.set(id);
    }
  }

  formatContent(content: string): string {
    return content
      .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
      .replace(/`(.*?)`/g, '<code>$1</code>')
      .replace(/\n- /g, '<br>• ')
      .replace(/\n\n/g, '<br><br>')
      .replace(/\n(\d+)\. /g, '<br>$1. ');
  }

  markComplete(): void {
    const l = this.lesson();
    if (l) {
      this.progressService.completeLesson(l.id);
    }
  }

  onQuizComplete(score: number): void {
    const l = this.lesson();
    if (l) {
      this.progressService.setQuizScore(l.id, score);
      if (score >= 70) {
        this.progressService.completeLesson(l.id);
      }
    }
  }
}
