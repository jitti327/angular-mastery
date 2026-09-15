import { Injectable, signal, computed } from '@angular/core';
import { UserProgress } from '../models/lesson.model';

@Injectable({
  providedIn: 'root'
})
export class ProgressService {
  private readonly STORAGE_KEY = 'angular-mastery-progress';

  private progressSignal = signal<UserProgress>(this.loadProgress());

  readonly progress = this.progressSignal.asReadonly();
  readonly completedCount = computed(() => this.progressSignal().completedLessons.length);
  readonly percentage = computed(() => Math.round((this.completedCount() / 10) * 100));

  private loadProgress(): UserProgress {
    if (typeof localStorage !== 'undefined') {
      const saved = localStorage.getItem(this.STORAGE_KEY);
      if (saved) {
        return JSON.parse(saved);
      }
    }
    return {
      completedLessons: [],
      quizScores: {},
      currentLesson: 1,
      lastAccessed: new Date()
    };
  }

  private saveProgress(): void {
    if (typeof localStorage !== 'undefined') {
      localStorage.setItem(this.STORAGE_KEY, JSON.stringify(this.progressSignal()));
    }
  }

  completeLesson(lessonId: number): void {
    const current = this.progressSignal();
    if (!current.completedLessons.includes(lessonId)) {
      this.progressSignal.set({
        ...current,
        completedLessons: [...current.completedLessons, lessonId],
        lastAccessed: new Date()
      });
      this.saveProgress();
    }
  }

  setQuizScore(lessonId: number, score: number): void {
    const current = this.progressSignal();
    this.progressSignal.set({
      ...current,
      quizScores: { ...current.quizScores, [lessonId]: score },
      lastAccessed: new Date()
    });
    this.saveProgress();
  }

  setCurrentLesson(lessonId: number): void {
    const current = this.progressSignal();
    this.progressSignal.set({
      ...current,
      currentLesson: lessonId,
      lastAccessed: new Date()
    });
    this.saveProgress();
  }

  isLessonCompleted(lessonId: number): boolean {
    return this.progressSignal().completedLessons.includes(lessonId);
  }

  resetProgress(): void {
    this.progressSignal.set({
      completedLessons: [],
      quizScores: {},
      currentLesson: 1,
      lastAccessed: new Date()
    });
    this.saveProgress();
  }
}
