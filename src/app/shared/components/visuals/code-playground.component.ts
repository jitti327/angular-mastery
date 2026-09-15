import { Component, signal, computed } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-code-playground',
  standalone: true,
  imports: [FormsModule],
  template: `
    <div class="playground-container">
      <div class="playground-header">
        <h2>Interactive Code Playground</h2>
        <p>Edit the code and see the result in real-time</p>
      </div>

      <div class="playground-tabs">
        @for (tab of tabs; track tab) {
          <button [class.active]="activeTab() === tab" (click)="activeTab.set(tab)">
            {{ tab }}
          </button>
        }
      </div>

      <div class="playground-content">
        <div class="editor-panel">
          <div class="editor-header">
            <span class="editor-title">
              @if (activeTab() === 'TypeScript') { 📄 app.component.ts }
              @if (activeTab() === 'HTML') { 📝 app.component.html }
              @if (activeTab() === 'CSS') { 🎨 app.component.css }
            </span>
            <div class="editor-actions">
              <button class="action-btn" (click)="copyCode()">📋 Copy</button>
              <button class="action-btn" (click)="resetCode()">↺ Reset</button>
            </div>
          </div>
          <textarea
            class="code-editor"
            [value]="getCurrentCode()"
            (input)="updateCode($event)"
            spellcheck="false"></textarea>
        </div>

        <div class="preview-panel">
          <div class="preview-header">
            <span class="preview-title">🖥️ Live Preview</span>
            <span class="preview-status" [class.error]="hasError()">
              @if (hasError()) { ❌ Error } @else { ✅ Running }
            </span>
          </div>
          <div class="preview-frame">
            @if (hasError()) {
              <div class="error-overlay">
                <span class="error-icon">⚠️</span>
                <p class="error-message">{{ errorMessage() }}</p>
                <button class="retry-btn" (click)="retry()">Try Again</button>
              </div>
            } @else {
              <div class="preview-content">
                <div class="mock-component">
                  <div class="mock-header">
                    <span class="mock-icon">🅰️</span>
                    <span>{{ title() }}</span>
                  </div>
                  <div class="mock-body">
                    @if (showCounter()) {
                      <div class="counter-demo">
                        <p class="counter-value">{{ counter() }}</p>
                        <div class="counter-buttons">
                          <button (click)="decrement()">-</button>
                          <button (click)="increment()">+</button>
                        </div>
                      </div>
                    }
                    @if (showList()) {
                      <ul class="list-demo">
                        @for (item of items(); track item) {
                          <li>{{ item }}</li>
                        }
                      </ul>
                    }
                    @if (showForm()) {
                      <div class="form-demo">
                        <input [value]="inputValue()" (input)="inputValue.set($any($event.target).value)" placeholder="Type something...">
                        <p class="form-output">You typed: {{ inputValue() }}</p>
                      </div>
                    }
                  </div>
                </div>
              </div>
            }
          </div>
        </div>
      </div>

      <div class="playground-examples">
        <h3>Try These Examples</h3>
        <div class="examples-grid">
          @for (example of examples; track example.name) {
            <button class="example-btn" (click)="loadExample(example)">
              <span class="example-icon">{{ example.icon }}</span>
              <span class="example-name">{{ example.name }}</span>
            </button>
          }
        </div>
      </div>
    </div>
  `,
  styles: [`
    .playground-container {
      background: white;
      border-radius: 16px;
      padding: 32px;
      box-shadow: 0 4px 24px rgba(0,0,0,0.08);
      margin: 32px 0;
    }
    .playground-header {
      text-align: center;
      margin-bottom: 32px;
    }
    .playground-header h2 {
      margin: 0 0 8px;
      font-size: 28px;
      color: var(--text-primary);
    }
    .playground-header p {
      margin: 0;
      color: var(--text-secondary);
    }
    .playground-tabs {
      display: flex;
      justify-content: center;
      gap: 4px;
      margin-bottom: 24px;
      background: var(--bg-secondary);
      padding: 4px;
      border-radius: 10px;
      width: fit-content;
      margin-left: auto;
      margin-right: auto;
    }
    .playground-tabs button {
      padding: 10px 24px;
      border: none;
      background: transparent;
      border-radius: 8px;
      font-size: 14px;
      font-weight: 500;
      cursor: pointer;
      color: var(--text-secondary);
      transition: all 0.2s;
    }
    .playground-tabs button:hover {
      color: var(--text-primary);
    }
    .playground-tabs button.active {
      background: white;
      color: var(--accent);
      box-shadow: 0 2px 8px rgba(0,0,0,0.1);
    }
    .playground-content {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 20px;
      margin-bottom: 32px;
    }
    .editor-panel, .preview-panel {
      border-radius: 12px;
      overflow: hidden;
      border: 1px solid var(--border-color);
    }
    .editor-header, .preview-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 12px 16px;
      background: #1e1e1e;
    }
    .editor-title, .preview-title {
      font-size: 13px;
      color: #999;
    }
    .editor-actions {
      display: flex;
      gap: 8px;
    }
    .action-btn {
      padding: 6px 12px;
      background: rgba(255,255,255,0.1);
      border: none;
      border-radius: 6px;
      color: #ccc;
      font-size: 12px;
      cursor: pointer;
      transition: all 0.2s;
    }
    .action-btn:hover {
      background: rgba(255,255,255,0.2);
      color: white;
    }
    .code-editor {
      width: 100%;
      height: 300px;
      background: #1e1e1e;
      color: #d4d4d4;
      border: none;
      padding: 16px;
      font-family: 'SF Mono', monospace;
      font-size: 14px;
      line-height: 1.6;
      resize: none;
      outline: none;
    }
    .preview-header {
      background: #2d2d2d;
    }
    .preview-status {
      font-size: 13px;
      color: #4caf50;
    }
    .preview-status.error {
      color: #ff5252;
    }
    .preview-frame {
      height: 300px;
      background: white;
      padding: 20px;
    }
    .preview-content {
      height: 100%;
    }
    .mock-component {
      background: #f9f9f9;
      border-radius: 12px;
      overflow: hidden;
      height: 100%;
    }
    .mock-header {
      background: linear-gradient(135deg, #dd0031, #c3002f);
      color: white;
      padding: 12px 16px;
      display: flex;
      align-items: center;
      gap: 8px;
      font-weight: 600;
    }
    .mock-icon { font-size: 20px; }
    .mock-body {
      padding: 20px;
    }
    .counter-demo {
      text-align: center;
    }
    .counter-value {
      font-size: 48px;
      font-weight: 700;
      color: #667eea;
      margin: 0 0 16px;
    }
    .counter-buttons {
      display: flex;
      justify-content: center;
      gap: 12px;
    }
    .counter-buttons button {
      width: 48px;
      height: 48px;
      border-radius: 50%;
      border: none;
      font-size: 24px;
      cursor: pointer;
      transition: all 0.2s;
    }
    .counter-buttons button:first-child {
      background: #ff5252;
      color: white;
    }
    .counter-buttons button:last-child {
      background: #4caf50;
      color: white;
    }
    .counter-buttons button:hover {
      transform: scale(1.1);
    }
    .list-demo {
      list-style: none;
      padding: 0;
      margin: 0;
    }
    .list-demo li {
      padding: 12px 16px;
      background: white;
      border-radius: 8px;
      margin-bottom: 8px;
      border-left: 4px solid #667eea;
      animation: slideIn 0.3s ease-out;
    }
    @keyframes slideIn {
      from { opacity: 0; transform: translateX(-10px); }
      to { opacity: 1; transform: translateX(0); }
    }
    .form-demo input {
      width: 100%;
      padding: 12px 16px;
      border: 2px solid #e0e0e0;
      border-radius: 8px;
      font-size: 16px;
      margin-bottom: 12px;
    }
    .form-demo input:focus {
      outline: none;
      border-color: #667eea;
    }
    .form-output {
      color: #666;
      font-style: italic;
    }
    .error-overlay {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      height: 100%;
      color: #ff5252;
    }
    .error-icon { font-size: 48px; margin-bottom: 16px; }
    .error-message {
      text-align: center;
      margin-bottom: 16px;
    }
    .retry-btn {
      padding: 10px 20px;
      background: #ff5252;
      color: white;
      border: none;
      border-radius: 8px;
      cursor: pointer;
    }
    .playground-examples h3 {
      margin: 0 0 16px;
      text-align: center;
      color: var(--text-primary);
    }
    .examples-grid {
      display: flex;
      flex-wrap: wrap;
      justify-content: center;
      gap: 12px;
    }
    .example-btn {
      display: flex;
      align-items: center;
      gap: 8px;
      padding: 12px 20px;
      background: var(--bg-secondary);
      border: 1px solid var(--border-color);
      border-radius: 8px;
      cursor: pointer;
      transition: all 0.2s;
    }
    .example-btn:hover {
      background: var(--accent-light);
      border-color: var(--accent);
    }
    .example-icon { font-size: 18px; }
    .example-name {
      font-size: 14px;
      font-weight: 500;
      color: var(--text-primary);
    }

    @media (max-width: 900px) {
      .playground-content {
        grid-template-columns: 1fr;
      }
    }
  `]
})
export class CodePlaygroundComponent {
  tabs = ['TypeScript', 'HTML', 'CSS'];
  activeTab = signal('TypeScript');

