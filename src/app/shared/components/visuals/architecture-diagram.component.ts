import { Component, signal } from '@angular/core';

interface ArchNode {
  id: string;
  label: string;
  x: number;
  y: number;
  width: number;
  height: number;
  color: string;
  textColor: string;
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
        <svg viewBox="0 0 1050 680" class="architecture-svg">
          <defs>
            <marker id="arrowhead" markerWidth="10" markerHeight="7" refX="9" refY="3.5" orient="auto">
              <polygon points="0 0, 10 3.5, 0 7" fill="#94a3b8"/>
            </marker>
            <filter id="shadow" x="-10%" y="-10%" width="120%" height="130%">
              <feDropShadow dx="0" dy="2" stdDeviation="3" flood-opacity="0.15"/>
            </filter>
          </defs>

          <!-- Background grid -->
          <pattern id="grid" width="30" height="30" patternUnits="userSpaceOnUse">
            <path d="M 30 0 L 0 0 0 30" fill="none" stroke="var(--border-color, #e2e8f0)" stroke-width="0.5" opacity="0.5"/>
          </pattern>
          <rect width="100%" height="100%" fill="url(#grid)" rx="12"/>

          <!-- Edges -->
          @for (edge of edges(); track edge.from + edge.to) {
            <g class="edge-group">
              <line
                [attr.x1]="edgeX1(edge)"
                [attr.y1]="edgeY1(edge)"
                [attr.x2]="edgeX2(edge)"
                [attr.y2]="edgeY2(edge)"
                stroke="#94a3b8"
                stroke-width="2"
                [class.animated-edge]="edge.animated"
                marker-end="url(#arrowhead)"/>
              @if (edge.label) {
                <rect
                  [attr.x]="edgeLabelX(edge) - getTextWidth(edge.label) / 2 - 6"
                  [attr.y]="edgeLabelY(edge) - 10"
                  [attr.width]="getTextWidth(edge.label) + 12"
                  height="18"
                  rx="4"
                  fill="var(--bg-primary, white)"
                  stroke="var(--border-color, #e2e8f0)"
                  stroke-width="1"/>
                <text
                  [attr.x]="edgeLabelX(edge)"
                  [attr.y]="edgeLabelY(edge) + 3"
                  class="edge-label"
                  text-anchor="middle">
                  {{ edge.label }}
                </text>
              }
            </g>
          }

