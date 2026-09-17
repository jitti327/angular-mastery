import { Component, signal, computed, ViewChild, ElementRef, AfterViewChecked } from '@angular/core';

interface TerminalEntry {
  type: 'command' | 'output';
  text: string;
}

@Component({
  selector: 'app-terminal',
  standalone: true,
  template: `
    <div class="terminal">
      <div class="terminal-header">
        <span class="dot red"></span>
        <span class="dot yellow"></span>
        <span class="dot green"></span>
        <span class="terminal-title">Terminal</span>
      </div>
      <div class="terminal-body" #terminalBody>
        @for (entry of history(); track $index) {
          <div class="terminal-line">
            @if (entry.type === 'command') {
              <span class="prompt">$ </span>
              <span class="command">{{ entry.text }}</span>
            } @else {
              <span class="output">{{ entry.text }}</span>
            }
          </div>
        }
        <div class="terminal-input-line">
          <span class="prompt">$ </span>
          <input #cmdInput 
                 [value]="currentInput()" 
                 (input)="onInput($event)"
                 (keydown.enter)="executeCommand()"
                 (keydown.arrowUp)="onArrowUp()"
                 (keydown.arrowDown)="onArrowDown()"
                 autofocus />
        </div>
      </div>
    </div>
  `,
  styles: [`
    .terminal {
      background: #1a1a1a;
      border-radius: 8px;
      overflow: hidden;
      font-family: 'Consolas', 'Monaco', 'Courier New', monospace;
      box-shadow: 0 4px 20px rgba(0, 0, 0, 0.3);
      max-width: 700px;
      margin: 0 auto;
    }
    .terminal-header {
      background: #2d2d2d;
      padding: 12px 16px;
      display: flex;
      align-items: center;
      gap: 8px;
    }
    .dot {
      width: 12px;
      height: 12px;
      border-radius: 50%;
    }
    .dot.red { background: #ff5f57; }
    .dot.yellow { background: #febc2e; }
    .dot.green { background: #28c840; }
    .terminal-title {
      color: #888;
      font-size: 14px;
      margin-left: 8px;
    }
    .terminal-body {
      padding: 16px;
      height: 300px;
      overflow-y: auto;
      font-size: 14px;
      line-height: 1.5;
    }
    .terminal-line {
      margin-bottom: 2px;
    }
    .prompt {
      color: #28c840;
    }
    .command {
      color: #fff;
    }
    .output {
      color: #888;
    }
    .terminal-input-line {
      display: flex;
      align-items: center;
      margin-top: 4px;
    }
    .terminal-input-line input {
      background: transparent;
      border: none;
      color: #fff;
      font-family: inherit;
      font-size: inherit;
      outline: none;
      flex: 1;
      caret-color: #28c840;
    }
    .terminal-body::-webkit-scrollbar {
      width: 8px;
    }
    .terminal-body::-webkit-scrollbar-track {
      background: #1a1a1a;
    }
    .terminal-body::-webkit-scrollbar-thumb {
      background: #444;
      border-radius: 4px;
    }
    .terminal-body::-webkit-scrollbar-thumb:hover {
      background: #555;
    }
  `]
})
export class TerminalComponent implements AfterViewChecked {
  @ViewChild('terminalBody') terminalBody!: ElementRef<HTMLDivElement>;
  @ViewChild('cmdInput') cmdInput!: ElementRef<HTMLInputElement>;

  history = signal<TerminalEntry[]>([]);
  currentInput = signal('');
  commandIndex = signal(-1);
  private commandHistory: string[] = [];
  private needsScroll = false;

  ngAfterViewChecked(): void {
    if (this.needsScroll) {
      this.needsScroll = false;
      this.scrollToBottom();
    }
  }

  onInput(event: Event): void {
    const target = event.target as HTMLInputElement;
    this.currentInput.set(target.value);
    this.commandIndex.set(-1);
  }

  onArrowUp(): void {
    if (this.commandHistory.length === 0) return;
    const newIndex = this.commandIndex() + 1;
    if (newIndex < this.commandHistory.length) {
      this.commandIndex.set(newIndex);
      this.currentInput.set(this.commandHistory[this.commandHistory.length - 1 - newIndex]);
    }
  }

