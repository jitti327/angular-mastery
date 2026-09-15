import { Component, signal, computed } from '@angular/core';

interface ArchNode {
  id: string;
  label: string;
  x: number;
  y: number;
  width: number;
  height: number;
  color: string;
  icon: string;
  description: string;
}

interface ArchEdge {
  from: string;
  to: string;
  label: string;
  animated: boolean;
  color: string;
}

@Component({
  selector: 'app-architecture-diagram',
  standalone: true,
  template: `
    <div class="diagram-container">
      <div class="diagram-header">
        <h2>Angular Application Architecture</h2>
        <p>Click on any component to learn more</p>
      </div>

      <div class="diagram-wrapper">
        <svg viewBox="0 0 900 600" class="architecture-svg">
          <defs>
            <marker id="arrowhead" markerWidth="10" markerHeight="7" refX="9" refY="3.5" orient="auto">
              <polygon points="0 0, 10 3.5, 0 7" fill="#666"/>
            </marker>
            <filter id="glow">
              <feGaussianBlur stdDeviation="3" result="coloredBlur"/>
              <feMerge>
                <feMergeNode in="coloredBlur"/>
                <feMergeNode in="SourceGraphic"/>
              </feMerge>
            </filter>
            <linearGradient id="gradient1" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" style="stop-color:#667eea"/>
              <stop offset="100%" style="stop-color:#764ba2"/>
            </linearGradient>
            <linearGradient id="gradient2" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" style="stop-color:#f093fb"/>
              <stop offset="100%" style="stop-color:#f5576c"/>
            </linearGradient>
            <linearGradient id="gradient3" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" style="stop-color:#4facfe"/>
              <stop offset="100%" style="stop-color:#00f2fe"/>
            </linearGradient>
          </defs>

          <!-- Animated background grid -->
          <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
            <path d="M 40 0 L 0 0 0 40" fill="none" stroke="#f0f0f0" stroke-width="1"/>
          </pattern>
          <rect width="100%" height="100%" fill="url(#grid)"/>

          <!-- Edges with animation -->
          @for (edge of edges(); track edge.from + edge.to) {
            <g class="edge-group">
              <line
                [attr.x1]="getNode(edge.from).x + getNode(edge.from).width / 2"
                [attr.y1]="getNode(edge.from).y + getNode(edge.from).height"
                [attr.x2]="getNode(edge.to).x + getNode(edge.to).width / 2"
                [attr.y2]="getNode(edge.to).y"
                [attr.stroke]="edge.color"
                stroke-width="2"
                [class.animated-edge]="edge.animated"
                marker-end="url(#arrowhead)"/>
              @if (edge.label) {
                <text
                  [attr.x]="(getNode(edge.from).x + getNode(edge.to).x) / 2 + 40"
                  [attr.y]="(getNode(edge.from).y + getNode(edge.to).y + getNode(edge.to).height) / 2 + 20"
                  class="edge-label">
                  {{ edge.label }}
                </text>
              }
            </g>
          }

          <!-- Nodes -->
          @for (node of nodes(); track node.id) {
            <g class="node-group"
               [class.active]="selectedNode() === node.id"
               (click)="selectNode(node.id)"
               (mouseenter)="hoverNode.set(node.id)"
               (mouseleave)="hoverNode.set('')">
              <rect
                [attr.x]="node.x"
                [attr.y]="node.y"
                [attr.width]="node.width"
                [attr.height]="node.height"
                rx="12"
                [attr.fill]="node.color"
                class="node-rect"/>
              <text
                [attr.x]="node.x + node.width / 2"
                [attr.y]="node.y + 28"
                class="node-icon"
                text-anchor="middle">
                {{ node.icon }}
              </text>
              <text
                [attr.x]="node.x + node.width / 2"
                [attr.y]="node.y + 52"
                class="node-label"
                text-anchor="middle">
                {{ node.label }}
              </text>
            </g>
          }
        </svg>
      </div>

      @if (selectedNode()) {
        <div class="node-info">
          <div class="info-header">
            <span class="info-icon">{{ getNode(selectedNode()).icon }}</span>
            <h3>{{ getNode(selectedNode()).label }}</h3>
            <button class="close-btn" (click)="selectedNode.set('')">×</button>
          </div>
          <p>{{ getNode(selectedNode()).description }}</p>
        </div>
      }

      <div class="legend">
        <h4>Components</h4>
        <div class="legend-items">
          @for (node of nodes(); track node.id) {
            <div class="legend-item" (click)="selectNode(node.id)">
              <span class="legend-color" [style.background]="node.color"></span>
              <span class="legend-icon">{{ node.icon }}</span>
              <span class="legend-label">{{ node.label }}</span>
            </div>
          }
        </div>
      </div>
    </div>
  `,
  styles: [`
    .diagram-container {
      background: white;
      border-radius: 16px;
      padding: 32px;
      box-shadow: 0 4px 24px rgba(0,0,0,0.08);
      margin: 32px 0;
    }
    .diagram-header {
      text-align: center;
      margin-bottom: 32px;
    }
    .diagram-header h2 {
      margin: 0 0 8px;
      font-size: 28px;
      color: #1a1a1a;
    }
    .diagram-header p {
      margin: 0;
      color: #666;
    }
    .diagram-wrapper {
      background: #fafafa;
      border-radius: 12px;
      padding: 20px;
      margin-bottom: 24px;
    }
    .architecture-svg {
      width: 100%;
      height: auto;
    }
    .node-group {
      cursor: pointer;
      transition: transform 0.2s;
    }
    .node-group:hover .node-rect {
      filter: brightness(1.1);
    }
    .node-group.active .node-rect {
      stroke: #333;
      stroke-width: 3;
    }
    .node-rect {
      transition: all 0.2s;
      filter: drop-shadow(0 4px 6px rgba(0,0,0,0.1));
    }
    .node-icon {
      font-size: 24px;
      fill: white;
    }
    .node-label {
      font-size: 13px;
      font-weight: 600;
      fill: white;
    }
    .edge-label {
      font-size: 11px;
      fill: #666;
    }
    .animated-edge {
      stroke-dasharray: 8 4;
      animation: dash 1s linear infinite;
    }
    @keyframes dash {
      to { stroke-dashoffset: -12; }
    }
    .node-info {
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
      color: white;
      border-radius: 12px;
      padding: 24px;
      margin-bottom: 24px;
      animation: slideUp 0.3s ease-out;
    }
    @keyframes slideUp {
      from { opacity: 0; transform: translateY(10px); }
      to { opacity: 1; transform: translateY(0); }
    }
    .info-header {
      display: flex;
      align-items: center;
      gap: 12px;
      margin-bottom: 12px;
    }
    .info-icon { font-size: 32px; }
    .info-header h3 {
      margin: 0;
      flex: 1;
      font-size: 20px;
    }
    .close-btn {
      width: 32px;
      height: 32px;
      background: rgba(255,255,255,0.2);
      border: none;
      border-radius: 50%;
      color: white;
      font-size: 20px;
      cursor: pointer;
    }
    .node-info p {
      margin: 0;
      line-height: 1.6;
      opacity: 0.95;
    }
    .legend {
      background: #f9f9f9;
      border-radius: 12px;
      padding: 20px;
    }
    .legend h4 {
      margin: 0 0 16px;
      color: #333;
    }
    .legend-items {
      display: flex;
      flex-wrap: wrap;
      gap: 12px;
    }
    .legend-item {
      display: flex;
      align-items: center;
      gap: 8px;
      padding: 8px 12px;
      background: white;
      border-radius: 8px;
      cursor: pointer;
      transition: all 0.2s;
    }
    .legend-item:hover {
      transform: translateY(-2px);
      box-shadow: 0 4px 12px rgba(0,0,0,0.1);
    }
    .legend-color {
      width: 12px;
      height: 12px;
      border-radius: 3px;
    }
    .legend-icon { font-size: 16px; }
    .legend-label { font-size: 13px; color: #333; }
  `]
})
export class ArchitectureDiagramComponent {
  selectedNode = signal('');
  hoverNode = signal('');

