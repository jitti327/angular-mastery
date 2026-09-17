import { Component, signal, computed } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

interface PlaygroundTemplate {
  name: string;
  language: string;
  icon: string;
  code: string;
  html?: string;
  css?: string;
}

@Component({
  selector: 'app-code-playground',
  standalone: true,
  template: `
    <div class="playground">
      <div class="playground-header">
        <span class="playground-title">Interactive Playground</span>
        <div class="playground-tabs">
          @for (tpl of templates; track tpl.language) {
            <button
              class="tab-btn"
              [class.active]="activeTab() === tpl.language"
              (click)="setTab(tpl.language)">
              {{ tpl.icon }} {{ tpl.name }}
            </button>
          }
        </div>
        <div class="playground-actions">
          <button class="stackblitz-btn" (click)="openStackBlitz()" title="Open in StackBlitz for real execution">⚡ StackBlitz</button>
          <button class="run-btn" (click)="runCode()">&#9654; Run</button>
          <button class="reset-btn" (click)="resetCode()">&#8634; Reset</button>
        </div>
      </div>

      <div class="playground-body">
        @if (activeTab() === 'html-css' || activeTab() === 'react' || activeTab() === 'vue' || activeTab() === 'svelte') {
          <div class="split-view">
            <div class="editor-pane">
              <div class="pane-header">Editor</div>
              <div class="editor-area">
                <textarea
                  [value]="code()"
                  (input)="onCodeChange($event)"
                  spellcheck="false"
                  class="code-editor"></textarea>
              </div>
              @if (activeTab() === 'html-css') {
                <div class="pane-header">CSS</div>
                <div class="editor-area">
                  <textarea
                    [value]="cssCode()"
                    (input)="onCssChange($event)"
                    spellcheck="false"
                    class="code-editor css-editor"></textarea>
                </div>
              }
            </div>
            <div class="preview-pane">
              <div class="pane-header">Preview</div>
              <iframe
                [src]="previewUrl()"
                class="preview-frame"
                sandbox="allow-scripts allow-same-origin">
              </iframe>
            </div>
          </div>
        } @else {
          <div class="split-view">
            <div class="editor-pane">
              <div class="pane-header">{{ activeTab() === 'typescript' ? 'TypeScript' : 'JavaScript' }} Code</div>
              <div class="editor-area">
                <textarea
                  [value]="code()"
                  (input)="onCodeChange($event)"
                  spellcheck="false"
                  class="code-editor"></textarea>
              </div>
            </div>
            <div class="output-pane">
              <div class="pane-header">Console Output</div>
              <div class="output-content">
                @for (line of output(); track $index) {
                  <div [class.error]="line.startsWith('Error:')" [class.warn]="line.startsWith('Warning:')">{{ line }}</div>
                }
                @if (output().length === 0) {
                  <div class="placeholder">Click Run to see output...</div>
                }
              </div>
            </div>
          </div>
        }
      </div>
    </div>
  `,
  styles: [`
    .playground {
      border: 1px solid var(--border-color, #333);
      border-radius: 12px;
      overflow: hidden;
      margin: 16px 0;
      font-family: 'Consolas', 'Monaco', monospace;
      background: var(--bg-primary, #1e1e1e);
    }
    .playground-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 10px 16px;
      background: #2d2d2d;
      border-bottom: 1px solid #333;
      flex-wrap: wrap;
      gap: 8px;
    }
    .playground-title {
      color: #fff;
      font-weight: 600;
      font-size: 14px;
    }
    .playground-tabs {
      display: flex;
      gap: 4px;
      flex-wrap: wrap;
    }
    .tab-btn {
      padding: 5px 12px;
      background: transparent;
      color: #999;
      border: 1px solid transparent;
      border-radius: 6px;
      font-size: 12px;
      cursor: pointer;
      transition: all 0.2s;
      font-family: inherit;
    }
    .tab-btn:hover { color: #fff; background: #3a3a3a; }
    .tab-btn.active {
      color: #fff;
      background: #667eea;
      border-color: #667eea;
    }
    .playground-actions {
      display: flex;
      gap: 8px;
    }
    .run-btn, .reset-btn {
      padding: 6px 16px;
      border: none;
      border-radius: 6px;
      font-size: 13px;
      font-weight: 500;
      cursor: pointer;
      transition: all 0.2s;
      font-family: inherit;
    }
    .run-btn { background: #4caf50; color: #fff; }
    .run-btn:hover { background: #388e3c; }
    .reset-btn { background: #555; color: #fff; }
    .reset-btn:hover { background: #666; }
    .stackblitz-btn {
      background: #1389fd;
      color: white;
      border: none;
      padding: 6px 14px;
      border-radius: 4px;
      font-size: 12px;
      font-weight: 600;
      cursor: pointer;
      transition: background 0.2s;
    }
    .stackblitz-btn:hover { background: #0d7ae6; }
    .playground-body { min-height: 400px; }
    .split-view { display: flex; height: 400px; }
    .editor-pane, .output-pane, .preview-pane {
      flex: 1;
      display: flex;
      flex-direction: column;
      min-width: 0;
    }
    .editor-pane { border-right: 1px solid #333; }
    .preview-pane { border-left: 1px solid #333; }
    .pane-header {
      padding: 8px 16px;
      background: #1a1a1a;
      color: #999;
      font-size: 11px;
      font-weight: 600;
      text-transform: uppercase;
      letter-spacing: 0.5px;
      border-bottom: 1px solid #333;
    }
    .editor-area { flex: 1; overflow: hidden; }
    .code-editor {
      width: 100%;
      height: 100%;
      background: #1e1e1e;
      color: #d4d4d4;
      border: none;
      padding: 16px;
      font-family: 'Consolas', 'Monaco', monospace;
      font-size: 13px;
      line-height: 1.6;
      resize: none;
      outline: none;
      box-sizing: border-box;
      tab-size: 2;
    }
    .css-editor { background: #1a2332; }
    .output-content {
      flex: 1;
      background: #0d0d0d;
      padding: 12px 16px;
      overflow-y: auto;
      font-size: 13px;
      line-height: 1.5;
    }
    .output-content div {
      color: #4caf50;
      padding: 2px 0;
      white-space: pre-wrap;
      word-break: break-all;
    }
    .output-content div.error { color: #ff5252; }
    .output-content div.warn { color: #ffb74d; }
    .placeholder { color: #666; font-style: italic; }
    .preview-frame {
      flex: 1;
      width: 100%;
      height: 100%;
      border: none;
      background: #fff;
    }
    @media (max-width: 768px) {
      .split-view { flex-direction: column; height: auto; }
      .editor-pane, .preview-pane { border: none; border-bottom: 1px solid #333; }
      .editor-pane { min-height: 250px; }
      .preview-pane { min-height: 250px; }
    }
  `]
})
export class CodePlaygroundComponent {
  templates: PlaygroundTemplate[] = [
    {
      name: 'JavaScript',
      language: 'javascript',
      icon: 'JS',
      code: `// JavaScript Playground\nconst numbers = [1, 2, 3, 4, 5];\nconst doubled = numbers.map(n => n * 2);\nconsole.log('Doubled:', doubled);\n\n// Array methods\nconst sum = numbers.reduce((a, b) => a + b, 0);\nconsole.log('Sum:', sum);\n\n// Destructuring\nconst [first, ...rest] = numbers;\nconsole.log('First:', first, 'Rest:', rest);`
    },
    {
      name: 'TypeScript',
      language: 'typescript',
      icon: 'TS',
      code: `// TypeScript Playground\ninterface User {\n  name: string;\n  age: number;\n  email?: string;\n}\n\nconst greet = (user: User): string => {\n  return \`Hello, \${user.name}! You are \${user.age} years old.\`;\n};\n\nconst user: User = { name: 'Alice', age: 30 };\nconsole.log(greet(user));\n\n// Generics\nconst getFirst = <T>(arr: T[]): T | undefined => arr[0];\nconsole.log(getFirst([10, 20, 30]));\nconsole.log(getFirst(['a', 'b', 'c']));`
    },
    {
      name: 'HTML/CSS',
      language: 'html-css',
      icon: '</>',
      code: `<div class="card">\n  <h2>Hello World</h2>\n  <p>This is a live preview.</p>\n  <button onclick="this.textContent = 'Clicked!'">Click Me</button>\n  <ul>\n    <li>Item 1</li>\n    <li>Item 2</li>\n    <li>Item 3</li>\n  </ul>\n</div>`,
      css: `.card {\n  font-family: system-ui;\n  padding: 24px;\n  max-width: 400px;\n  margin: 20px auto;\n  background: linear-gradient(135deg, #667eea, #764ba2);\n  border-radius: 16px;\n  color: white;\n  box-shadow: 0 10px 30px rgba(0,0,0,0.2);\n}\nh2 { margin: 0 0 8px; }\np { opacity: 0.9; margin: 0 0 16px; }\nbutton {\n  padding: 10px 24px;\n  border: 2px solid white;\n  background: transparent;\n  color: white;\n  border-radius: 8px;\n  cursor: pointer;\n  font-size: 14px;\n  transition: all 0.2s;\n}\nbutton:hover { background: white; color: #667eea; }\nul { padding-left: 20px; margin-top: 16px; }\nli { margin: 4px 0; }`
    },
    {
      name: 'React',
      language: 'react',
      icon: 'R',
      code: `// React Component (rendered in preview)\n// This shows how a React component looks\n// Copy this code to a React project to run it\n\nfunction Counter() {\n  const [count, setCount] = React.useState(0);\n  \n  return (\n    <div style={{ textAlign: 'center', padding: '20px', fontFamily: 'system-ui' }}>\n      <h2>React Counter</h2>\n      <p style={{ fontSize: '48px', margin: '20px 0' }}>{count}</p>\n      <button onClick={() => setCount(c => c - 1)} style={{ padding: '10px 20px', marginRight: '8px' }}>-</button>\n      <button onClick={() => setCount(0)} style={{ padding: '10px 20px', marginRight: '8px' }}>Reset</button>\n      <button onClick={() => setCount(c => c + 1)} style={{ padding: '10px 20px' }}>+</button>\n    </div>\n  );\n}`
    },
    {
      name: 'Vue',
      language: 'vue',
      icon: 'V',
      code: `<!-- Vue 3 Composition API -->\n<script setup>\nimport { ref, computed } from 'vue'\n\nconst items = ref(['Learn Vue', 'Build Apps', 'Ship to Prod'])\nconst newItem = ref('')\nconst remaining = computed(() => items.value.filter(i => !i.done).length)\n\nconst add = () => {\n  if (newItem.value.trim()) {\n    items.value.push({ text: newItem.value, done: false })\n    newItem.value = ''\n  }\n}\n</script>\n\n<template>\n  <div style="padding: 20px; font-family: system-ui; max-width: 400px; margin: auto;">\n    <h2>Vue Todo App</h2>\n    <p>{{ remaining }} items remaining</p>\n    <div style="display: flex; gap: 8px; margin-bottom: 16px;">\n      <input v-model="newItem" @keyup.enter="add" placeholder="Add item..." style="flex:1; padding: 8px;" />\n      <button @click="add">Add</button>\n    </div>\n    <ul>\n      <li v-for="(item, i) in items" :key="i" style="padding: 8px 0;">\n        <input type="checkbox" v-model="item.done" /> {{ item.text }}\n      </li>\n    </ul>\n  </div>\n</template>`
    },
    {
      name: 'Svelte',
      language: 'svelte',
      icon: 'S',
      code: `<!-- Svelte Component -->\n<script>\n  let count = 0;\n  $: doubled = count * 2;\n  $: quadrupled = doubled * 2;\n</script>\n\n<main style="text-align: center; padding: 20px; font-family: system-ui;">\n  <h2>Svelte Reactivity Demo</h2>\n  <p style="font-size: 32px;">Count: {count}</p>\n  <p>Doubled: {doubled}</p>\n  <p>Quadrupled: {quadrupled}</p>\n  <button on:click={() => count++}>Increment</button>\n  <button on:click={() => count = 0}>Reset</button>\n</main>`
    }
  ];

