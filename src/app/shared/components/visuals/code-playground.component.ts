import { Component, signal, HostListener } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

@Component({
  selector: 'app-code-playground',
  standalone: true,
  imports: [FormsModule],
  template: `
    <div class="playground-container">
      <div class="playground-header">
        <h2>Interactive Code Playground</h2>
        <p>Edit JavaScript code and see it execute in real-time</p>
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
              @if (activeTab() === 'JavaScript') { JS }
              @if (activeTab() === 'HTML') { HTML }
              @if (activeTab() === 'CSS') { CSS }
            </span>
            <div class="editor-actions">
              <button class="action-btn" (click)="copyCode()">Copy</button>
              <button class="action-btn" (click)="resetCode()">Reset</button>
              <button class="action-btn run-btn" (click)="runCode()">Run</button>
            </div>
          </div>
          <textarea
            class="code-editor"
            [value]="getCurrentCode()"
            (input)="updateCode($event)"
            (keydown)="onKeyDown($event)"
            spellcheck="false"></textarea>
        </div>

        <div class="preview-panel">
          <div class="preview-header">
            <span class="preview-title">Preview</span>
            <span class="preview-status" [class.error]="hasError()">
              @if (hasError()) { Error } @else { Running }
            </span>
          </div>
          <div class="preview-frame">
            <iframe
              [srcdoc]="sandboxHtml()"
              sandbox="allow-scripts"
              class="preview-iframe"
            ></iframe>
          </div>
          <div class="console-header">
            <span class="console-title">Console Output</span>
            <button class="action-btn" (click)="clearConsole()">Clear</button>
          </div>
          <div class="console-output">
            @for (line of consoleOutput(); track $index) {
              <div [class]="'console-line ' + line.type">{{ line.text }}</div>
            }
            @if (consoleOutput().length === 0) {
              <div class="console-line empty">No output yet. Click Run or press Ctrl+Enter.</div>
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
      background: var(--bg-primary);
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
      background: var(--bg-primary);
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
    .run-btn {
      background: #4caf50;
      color: white;
    }
    .run-btn:hover {
      background: #388e3c;
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
      height: 250px;
      background: #fff;
    }
    .preview-iframe {
      width: 100%;
      height: 100%;
      border: none;
    }
    .console-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 8px 16px;
      background: #1e1e1e;
      border-top: 1px solid #333;
    }
    .console-title {
      font-size: 12px;
      color: #999;
      font-weight: 600;
      text-transform: uppercase;
    }
    .console-output {
      height: 120px;
      overflow-y: auto;
      background: #0d0d0d;
      padding: 8px 16px;
      font-family: 'SF Mono', monospace;
      font-size: 13px;
    }
    .console-line {
      padding: 4px 0;
      border-bottom: 1px solid #1a1a1a;
      white-space: pre-wrap;
      word-break: break-all;
    }
    .console-line.log { color: #d4d4d4; }
    .console-line.error { color: #ff5252; }
    .console-line.warn { color: #ffa726; }
    .console-line.info { color: #29b6f6; }
    .console-line.empty { color: #666; font-style: italic; }
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
  tabs = ['JavaScript', 'HTML', 'CSS'];
  activeTab = signal('JavaScript');

  javascriptCode = `// Variables & Types
const name = 'JavaScript';
let version = 2024;

console.log('Language:', name);
console.log('Version:', version);

// Object
const language = {
  name: 'JavaScript',
  year: 2024,
  features: ['async/await', 'generics', 'modules']
};
console.log('Language object:', language);`;

  htmlCode = `<div id="app">
  <h1>Hello, World!</h1>
  <p>Edit HTML and see changes</p>
</div>`;

  cssCode = `#app {
  font-family: system-ui, sans-serif;
  text-align: center;
  padding: 20px;
}

h1 {
  color: #667eea;
}

p {
  color: #666;
}`;

  consoleOutput = signal<Array<{type: string, text: string}>>([]);
  hasError = signal(false);
  errorMessage = signal('');
  sandboxHtml = signal('');

  examples = [
    { name: 'Variables & Types', icon: '\u{1F4CB}', code: `// Variables & Types
const name = 'JavaScript';
let version = 2024;
let isAwesome = true;

console.log('Language:', name);
console.log('Version:', version);
console.log('Is awesome:', isAwesome);

// Object
const framework = {
  name: 'Angular',
  year: 2024,
  features: ['components', 'signals', 'dependency injection']
};

console.log('Framework:', framework);

// Null and Undefined
let x = null;
let y = undefined;
console.log('null value:', x);
console.log('undefined value:', y);` },
    { name: 'Functions', icon: '\u{1F527}', code: `// Functions
function greet(name) {
  return 'Hello, ' + name + '!';
}

console.log(greet('World'));
console.log(greet('Angular'));

// Arrow functions
const add = (a, b) => a + b;
console.log('2 + 3 =', add(2, 3));

// Higher-order function
const numbers = [1, 2, 3, 4, 5];
const doubled = numbers.map(n => n * 2);
console.log('Original:', numbers);
console.log('Doubled:', doubled);

// Default parameters
function power(base, exp = 2) {
  return Math.pow(base, exp);
}
console.log('3^2 =', power(3));
console.log('2^10 =', power(2, 10));` },
    { name: 'Array Methods', icon: '\u{1F4CA}', code: `// Array Methods
const fruits = ['apple', 'banana', 'cherry', 'date'];

console.log('Fruits:', fruits);
console.log('First:', fruits[0]);
console.log('Last:', fruits[fruits.length - 1]);

// Filter
const longNames = fruits.filter(f => f.length > 5);
console.log('Long names:', longNames);

// Reduce
const totalLength = fruits.reduce((sum, f) => sum + f.length, 0);
console.log('Total length:', totalLength);

// Find
const bFruit = fruits.find(f => f.startsWith('b'));
console.log('Starts with b:', bFruit);

// Sort
const numbers = [3, 1, 4, 1, 5, 9, 2, 6];
console.log('Sorted:', numbers.sort((a, b) => a - b));` },
    { name: 'Async/Await', icon: '\u23F1\uFE0F', code: `// Async/Await
async function fetchData(url) {
  console.log('Fetching:', url);

  // Simulate network delay
  await new Promise(resolve => setTimeout(resolve, 100));

  return {
    status: 200,
    data: { id: 1, name: 'JavaScript' }
  };
}

async function main() {
  console.log('Starting async operations...');

  const result = await fetchData('https://api.example.com/data');
  console.log('Status:', result.status);
  console.log('Data:', result.data);

  console.log('Async complete!');
}

main();` },
    { name: 'DOM Manipulation', icon: '\u{1F310}', code: `// DOM Manipulation
const container = document.getElementById('output') || document.body;

// Create elements dynamically
const div = document.createElement('div');
div.innerHTML = '<h2 style="color: #667eea; font-family: sans-serif;">Dynamic Content</h2>';
container.appendChild(div);

// Create a list
const list = document.createElement('ul');
list.style.fontFamily = 'sans-serif';
list.style.paddingLeft = '20px';

const items = ['Created dynamically', 'Can be interactive', 'Pure JavaScript'];

items.forEach(text => {
  const li = document.createElement('li');
  li.textContent = text;
  li.style.margin = '8px 0';
  list.appendChild(li);
});

container.appendChild(list);

// Create a button
const btn = document.createElement('button');
btn.textContent = 'Click Me!';
btn.style.cssText = 'margin-top: 12px; padding: 8px 16px; background: #667eea; color: white; border: none; border-radius: 6px; cursor: pointer; font-size: 14px;';
btn.onclick = () => {
  btn.textContent = 'Clicked! (' + new Date().toLocaleTimeString() + ')';
  console.log('Button clicked at:', new Date().toISOString());
};
container.appendChild(btn);

console.log('DOM manipulation complete!');` },
  ];

  constructor(private sanitizer: DomSanitizer) {
    this.runCode();
  }

  getCurrentCode(): string {
    switch (this.activeTab()) {
      case 'JavaScript': return this.javascriptCode;
      case 'HTML': return this.htmlCode;
      case 'CSS': return this.cssCode;
      default: return '';
    }
  }

  updateCode(event: Event): void {
    const value = (event.target as HTMLTextAreaElement).value;
    switch (this.activeTab()) {
      case 'JavaScript': this.javascriptCode = value; break;
      case 'HTML': this.htmlCode = value; break;
      case 'CSS': this.cssCode = value; break;
    }
  }

  onKeyDown(event: KeyboardEvent): void {
    if (event.key === 'Enter' && (event.ctrlKey || event.metaKey)) {
      event.preventDefault();
      this.runCode();
    }
  }

  runCode(): void {
    this.hasError.set(false);
    this.errorMessage.set('');
    this.consoleOutput.set([]);

    const jsCode = this.javascriptCode;
    const htmlCode = this.htmlCode;
    const cssCode = this.cssCode;

    const fullHtml = this.buildHtmlWithCapture(jsCode, htmlCode, cssCode);
    this.sandboxHtml.set(fullHtml);
  }

  private buildHtmlWithCapture(jsCode: string, htmlCode: string, cssCode: string): string {
    const escapedJs = this.escapeHtmlForSrcdoc(jsCode);
    const escapedCss = this.escapeHtmlForSrcdoc(cssCode);

    return `<!DOCTYPE html>
<html>
<head>
  <style>${escapedCss}</style>
</head>
<body>
  ${htmlCode}
  <script>
    (function() {
      const output = [];
      const parentWindow = window.parent;

      function sendOutput(type, args) {
        const text = args.map(a =>
          typeof a === 'object' ? JSON.stringify(a, null, 2) : String(a)
        ).join(' ');
        output.push({ type: type, text: text });
      }

      const originalLog = console.log;
      const originalError = console.error;
      const originalWarn = console.warn;
      const originalInfo = console.info;

      console.log = function() { sendOutput('log', Array.from(arguments)); };
      console.error = function() { sendOutput('error', Array.from(arguments)); };
      console.warn = function() { sendOutput('warn', Array.from(arguments)); };
      console.info = function() { sendOutput('info', Array.from(arguments)); };

      window.onerror = function(msg, src, line, col, err) {
        sendOutput('error', ['Error: ' + msg + (line ? ' (line ' + line + ')' : '')]);
        return true;
      };

      try {
        ${escapedJs}
      } catch(e) {
        sendOutput('error', ['Error: ' + e.message]);
      }

      try {
        parentWindow.postMessage({ type: 'console-output', output: output }, '*');
      } catch(e) {}
    })();
  <\/script>
</body>
</html>`;
  }

  private escapeHtmlForSrcdoc(code: string): string {
    return code.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
  }

  @HostListener('window:message', ['$event'])
  onMessage(event: MessageEvent): void {
    if (event.data && event.data.type === 'console-output') {
      this.consoleOutput.set(event.data.output);
    }
  }

  copyCode(): void {
    navigator.clipboard.writeText(this.getCurrentCode());
  }

  resetCode(): void {
    this.loadExample(this.examples[0]);
  }

  clearConsole(): void {
    this.consoleOutput.set([]);
  }

  loadExample(example: { name: string; icon: string; code: string }): void {
    this.javascriptCode = example.code;
    this.activeTab.set('JavaScript');
    this.runCode();
  }
}
