import { Routes } from '@angular/router';

export const routes: Routes = [
  { path: '', loadComponent: () => import('./features/home/home.component').then(m => m.HomeComponent) },
  { path: 'lessons', loadComponent: () => import('./features/lessons/lessons-list/lessons-list.component').then(m => m.LessonsListComponent) },
  { path: 'lessons/:category', loadComponent: () => import('./features/lessons/lessons-list/lessons-list.component').then(m => m.LessonsListComponent) },
  { path: 'lesson/:id', loadComponent: () => import('./features/lessons/lesson-page/lesson-page.component').then(m => m.LessonPageComponent) },
  { path: 'challenges', loadComponent: () => import('./features/challenges/challenge-list.component').then(m => m.ChallengeListComponent) },
  { path: 'challenge/:id', loadComponent: () => import('./features/challenges/challenge-page.component').then(m => m.ChallengePageComponent) },
  { path: 'learning-paths', loadComponent: () => import('./features/learning-paths/learning-paths.component').then(m => m.LearningPathsComponent) },
  { path: 'learning-path/:id', loadComponent: () => import('./features/learning-paths/learning-path-detail.component').then(m => m.LearningPathDetailComponent) },
  { path: 'review', loadComponent: () => import('./features/review/review-session.component').then(m => m.ReviewSessionComponent) },
  { path: 'practice/todo', loadComponent: () => import('./features/practice-projects/todo-app/todo-project.component').then(m => m.TodoProjectComponent) },
  { path: 'practice/weather', loadComponent: () => import('./features/practice-projects/weather-dashboard/weather-project.component').then(m => m.WeatherProjectComponent) },
  { path: 'practice/ecommerce', loadComponent: () => import('./features/practice-projects/ecommerce/ecommerce-project.component').then(m => m.EcommerceProjectComponent) },
  { path: 'practice/chat', loadComponent: () => import('./features/practice-projects/chat-app/chat-project.component').then(m => m.ChatProjectComponent) },
  { path: 'version-comparison', loadComponent: () => import('./shared/components/version-comparator/version-comparator.component').then(m => m.VersionComparatorComponent) },
  { path: 'visuals', loadComponent: () => import('./features/visuals/visuals-dashboard.component').then(m => m.VisualsDashboardComponent) },
  { path: 'knowledge-base', loadComponent: () => import('./features/knowledge-base/knowledge-base.component').then(m => m.KnowledgeBaseComponent) },
  { path: '**', loadComponent: () => import('./features/not-found/not-found.component').then(m => m.NotFoundComponent) }
];
