import { Injectable, signal, computed, inject } from '@angular/core';
import { UserProgress } from '../models/lesson.model';
import { LessonService } from './lesson.service';

@Injectable({
  providedIn: 'root'
})
export class ProgressService {
  private readonly STORAGE_KEY = 'angular-mastery-progress';
  private readonly BOOKMARKS_KEY = 'angular-mastery-bookmarks';
  private lessonService = inject(LessonService);

  private progressSignal = signal<UserProgress>(this.loadProgress());
  bookmarks = signal<number[]>(this.loadBookmarks());

  readonly progress = this.progressSignal.asReadonly();
  readonly completedCount = computed(() => this.progressSignal().completedLessons.length);
  readonly percentage = computed(() => Math.round((this.completedCount() / this.lessonService.getLessonCount()) * 100));

  private loadProgress(): UserProgress {
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

  private loadBookmarks(): number[] {
    if (typeof localStorage !== 'undefined') {
      const saved = localStorage.getItem(this.BOOKMARKS_KEY);
      if (saved) {
        try {
          return JSON.parse(saved);
        } catch {
          localStorage.removeItem(this.BOOKMARKS_KEY);
        }
      }
    }
    return [];
  }

  private saveBookmarks(): void {
    if (typeof localStorage !== 'undefined') {
      localStorage.setItem(this.BOOKMARKS_KEY, JSON.stringify(this.bookmarks()));
    }
  }

  toggleBookmark(lessonId: number): void {
    const current = this.bookmarks();
    if (current.includes(lessonId)) {
      this.bookmarks.set(current.filter(id => id !== lessonId));
    } else {
      this.bookmarks.set([...current, lessonId]);
    }
    this.saveBookmarks();
  }

  isBookmarked(lessonId: number): boolean {
    return this.bookmarks().includes(lessonId);
  }

  getBookmarkedLessons(): number[] {
    return this.bookmarks();
  }
}
