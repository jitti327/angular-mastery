import { Component, signal, computed, inject } from '@angular/core';
import { ProgressService } from '../../../core/services/progress.service';
import { LessonService, LessonCategory } from '../../../core/services/lesson.service';
import { CertificateComponent } from '../certificate/certificate.component';

interface Badge {
  id: string;
  title: string;
  description: string;
  icon: string;
  requirement: string;
  earned: boolean;
  color: string;
}

@Component({
  selector: 'app-achievement-badges',
  standalone: true,
  imports: [CertificateComponent],
  template: `
    <div class="badges-container">
      <div class="badges-header">
        <h2>Achievements</h2>
        <p>Complete lessons and earn badges</p>
      </div>

      <div class="badges-grid">
        @for (badge of badges(); track badge.id) {
          <div class="badge-card" [class.earned]="badge.earned" [class.locked]="!badge.earned">
            <div class="badge-icon" [style.background]="badge.color">
              @if (badge.earned) {
                <span>{{ badge.icon }}</span>
              } @else {
                <span class="locked-icon">🔒</span>
              }
            </div>
            <h3>{{ badge.title }}</h3>
            <p>{{ badge.description }}</p>
            <span class="badge-requirement">{{ badge.requirement }}</span>
            @if (badge.earned) {
              <span class="earned-badge">✓ Earned</span>
            }
          </div>
        }
      </div>

      <div class="stats-section">
        <h3>Your Statistics</h3>
        <div class="stats-grid">
          <div class="stat-card">
            <span class="stat-value">{{ progressService.completedCount() }}</span>
            <span class="stat-label">Lessons Completed</span>
          </div>
          <div class="stat-card">
            <span class="stat-value">{{ averageScore() }}%</span>
            <span class="stat-label">Average Quiz Score</span>
          </div>
          <div class="stat-card">
            <span class="stat-value">{{ earnedBadges() }}</span>
            <span class="stat-label">Badges Earned</span>
          </div>
          <div class="stat-card">
            <span class="stat-value">{{ studyTime() }}</span>
            <span class="stat-label">Estimated Study Time</span>
          </div>
        </div>
      </div>

      <div class="certificates-section">
        <h3>Your Certificates</h3>
        <p class="cert-subtitle">Complete all lessons in a category to earn your certificate</p>
        <div class="certificates-grid">
          @for (cert of certificates(); track cert.category) {
            <div class="certificate-card" [class.unlocked]="cert.completed">
              <div class="cert-icon">🏆</div>
              <h4>{{ cert.categoryName }} Mastery</h4>
              <p>{{ cert.completedCount }} / {{ cert.totalCount }} lessons</p>
              <div class="cert-progress-bar">
                <div class="cert-progress-fill" [style.width]="cert.percentage + '%'"></div>
              </div>
              @if (cert.completed) {
                <button class="view-cert-btn" (click)="openCertificate(cert)">View Certificate</button>
              } @else {
                <span class="locked-text">Complete all lessons to unlock</span>
              }
            </div>
          }
        </div>
      </div>
    </div>

    @if (showCertificate()) {
      <app-certificate
        [userName]="selectedCert()!.userName"
        [category]="selectedCert()!.categoryName"
        [completionDate]="selectedCert()!.completionDate"
        [totalLessons]="selectedCert()!.totalCount"
        (close)="showCertificate.set(false)"
      />
    }
  `,
  styles: [`
    .badges-container {
      background: white;
      border-radius: 16px;
      padding: 32px;
      box-shadow: 0 4px 24px rgba(0,0,0,0.08);
      margin: 32px 0;
    }
    .badges-header {
      text-align: center;
      margin-bottom: 40px;
    }
    .badges-header h2 {
      margin: 0 0 8px;
      font-size: 28px;
      color: var(--text-primary);
    }
    .badges-header p {
      margin: 0;
      color: var(--text-secondary);
    }
    .badges-grid {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
      gap: 20px;
      margin-bottom: 48px;
    }
    .badge-card {
      background: var(--bg-secondary);
      border-radius: 16px;
      padding: 24px;
      text-align: center;
      transition: all 0.3s;
      position: relative;
    }
    .badge-card.earned {
      background: linear-gradient(135deg, #f5f5f7 0%, #e8f5e9 100%);
      transform: translateY(-4px);
      box-shadow: 0 8px 24px rgba(76, 175, 80, 0.2);
    }
    .badge-card.locked {
      opacity: 0.6;
    }
    .badge-icon {
      width: 80px;
      height: 80px;
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      margin: 0 auto 16px;
      font-size: 36px;
    }
    .locked-icon { filter: grayscale(1); }
    .badge-card h3 {
      margin: 0 0 8px;
      font-size: 16px;
      color: var(--text-primary);
    }
    .badge-card p {
      margin: 0 0 12px;
      font-size: 13px;
      color: var(--text-secondary);
    }
    .badge-requirement {
      font-size: 11px;
      color: var(--text-secondary);
      background: var(--bg-primary);
      padding: 4px 12px;
      border-radius: 12px;
    }
    .earned-badge {
      display: block;
      margin-top: 12px;
      color: #4caf50;
      font-weight: 600;
      font-size: 13px;
    }
    .stats-section {
      background: var(--bg-secondary);
      border-radius: 16px;
      padding: 28px;
    }
    .stats-section h3 {
      margin: 0 0 24px;
      text-align: center;
      color: var(--text-primary);
    }
    .stats-grid {
      display: grid;
      grid-template-columns: repeat(4, 1fr);
      gap: 20px;
    }
    .stat-card {
      text-align: center;
      padding: 16px;
      background: var(--bg-primary);
      border-radius: 12px;
    }
    .stat-value {
      display: block;
      font-size: 32px;
      font-weight: 700;
      color: var(--accent);
      margin-bottom: 4px;
    }
    .stat-label {
      display: block;
      font-size: 13px;
      color: var(--text-secondary);
    }

    @media (max-width: 768px) {
      .stats-grid { grid-template-columns: repeat(2, 1fr); }
      .badges-grid { grid-template-columns: repeat(2, 1fr); }
    }

    .certificates-section {
      margin-top: 48px;
      padding-top: 32px;
      border-top: 1px solid var(--border-color);
    }
    .certificates-section h3 {
      margin: 0 0 4px;
      text-align: center;
      color: var(--text-primary);
    }
    .cert-subtitle {
      text-align: center;
      color: var(--text-secondary);
      font-size: 14px;
      margin: 0 0 28px;
    }
    .certificates-grid {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(220px, 1fr));
      gap: 20px;
    }
    .certificate-card {
      background: var(--bg-secondary);
      border-radius: 16px;
      padding: 24px;
      text-align: center;
      transition: all 0.3s;
      border: 2px solid transparent;
    }
    .certificate-card.unlocked {
      border-color: #b8860b;
      background: linear-gradient(135deg, #fffdf7 0%, #fff8e1 100%);
      transform: translateY(-2px);
      box-shadow: 0 8px 24px rgba(184, 134, 11, 0.15);
    }
    .cert-icon {
      font-size: 40px;
      margin-bottom: 12px;
    }
    .certificate-card h4 {
      margin: 0 0 8px;
      font-size: 16px;
      color: var(--text-primary);
    }
    .certificate-card p {
      margin: 0 0 12px;
      font-size: 13px;
      color: var(--text-secondary);
    }
    .cert-progress-bar {
      height: 6px;
      background: var(--bg-primary);
      border-radius: 3px;
      overflow: hidden;
      margin-bottom: 16px;
    }
    .cert-progress-fill {
      height: 100%;
      background: linear-gradient(90deg, #b8860b, #d4a843);
      border-radius: 3px;
      transition: width 0.5s ease;
    }
    .view-cert-btn {
      padding: 10px 20px;
      background: linear-gradient(135deg, #dd0031, #c3002f);
      color: white;
      border: none;
      border-radius: 8px;
      font-size: 13px;
      font-weight: 600;
      cursor: pointer;
      transition: all 0.2s;
    }
    .view-cert-btn:hover {
      transform: translateY(-1px);
      box-shadow: 0 4px 12px rgba(221, 0, 49, 0.3);
    }
    .locked-text {
      font-size: 12px;
      color: var(--text-secondary);
      font-style: italic;
    }
  `]
})
export class AchievementBadgesComponent {
  progressService = inject(ProgressService);
  private lessonService = inject(LessonService);