  activeTab = signal<string>('javascript');
  code = signal<string>(this.templates[0].code);
  cssCode = signal<string>('');
  output = signal<string[]>([]);
  previewUrl = signal<SafeResourceUrl>('');

  constructor(private sanitizer: DomSanitizer) {
    this.updatePreview();
  }

  setTab(lang: string): void {
    this.activeTab.set(lang);
    const tpl = this.templates.find(t => t.language === lang);
    if (tpl) {
      this.code.set(tpl.code);
      this.cssCode.set(tpl.css || '');
    }
    this.output.set([]);
    this.updatePreview();
  }

  onCodeChange(event: Event): void {
    const textarea = event.target as HTMLTextAreaElement;
    this.code.set(textarea.value);
    if (this.activeTab() !== 'javascript' && this.activeTab() !== 'typescript') {
      this.updatePreview();
    }
  }

  onCssChange(event: Event): void {
    const textarea = event.target as HTMLTextAreaElement;
    this.cssCode.set(textarea.value);
    this.updatePreview();
  }

  updatePreview(): void {
    const lang = this.activeTab();
    let html = '';

    if (lang === 'html-css') {
      html = `<!DOCTYPE html><html><head><style>${this.cssCode()}</style></head><body>${this.code()}</body></html>`;
    } else if (lang === 'react') {
      html = `<!DOCTYPE html><html><head><script src="https://unpkg.com/react@18/umd/react.development.js"><\/script><script src="https://unpkg.com/react-dom@18/umd/react-dom.development.js"><\/script><script src="https://unpkg.com/@babel/standalone/babel.min.js"><\/script><style>body{margin:0;font-family:system-ui;}</style></head><body><div id="root"></div><script type="text/babel">${this.code()}ReactDOM.createRoot(document.getElementById('root')).render(<Counter />);<\/script></body></html>`;
    } else if (lang === 'vue') {
      html = `<!DOCTYPE html><html><head><script src="https://unpkg.com/vue@3/dist/vue.global.js"><\/script><style>body{margin:0;font-family:system-ui;}</style></head><body><div id="app"></div><script>const {createApp,ref,computed}=Vue;${this.code().replace(/<script setup>/, '').replace(/<\/script>/, '').replace(/<template>/, '').replace(/<\/template>/, '')}createApp({setup(){return{}}}).mount('#app');<\/script></body></html>`;
    } else if (lang === 'svelte') {
      html = `<!DOCTYPE html><html><head><style>body{margin:0;font-family:system-ui;text-align:center;padding:20px;}button{padding:8px 16px;margin:4px;}</style></head><body>${this.code().replace(/<script>[\s\S]*?<\/script>/, '').replace(/<main>/, '').replace(/<\/main>/, '')}<script>let count=0;const update=()=>{document.querySelector('p').textContent='Count: '+count;document.querySelectorAll('p')[1].textContent='Doubled: '+(count*2);document.querySelectorAll('p')[2].textContent='Quadrupled: '+(count*4);};window.count=0;window.update=update;<\/script></body></html>`;
    }

    if (html) {
      this.previewUrl.set(this.sanitizer.bypassSecurityTrustResourceUrl(
        'data:text/html;charset=utf-8,' + encodeURIComponent(html)
      ));
    }
  }

