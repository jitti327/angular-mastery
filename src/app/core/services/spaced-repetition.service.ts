import { Injectable, signal, inject } from '@angular/core';
import { ReviewCard } from '../models/lesson.model';
import { ProgressService } from './progress.service';
import { LessonService } from './lesson.service';

@Injectable({ providedIn: 'root' })
export class SpacedRepetitionService {
  private readonly STORAGE_KEY = 'angular-mastery-reviews';
  private progressService = inject(ProgressService);
  private lessonService = inject(LessonService);
  private cards = signal<ReviewCard[]>(this.loadCards());

  readonly reviewCards = this.cards.asReadonly();

  addCard(lessonId: number): void {
    if (this.cards().some(c => c.lessonId === lessonId)) return;

    const card: ReviewCard = {
      lessonId,
      nextReview: new Date(),
      easeFactor: 2.5,
      interval: 1,
      repetitions: 0,
      lastReviewed: new Date()
    };
    this.cards.set([...this.cards(), card]);
    this.saveCards();
  }

  reviewCard(lessonId: number, quality: number): void {
    const card = this.cards().find(c => c.lessonId === lessonId);
    if (!card) return;

    // SM-2 algorithm simplified
    let { easeFactor, interval, repetitions } = card;

    if (quality >= 3) {
      if (repetitions === 0) interval = 1;
      else if (repetitions === 1) interval = 6;
      else interval = Math.round(interval * easeFactor);
      repetitions++;
    } else {
      repetitions = 0;
      interval = 1;
    }

    easeFactor = Math.max(1.3, easeFactor + (0.1 - (5 - quality) * (0.08 + (5 - quality) * 0.02)));

    const nextReview = new Date();
    nextReview.setDate(nextReview.getDate() + interval);

    const updated = this.cards().map(c =>
      c.lessonId === lessonId
        ? { ...c, easeFactor, interval, repetitions, nextReview, lastReviewed: new Date() }
        : c
    );
    this.cards.set(updated);
    this.saveCards();
  }

  getDueReviews(): ReviewCard[] {
    const now = new Date();
    return this.cards().filter(c => new Date(c.nextReview) <= now);
  }

  getDueCount(): number {
    return this.getDueReviews().length;
  }

  getLessonTitle(lessonId: number): string {
    const lesson = this.lessonService.getLesson(lessonId);
    return lesson ? lesson.title : `Lesson ${lessonId}`;
  }

  autoAddCompletedLessons(): void {
    const completed = this.progressService.progress().completedLessons;
    for (const lessonId of completed) {
      this.addCard(lessonId);
    }
  }

  private loadCards(): ReviewCard[] {
    if (typeof localStorage !== 'undefined') {
      const saved = localStorage.getItem(this.STORAGE_KEY);
      if (saved) {
        try {
          return JSON.parse(saved);
        } catch {
          localStorage.removeItem(this.STORAGE_KEY);
        }
      }
    }
    return [];
  }

  private saveCards(): void {
    if (typeof localStorage !== 'undefined') {
      localStorage.setItem(this.STORAGE_KEY, JSON.stringify(this.cards()));
    }
  }
}
