import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { LessonService } from '../../../core/services/lesson.service';
import { ProgressService } from '../../../core/services/progress.service';

@Component({
  selector: 'app-lessons-list',
  standalone: true,
  imports: [RouterLink],
  template: `
    <div class="lessons-container">
      <header class="lessons-header">
        <h1>Angular Learning Path</h1>
        <p>Master Angular from beginner to advanced with 10 comprehensive lessons</p>
      </header>

      <div class="level-section">
        <h2 class="level-title beginner">🟢 Beginner Level</h2>
        <div class="lessons-grid">
          @for (lesson of beginnerLessons; track lesson.id) {
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
          @for (lesson of intermediateLessons; track lesson.id) {
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
          @for (lesson of advancedLessons; track lesson.id) {
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
      margin: 0;
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
  `]
})
export class LessonsListComponent {
  private lessonService = inject(LessonService);
  progressService = inject(ProgressService);

  beginnerLessons = this.lessonService.getLessonsByLevel('beginner');
  intermediateLessons = this.lessonService.getLessonsByLevel('intermediate');
  advancedLessons = this.lessonService.getLessonsByLevel('advanced');
}
