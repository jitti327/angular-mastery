import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-skeleton',
  standalone: true,
  template: `
    <div class="skeleton-wrapper">
      @for (line of linesArray; track line) {
        <div
          class="skeleton"
          [style.width]="line === linesArray.length && lines > 1 ? '60%' : width"
          [style.height]="height"
          [style.border-radius]="borderRadius">
        </div>
      }
    </div>
  `,
  styles: [`
    .skeleton-wrapper {
      display: flex;
      flex-direction: column;
      gap: 8px;
    }
    .skeleton {
      background: linear-gradient(
        90deg,
        var(--bg-secondary) 25%,
        var(--border-color) 50%,
        var(--bg-secondary) 75%
      );
      background-size: 200% 100%;
      animation: shimmer 1.5s infinite;
    }
    @keyframes shimmer {
      0% { background-position: -200% 0; }
      100% { background-position: 200% 0; }
    }
  `]
})
export class SkeletonComponent {
  @Input() width = '100%';
  @Input() height = '20px';
  @Input() borderRadius = '8px';
  @Input() lines = 1;

  get linesArray(): number[] {
    return Array.from({ length: this.lines }, (_, i) => i);
  }
}
