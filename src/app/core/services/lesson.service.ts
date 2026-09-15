import { Injectable } from '@angular/core';
import { Lesson } from '../models/lesson.model';
import { LESSONS } from './lessons-foundation.data';
import { INTERMEDIATE_LESSONS } from './lessons-intermediate.data';
import { ADVANCED_LESSONS } from './lessons-advanced.data';
import { JAVASCRIPT_LESSONS } from './js-lessons-foundation.data';
import { JS_INTERMEDIATE_LESSONS } from './js-lessons-intermediate.data';
import { JS_ADVANCED_LESSONS } from './js-lessons-advanced.data';
import { TS_FOUNDATION_LESSONS } from './ts-lessons-foundation.data';
import { TS_INTERMEDIATE_LESSONS } from './ts-lessons-intermediate.data';
import { TS_ADVANCED_LESSONS } from './ts-lessons-advanced.data';

export type LessonCategory = 'angular' | 'javascript' | 'typescript';

@Injectable({
  providedIn: 'root'
})
export class LessonService {
  private angularLessons: Lesson[] = [...LESSONS, ...INTERMEDIATE_LESSONS, ...ADVANCED_LESSONS];
  private jsLessons: Lesson[] = [...JAVASCRIPT_LESSONS, ...JS_INTERMEDIATE_LESSONS, ...JS_ADVANCED_LESSONS];
  private tsLessons: Lesson[] = [...TS_FOUNDATION_LESSONS, ...TS_INTERMEDIATE_LESSONS, ...TS_ADVANCED_LESSONS];

  private allLessons: Lesson[] = [...this.angularLessons, ...this.jsLessons, ...this.tsLessons];

  getLessons(category?: LessonCategory): Lesson[] {
    if (category === 'javascript') return this.jsLessons;
    if (category === 'typescript') return this.tsLessons;
    if (category === 'angular') return this.angularLessons;
    return this.allLessons;
  }

  getLesson(id: number): Lesson | undefined {
    return this.allLessons.find(l => l.id === id);
  }

  getLessonBySlug(slug: string): Lesson | undefined {
    return this.allLessons.find(l => l.slug === slug);
  }

  getLessonsByLevel(level: 'beginner' | 'intermediate' | 'advanced', category?: LessonCategory): Lesson[] {
    const lessons = category ? this.getLessons(category) : this.allLessons;
    return lessons.filter(l => l.level === level);
  }

  getLessonCount(): number {
    return this.allLessons.length;
  }

  getLessonCountByCategory(category: LessonCategory): number {
    return this.getLessons(category).length;
  }

  getAngularLessons(): Lesson[] {
    return this.angularLessons;
  }

  getJsLessons(): Lesson[] {
    return this.jsLessons;
  }

  getTsLessons(): Lesson[] {
    return this.tsLessons;
  }

  getLessonCategory(id: number): LessonCategory | undefined {
    if (this.angularLessons.some(l => l.id === id)) return 'angular';
    if (this.jsLessons.some(l => l.id === id)) return 'javascript';
    if (this.tsLessons.some(l => l.id === id)) return 'typescript';
    return undefined;
  }

  getPrevLesson(id: number): Lesson | undefined {
    const category = this.getLessonCategory(id);
    const lessons = category ? this.getLessons(category) : this.allLessons;
    const index = lessons.findIndex(l => l.id === id);
    return index > 0 ? lessons[index - 1] : undefined;
  }

  getNextLesson(id: number): Lesson | undefined {
    const category = this.getLessonCategory(id);
    const lessons = category ? this.getLessons(category) : this.allLessons;
    const index = lessons.findIndex(l => l.id === id);
    return index >= 0 && index < lessons.length - 1 ? lessons[index + 1] : undefined;
  }

  getLessonIndexInCategory(id: number): number {
    const category = this.getLessonCategory(id);
    const lessons = category ? this.getLessons(category) : this.allLessons;
    return lessons.findIndex(l => l.id === id) + 1;
  }

  getLessonCountInCategory(id: number): number {
    const category = this.getLessonCategory(id);
    return category ? this.getLessons(category).length : this.allLessons.length;
  }
}
