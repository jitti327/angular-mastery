import { Component, input, AfterViewChecked, ElementRef, ViewChild } from '@angular/core';
import Prism from 'prismjs';
import 'prismjs/components/prism-typescript';
import 'prismjs/components/prism-css';
import 'prismjs/components/prism-markup';

@Component({
  selector: 'app-code-viewer',
  standalone: true,
  template: `
    <div class="code-viewer">
      <div class="code-header">
        <span class="code-title">{{ title() }}</span>
        <button class="copy-btn" (click)="copyCode()">
          {{ copied ? 'Copied!' : 'Copy' }}
        </button>
      </div>
      <div class="code-tabs">
        @for (tab of tabs; track tab) {
          <button
            class="tab-btn"
            [class.active]="activeTab === tab"
            (click)="activeTab = tab">
            {{ tab }}
          </button>
        }
      </div>
      <pre class="code-block"><code #codeEl [class]="'language-' + activeTab">{{ getCode() }}</code></pre>
      @if (description()) {
        <div class="code-description">
          <p>{{ description() }}</p>
        </div>
      }
    </div>
  `,
  styles: [`
    .code-viewer {
      border: 1px solid #e0e0e0;
      border-radius: 8px;
      overflow: hidden;
      margin: 16px 0;
    }
    .code-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 12px 16px;
      background: #1e1e1e;
      color: #fff;
    }
    .code-title {
      font-weight: 600;
    }
    .copy-btn {
      background: #4fc3f7;
      border: none;
      padding: 6px 12px;
      border-radius: 4px;
      cursor: pointer;
      color: #000;
      font-weight: 500;
    }
    .copy-btn:hover {
      background: #29b6f6;
    }
    .code-tabs {
      display: flex;
      background: #2d2d2d;
      padding: 0 8px;
      gap: 4px;
    }
    .tab-btn {
      background: transparent;
      border: none;
      color: #888;
      padding: 8px 16px;
      cursor: pointer;
      border-bottom: 2px solid transparent;
    }
    .tab-btn.active {
      color: #4fc3f7;
      border-bottom-color: #4fc3f7;
    }
    .tab-btn:hover {
      color: #fff;
    }
    .code-block {
      background: #1e1e1e;
      color: #d4d4d4;
      padding: 16px;
      margin: 0;
      overflow-x: auto;
      font-family: 'Consolas', 'Monaco', monospace;
      font-size: 14px;
      line-height: 1.5;
    }
    .code-description {
      padding: 12px 16px;
      background: #f5f5f5;
      border-top: 1px solid #e0e0e0;
    }
    .code-description p {
      margin: 0;
      color: #666;
    }
  `]
})
export class CodeViewerComponent implements AfterViewChecked {
  title = input.required<string>();
  typescript = input.required<string>();
  html = input('');
  css = input('');
  description = input('');

  @ViewChild('codeEl') codeEl!: ElementRef<HTMLElement>;

  activeTab = 'typescript';
  copied = false;
  private needsHighlight = false;

  ngAfterViewChecked(): void {
    if (this.needsHighlight && this.codeEl) {
      this.needsHighlight = false;
      Prism.highlightElement(this.codeEl.nativeElement);
    }
  }

  get tabs(): string[] {
    const tabs = ['typescript'];
    if (this.html()) tabs.push('html');
    if (this.css()) tabs.push('css');
    return tabs;
  }

  getCode(): string {
    this.needsHighlight = true;
    switch (this.activeTab) {
      case 'typescript': return this.typescript();
      case 'html': return this.html();
      case 'css': return this.css();
      default: return '';
    }
  }

  async copyCode(): Promise<void> {
    await navigator.clipboard.writeText(this.getCode());
    this.copied = true;
    setTimeout(() => this.copied = false, 2000);
  }
}