  typescriptCode = `@Component({
  selector: 'app-counter',
  template: './app.component.html'
})
export class CounterComponent {
  count = signal(0);
  
  increment() {
    this.count.update(v => v + 1);
  }
  
  decrement() {
    this.count.update(v => v - 1);
  }
}`;

  htmlCode = `<div class="counter">
  <h1>{{ count() }}</h1>
  <button (click)="decrement()">-</button>
  <button (click)="increment()">+</button>
</div>`;

  cssCode = `.counter {
  text-align: center;
}

h1 {
  font-size: 48px;
  color: #667eea;
}

button {
  width: 48px;
  height: 48px;
  border-radius: 50%;
  border: none;
  font-size: 24px;
  cursor: pointer;
}`;

  title = signal('My Angular App');
  counter = signal(0);
  items = signal(['Learn Angular', 'Build Components', 'Master Signals']);
  inputValue = signal('');
  showCounter = signal(true);
  showList = signal(false);
  showForm = signal(false);
  hasError = signal(false);
  errorMessage = signal('');

  examples = [
    { name: 'Counter', icon: '🔢', type: 'counter' },
    { name: 'List', icon: '📋', type: 'list' },
    { name: 'Form', icon: '📝', type: 'form' },
    { name: 'Timer', icon: '⏱️', type: 'timer' },
  ];

