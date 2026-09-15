import { Injectable } from '@angular/core';
import { Lesson } from '../models/lesson.model';
import { LESSONS } from './lessons-foundation.data';
import { INTERMEDIATE_LESSONS } from './lessons-intermediate.data';
import { ADVANCED_LESSONS } from './lessons-advanced.data';

@Injectable({
  providedIn: 'root'
})
export class LessonService {
  private lessons: Lesson[] = [...LESSONS, ...INTERMEDIATE_LESSONS, ...ADVANCED_LESSONS];

  getLessons(): Lesson[] {
    return this.lessons;
  }

  getLesson(id: number): Lesson | undefined {
    return this.lessons.find(l => l.id === id);
  }

  getLessonBySlug(slug: string): Lesson | undefined {
    return this.lessons.find(l => l.slug === slug);
  }

  getLessonsByLevel(level: 'beginner' | 'intermediate' | 'advanced'): Lesson[] {
    return this.lessons.filter(l => l.level === level);
  }

  getLessonCount(): number {
    return this.lessons.length;
  }
}