  nodes = signal<ArchNode[]>([
    { id: 'browser', label: 'Browser', x: 350, y: 20, width: 200, height: 60, color: '#4facfe', icon: '🌐', description: 'The web browser where your Angular application runs. It renders the DOM and handles user interactions.' },
    { id: 'app', label: 'Root Component', x: 350, y: 120, width: 200, height: 60, color: '#667eea', icon: '📦', description: 'The root component (AppComponent) that bootstraps the application and contains the main layout.' },
    { id: 'router', label: 'Router', x: 100, y: 120, width: 180, height: 60, color: '#f093fb', icon: '🧭', description: 'Angular Router handles navigation between different views/components based on URL changes.' },
    { id: 'components', label: 'Components', x: 250, y: 240, width: 180, height: 60, color: '#43e97b', icon: '🧩', description: 'Components are UI building blocks with templates, logic, and styles. They form a hierarchical tree.' },
    { id: 'templates', label: 'Templates', x: 470, y: 240, width: 180, height: 60, color: '#fa709a', icon: '📝', description: 'HTML templates with Angular syntax. They define the view for each component using data binding.' },
    { id: 'services', label: 'Services', x: 100, y: 340, width: 180, height: 60, color: '#a8edea', icon: '⚙️', description: 'Services encapsulate business logic, data access, and reusable functionality shared across components.' },
    { id: 'di', label: 'Dependency Injection', x: 350, y: 340, width: 200, height: 60, color: '#ffecd2', icon: '💉', description: 'DI is Angular\'s powerful dependency injection system that provides dependencies to components and services.' },
    { id: 'signals', label: 'Signals', x: 600, y: 340, width: 180, height: 60, color: '#a18cd1', icon: '⚡', description: 'Signals are reactive primitives for state management. They track changes and update the UI efficiently.' },
    { id: 'http', label: 'HttpClient', x: 100, y: 450, width: 180, height: 60, color: '#84fab0', icon: '🌐', description: 'HttpClient enables communication with backend APIs using HTTP requests and Observables.' },
    { id: 'forms', label: 'Forms', x: 350, y: 450, width: 180, height: 60, color: '#fccb90', icon: '📋', description: 'Angular Forms handle user input with template-driven or reactive approaches and validation.' },
    { id: 'state', label: 'State', x: 600, y: 450, width: 180, height: 60, color: '#d299c2', icon: '💾', description: 'Application state management using Signals, services, or external libraries like NgRx.' },
  ]);

  edges = signal<ArchEdge[]>([
    { from: 'browser', to: 'app', label: 'Renders', animated: true, color: '#4facfe' },
    { from: 'app', to: 'router', label: 'Navigates', animated: true, color: '#f093fb' },
    { from: 'app', to: 'components', label: 'Contains', animated: false, color: '#43e97b' },
    { from: 'components', to: 'templates', label: 'Uses', animated: false, color: '#fa709a' },
    { from: 'components', to: 'services', label: 'Injects', animated: true, color: '#a8edea' },
    { from: 'services', to: 'di', label: 'Provided by', animated: false, color: '#ffecd2' },
    { from: 'components', to: 'signals', label: 'State', animated: true, color: '#a18cd1' },
    { from: 'services', to: 'http', label: 'Calls', animated: true, color: '#84fab0' },
    { from: 'components', to: 'forms', label: 'Handles', animated: false, color: '#fccb90' },
    { from: 'services', to: 'state', label: 'Manages', animated: false, color: '#d299c2' },
  ]);

  getNode(id: string): ArchNode {
    return this.nodes().find(n => n.id === id) || this.nodes()[0];
  }

  selectNode(id: string): void {
    this.selectedNode.set(this.selectedNode() === id ? '' : id);
  }
}