  onArrowDown(): void {
    if (this.commandIndex() <= 0) {
      this.commandIndex.set(-1);
      this.currentInput.set('');
      return;
    }
    const newIndex = this.commandIndex() - 1;
    this.commandIndex.set(newIndex);
    this.currentInput.set(this.commandHistory[this.commandHistory.length - 1 - newIndex]);
  }

  executeCommand(): void {
    const cmd = this.currentInput().trim();
    if (!cmd) return;

    this.commandHistory.push(cmd);
    this.history.update(h => [...h, { type: 'command', text: cmd }]);
    this.currentInput.set('');
    this.commandIndex.set(-1);

    const output = this.processCommand(cmd);
    if (output !== null) {
      this.history.update(h => [...h, { type: 'output', text: output }]);
    }

    this.needsScroll = true;
  }

  private processCommand(cmd: string): string | null {
    switch (cmd) {
      case 'npm install':
        return this.simulateNpmInstall();
      case 'npm run dev':
        return this.simulateNpmRunDev();
      case 'npm run build':
        return this.simulateNpmBuild();
      case 'npm test':
        return this.simulateNpmTest();
      case 'ng serve':
        return this.simulateNgServe();
      case 'ng build':
        return this.simulateNgBuild();
      case 'git status':
        return this.simulateGitStatus();
      case 'git log --oneline':
        return this.simulateGitLog();
      case 'ls':
        return this.simulateLs();
      case 'clear':
        this.history.set([]);
        return null;
      case 'help':
        return this.simulateHelp();
      default:
        return `bash: ${cmd}: command not found`;
    }
  }

  private simulateNpmInstall(): string {
    return `added 1247 packages in 34s

158 packages are looking for funding
  run \`npm fund\` for details`;
  }

  private simulateNpmRunDev(): string {
    return `> angular-mastery@0.0.0 dev
> ng serve

Application bundle generation complete. [5.232s]

Watch mode enabled. Waiting for file changes...`;
  }

  private simulateNpmBuild(): string {
    return `> angular-mastery@0.0.0 build
> ng build

Application bundle generation complete.
Output location: dist/angular-mastery/browser`;
  }

  private simulateNpmTest(): string {
    return `> angular-mastery@0.0.0 test
> ng test

PASS src/app/app.component.spec.ts (2.134s)
PASS src/app/shared/components/skeleton/skeleton.component.spec.ts (1.567s)

Test Suites: 2 passed, 2 total
Tests:       8 passed, 8 total`;
  }

  private simulateNgServe(): string {
    return `✔ Browser application bundle generation complete.
Initial Transfer File Size: 245.17 KB
Lazy Transfer File Size: 0 KB

Local: http://localhost:4200/
Watch mode enabled. Waiting for file changes...`;
  }

  private simulateNgBuild(): string {
    return `Application bundle generation complete.
Output location: dist/angular-mastery/browser

Lazy Chunk Files | Names | Raw Size
chunk-ABC123.js   | -     | 12.34 KB
chunk-DEF456.js   | -     | 8.21 KB`;
  }

  private simulateGitStatus(): string {
    return `On branch main
Your branch is up to date with 'origin/main'.

Changes not staged for commit:
  modified:   src/app/app.component.ts
  modified:   src/app/shared/components/terminal/terminal.component.ts

Untracked files:
  src/assets/images/`;
  }

  private simulateGitLog(): string {
    return `a1b2c3d feat: add terminal component
e4f5g6h fix: update routing guards
i7j8k9l refactor: optimize change detection
m0n1o2p style: update theme colors
q3r4s5t docs: add component documentation`;
  }

  private simulateLs(): string {
    return `README.md
angular.json
package.json
src/
tsconfig.json`;
  }

  private simulateHelp(): string {
    return `Available commands:
  npm install       - Install dependencies
  npm run dev       - Start dev server
  npm run build     - Build production bundle
  npm test          - Run unit tests
  ng serve          - Start Angular dev server
  ng build          - Build Angular application
  git status        - Show working tree status
  git log --oneline - Show recent commits
  ls                - List directory contents
  clear             - Clear terminal
  help              - Show this help message`;
  }

  private scrollToBottom(): void {
    const el = this.terminalBody?.nativeElement;
    if (el) {
      el.scrollTop = el.scrollHeight;
    }
  }
}