          <!-- Nodes -->
          @for (node of nodes(); track node.id) {
            <g class="node-group"
               [class.active]="selectedNode() === node.id"
               (click)="selectNode(node.id)">
              <rect
                [attr.x]="node.x"
                [attr.y]="node.y"
                [attr.width]="node.width"
                [attr.height]="node.height"
                rx="10"
                [attr.fill]="node.color"
                filter="url(#shadow)"
                class="node-rect"/>
              <text
                [attr.x]="node.x + node.width / 2"
                [attr.y]="node.y + 26"
                [attr.fill]="node.textColor"
                class="node-icon"
                text-anchor="middle">
                {{ node.icon }}
              </text>
              <text
                [attr.x]="node.x + node.width / 2"
                [attr.y]="node.y + 48"
                [attr.fill]="node.textColor"
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
      background: var(--bg-primary);
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
      color: var(--text-primary);
    }
    .diagram-header p {
      margin: 0;
      color: var(--text-secondary);
    }
    .diagram-wrapper {
      background: var(--bg-secondary);
      border-radius: 12px;
      padding: 20px;
      margin-bottom: 24px;
      overflow-x: auto;
    }
    .architecture-svg {
      width: 100%;
      min-width: 700px;
      height: auto;
    }
    .node-group {
      cursor: pointer;
    }
    .node-group:hover .node-rect {
      filter: brightness(1.1) url(#shadow);
    }
    .node-group.active .node-rect {
      stroke: var(--text-primary, #1e293b);
      stroke-width: 3;
    }
    .node-rect {
      transition: all 0.2s;
    }
    .node-icon {
      font-size: 20px;
      pointer-events: none;
    }
    .node-label {
      font-size: 13px;
      font-weight: 600;
      pointer-events: none;
    }
    .edge-label {
      font-size: 11px;
      fill: var(--text-secondary, #64748b);
      font-weight: 500;
      pointer-events: none;
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
      background: var(--bg-secondary);
      border-radius: 12px;
      padding: 20px;
    }
    .legend h4 {
      margin: 0 0 16px;
      color: var(--text-primary);
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
      background: var(--bg-primary);
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
    .legend-label { font-size: 13px; color: var(--text-primary); }
  `]
})
export class ArchitectureDiagramComponent {
  selectedNode = signal('');

  nodes = signal<ArchNode[]>([
    { id: 'browser', label: 'Browser', x: 425, y: 10, width: 200, height: 56, color: '#3b82f6', textColor: 'white', icon: '🌐', description: 'The web browser where your Angular application runs. It renders the DOM and handles user interactions.' },
    { id: 'app', label: 'Root Component', x: 425, y: 110, width: 200, height: 56, color: '#6366f1', textColor: 'white', icon: '📦', description: 'The root component (AppComponent) that bootstraps the application and contains the main layout.' },
    { id: 'router', label: 'Router', x: 100, y: 110, width: 180, height: 56, color: '#ec4899', textColor: 'white', icon: '🧭', description: 'Angular Router handles navigation between different views/components based on URL changes.' },
    { id: 'components', label: 'Components', x: 330, y: 230, width: 180, height: 56, color: '#10b981', textColor: 'white', icon: '🧩', description: 'Components are UI building blocks with templates, logic, and styles. They form a hierarchical tree.' },
    { id: 'templates', label: 'Templates', x: 570, y: 230, width: 180, height: 56, color: '#f43f5e', textColor: 'white', icon: '📝', description: 'HTML templates with Angular syntax. They define the view for each component using data binding.' },
    { id: 'services', label: 'Services', x: 100, y: 350, width: 180, height: 56, color: '#06b6d4', textColor: 'white', icon: '⚙️', description: 'Services encapsulate business logic, data access, and reusable functionality shared across components.' },
    { id: 'di', label: 'Dependency Injection', x: 350, y: 350, width: 200, height: 56, color: '#f59e0b', textColor: 'white', icon: '💉', description: 'DI is Angular\'s powerful dependency injection system that provides dependencies to components and services.' },
    { id: 'signals', label: 'Signals', x: 640, y: 350, width: 180, height: 56, color: '#8b5cf6', textColor: 'white', icon: '⚡', description: 'Signals are reactive primitives for state management. They track changes and update the UI efficiently.' },
    { id: 'http', label: 'HttpClient', x: 100, y: 480, width: 180, height: 56, color: '#14b8a6', textColor: 'white', icon: '🌍', description: 'HttpClient enables communication with backend APIs using HTTP requests and Observables.' },
    { id: 'forms', label: 'Forms', x: 350, y: 480, width: 200, height: 56, color: '#f97316', textColor: 'white', icon: '📋', description: 'Angular Forms handle user input with template-driven or reactive approaches and validation.' },
    { id: 'state', label: 'State', x: 640, y: 480, width: 180, height: 56, color: '#a855f7', textColor: 'white', icon: '💾', description: 'Application state management using Signals, services, or external libraries like NgRx.' },
  ]);

  edges = signal<ArchEdge[]>([
    { from: 'browser', to: 'app', label: 'Renders', animated: true, color: '#3b82f6' },
    { from: 'app', to: 'router', label: 'Navigates', animated: true, color: '#ec4899' },
    { from: 'app', to: 'components', label: 'Contains', animated: false, color: '#10b981' },
    { from: 'components', to: 'templates', label: 'Uses', animated: false, color: '#f43f5e' },
    { from: 'components', to: 'services', label: 'Injects', animated: true, color: '#06b6d4' },
    { from: 'services', to: 'di', label: 'Provided by', animated: false, color: '#f59e0b' },
    { from: 'components', to: 'signals', label: 'State', animated: true, color: '#8b5cf6' },
    { from: 'services', to: 'http', label: 'Calls', animated: true, color: '#14b8a6' },
    { from: 'components', to: 'forms', label: 'Handles', animated: false, color: '#f97316' },
    { from: 'services', to: 'state', label: 'Manages', animated: false, color: '#a855f7' },
  ]);

  getNode(id: string): ArchNode {
    return this.nodes().find(n => n.id === id) || this.nodes()[0];
  }

  selectNode(id: string): void {
    this.selectedNode.set(this.selectedNode() === id ? '' : id);
  }

  edgeX1(edge: ArchEdge): number {
    const from = this.getNode(edge.from);
    const to = this.getNode(edge.to);
    if (from.y === to.y) {
      return from.x + (to.x > from.x ? from.width : 0);
    }
    return from.x + from.width / 2;
  }

  edgeY1(edge: ArchEdge): number {
    const from = this.getNode(edge.from);
    const to = this.getNode(edge.to);
    if (from.y === to.y) {
      return from.y + from.height / 2;
    }
    return from.y + from.height;
  }

  edgeX2(edge: ArchEdge): number {
    const from = this.getNode(edge.from);
    const to = this.getNode(edge.to);
    if (from.y === to.y) {
      return to.x + (to.x > from.x ? 0 : to.width);
    }
    return to.x + to.width / 2;
  }

  edgeY2(edge: ArchEdge): number {
    const from = this.getNode(edge.from);
    const to = this.getNode(edge.to);
    if (from.y === to.y) {
      return to.y + to.height / 2;
    }
    return to.y;
  }

  edgeLabelX(edge: ArchEdge): number {
    return (this.edgeX1(edge) + this.edgeX2(edge)) / 2;
  }

  edgeLabelY(edge: ArchEdge): number {
    return (this.edgeY1(edge) + this.edgeY2(edge)) / 2;
  }

  getTextWidth(text: string): number {
    return text.length * 6.5 + 4;
  }
}