  openStackBlitz(): void {
    const lang = this.activeTab();
    const code = this.code();
    const css = this.cssCode();

    let htmlContent = '';
    let jsContent = '';
    let title = 'Angular Mastery Playground';

    if (lang === 'html-css') {
      htmlContent = code;
      title = 'HTML/CSS Playground';
    } else if (lang === 'react') {
      htmlContent = `<!DOCTYPE html>
<html><head><title>React</title>
<script src="https://unpkg.com/react@18/umd/react.development.js"><\/script>
<script src="https://unpkg.com/react-dom@18/umd/react-dom.development.js"><\/script>
<script src="https://unpkg.com/@babel/standalone/babel.min.js"><\/script>
<style>${css}</style></head>
<body><div id="root"></div>
<script type="text/babel">${code}
ReactDOM.createRoot(document.getElementById('root')).render(<App/>);
<\/script></body></html>`;
      title = 'React Playground';
    } else if (lang === 'vue') {
      htmlContent = `<!DOCTYPE html>
<html><head><title>Vue</title>
<script src="https://unpkg.com/vue@3/dist/vue.global.js"><\/script>
<style>${css}</style></head>
<body><div id="app">{{ message }}</div>
<script>
const { createApp } = Vue;
${code}
createApp({ data: () => ({ message: 'Hello Vue!' }) }).mount('#app');
<\/script></body></html>`;
      title = 'Vue Playground';
    } else if (lang === 'svelte') {
      htmlContent = `<!DOCTYPE html>
<html><head><title>Svelte</title><style>${css}</style></head>
<body><div id="app"></div>
<script>
// Svelte compiles away - this is a simplified version
${code}
<\/script></body></html>`;
      title = 'Svelte Playground';
    } else if (lang === 'typescript') {
      jsContent = code.replace(/interface\s+\w+\s*\{[^}]*\}/g, '')
        .replace(/:\s*(string|number|boolean|any|void|never|unknown|\w+)\[\]/g, '')
        .replace(/<[^>]+>/g, '')
        .replace(/as\s+\w+/g, '');
      title = 'TypeScript Playground';
    } else {
      jsContent = code;
      title = 'JavaScript Playground';
    }

