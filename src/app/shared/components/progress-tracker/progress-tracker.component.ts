import { Component, input } from '@angular/core';
import { ProgressService } from '../../../core/services/progress.service';

@Component({
  selector: 'app-progress-tracker',
  standalone: true,
  template: `
    <div class="progress-container">
      <div class="progress-header">
        <span class="progress-label">Your Progress</span>
        <span class="progress-percentage">{{ progressService.percentage() }}%</span>
      </div>
      <div class="progress-bar">
        <div class="progress-fill" [style.width.%]="progressService.percentage()"></div>
      </div>
      <div class="progress-details">
        <span>{{ progressService.completedCount() }} of {{ totalLessons() }} lessons completed</span>
      </div>
    </div>
  `,
  styles: [`
    .progress-container {
      padding: 16px;
      background: white;
      border-radius: 12px;
      box-shadow: 0 2px 8px rgba(0,0,0,0.1);
    }
    .progress-header {
      display: flex;
      justify-content: space-between;
      margin-bottom: 8px;
    }
    .progress-label {
      font-weight: 600;
      color: #333;
    }
    .progress-percentage {
      font-weight: 700;
      color: #4fc3f7;
    }
    .progress-bar {
      height: 8px;
      background: #e0e0e0;
      border-radius: 4px;
      overflow: hidden;
    }
    .progress-fill {
      height: 100%;
      background: linear-gradient(90deg, #4fc3f7, #2196f3);
      border-radius: 4px;
      transition: width 0.3s ease;
    }
    .progress-details {
      margin-top: 8px;
      font-size: 14px;
      color: #666;
    }
  `]
})
export class ProgressTrackerComponent {
  totalLessons = input(10);

  constructor(public progressService: ProgressService) {}
}
