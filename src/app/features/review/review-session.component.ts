import { Component, inject, signal, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { SpacedRepetitionService } from '../../core/services/spaced-repetition.service';
import { ReviewCard } from '../../core/models/lesson.model';
import { trigger, transition, style, animate } from '@angular/animations';

@Component({
  selector: 'app-review-session',
  standalone: true,
  imports: [RouterLink],
  animations: [
    trigger('cardFlip', [
      transition(':enter', [
        style({ opacity: 0, transform: 'scale(0.9)' }),
        animate('300ms ease-out', style({ opacity: 1, transform: 'scale(1)' }))
      ]),
      transition(':leave', [
        animate('200ms ease-in', style({ opacity: 0, transform: 'scale(0.9)' }))
      ])
    ])
  ],
  template: `
    <div class="review-page">
      <div class="page-header">
        <h1>🔄 Spaced Repetition Review</h1>
        <p>Review completed lessons at optimal intervals to strengthen long-term retention.</p>
      </div>

      <div class="review-stats">
        <div class="stat-card">
          <span class="stat-number">{{ spacedRepService.getDueCount() }}</span>
          <span class="stat-label">Due for Review</span>
        </div>
        <div class="stat-card">
          <span class="stat-number">{{ spacedRepService.reviewCards().length }}</span>
          <span class="stat-label">Total Cards</span>
        </div>
      </div>

      @if (currentCard(); as card) {
        <div class="review-card" @cardFlip>
          <div class="card-header">
            <span class="card-number">Card {{ currentIndex() + 1 }} of {{ dueCards().length }}</span>
            <span class="interval">Interval: {{ card.interval }} days</span>
          </div>

          @if (!showAnswer()) {
            <div class="card-front">
              <h2>{{ spacedRepService.getLessonTitle(card.lessonId) }}</h2>
              <p class="prompt">Can you recall the key concepts from this lesson?</p>
              <button class="show-btn" (click)="showAnswer.set(true)">Show Answer</button>
            </div>
          } @else {
            <div class="card-back">
              <h3>How well did you remember?</h3>
              <p>Rate your recall to schedule the next review:</p>
              <div class="rating-buttons">
                <button class="rating-btn again" (click)="rateCard(1)">
                  <span class="rating-label">Again</span>
                  <span class="rating-interval">1 day</span>
                </button>
                <button class="rating-btn hard" (click)="rateCard(3)">
                  <span class="rating-label">Hard</span>
                  <span class="rating-interval">{{ getInterval(card, 3) }} days</span>
                </button>
                <button class="rating-btn good" (click)="rateCard(4)">
                  <span class="rating-label">Good</span>
                  <span class="rating-interval">{{ getInterval(card, 4) }} days</span>
                </button>
                <button class="rating-btn easy" (click)="rateCard(5)">
                  <span class="rating-label">Easy</span>
                  <span class="rating-interval">{{ getInterval(card, 5) }} days</span>
                </button>
              </div>
            </div>
          }
        </div>
      } @else if (spacedRepService.getDueCount() === 0) {
        <div class="empty-state">
          <div class="empty-icon">🎉</div>
          <h2>All caught up!</h2>
          <p>No cards due for review right now. Complete more lessons to add cards to your review deck.</p>
          <a routerLink="/lessons" class="browse-btn">Browse Lessons</a>
        </div>
      }
    </div>
  `,
  styles: [`
    .review-page { max-width: 700px; margin: 0 auto; padding: 32px 24px; }
    .page-header { text-align: center; margin-bottom: 32px; }
    .page-header h1 { font-size: 32px; color: var(--text-primary); margin: 0 0 8px; }
    .page-header p { color: var(--text-secondary); margin: 0; }
    .review-stats { display: flex; gap: 16px; justify-content: center; margin-bottom: 32px; }
    .stat-card {
      padding: 20px 32px; border: 1px solid var(--border-color); border-radius: 12px;
      text-align: center; background: var(--card-bg);
    }
    .stat-number { display: block; font-size: 32px; font-weight: bold; color: var(--primary); }
    .stat-label { font-size: 13px; color: var(--text-secondary); }
    .review-card {
      border: 2px solid var(--border-color); border-radius: 16px; overflow: hidden;
      background: var(--card-bg);
    }
    .card-header {
      display: flex; justify-content: space-between; padding: 16px 24px;
      background: var(--tag-bg, rgba(0,0,0,0.03)); border-bottom: 1px solid var(--border-color);
      font-size: 13px; color: var(--text-secondary);
    }
    .card-front, .card-back { padding: 48px 32px; text-align: center; }
    .card-front h2 { margin: 0 0 16px; font-size: 24px; color: var(--text-primary); }
    .prompt { color: var(--text-secondary); margin-bottom: 24px; }
    .show-btn {
      padding: 12px 32px; background: var(--primary); color: white; border: none;
      border-radius: 8px; font-size: 16px; font-weight: 600; cursor: pointer;
    }
    .show-btn:hover { background: #c5002d; }
    .card-back h3 { margin: 0 0 8px; color: var(--text-primary); }
    .card-back > p { color: var(--text-secondary); margin-bottom: 24px; }
    .rating-buttons { display: grid; grid-template-columns: repeat(4, 1fr); gap: 12px; }
    .rating-btn {
      padding: 16px 12px; border: 2px solid; border-radius: 12px; cursor: pointer;
      transition: transform 0.2s, box-shadow 0.2s;
    }
    .rating-btn:hover { transform: translateY(-2px); box-shadow: 0 4px 12px rgba(0,0,0,0.15); }
    .rating-btn.again { border-color: #ef4444; background: #fef2f2; }
    .rating-btn.hard { border-color: #f59e0b; background: #fffbeb; }
    .rating-btn.good { border-color: #10b981; background: #ecfdf5; }
    .rating-btn.easy { border-color: #3b82f6; background: #eff6ff; }
    .rating-label { display: block; font-weight: 600; font-size: 14px; margin-bottom: 4px; }
    .rating-btn.again .rating-label { color: #dc2626; }
    .rating-btn.hard .rating-label { color: #d97706; }
    .rating-btn.good .rating-label { color: #059669; }
    .rating-btn.easy .rating-label { color: #2563eb; }
    .rating-interval { font-size: 12px; color: var(--text-secondary); }
    .empty-state { text-align: center; padding: 60px 24px; }
    .empty-icon { font-size: 64px; margin-bottom: 16px; }
    .empty-state h2 { margin: 0 0 8px; color: var(--text-primary); }
    .empty-state p { color: var(--text-secondary); margin-bottom: 24px; }
    .browse-btn {
      display: inline-block; padding: 12px 24px; background: var(--primary); color: white;
      text-decoration: none; border-radius: 8px; font-weight: 600;
    }
    @media (max-width: 600px) {
      .rating-buttons { grid-template-columns: repeat(2, 1fr); }
    }
  `]
})
export class ReviewSessionComponent implements OnInit {
  spacedRepService = inject(SpacedRepetitionService);

  dueCards = signal<ReviewCard[]>([]);
  currentIndex = signal(0);
  currentCard = signal<ReviewCard | null>(null);
  showAnswer = signal(false);

  ngOnInit(): void {
    this.spacedRepService.autoAddCompletedLessons();
    this.dueCards.set(this.spacedRepService.getDueReviews());
    if (this.dueCards().length > 0) {
      this.currentCard.set(this.dueCards()[0]);
    }
  }

  rateCard(quality: number): void {
    const card = this.currentCard();
    if (!card) return;

    this.spacedRepService.reviewCard(card.lessonId, quality);

    const nextIndex = this.currentIndex() + 1;
    this.showAnswer.set(false);

    if (nextIndex < this.dueCards().length) {
      this.currentIndex.set(nextIndex);
      this.currentCard.set(this.dueCards()[nextIndex]);
    } else {
      this.currentCard.set(null);
      this.dueCards.set(this.spacedRepService.getDueReviews());
      this.currentIndex.set(0);
      if (this.dueCards().length > 0) {
        this.currentCard.set(this.dueCards()[0]);
      }
    }
  }

  getInterval(card: ReviewCard, quality: number): number {
    let interval = card.interval;
    if (quality >= 3) {
      if (card.repetitions === 0) interval = 1;
      else if (card.repetitions === 1) interval = 6;
      else interval = Math.round(interval * card.easeFactor);
    } else {
      interval = 1;
    }
    return interval;
  }
}
