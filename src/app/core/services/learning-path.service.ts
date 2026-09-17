import { Injectable, signal, inject } from '@angular/core';
import { LearningPath } from '../models/lesson.model';
import { LEARNING_PATHS } from './learning-paths.data';
import { ProgressService } from './progress.service';
import { ChallengeService } from './challenge.service';

@Injectable({ providedIn: 'root' })
export class LearningPathService {
  private readonly STORAGE_KEY = 'angular-mastery-paths';
  private progressService = inject(ProgressService);
  private challengeService = inject(ChallengeService);
  private paths = signal<LearningPath[]>(LEARNING_PATHS);

  readonly allPaths = this.paths.asReadonly();

  getPaths(): LearningPath[] {
    return this.paths();
  }

  getPath(id: string): LearningPath | undefined {
    return this.paths().find(p => p.id === id);
  }

  getPathProgress(pathId: string): { completed: number; total: number; percentage: number; milestoneProgress: { title: string; completed: number; total: number }[] } {
    const path = this.getPath(pathId);
    if (!path) return { completed: 0, total: 0, percentage: 0, milestoneProgress: [] };

    const completed = path.lessonIds.filter(id => this.progressService.isLessonCompleted(id)).length;
    const total = path.lessonIds.length;
    const percentage = total > 0 ? Math.round((completed / total) * 100) : 0;

    const milestoneProgress = path.milestones.map(m => ({
      title: m.title,
      completed: m.lessonIds.filter(id => this.progressService.isLessonCompleted(id)).length,
      total: m.lessonIds.length
    }));

    return { completed, total, percentage, milestoneProgress };
  }

  isPathCompleted(pathId: string): boolean {
    const progress = this.getPathProgress(pathId);
    return progress.percentage === 100;
  }

  getNextLesson(pathId: string): number | null {
    const path = this.getPath(pathId);
    if (!path) return null;

    for (const lessonId of path.lessonIds) {
      if (!this.progressService.isLessonCompleted(lessonId)) {
        return lessonId;
      }
    }
    return null;
  }
}