    const form = document.createElement('form');
    form.action = 'https://stackblitz.com/run';
    form.method = 'POST';
    form.target = '_blank';

    const addField = (name: string, value: string) => {
      const input = document.createElement('input');
      input.type = 'hidden';
      input.name = name;
      input.value = value;
      form.appendChild(input);
    };

    addField('project[title]', title);
    addField('project[description]', 'Angular Mastery Interactive Playground');

    if (lang === 'html-css' || lang === 'react' || lang === 'vue' || lang === 'svelte') {
      addField('project[files][index.html]', htmlContent);
      if (css) addField('project[files][style.css]', css);
    } else {
      addField('project[files][index.js]', jsContent);
      addField('project[template]', 'node');
    }

    document.body.appendChild(form);
    form.submit();
    document.body.removeChild(form);
  }

  runCode(): void {
    const lang = this.activeTab();

    if (lang === 'html-css' || lang === 'react' || lang === 'vue' || lang === 'svelte') {
      this.updatePreview();
      return;
    }

    const currentOutput: string[] = [];
    const originalLog = console.log;
    const originalError = console.error;
    const originalWarn = console.warn;

    console.log = (...args: unknown[]) => {
      currentOutput.push(
        args.map(a => (typeof a === 'object' ? JSON.stringify(a, null, 2) : String(a))).join(' ')
      );
    };
    console.error = (...args: unknown[]) => {
      currentOutput.push('Error: ' + args.map(a => String(a)).join(' '));
    };
    console.warn = (...args: unknown[]) => {
      currentOutput.push('Warning: ' + args.map(a => String(a)).join(' '));
    };

    try {
      let codeToRun = this.code();
      if (lang === 'typescript') {
        codeToRun = this.transpileTypeScript(codeToRun);
      }
      const fn = new Function(codeToRun);
      fn();
    } catch (e) {
      currentOutput.push('Error: ' + (e instanceof Error ? e.message : String(e)));
    } finally {
      console.log = originalLog;
      console.error = originalError;
      console.warn = originalWarn;
      this.output.set(currentOutput);
    }
  }

  private transpileTypeScript(code: string): string {
    let result = code;
    result = result.replace(/interface\s+\w+\s*\{[^}]*\}/g, '');
    result = result.replace(/type\s+\w+\s*=[^;]+;/g, '');
    result = result.replace(/:\s*(string|number|boolean|void|any|unknown|never)\b/g, '');
    result = result.replace(/<[^>]+>/g, '');
    result = result.replace(/as\s+(string|number|boolean|any)\b/g, '');
    return result;
  }

  resetCode(): void {
    const tpl = this.templates.find(t => t.language === this.activeTab());
    if (tpl) {
      this.code.set(tpl.code);
      this.cssCode.set(tpl.css || '');
    }
    this.output.set([]);
    this.updatePreview();
  }
}
