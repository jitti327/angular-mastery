import { Routes } from '@angular/router';
import { HomeComponent } from './features/home/home.component';
import { LessonsListComponent } from './features/lessons/lessons-list/lessons-list.component';
import { LessonPageComponent } from './features/lessons/lesson-page/lesson-page.component';
import { TodoProjectComponent } from './features/practice-projects/todo-app/todo-project.component';
import { WeatherProjectComponent } from './features/practice-projects/weather-dashboard/weather-project.component';
import { EcommerceProjectComponent } from './features/practice-projects/ecommerce/ecommerce-project.component';
import { ChatProjectComponent } from './features/practice-projects/chat-app/chat-project.component';
import { VersionComparatorComponent } from './shared/components/version-comparator/version-comparator.component';
import { VisualsDashboardComponent } from './features/visuals/visuals-dashboard.component';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'lessons', component: LessonsListComponent },
  { path: 'lesson/:id', component: LessonPageComponent },
  { path: 'practice/todo', component: TodoProjectComponent },
  { path: 'practice/weather', component: WeatherProjectComponent },
  { path: 'practice/ecommerce', component: EcommerceProjectComponent },
  { path: 'practice/chat', component: ChatProjectComponent },
  { path: 'version-comparison', component: VersionComparatorComponent },
  { path: 'visuals', component: VisualsDashboardComponent },
  { path: '**', redirectTo: '' }
];
