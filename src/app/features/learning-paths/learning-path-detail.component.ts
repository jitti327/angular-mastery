import { Component, inject, signal, OnInit } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { LearningPathService } from '../../core/services/learning-path.service';
import { ProgressService } from '../../core/services/progress.service';
import { CertificateService } from '../../core/services/certificate.service';
import { LearningPath } from '../../core/models/lesson.model';
import { trigger, transition, style, animate } from '@angular/animations';

@Component({
  selector: 'app-learning-path-detail',
  standalone: true,
  imports: [RouterLink],
  animations: [
    trigger('fadeIn', [
      transition(':enter', [
        style({ opacity: 0, transform: 'translateY(20px)' }),
        animate('400ms cubic-bezier(0.35, 0, 0.25, 1)', style({ opacity: 1, transform: 'translateY(0)' }))
      ])
    ])
  ],
  template: `
    @if (path(); as p) {
      <div class="path-detail" @fadeIn>
        <a routerLink="/learning-paths" class="back-link">← Back to Learning Paths</a>

        <div class="path-header">
          <span class="path-icon">{{ p.icon }}</span>
          <div>
            <h1>{{ p.title }}</h1>
            <p>{{ p.description }}</p>
          </div>
        </div>

        @let progress = pathService.getPathProgress(p.id);
        <div class="progress-banner">
          <div class="progress-bar-large">
            <div class="progress-fill-large" [style.width.%]="progress.percentage"></div>
          </div>
          <span class="progress-label">{{ progress.completed }}/{{ progress.total }} lessons ({{ progress.percentage }}%)</span>
        </div>

        <div class="milestones-list">
          @for (milestone of p.milestones; track milestone.id; let i = $index) {
            <div class="milestone-card">
              <div class="milestone-number">{{ i + 1 }}</div>
              <div class="milestone-content">
                <h3>{{ milestone.title }}</h3>
                <p>{{ milestone.description }}</p>
                <div class="milestone-lessons">
                  @for (lessonId of milestone.lessonIds; track lessonId) {
                    <a [routerLink]="['/lesson', lessonId]" class="lesson-item"
                      [class.completed]="progressService.isLessonCompleted(lessonId)">
                      <span class="check">{{ progressService.isLessonCompleted(lessonId) ? '✓' : '○' }}</span>
                      Lesson {{ lessonId }}
                    </a>
                  }
                </div>
              </div>
            </div>
          }
        </div>

        @if (progress.percentage === 100) {
          <div class="certificate-section">
            <h2>🎓 Congratulations!</h2>
            <p>You've completed this learning path. Download your certificate!</p>
            @if (certificateService.getCertificate(p.id)) {
              <button class="cert-btn" (click)="downloadCert()">Download Certificate</button>
            } @else {
              <div class="cert-form">
                <input type="text" placeholder="Enter your name" [value]="learnerName()"
                  (input)="onNameChange($event)" class="name-input" />
                <button class="cert-btn" (click)="generateCert()">Generate Certificate</button>
              </div>
            }
          </div>
        }
      </div>
    }
  `,
  styles: [`
    .path-detail { max-width: 900px; margin: 0 auto; padding: 32px 24px; }
    .back-link {
      display: inline-block; color: var(--text-secondary); text-decoration: none;
      margin-bottom: 24px; font-size: 14px;
    }
    .back-link:hover { color: var(--primary); }
    .path-header { display: flex; gap: 20px; align-items: start; margin-bottom: 32px; }
    .path-icon { font-size: 56px; }
    .path-header h1 { margin: 0 0 8px; font-size: 32px; color: var(--text-primary); }
    .path-header p { margin: 0; color: var(--text-secondary); font-size: 16px; line-height: 1.6; }
    .progress-banner { margin-bottom: 32px; }
    .progress-bar-large {
      height: 12px; background: #e5e7eb; border-radius: 6px; overflow: hidden; margin-bottom: 8px;
    }
    .progress-fill-large {
      height: 100%; background: linear-gradient(90deg, #dd0031, #ff6b6b);
      border-radius: 6px; transition: width 0.5s ease;
    }
    .progress-label { font-size: 14px; color: var(--text-secondary); }
    .milestones-list { display: flex; flex-direction: column; gap: 24px; }
    .milestone-card {
      display: flex; gap: 20px; padding: 24px; border: 1px solid var(--border-color);
      border-radius: 12px; background: var(--card-bg);
    }
    .milestone-number {
      width: 40px; height: 40px; border-radius: 50%; background: var(--primary);
      color: white; display: flex; align-items: center; justify-content: center;
      font-weight: bold; font-size: 16px; flex-shrink: 0;
    }
    .milestone-content h3 { margin: 0 0 8px; font-size: 18px; color: var(--text-primary); }
    .milestone-content p { margin: 0 0 16px; color: var(--text-secondary); font-size: 14px; }
    .milestone-lessons { display: flex; flex-direction: column; gap: 8px; }
    .lesson-item {
      display: flex; align-items: center; gap: 8px; padding: 8px 12px;
      border-radius: 6px; text-decoration: none; color: var(--text-primary);
      font-size: 14px; transition: background 0.2s;
    }
    .lesson-item:hover { background: var(--tag-bg, rgba(0,0,0,0.05)); }
    .lesson-item.completed .check { color: #10b981; }
    .check { font-size: 16px; }
    .certificate-section {
      margin-top: 40px; padding: 32px; background: linear-gradient(135deg, #fef3c7, #fde68a);
      border-radius: 16px; text-align: center;
    }
    .certificate-section h2 { margin: 0 0 8px; font-size: 24px; color: #92400e; }
    .certificate-section p { margin: 0 0 20px; color: #78350f; }
    .cert-form { display: flex; gap: 12px; justify-content: center; }
    .name-input {
      padding: 10px 16px; border: 2px solid #fcd34d; border-radius: 8px;
      font-size: 14px; width: 250px;
    }
    .name-input:focus { outline: none; border-color: #f59e0b; }
    .cert-btn {
      padding: 10px 24px; background: #dd0031; color: white; border: none;
      border-radius: 8px; font-weight: 600; cursor: pointer; font-size: 14px;
    }
    .cert-btn:hover { background: #c5002d; }
    @media (max-width: 768px) {
      .path-header { flex-direction: column; }
      .cert-form { flex-direction: column; align-items: center; }
    }
  `]
})
export class LearningPathDetailComponent implements OnInit {
  private route = inject(ActivatedRoute);
  pathService = inject(LearningPathService);
  progressService = inject(ProgressService);
  certificateService = inject(CertificateService);

  path = signal<LearningPath | undefined>(undefined);
  learnerName = signal('');

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id') || '';
    this.path.set(this.pathService.getPath(id));
  }

  onNameChange(event: Event): void {
    this.learnerName.set((event.target as HTMLInputElement).value);
  }

  generateCert(): void {
    const p = this.path();
    if (p && this.learnerName()) {
      this.certificateService.generateCertificate(p.id, this.learnerName());
    }
  }

  downloadCert(): void {
    const p = this.path();
    if (p) {
      const cert = this.certificateService.getCertificate(p.id);
      if (cert) this.certificateService.downloadCertificate(cert);
    }
  }
}
