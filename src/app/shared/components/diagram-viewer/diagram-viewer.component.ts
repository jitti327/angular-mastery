import { Component, input, signal } from '@angular/core';

interface DiagramNode {
  id: string;
  label: string;
  x: number;
  y: number;
  color?: string;
}

interface DiagramEdge {
  from: string;
  to: string;
  label?: string;
}

@Component({
  selector: 'app-diagram-viewer',
  standalone: true,
  template: `
    <div class="diagram-container">
      <h3 class="diagram-title">{{ title() }}</h3>
      <div class="diagram-wrapper">
        <svg [attr.viewBox]="'0 0 ' + width + ' ' + height" class="diagram-svg">
          <!-- Edges -->
          @for (edge of edges(); track edge.from + edge.to) {
            <line
              [attr.x1]="getNode(edge.from).x"
              [attr.y1]="getNode(edge.from).y"
              [attr.x2]="getNode(edge.to).x"
              [attr.y2]="getNode(edge.to).y"
              stroke="#666"
              stroke-width="2"
              marker-end="url(#arrowhead)"/>
          }

          <!-- Arrow marker -->
          <defs>
            <marker id="arrowhead" markerWidth="10" markerHeight="7" refX="9" refY="3.5" orient="auto">
              <polygon points="0 0, 10 3.5, 0 7" fill="#666"/>
            </marker>
          </defs>

          <!-- Nodes -->
          @for (node of nodes(); track node.id) {
            <g [class]="'node ' + (hoveredNode() === node.id ? 'hovered' : '')"
               (mouseenter)="hoveredNode.set(node.id)"
               (mouseleave)="hoveredNode.set('')">
              <rect
                [attr.x]="node.x - 60"
                [attr.y]="node.y - 20"
                width="120"
                height="40"
                rx="8"
                [attr.fill]="node.color || '#4fc3f7'"
                stroke="#333"
                stroke-width="2"/>
              <text
                [attr.x]="node.x"
                [attr.y]="node.y + 5"
                text-anchor="middle"
                fill="white"
                font-size="14"
                font-weight="500">
                {{ node.label }}
              </text>
            </g>
          }
        </svg>
      </div>
    </div>
  `,
  styles: [`
    .diagram-container {
      margin: 24px 0;
      padding: 20px;
      background: #f9f9f9;
      border-radius: 12px;
      border: 1px solid #e0e0e0;
    }
    .diagram-title {
      margin: 0 0 16px 0;
      color: #333;
      font-size: 18px;
    }
    .diagram-wrapper {
      overflow-x: auto;
    }
    .diagram-svg {
      max-width: 100%;
      height: auto;
    }
    .node {
      cursor: pointer;
      transition: transform 0.2s;
    }
    .node:hover rect {
      filter: brightness(1.1);
    }
  `]
})
export class DiagramViewerComponent {
  title = input.required<string>();
  nodes = input.required<DiagramNode[]>();
  edges = input.required<DiagramEdge[]>();
  width = input(800);
  height = input(400);

  hoveredNode = signal('');

  getNode(id: string): DiagramNode {
    return this.nodes().find(n => n.id === id) || { id: '', label: '', x: 0, y: 0 };
  }
}
