import { Component, inject, signal, OnInit } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { ChallengeService } from '../../core/services/challenge.service';
import { CodingChallenge } from '../../core/models/lesson.model';
import { trigger, transition, style, animate } from '@angular/animations';

@Component({
  selector: 'app-challenge-page',
  standalone: true,
  imports: [RouterLink],
  animations: [
    trigger('fadeIn', [
      transition(':enter', [
        style({ opacity: 0, transform: 'translateY(20px)' }),
        animate('400ms cubic-bezier(0.35, 0, 0.25, 1)', style({ opacity: 1, transform: 'translateY(0)' }))
      ])
    ]),
    trigger('slideIn', [
      transition(':enter', [
        style({ opacity: 0, transform: 'translateX(-20px)' }),
        animate('300ms cubic-bezier(0.35, 0, 0.25, 1)', style({ opacity: 1, transform: 'translateX(0)' }))
      ])
    ])
  ],
  template: `
    @if (challenge(); as ch) {
      <div class="challenge-page" @fadeIn>
        <div class="challenge-header">
          <a routerLink="/challenges" class="back-link">← Back to Challenges</a>
          <div class="header-top">
            <div>
              <span class="difficulty-badge" [class]="ch.difficulty">{{ ch.difficulty }}</span>
              <h1>{{ ch.title }}</h1>
            </div>
            <span class="duration">{{ ch.duration }}</span>
          </div>
          <p class="description">{{ ch.description }}</p>
          <div class="concepts">
            @for (concept of ch.concepts; track concept) {
              <span class="concept-tag">{{ concept }}</span>
            }
          </div>
        </div>

        <div class="challenge-body">
          <div class="editor-section">
            <div class="editor-header">
              <span>Your Solution</span>
              <div class="editor-actions">
                <button class="hint-btn" (click)="showHints.set(!showHints())">
                  {{ showHints() ? 'Hide Hints' : '💡 Hints' }}
                </button>
                <button class="reset-btn" (click)="resetCode()">↺ Reset</button>
                <button class="run-btn" [class.running]="running()" (click)="runTests()" [disabled]="running()">
                  {{ running() ? '⏳ Running...' : '▶ Run Tests' }}
                </button>
              </div>
            </div>
            <textarea
              [value]="userCode()"
              (input)="onCodeChange($event)"
              spellcheck="false"
              class="code-editor"></textarea>
          </div>

          <div class="results-section">
            @if (showHints() && ch.hints.length > 0) {
              <div class="hints-panel" @slideIn>
                <h3>Hints</h3>
                @for (hint of ch.hints; track $index) {
                  <div class="hint">{{ $index + 1 }}. {{ hint }}</div>
                }
              </div>
            }

            @if (testResults().length > 0) {
              <div class="test-results" @slideIn>
                <h3>Test Results</h3>
                <div class="results-summary" [class.all-passed]="allPassed()">
                  {{ passedCount() }}/{{ testResults().length }} tests passed
                </div>
                @for (result of testResults(); track result.testId) {
                  <div class="test-result" [class.passed]="result.passed" [class.failed]="!result.passed">
                    <span class="result-icon">{{ result.passed ? '✓' : '✗' }}</span>
                    <span class="result-message">{{ result.message }}</span>
                  </div>
                }
                @if (allPassed()) {
                  <div class="success-message">
                    🎉 All tests passed! Great job!
                  </div>
                }
              </div>
            }

            @if (!testResults().length && !showHints()) {
              <div class="placeholder">
                <div class="placeholder-icon">🧪</div>
                <p>Write your solution and click "Run Tests" to see results</p>
              </div>
            }
          </div>
        </div>
      </div>
    }
  `,
  styles: [`
    .challenge-page { max-width: 1200px; margin: 0 auto; padding: 24px; }
    .back-link {
      display: inline-block; color: var(--text-secondary); text-decoration: none;
      margin-bottom: 16px; font-size: 14px; transition: color 0.2s;
    }
    .back-link:hover { color: var(--primary); }
    .challenge-header { margin-bottom: 24px; }
    .header-top { display: flex; justify-content: space-between; align-items: flex-start; margin: 8px 0 12px; }
    .header-top h1 { margin: 8px 0 0; font-size: 28px; color: var(--text-primary); }
    .duration { color: var(--text-secondary); font-size: 14px; }
    .difficulty-badge {
      display: inline-block; padding: 4px 12px; border-radius: 12px;
      font-size: 12px; font-weight: 600; text-transform: uppercase;
    }
    .difficulty-badge.easy { background: #d1fae5; color: #065f46; }
    .difficulty-badge.medium { background: #fef3c7; color: #92400e; }
    .difficulty-badge.hard { background: #fee2e2; color: #991b1b; }
    .description { color: var(--text-secondary); font-size: 15px; line-height: 1.6; margin: 0 0 12px; }
    .concepts { display: flex; gap: 8px; flex-wrap: wrap; }
    .concept-tag {
      padding: 4px 10px; background: var(--tag-bg, rgba(221,0,49,0.1));
      color: var(--primary); border-radius: 6px; font-size: 12px;
    }
    .challenge-body { display: grid; grid-template-columns: 1fr 1fr; gap: 24px; }
    .editor-section, .results-section { min-height: 400px; }
    .editor-header {
      display: flex; justify-content: space-between; align-items: center;
      padding: 12px 16px; background: #1e1e1e; color: #ccc; border-radius: 12px 12px 0 0;
      font-size: 14px;
    }
    .editor-actions { display: flex; gap: 8px; }
    .hint-btn, .reset-btn, .run-btn {
      padding: 6px 14px; border: none; border-radius: 6px; cursor: pointer;
      font-size: 13px; font-weight: 500; transition: all 0.2s;
    }
    .hint-btn { background: #374151; color: #e5e7eb; }
    .hint-btn:hover { background: #4b5563; }
    .reset-btn { background: #374151; color: #e5e7eb; }
    .reset-btn:hover { background: #4b5563; }
    .run-btn { background: #10b981; color: white; }
    .run-btn:hover { background: #059669; }
    .run-btn.running { background: #6b7280; cursor: not-allowed; }
    .code-editor {
      width: 100%; min-height: 350px; padding: 16px; border: none;
      background: #0d1117; color: #e6edf3; font-family: 'JetBrains Mono', monospace;
      font-size: 14px; line-height: 1.6; resize: vertical; border-radius: 0 0 12px 12px;
      tab-size: 2;
    }
    .code-editor:focus { outline: none; }
    .hints-panel {
      padding: 20px; background: #fef3c7; border-radius: 12px;
      border: 1px solid #fcd34d; margin-bottom: 16px;
    }
    .hints-panel h3 { margin: 0 0 12px; color: #92400e; font-size: 16px; }
    .hint { color: #78350f; font-size: 14px; margin-bottom: 8px; line-height: 1.5; }
    .test-results {
      padding: 20px; background: var(--card-bg); border: 1px solid var(--border-color);
      border-radius: 12px;
    }
    .test-results h3 { margin: 0 0 12px; color: var(--text-primary); font-size: 16px; }
    .results-summary {
      padding: 10px 16px; border-radius: 8px; margin-bottom: 16px;
      font-weight: 600; font-size: 14px; background: #fee2e2; color: #991b1b;
    }
    .results-summary.all-passed { background: #d1fae5; color: #065f46; }
    .test-result {
      display: flex; align-items: center; gap: 10px; padding: 10px 12px;
      border-radius: 8px; margin-bottom: 8px; font-size: 13px;
    }
    .test-result.passed { background: rgba(16, 185, 129, 0.1); }
    .test-result.failed { background: rgba(239, 68, 68, 0.1); }
    .result-icon { font-weight: bold; font-size: 16px; }
    .test-result.passed .result-icon { color: #10b981; }
    .test-result.failed .result-icon { color: #ef4444; }
    .result-message { color: var(--text-primary); }
    .success-message {
      padding: 16px; background: #d1fae5; color: #065f46;
      border-radius: 8px; text-align: center; font-weight: 600; margin-top: 16px;
    }
    .placeholder {
      display: flex; flex-direction: column; align-items: center; justify-content: center;
      height: 300px; color: var(--text-secondary);
    }
    .placeholder-icon { font-size: 48px; margin-bottom: 16px; }
    @media (max-width: 768px) {
      .challenge-body { grid-template-columns: 1fr; }
      .header-top { flex-direction: column; gap: 8px; }
    }
  `]
})
export class ChallengePageComponent implements OnInit {
  private route = inject(ActivatedRoute);
  private challengeService = inject(ChallengeService);

  challenge = signal<CodingChallenge | undefined>(undefined);
  userCode = signal('');
  testResults = signal<{ testId: number; passed: boolean; message: string }[]>([]);
  allPassed = signal(false);
  running = signal(false);
  showHints = signal(false);

  passedCount = (): number => this.testResults().filter(r => r.passed).length;

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    const ch = this.challengeService.getChallenge(id);
    if (ch) {
      this.challenge.set(ch);
      this.userCode.set(ch.starterCode);
    }
  }

  onCodeChange(event: Event): void {
    this.userCode.set((event.target as HTMLTextAreaElement).value);
  }

  runTests(): void {
    const ch = this.challenge();
    if (!ch) return;

    this.running.set(true);
    this.testResults.set([]);

    setTimeout(() => {
      const result = this.challengeService.runTests(ch.id, this.userCode());
      this.testResults.set(result.results);
      this.allPassed.set(result.passed);
      this.running.set(false);
    }, 500);
  }

  resetCode(): void {
    const ch = this.challenge();
    if (ch) {
      this.userCode.set(ch.starterCode);
      this.testResults.set([]);
      this.allPassed.set(false);
    }
  }
}
