import { Component, inject, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { LearningPathService } from '../../core/services/learning-path.service';
import { ProgressService } from '../../core/services/progress.service';
import { LearningPath } from '../../core/models/lesson.model';
import { trigger, transition, style, animate, query, stagger } from '@angular/animations';

@Component({
  selector: 'app-learning-paths',
  standalone: true,
  imports: [RouterLink],
  animations: [
    trigger('staggerIn', [
      transition(':enter', [
        query('.path-card', [
          style({ opacity: 0, transform: 'translateY(30px)' })
        ], { optional: true }),
        query('.path-card', [
          stagger(100, [
            animate('500ms cubic-bezier(0.35, 0, 0.25, 1)', style({ opacity: 1, transform: 'translateY(0)' }))
          ])
        ], { optional: true })
      ])
    ])
  ],
  template: `
    <div class="learning-paths-page">
      <div class="page-header">
        <h1>Learning Paths</h1>
        <p>Follow curated learning paths to master specific skills. Each path has milestones and guided progression.</p>
      </div>

      <div class="paths-grid" @staggerIn>
        @for (path of pathService.getPaths(); track path.id) {
          <div class="path-card">
            <div class="path-icon">{{ path.icon }}</div>
            <div class="path-info">
              <h2>{{ path.title }}</h2>
              <p>{{ path.description }}</p>
              <div class="path-meta">
                <span class="meta-item">{{ path.estimatedWeeks }} weeks</span>
                <span class="meta-item">{{ path.lessonIds.length }} lessons</span>
                <span class="meta-item difficulty" [class]="path.difficulty">{{ path.difficulty }}</span>
              </div>
            </div>
            <div class="path-progress">
              @let progress = pathService.getPathProgress(path.id);
              <div class="progress-ring">
                <svg viewBox="0 0 120 120">
                  <circle cx="60" cy="60" r="54" fill="none" stroke="#e5e7eb" stroke-width="8"/>
                  <circle cx="60" cy="60" r="54" fill="none" stroke="#dd0031" stroke-width="8"
                    stroke-linecap="round" stroke-dasharray="339.3"
                    [attr.stroke-dashoffset]="339.3 - (339.3 * progress.percentage / 100)"
                    transform="rotate(-90 60 60)"/>
                </svg>
                <span class="progress-text">{{ progress.percentage }}%</span>
              </div>
            </div>
            <div class="milestones">
              @for (milestone of path.milestones; track milestone.id) {
                <div class="milestone">
                  <div class="milestone-header">
                    <span class="milestone-title">{{ milestone.title }}</span>
                    <span class="milestone-count">
                      {{ getMilestoneCompleted(path, milestone) }}/{{ milestone.lessonIds.length }}
                    </span>
                  </div>
                  <div class="milestone-bar">
                    <div class="milestone-fill"
                      [style.width.%]="getMilestonePercentage(path, milestone)"></div>
                  </div>
                </div>
              }
            </div>
            <div class="path-actions">
              @if (pathService.getNextLesson(path.id); as nextId) {
                <a [routerLink]="['/lesson', nextId]" class="continue-btn">Continue Learning →</a>
              } @else {
                <div class="completed-label">🎉 Path Completed!</div>
              }
              <a [routerLink]="['/learning-path', path.id]" class="details-btn">View Details</a>
            </div>
          </div>
        }
      </div>
    </div>
  `,
  styles: [`
    .learning-paths-page { max-width: 1000px; margin: 0 auto; padding: 32px 24px; }
    .page-header { text-align: center; margin-bottom: 40px; }
    .page-header h1 { font-size: 36px; color: var(--text-primary); margin: 0 0 12px; }
    .page-header p { color: var(--text-secondary); font-size: 16px; margin: 0; }
    .paths-grid { display: flex; flex-direction: column; gap: 24px; }
    .path-card {
      padding: 32px; border: 1px solid var(--border-color); border-radius: 16px;
      background: var(--card-bg); display: grid; grid-template-columns: auto 1fr auto;
      grid-template-rows: auto auto; gap: 20px; align-items: start;
    }
    .path-icon { font-size: 48px; }
    .path-info h2 { margin: 0 0 8px; font-size: 22px; color: var(--text-primary); }
    .path-info p { margin: 0 0 12px; color: var(--text-secondary); font-size: 14px; line-height: 1.6; }
    .path-meta { display: flex; gap: 12px; flex-wrap: wrap; }
    .meta-item {
      padding: 4px 10px; background: var(--tag-bg, rgba(0,0,0,0.05));
      border-radius: 6px; font-size: 12px; color: var(--text-secondary);
    }
    .meta-item.difficulty.beginner { background: #d1fae5; color: #065f46; }
    .meta-item.difficulty.intermediate { background: #fef3c7; color: #92400e; }
    .meta-item.difficulty.advanced { background: #fee2e2; color: #991b1b; }
    .meta-item.difficulty.mixed { background: #e0e7ff; color: #3730a3; }
    .path-progress { grid-row: 1 / 3; grid-column: 3; }
    .progress-ring { position: relative; width: 100px; height: 100px; }
    .progress-ring svg { width: 100%; height: 100%; }
    .progress-ring circle { transition: stroke-dashoffset 0.5s ease; }
    .progress-text {
      position: absolute; top: 50%; left: 50%; transform: translate(-50%, -50%);
      font-size: 20px; font-weight: bold; color: var(--text-primary);
    }
    .milestones {
      grid-column: 1 / 3; display: flex; flex-direction: column; gap: 12px;
    }
    .milestone-header { display: flex; justify-content: space-between; margin-bottom: 4px; }
    .milestone-title { font-size: 13px; font-weight: 500; color: var(--text-primary); }
    .milestone-count { font-size: 12px; color: var(--text-secondary); }
    .milestone-bar {
      height: 6px; background: #e5e7eb; border-radius: 3px; overflow: hidden;
    }
    .milestone-fill {
      height: 100%; background: #dd0031; border-radius: 3px; transition: width 0.5s ease;
    }
    .path-actions {
      grid-column: 1 / -1; display: flex; gap: 12px; padding-top: 8px;
      border-top: 1px solid var(--border-color);
    }
    .continue-btn {
      padding: 10px 24px; background: #dd0031; color: white; border-radius: 8px;
      text-decoration: none; font-weight: 600; font-size: 14px; transition: background 0.2s;
    }
    .continue-btn:hover { background: #c5002d; }
    .details-btn {
      padding: 10px 24px; background: transparent; border: 1px solid var(--border-color);
      color: var(--text-primary); border-radius: 8px; text-decoration: none;
      font-weight: 500; font-size: 14px; transition: all 0.2s;
    }
    .details-btn:hover { border-color: var(--primary); color: var(--primary); }
    .completed-label { font-weight: 600; color: #10b981; font-size: 14px; }
    @media (max-width: 768px) {
      .path-card { grid-template-columns: 1fr; }
      .path-progress { grid-row: auto; grid-column: auto; justify-self: end; }
      .milestones { grid-column: auto; }
    }
  `]
})
export class LearningPathsComponent {
  pathService = inject(LearningPathService);
  private progressService = inject(ProgressService);

  getMilestoneCompleted(path: LearningPath, milestone: { lessonIds: number[] }): number {
    return milestone.lessonIds.filter(id => this.progressService.isLessonCompleted(id)).length;
  }

  getMilestonePercentage(path: LearningPath, milestone: { lessonIds: number[] }): number {
    const completed = this.getMilestoneCompleted(path, milestone);
    return milestone.lessonIds.length > 0 ? (completed / milestone.lessonIds.length) * 100 : 0;
  }
}
