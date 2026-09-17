import { Component, input, output, signal } from '@angular/core';
import { QuizQuestion } from '../../../core/models/lesson.model';
import { trigger, transition, style, animate, query, stagger, keyframes } from '@angular/animations';

@Component({
  selector: 'app-quiz',
  standalone: true,
  animations: [
    trigger('optionStagger', [
      transition(':enter', [
        query('.option-btn', [
          style({ opacity: 0, transform: 'translateX(-20px)' }),
          stagger(60, [
            animate('350ms cubic-bezier(0.35, 0, 0.25, 1)', style({ opacity: 1, transform: 'translateX(0)' }))
          ])
        ], { optional: true })
      ])
    ]),
    trigger('fadeInUp', [
      transition(':enter', [
        style({ opacity: 0, transform: 'translateY(20px)' }),
        animate('400ms ease-out', style({ opacity: 1, transform: 'translateY(0)' }))
      ])
    ]),
    trigger('correctPulse', [
      transition(':enter', [
        animate('600ms cubic-bezier(0.175, 0.885, 0.32, 1.275)', keyframes([
          style({ transform: 'scale(1)', offset: 0 }),
          style({ transform: 'scale(1.08)', offset: 0.4 }),
          style({ transform: 'scale(1)', offset: 1 })
        ]))
      ])
    ]),
    trigger('wrongShake', [
      transition(':enter', [
        animate('500ms', keyframes([
          style({ transform: 'translateX(0)', offset: 0 }),
          style({ transform: 'translateX(-8px)', offset: 0.2 }),
          style({ transform: 'translateX(8px)', offset: 0.4 }),
          style({ transform: 'translateX(-6px)', offset: 0.6 }),
          style({ transform: 'translateX(6px)', offset: 0.8 }),
          style({ transform: 'translateX(0)', offset: 1 })
        ]))
      ])
    ]),
    trigger('scoreReveal', [
      transition(':enter', [
        style({ opacity: 0, transform: 'scale(0.5)' }),
        animate('800ms cubic-bezier(0.175, 0.885, 0.32, 1.275)', style({ opacity: 1, transform: 'scale(1)' }))
      ])
    ])
  ],
  template: `
    <div class="quiz-container">
      <h3 class="quiz-title">Knowledge Check</h3>
      
      @if (!showResults()) {
        <div class="question-card">
          <div class="question-number">
            Question {{ currentQuestion() + 1 }} of {{ questions().length }}
          </div>
          <p class="question-text">{{ questions()[currentQuestion()].question }}</p>
          
          <div class="options" @optionStagger>
            @for (option of questions()[currentQuestion()].options; track $index) {
              <button
                class="option-btn"
                [class.selected]="selectedAnswer() === $index"
                [class.correct]="showExplanation() && $index === questions()[currentQuestion()].correctIndex"
                [class.wrong]="showExplanation() && selectedAnswer() === $index && $index !== questions()[currentQuestion()].correctIndex"
                (click)="selectAnswer($index)"
                [disabled]="showExplanation()">
                {{ option }}
              </button>
            }
          </div>
          
          @if (selectedAnswer() !== null && !showExplanation()) {
            <button class="submit-btn" (click)="showExplanation.set(true)">
              Check Answer
            </button>
          }
          
          @if (showExplanation()) {
            <div class="explanation" @fadeInUp
              [class]="selectedAnswer() === questions()[currentQuestion()].correctIndex ? 'correct-explanation' : 'wrong-explanation'">
              <p [class]="selectedAnswer() === questions()[currentQuestion()].correctIndex ? 'correct-text' : 'wrong-text'">
                {{ selectedAnswer() === questions()[currentQuestion()].correctIndex ? '✓ Correct!' : '✗ Incorrect' }}
              </p>
              <p>{{ questions()[currentQuestion()].explanation }}</p>
              
              @if (currentQuestion() < questions().length - 1) {
                <button class="next-btn" (click)="nextQuestion()">
                  Next Question →
                </button>
              } @else {
                <button class="finish-btn" (click)="finishQuiz()">
                  See Results
                </button>
              }
            </div>
          }
        </div>
      } @else {
        <div class="results-card" @fadeInUp>
          <div class="score-circle" [class.passing]="scorePercentage() >= 70" @scoreReveal>
            <span class="score-number">{{ scorePercentage() }}%</span>
            <span class="score-label">Score</span>
          </div>
          
          <p class="results-text">
            @if (scorePercentage() >= 70) {
              🎉 Congratulations! You passed the quiz!
            } @else {
              Keep learning! You can retake the quiz later.
            }
          </p>
          
          <div class="results-stats">
            <span class="correct">✓ {{ correctCount() }} Correct</span>
            <span class="wrong">✗ {{ questions().length - correctCount() }} Wrong</span>
          </div>
          
          <button class="retake-btn" (click)="retakeQuiz()">
            Retake Quiz
          </button>
        </div>
      }
    </div>
  `,
  styles: [`
    .quiz-container {
      margin: 24px 0;
      padding: 24px;
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
      border-radius: 16px;
      color: white;
    }
    .quiz-title {
      margin: 0 0 20px 0;
      font-size: 24px;
    }
    .question-card {
      background: rgba(255,255,255,0.1);
      padding: 24px;
      border-radius: 12px;
      backdrop-filter: blur(10px);
    }
    .question-number {
      font-size: 14px;
      opacity: 0.8;
      margin-bottom: 8px;
    }
    .question-text {
      font-size: 18px;
      margin: 0 0 20px 0;
      line-height: 1.5;
    }
    .options {
      display: flex;
      flex-direction: column;
      gap: 12px;
    }
    .option-btn {
      background: rgba(255,255,255,0.2);
      border: 2px solid transparent;
      padding: 14px 18px;
      border-radius: 8px;
      color: white;
      text-align: left;
      cursor: pointer;
      transition: all 0.2s;
    }
    .option-btn:hover:not(:disabled) {
      background: rgba(255,255,255,0.3);
    }
    .option-btn.selected {
      border-color: white;
      background: rgba(255,255,255,0.4);
    }
    .option-btn.correct {
      background: #4caf50;
      border-color: #4caf50;
    }
    .option-btn.wrong {
      background: #f44336;
      border-color: #f44336;
    }
    .submit-btn, .next-btn, .finish-btn, .retake-btn {
      margin-top: 16px;
      padding: 12px 24px;
      border: none;
      border-radius: 8px;
      font-size: 16px;
      font-weight: 600;
      cursor: pointer;
      transition: transform 0.2s;
    }
    .submit-btn {
      background: white;
      color: #667eea;
    }
    .next-btn, .finish-btn {
      background: #4caf50;
      color: white;
    }
    .retake-btn {
      background: white;
      color: #667eea;
    }
    .submit-btn:hover, .next-btn:hover, .finish-btn:hover, .retake-btn:hover {
      transform: scale(1.02);
    }
    .explanation {
      margin-top: 16px;
      padding: 16px;
      background: rgba(0,0,0,0.2);
      border-radius: 12px;
      border-left: 4px solid transparent;
    }
    .correct-explanation {
      border-left-color: #4caf50;
      background: rgba(76, 175, 80, 0.1);
    }
    .wrong-explanation {
      border-left-color: #ff9800;
      background: rgba(255, 152, 0, 0.1);
    }
    .correct-text {
      color: #4caf50;
      font-weight: bold;
      margin: 0 0 8px 0;
    }
    .wrong-text {
      color: #ff9800;
      font-weight: bold;
      margin: 0 0 8px 0;
    }
    .results-card {
      text-align: center;
      padding: 24px;
      background: rgba(255,255,255,0.1);
      border-radius: 12px;
    }
    .score-circle {
      width: 120px;
      height: 120px;
      border-radius: 50%;
      background: rgba(255,255,255,0.2);
      display: flex;
      flex-direction: column;
      justify-content: center;
      margin: 0 auto 20px;
    }
    .score-circle.passing {
      background: #4caf50;
    }
    .score-number {
      font-size: 32px;
      font-weight: bold;
    }
    .score-label {
      font-size: 14px;
      opacity: 0.8;
    }
    .results-text {
      font-size: 18px;
      margin: 0 0 16px 0;
    }
    .results-stats {
      display: flex;
      justify-content: center;
      gap: 24px;
      margin-bottom: 20px;
    }
    .correct {
      color: #4caf50;
    }
    .wrong {
      color: #ff9800;
    }
  `]
})
export class QuizComponent {
  questions = input.required<QuizQuestion[]>();
  quizComplete = output<number>();

  currentQuestion = signal(0);
  selectedAnswer = signal<number | null>(null);
  showExplanation = signal(false);
  showResults = signal(false);
  correctCount = signal(0);

  scorePercentage = signal(0);

  selectAnswer(index: number): void {
    this.selectedAnswer.set(index);
  }

  nextQuestion(): void {
    if (this.selectedAnswer() === this.questions()[this.currentQuestion()].correctIndex) {
      this.correctCount.update(c => c + 1);
    }
    this.currentQuestion.update(q => q + 1);
    this.selectedAnswer.set(null);
    this.showExplanation.set(false);
  }

  finishQuiz(): void {
    if (this.selectedAnswer() === this.questions()[this.currentQuestion()].correctIndex) {
      this.correctCount.update(c => c + 1);
    }
    this.scorePercentage.set(Math.round((this.correctCount() / this.questions().length) * 100));
    this.showResults.set(true);
    this.quizComplete.emit(this.scorePercentage());
  }

  retakeQuiz(): void {
    this.currentQuestion.set(0);
    this.selectedAnswer.set(null);
    this.showExplanation.set(false);
    this.showResults.set(false);
    this.correctCount.set(0);
    this.scorePercentage.set(0);
  }
}
