import { Component, signal, OnInit, OnDestroy } from '@angular/core';

interface LifecycleStep {
  name: string;
  icon: string;
  description: string;
  color: string;
  timing: string;
}

@Component({
  selector: 'app-lifecycle-visualization',
  standalone: true,
  template: `
    <div class="lifecycle-container">
      <div class="lifecycle-header">
        <h2>Component Lifecycle</h2>
        <p>Watch the component lifecycle in action</p>
        <div class="controls">
          <button class="control-btn" (click)="startAnimation()" [disabled]="isPlaying()">
            @if (isPlaying()) {
              <span class="pause-icon">⏸</span> Pause
            } @else {
              <span class="play-icon">▶</span> Play Animation
            }
          </button>
          <button class="control-btn reset" (click)="resetAnimation()">↺ Reset</button>
        </div>
      </div>

      <div class="lifecycle-visual">
        <div class="timeline">
          @for (step of steps; track step.name; let i = $index) {
            <div class="step"
                 [class.active]="activeStep() === i"
                 [class.completed]="activeStep() !== null && activeStep()! > i"
                 (click)="goToStep(i)">
              <div class="step-marker" [style.background]="step.color">
                <span class="step-icon">{{ step.icon }}</span>
              </div>
              <div class="step-content">
                <span class="step-name">{{ step.name }}</span>
                <span class="step-timing">{{ step.timing }}</span>
              </div>
              @if (i < steps.length - 1) {
                <div class="step-connector" [class.active]="activeStep() !== null && activeStep()! > i"></div>
              }
            </div>
          }
        </div>

        <div class="step-details">
          @if (activeStep() !== null && activeStep()! >= 0) {
            <div class="detail-card" [style.border-color]="steps[activeStep()!].color">
              <div class="detail-header">
                <span class="detail-icon" [style.background]="steps[activeStep()!].color">
                  {{ steps[activeStep()!].icon }}
                </span>
                <div>
                  <h3>{{ steps[activeStep()!].name }}</h3>
                  <span class="detail-timing">{{ steps[activeStep()!].timing }}</span>
                </div>
              </div>
              <p class="detail-description">{{ steps[activeStep()!].description }}</p>

              <div class="code-example">
                <span class="code-label">Example</span>
                <pre><code>{{ getCodeExample(steps[activeStep()!].name) }}</code></pre>
              </div>
            </div>
          }
        </div>
      </div>

      <div class="lifecycle-diagram">
        <svg viewBox="0 0 800 200" class="diagram-svg">
          <defs>
            <marker id="arrow" markerWidth="10" markerHeight="7" refX="9" refY="3.5" orient="auto">
              <polygon points="0 0, 10 3.5, 0 7" fill="#667eea"/>
            </marker>
          </defs>

          <!-- Flow line -->
          <path d="M 50 100 L 750 100" stroke="#e0e0e0" stroke-width="4" fill="none"/>

          <!-- Animated progress -->
          <path d="M 50 100 L 750 100"
                stroke="url(#progressGradient)"
                stroke-width="4"
                fill="none"
                class="progress-path"
                [style.stroke-dashoffset]="progressOffset()"/>

          <defs>
            <linearGradient id="progressGradient" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" style="stop-color:#667eea"/>
              <stop offset="100%" style="stop-color:#764ba2"/>
            </linearGradient>
          </defs>

          <!-- Step circles -->
          @for (step of steps; track step.name; let i = $index) {
            <g class="diagram-step" [class.active]="activeStep() === i">
              <circle
                [attr.cx]="50 + (i * 100)"
                cy="100"
                r="20"
                [attr.fill]="activeStep() !== null && activeStep()! >= i ? step.color : '#e0e0e0'"
                class="step-circle"/>
              <text
                [attr.x]="50 + (i * 100)"
                y="105"
                text-anchor="middle"
                class="step-emoji">
                {{ step.icon }}
              </text>
              <text
                [attr.x]="50 + (i * 100)"
                y="145"
                text-anchor="middle"
                class="step-text">
                {{ step.name.split('(')[0] }}
              </text>
            </g>
          }
        </svg>
      </div>
    </div>
  `,
  styles: [`
    .lifecycle-container {
      background: var(--bg-primary);
      border-radius: 16px;
      padding: 32px;
      box-shadow: 0 4px 24px rgba(0,0,0,0.08);
      margin: 32px 0;
    }
    .lifecycle-header {
      text-align: center;
      margin-bottom: 40px;
    }
    .lifecycle-header h2 {
      margin: 0 0 8px;
      font-size: 28px;
      color: var(--text-primary);
    }
    .lifecycle-header p {
      margin: 0 0 24px;
      color: var(--text-secondary);
    }
    .controls {
      display: flex;
      justify-content: center;
      gap: 12px;
    }
    .control-btn {
      padding: 12px 24px;
      border: none;
      border-radius: 8px;
      font-size: 14px;
      font-weight: 600;
      cursor: pointer;
      display: flex;
      align-items: center;
      gap: 8px;
      transition: all 0.2s;
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
      color: white;
    }
    .control-btn:hover {
      transform: translateY(-2px);
      box-shadow: 0 4px 12px rgba(102, 126, 234, 0.4);
    }
    .control-btn:disabled {
      opacity: 0.6;
      cursor: not-allowed;
    }
    .control-btn.reset {
      background: var(--bg-secondary);
      color: var(--text-primary);
    }
    .play-icon, .pause-icon { font-size: 16px; }
    .lifecycle-visual {
      display: grid;
      grid-template-columns: 250px 1fr;
      gap: 32px;
      margin-bottom: 40px;
    }
    .timeline {
      display: flex;
      flex-direction: column;
      gap: 8px;
    }
    .step {
      display: flex;
      align-items: center;
      gap: 12px;
      padding: 12px;
      border-radius: 10px;
      cursor: pointer;
      transition: all 0.2s;
      position: relative;
    }
    .step:hover { background: var(--bg-secondary); }
    .step.active { background: var(--bg-secondary); }
    .step.completed .step-marker { opacity: 1; }
    .step-marker {
      width: 40px;
      height: 40px;
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      opacity: 0.5;
      transition: all 0.3s;
    }
    .step.active .step-marker {
      opacity: 1;
      transform: scale(1.1);
      box-shadow: 0 4px 12px rgba(0,0,0,0.2);
    }
    .step-icon { font-size: 18px; }
    .step-content { flex: 1; }
    .step-name {
      display: block;
      font-weight: 600;
      font-size: 14px;
      color: var(--text-primary);
    }
    .step-timing {
      display: block;
      font-size: 12px;
      color: var(--text-secondary);
    }
    .step-details {
      background: var(--bg-secondary);
      border-radius: 12px;
      padding: 24px;
    }
    .detail-card {
      border-left: 4px solid;
      padding-left: 20px;
    }
    .detail-header {
      display: flex;
      align-items: center;
      gap: 16px;
      margin-bottom: 16px;
    }
    .detail-icon {
      width: 56px;
      height: 56px;
      border-radius: 14px;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 28px;
    }
    .detail-header h3 {
      margin: 0 0 4px;
      font-size: 20px;
      color: var(--text-primary);
    }
    .detail-timing {
      font-size: 13px;
      color: var(--text-secondary);
    }
    .detail-description {
      color: var(--text-secondary);
      line-height: 1.7;
      margin-bottom: 20px;
    }
    .code-example {
      background: #1e1e1e;
      border-radius: 10px;
      overflow: hidden;
    }
    .code-label {
      display: block;
      padding: 10px 16px;
      background: #2d2d2d;
      font-size: 12px;
      color: #999;
      text-transform: uppercase;
      letter-spacing: 0.5px;
    }
    .code-example pre {
      margin: 0;
      padding: 16px;
      overflow-x: auto;
    }
    .code-example code {
      color: #d4d4d4;
      font-family: 'SF Mono', monospace;
      font-size: 13px;
      line-height: 1.6;
    }
    .lifecycle-diagram {
      background: var(--bg-secondary);
      border-radius: 12px;
      padding: 24px;
    }
    .diagram-svg {
      width: 100%;
      height: auto;
    }
    .progress-path {
      stroke-dasharray: 700;
      stroke-dashoffset: 700;
      transition: stroke-dashoffset 0.5s ease;
    }
    .diagram-step { cursor: pointer; }
    .step-circle { transition: all 0.3s; }
    .diagram-step.active .step-circle {
      filter: url(#glow);
    }
    .step-emoji { font-size: 16px; fill: white; }
    .step-text { font-size: 11px; fill: var(--text-secondary); font-weight: 500; }

    @media (max-width: 768px) {
      .lifecycle-visual {
        grid-template-columns: 1fr;
      }
    }
  `]
})
export class LifecycleVisualizationComponent implements OnInit, OnDestroy {
  activeStep = signal<number | null>(null);
  isPlaying = signal(false);
  progressOffset = signal(700);