  showCertificate = signal(false);
  selectedCert = signal<{
    categoryName: string;
    totalCount: number;
    completionDate: Date;
    userName: string;
  } | null>(null);

  certificates = computed(() => {
    const progress = this.progressService.progress();
    const completedIds = new Set(progress.completedLessons);
    const categories: { key: LessonCategory; name: string }[] = [
      { key: 'angular', name: 'Angular' },
      { key: 'javascript', name: 'JavaScript' },
      { key: 'typescript', name: 'TypeScript' },
    ];

    return categories.map(cat => {
      const lessons = this.lessonService.getLessons(cat.key);
      const completed = lessons.filter(l => completedIds.has(l.id));
      const allDone = lessons.length > 0 && completed.length === lessons.length;
      return {
        category: cat.key,
        categoryName: cat.name,
        totalCount: lessons.length,
        completedCount: completed.length,
        percentage: lessons.length > 0 ? Math.round((completed.length / lessons.length) * 100) : 0,
        completed: allDone,
        completionDate: new Date(),
        userName: 'Your Name',
      };
    });
  });

  averageScore = computed(() => {
    const scores = Object.values(this.progressService.progress().quizScores);
    if (scores.length === 0) return 0;
    return Math.round(scores.reduce((a, b) => a + b, 0) / scores.length);
  });