  getCurrentCode(): string {
    switch (this.activeTab()) {
      case 'TypeScript': return this.typescriptCode;
      case 'HTML': return this.htmlCode;
      case 'CSS': return this.cssCode;
      default: return '';
    }
  }

  updateCode(event: Event): void {
    const value = (event.target as HTMLTextAreaElement).value;
    switch (this.activeTab()) {
      case 'TypeScript': this.typescriptCode = value; break;
      case 'HTML': this.htmlCode = value; break;
      case 'CSS': this.cssCode = value; break;
    }
  }

  increment(): void {
    this.counter.update(v => v + 1);
  }

  decrement(): void {
    this.counter.update(v => v - 1);
  }

  copyCode(): void {
    navigator.clipboard.writeText(this.getCurrentCode());
  }

  resetCode(): void {
    this.typescriptCode = `@Component({
  selector: 'app-counter',
  template: './app.component.html'
})
export class CounterComponent {
  count = signal(0);
  
  increment() {
    this.count.update(v => v + 1);
  }
  
  decrement() {
    this.count.update(v => v - 1);
  }
}`;
    this.htmlCode = `<div class="counter">
  <h1>{{ count() }}</h1>
  <button (click)="decrement()">-</button>
  <button (click)="increment()">+</button>
</div>`;
    this.cssCode = `.counter {
  text-align: center;
}

h1 {
  font-size: 48px;
  color: #667eea;
}

button {
  width: 48px;
  height: 48px;
  border-radius: 50%;
  border: none;
  font-size: 24px;
  cursor: pointer;
}`;
  }

  retry(): void {
    this.hasError.set(false);
    this.errorMessage.set('');
  }

  loadExample(example: { name: string; icon: string; type: string }): void {
    this.showCounter.set(example.type === 'counter');
    this.showList.set(example.type === 'list');
    this.showForm.set(example.type === 'form');
  }
}
