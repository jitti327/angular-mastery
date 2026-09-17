import { Component, inject, signal, input, output } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CodingChallenge } from '../../core/models/lesson.model';
import { ChallengeService } from '../../core/services/challenge.service';
import { trigger, transition, style, animate, query, stagger } from '@angular/animations';

@Component({
  selector: 'app-challenge-list',
  standalone: true,
  imports: [RouterLink],
  animations: [
    trigger('staggerIn', [
      transition(':enter', [
        query('.challenge-card', [
          style({ opacity: 0, transform: 'translateY(20px)' })
        ], { optional: true }),
        query('.challenge-card', [
          stagger(80, [
            animate('400ms cubic-bezier(0.35, 0, 0.25, 1)', style({ opacity: 1, transform: 'translateY(0)' }))
          ])
        ], { optional: true })
      ])
    ])
  ],
  template: `
    <div class="challenge-list">
      <div class="page-header">
        <h1>Coding Challenges</h1>
        <p>Practice your skills with hands-on coding problems. Write real code and test it against test cases.</p>
      </div>

      <div class="filters">
        <button class="filter-btn" [class.active]="activeFilter() === 'all'" (click)="activeFilter.set('all')">All</button>
        <button class="filter-btn" [class.active]="activeFilter() === 'easy'" (click)="activeFilter.set('easy')">Easy</button>
        <button class="filter-btn" [class.active]="activeFilter() === 'medium'" (click)="activeFilter.set('medium')">Medium</button>
        <button class="filter-btn" [class.active]="activeFilter() === 'hard'" (click)="activeFilter.set('hard')">Hard</button>
      </div>

      <div class="challenges-grid" @staggerIn>
        @for (challenge of filteredChallenges(); track challenge.id) {
          <a [routerLink]="['/challenge', challenge.id]" class="challenge-card" [class.completed]="challengeService.isChallengeCompleted(challenge.id)">
            <div class="challenge-header">
              <span class="difficulty-badge" [class]="challenge.difficulty">{{ challenge.difficulty }}</span>
              <span class="challenge-duration">{{ challenge.duration }}</span>
            </div>
            <h3>{{ challenge.title }}</h3>
            <p>{{ challenge.description }}</p>
            <div class="challenge-meta">
              <span class="category">{{ challenge.category }}</span>
              <span class="tests">{{ challenge.testCases.length }} test cases</span>
            </div>
            @if (challengeService.isChallengeCompleted(challenge.id)) {
              <div class="completed-badge">✓ Completed</div>
            }
          </a>
        }
      </div>
    </div>
  `,
  styles: [`
    .challenge-list { max-width: 1000px; margin: 0 auto; padding: 32px 24px; }
    .page-header { text-align: center; margin-bottom: 32px; }
    .page-header h1 { font-size: 36px; color: var(--text-primary); margin: 0 0 12px; }
    .page-header p { color: var(--text-secondary); font-size: 16px; margin: 0; }
    .filters { display: flex; gap: 8px; justify-content: center; margin-bottom: 32px; }
    .filter-btn {
      padding: 8px 20px; border: 1px solid var(--border-color); border-radius: 20px;
      background: transparent; color: var(--text-secondary); cursor: pointer;
      font-size: 14px; transition: all 0.2s;
    }
    .filter-btn:hover { border-color: var(--primary); color: var(--primary); }
    .filter-btn.active { background: var(--primary); color: white; border-color: var(--primary); }
    .challenges-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(300px, 1fr)); gap: 20px; }
    .challenge-card {
      display: block; padding: 24px; border: 1px solid var(--border-color);
      border-radius: 12px; background: var(--card-bg); text-decoration: none;
      transition: all 0.2s; position: relative;
    }
    .challenge-card:hover { transform: translateY(-4px); box-shadow: 0 12px 32px rgba(0,0,0,0.1); }
    .challenge-card.completed { border-color: #10b981; }
    .challenge-header { display: flex; justify-content: space-between; align-items: center; margin-bottom: 12px; }
    .difficulty-badge {
      padding: 4px 12px; border-radius: 12px; font-size: 12px; font-weight: 600; text-transform: uppercase;
    }
    .difficulty-badge.easy { background: #d1fae5; color: #065f46; }
    .difficulty-badge.medium { background: #fef3c7; color: #92400e; }
    .difficulty-badge.hard { background: #fee2e2; color: #991b1b; }
    .challenge-duration { color: var(--text-secondary); font-size: 13px; }
    .challenge-card h3 { color: var(--text-primary); margin: 0 0 8px; font-size: 18px; }
    .challenge-card p { color: var(--text-secondary); font-size: 14px; margin: 0 0 16px; line-height: 1.5; }
    .challenge-meta { display: flex; gap: 12px; font-size: 12px; color: var(--text-secondary); }
    .completed-badge {
      position: absolute; top: 12px; right: 12px; background: #10b981; color: white;
      padding: 4px 10px; border-radius: 12px; font-size: 12px; font-weight: 600;
    }
    @media (max-width: 768px) {
      .challenges-grid { grid-template-columns: 1fr; }
    }
  `]
})
export class ChallengeListComponent {
  challengeService = inject(ChallengeService);
  activeFilter = signal<string>('all');

  filteredChallenges = (): CodingChallenge[] => {
    const filter = this.activeFilter();
    const all = this.challengeService.getChallenges();
    return filter === 'all' ? all : all.filter(c => c.difficulty === filter);
  };
}