  earnedBadges = computed(() => this.badges().filter(b => b.earned).length);

  studyTime = computed(() => {
    const completed = this.progressService.completedCount();
    return `${completed * 20} min`;
  });

  badges = computed<Badge[]>(() => {
    const progress = this.progressService.progress();
    const completedIds = new Set(progress.completedLessons);
    const quizScores = progress.quizScores;

    const allBeginnerLessons = this.lessonService.getLessonsByLevel('beginner');
    const allIntermediateLessons = this.lessonService.getLessonsByLevel('intermediate');
    const allAdvancedLessons = this.lessonService.getLessonsByLevel('advanced');
    const angularLessons = this.lessonService.getLessons('angular');

    const allBeginnerComplete = allBeginnerLessons.length > 0 &&
      allBeginnerLessons.every((l: { id: number }) => completedIds.has(l.id));
    const allIntermediateComplete = allIntermediateLessons.length > 0 &&
      allIntermediateLessons.every((l: { id: number }) => completedIds.has(l.id));
    const allAdvancedComplete = allAdvancedLessons.length > 0 &&
      allAdvancedLessons.every((l: { id: number }) => completedIds.has(l.id));

    const totalLessons = this.lessonService.getLessonCount();
    const allLessonsComplete = totalLessons > 0 &&
      this.lessonService.getLessons().every((l: { id: number }) => completedIds.has(l.id));

    const allAngularComplete = angularLessons.length > 0 &&
      angularLessons.every((l: { id: number }) => completedIds.has(l.id));

    const projectIds = [43, 44, 45, 46];
    const visitedProjects = this.getVisitedProjects();
    const allProjectsVisited = projectIds.every(id => visitedProjects.has(id));

    return [
      {
        id: 'first-lesson',
        title: 'First Steps',
        description: 'Complete your first lesson',
        icon: '🎯',
        requirement: 'Complete 1 lesson',
        earned: progress.completedLessons.length >= 1,
        color: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)'
      },
      {
        id: 'quiz-master',
        title: 'Quiz Master',
        description: 'Score 90% or higher on any quiz',
        icon: '🏆',
        requirement: 'Score >= 90% on quiz',
        earned: Object.values(quizScores).some(s => s >= 90),
        color: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)'
      },
      {
        id: 'beginner',
        title: 'Beginner',
        description: 'Complete all beginner lessons across all categories',
        icon: '🌱',
        requirement: `Complete all ${allBeginnerLessons.length} beginner lessons`,
        earned: allBeginnerComplete,
        color: 'linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)'
      },
      {
        id: 'intermediate',
        title: 'Intermediate',
        description: 'Complete all intermediate lessons across all categories',
        icon: '🌿',
        requirement: `Complete all ${allIntermediateLessons.length} intermediate lessons`,
        earned: allIntermediateComplete,
        color: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)'
      },
      {
        id: 'advanced',
        title: 'Advanced',
        description: 'Complete all advanced lessons across all categories',
        icon: '🌳',
        requirement: `Complete all ${allAdvancedLessons.length} advanced lessons`,
        earned: allAdvancedComplete,
        color: 'linear-gradient(135deg, #fa709a 0%, #fee140 100%)'
      },
      {
        id: 'perfect-score',
        title: 'Perfectionist',
        description: 'Complete all lessons',
        icon: '💎',
        requirement: `Complete all ${totalLessons} lessons`,
        earned: allLessonsComplete,
        color: 'linear-gradient(135deg, #a18cd1 0%, #fbc2eb 100%)'
      },
      {
        id: 'angular-master',
        title: 'Angular Master',
        description: 'Complete all Angular lessons',
        icon: '👑',
        requirement: `Complete all ${angularLessons.length} Angular lessons`,
        earned: allAngularComplete,
        color: 'linear-gradient(135deg, #ffecd2 0%, #fcb69f 100%)'
      },
      {
        id: 'first-project',
        title: 'Builder',
        description: 'Visit all 4 practice projects',
        icon: '🔨',
        requirement: 'Visit all 4 practice projects',
        earned: allProjectsVisited,
        color: 'linear-gradient(135deg, #89f7fe 0%, #66a6ff 100%)'
      },
    ];
  });

  private getVisitedProjects(): Set<number> {
    if (typeof localStorage === 'undefined') return new Set();
    const stored = localStorage.getItem('angular-mastery-visited-projects');
    return stored ? new Set(JSON.parse(stored)) : new Set();
  }

  openCertificate(cert: { categoryName: string; totalCount: number; completionDate: Date; userName: string }) {
    this.selectedCert.set(cert);
    this.showCertificate.set(true);
  }
}
