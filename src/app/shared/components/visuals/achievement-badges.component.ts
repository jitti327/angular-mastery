import { Component, signal, computed, inject } from '@angular/core';
import { ProgressService } from '../../../core/services/progress.service';

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
    </div>
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
  `]
})
export class AchievementBadgesComponent {
  progressService = inject(ProgressService);

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
        description: 'Score 100% on any quiz',
        icon: '🏆',
        requirement: 'Score 100% on quiz',
        earned: Object.values(progress.quizScores).some(s => s === 100),
        color: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)'
      },
      {
        id: 'beginner',
        title: 'Beginner',
        description: 'Complete all beginner lessons',
        icon: '🌱',
        requirement: 'Complete 3 lessons',
        earned: progress.completedLessons.filter(id => id <= 3).length >= 3,
        color: 'linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)'
      },
      {
        id: 'intermediate',
        title: 'Intermediate',
        description: 'Complete all intermediate lessons',
        icon: '🌿',
        requirement: 'Complete 7 lessons',
        earned: progress.completedLessons.filter(id => id >= 4 && id <= 7).length >= 4,
        color: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)'
      },
      {
        id: 'advanced',
        title: 'Advanced',
        description: 'Complete all advanced lessons',
        icon: '🌳',
        requirement: 'Complete 10 lessons',
        earned: progress.completedLessons.length >= 10,
        color: 'linear-gradient(135deg, #fa709a 0%, #fee140 100%)'
      },
      {
        id: 'perfect-score',
        title: 'Perfectionist',
        description: 'Score 100% on all quizzes',
        icon: '💎',
        requirement: 'All quizzes 100%',
        earned: Object.keys(progress.quizScores).length >= 10 && Object.values(progress.quizScores).every(s => s === 100),
        color: 'linear-gradient(135deg, #a18cd1 0%, #fbc2eb 100%)'
      },
      {
        id: 'angular-master',
        title: 'Angular Master',
        description: 'Complete everything!',
        icon: '👑',
        requirement: 'Complete all lessons',
        earned: progress.completedLessons.length >= 10,
        color: 'linear-gradient(135deg, #ffecd2 0%, #fcb69f 100%)'
      },
      {
        id: 'first-project',
        title: 'Builder',
        description: 'Try a practice project',
        icon: '🔨',
        requirement: 'Visit practice project',
        earned: false, // Would need to track project visits
        color: 'linear-gradient(135deg, #89f7fe 0%, #66a6ff 100%)'
      },
    ];
  });
}