  private animationInterval: any;

  steps: LifecycleStep[] = [
    { name: 'constructor()', icon: '🏗️', description: 'Called when the component is instantiated. Use for basic initialization, but avoid heavy logic here.', color: '#667eea', timing: 'Class instantiation' },
    { name: 'ngOnChanges()', icon: '🔄', description: 'Called before ngOnInit and whenever input properties change. Receives a SimpleChanges object.', color: '#764ba2', timing: 'Before init / On input change' },
    { name: 'ngOnInit()', icon: '🚀', description: 'Called once after the first ngOnChanges. Use for component initialization and fetching data.', color: '#f093fb', timing: 'Once on initialization' },
    { name: 'ngDoCheck()', icon: '🔍', description: 'Called for custom change detection. Use to implement your own change detection logic.', color: '#fa709a', timing: 'Every change detection cycle' },
    { name: 'ngAfterContentInit()', icon: '📥', description: 'Called after content (ng-content) has been projected into the component.', color: '#43e97b', timing: 'After content projection' },
    { name: 'ngAfterViewInit()', icon: '👁️', description: 'Called after the component\'s view has been fully initialized. Safe to access ViewChild here.', color: '#4facfe', timing: 'After view initialization' },
    { name: 'ngAfterViewChecked()', icon: '✅', description: 'Called after the component\'s view has been checked. Use sparingly for performance.', color: '#84fab0', timing: 'After view check' },
    { name: 'ngOnDestroy()', icon: '🧹', description: 'Called just before the component is destroyed. Clean up subscriptions, event listeners, etc.', color: '#f5576c', timing: 'Before destruction' },
  ];

  ngOnInit(): void {}

  ngOnDestroy(): void {
    this.stopAnimation();
  }

  startAnimation(): void {
    if (this.isPlaying()) {
      this.stopAnimation();
      return;
    }

    this.isPlaying.set(true);
    let step = 0;
    this.activeStep.set(0);
    this.updateProgress(0);

    this.animationInterval = setInterval(() => {
      step++;
      if (step >= this.steps.length) {
        this.stopAnimation();
        return;
      }
      this.activeStep.set(step);
      this.updateProgress(step);
    }, 1500);
  }

  stopAnimation(): void {
    this.isPlaying.set(false);
    if (this.animationInterval) {
      clearInterval(this.animationInterval);
    }
  }

  resetAnimation(): void {
    this.stopAnimation();
    this.activeStep.set(null);
    this.progressOffset.set(700);
  }

  goToStep(index: number): void {
    this.stopAnimation();
    this.activeStep.set(index);
    this.updateProgress(index);
  }

  private updateProgress(step: number): void {
    const totalSteps = this.steps.length - 1;
    const offset = 700 - (step / totalSteps) * 700;
    this.progressOffset.set(offset);
  }

  getCodeExample(name: string): string {
    const examples: { [key: string]: string } = {
      'constructor()': `@Component({...})
export class MyComponent {
  private service = inject(MyService);
  
  constructor() {
    // Basic initialization
    // Avoid heavy logic here
    console.log('Component created');
  }
}`,
      'ngOnChanges()': `@Component({...})
export class MyComponent {
  @Input() name = '';
  
  ngOnChanges(changes: SimpleChanges) {
    if (changes['name']) {
      console.log('Name changed:', changes['name'].currentValue);
    }
  }
}`,
      'ngOnInit()': `@Component({...})
export class MyComponent implements OnInit {
  data: any[] = [];
  
  ngOnInit() {
    // Fetch data, setup subscriptions
    this.loadData();
  }
  
  private loadData() {
    this.service.getData().subscribe(data => {
      this.data = data;
    });
  }
}`,
      'ngDoCheck()': `@Component({...})
export class MyComponent implements DoCheck {
  ngDoCheck() {
    // Custom change detection
    // Called every detection cycle
    console.log('Change detected');
  }
}`,
      'ngAfterContentInit()': `@Component({...})
export class MyComponent implements AfterContentInit {
  @ContentChild('content') content!: ElementRef;
  
  ngAfterContentInit() {
    // Access projected content
    console.log(this.content.nativeElement);
  }
}`,
      'ngAfterViewInit()': `@Component({...})
export class MyComponent implements AfterViewInit {
  @ViewChild('chart') chart!: ElementRef;
  
  ngAfterViewInit() {
    // Initialize third-party libraries
    new Chart(this.chart.nativeElement);
  }
}`,
      'ngAfterViewChecked()': `@Component({...})
export class MyComponent implements AfterViewChecked {
  ngAfterViewChecked() {
    // Called after view is checked
    // Use sparingly - performance impact
  }
}`,
      'ngOnDestroy()': `@Component({...})
export class MyComponent implements OnDestroy {
  private subscription!: Subscription;
  
  ngOnDestroy() {
    // Cleanup subscriptions
    this.subscription.unsubscribe();
    // Remove event listeners
    // Cancel pending requests
  }
}`,
    };
    return examples[name] || '// No example available';
  }
}
