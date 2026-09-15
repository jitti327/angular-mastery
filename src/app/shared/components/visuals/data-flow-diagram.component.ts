import { Component, signal } from '@angular/core';

@Component({
  selector: 'app-data-flow-diagram',
  standalone: true,
  template: `
    <div class="flow-container">
      <div class="flow-header">
        <h2>Data Flow in Angular</h2>
        <p>See how data moves between components</p>
      </div>

      <div class="flow-tabs">
        <button [class.active]="activeFlow() === 'one-way'" (click)="activeFlow.set('one-way')">
          One-Way Binding
        </button>
        <button [class.active]="activeFlow() === 'two-way'" (click)="activeFlow.set('two-way')">
          Two-Way Binding
        </button>
        <button [class.active]="activeFlow() === 'signals'" (click)="activeFlow.set('signals')">
          Signals Flow
        </button>
      </div>

      <div class="flow-visual">
        @if (activeFlow() === 'one-way') {
          <div class="one-way-flow">
            <svg viewBox="0 0 800 300" class="flow-svg">
              <!-- Parent Component -->
              <rect x="50" y="100" width="200" height="100" rx="12" fill="#667eea"/>
              <text x="150" y="140" text-anchor="middle" class="component-label">Parent Component</text>
              <text x="150" y="165" text-anchor="middle" class="component-sublabel">{{'{{'}}parentData{{'}}'}}</text>

              <!-- Arrow -->
              <defs>
                <marker id="flowArrow" markerWidth="10" markerHeight="7" refX="9" refY="3.5" orient="auto">
                  <polygon points="0 0, 10 3.5, 0 7" fill="#43e97b"/>
                </marker>
              </defs>
              <g class="animated-arrow">
                <line x1="250" y1="150" x2="400" y2="150" stroke="#43e97b" stroke-width="3" marker-end="url(#flowArrow)"/>
                <text x="325" y="135" text-anchor="middle" class="arrow-label">[childInput]="parentData"</text>
              </g>

              <!-- Child Component -->
              <rect x="400" y="100" width="200" height="100" rx="12" fill="#43e97b"/>
              <text x="500" y="140" text-anchor="middle" class="component-label">Child Component</text>
              <text x="500" y="165" text-anchor="middle" class="component-sublabel">@Input() childData</text>

              <!-- Output arrow back -->
              <g class="animated-arrow-reverse">
                <line x1="400" y1="200" x2="250" y2="200" stroke="#fa709a" stroke-width="3" marker-end="url(#flowArrow)" transform="rotate(180, 325, 200)"/>
                <text x="325" y="230" text-anchor="middle" class="arrow-label-reverse">(onUpdate)="handleUpdate()"</text>
              </g>

              <!-- Labels -->
              <text x="150" y="80" text-anchor="middle" class="section-label">State Owner</text>
              <text x="500" y="80" text-anchor="middle" class="section-label">Presenter</text>
            </svg>
          </div>
        }

        @if (activeFlow() === 'two-way') {
          <div class="two-way-flow">
            <svg viewBox="0 0 800 300" class="flow-svg">
              <!-- Parent Component -->
              <rect x="100" y="100" width="250" height="120" rx="12" fill="#667eea"/>
              <text x="225" y="140" text-anchor="middle" class="component-label">Parent Component</text>
              <text x="225" y="165" text-anchor="middle" class="component-sublabel">{{'{{'}}name{{'}}'}}</text>
              <text x="225" y="190" text-anchor="middle" class="component-sublabel">updateName(name)</text>

              <!-- Bidirectional arrow -->
              <defs>
                <marker id="flowArrowUp" markerWidth="10" markerHeight="7" refX="9" refY="3.5" orient="auto">
                  <polygon points="0 0, 10 3.5, 0 7" fill="#43e97b"/>
                </marker>
                <marker id="flowArrowDown" markerWidth="10" markerHeight="7" refX="9" refY="3.5" orient="auto">
                  <polygon points="0 0, 10 3.5, 0 7" fill="#fa709a"/>
                </marker>
              </defs>

              <!-- Down arrow -->
              <g class="animated-arrow-down">
                <line x1="450" y1="130" x2="450" y2="180" stroke="#43e97b" stroke-width="3" marker-end="url(#flowArrowDown)"/>
                <text x="490" y="155" class="arrow-label-down">name →</text>
              </g>

              <!-- Up arrow -->
              <g class="animated-arrow-up">
                <line x1="500" y1="180" x2="500" y2="130" stroke="#fa709a" stroke-width="3" marker-end="url(#flowArrowUp)"/>
                <text x="540" y="155" class="arrow-label-up">← nameChange</text>
              </g>

              <!-- Child Component -->
              <rect x="450" y="100" width="250" height="120" rx="12" fill="#fa709a"/>
              <text x="575" y="140" text-anchor="middle" class="component-label">Child Component</text>
              <text x="575" y="165" text-anchor="middle" class="component-sublabel">[(ngModel)]="name"</text>
              <text x="575" y="190" text-anchor="middle" class="component-sublabel">Input field</text>

              <!-- Center label -->
              <rect x="320" y="125" width="110" height="50" rx="25" fill="#ffecd2"/>
              <text x="375" y="155" text-anchor="middle" class="center-label">Two-Way</text>
            </svg>
          </div>
        }

        @if (activeFlow() === 'signals') {
          <div class="signals-flow">
            <svg viewBox="0 0 800 350" class="flow-svg">
              <defs>
                <marker id="signalArrow" markerWidth="10" markerHeight="7" refX="9" refY="3.5" orient="auto">
                  <polygon points="0 0, 10 3.5, 0 7" fill="#a18cd1"/>
                </marker>
              </defs>

              <!-- Signal Source -->
              <rect x="50" y="125" width="180" height="80" rx="12" fill="#a18cd1"/>
              <text x="140" y="155" text-anchor="middle" class="component-label">Signal</text>
              <text x="140" y="180" text-anchor="middle" class="component-sublabel">count = signal(0)</text>

              <!-- Computed -->
              <rect x="300" y="50" width="180" height="80" rx="12" fill="#667eea"/>
              <text x="390" y="80" text-anchor="middle" class="component-label">Computed</text>
              <text x="390" y="105" text-anchor="middle" class="component-sublabel">double = computed(...)</text>

              <!-- Effect -->
              <rect x="300" y="200" width="180" height="80" rx="12" fill="#fa709a"/>
              <text x="390" y="230" text-anchor="middle" class="component-label">Effect</text>
              <text x="390" y="255" text-anchor="middle" class="component-sublabel">effect(() =&gt; &#123;...&#125;)</text>

              <!-- Template -->
              <rect x="550" y="125" width="200" height="80" rx="12" fill="#43e97b"/>
              <text x="650" y="155" text-anchor="middle" class="component-label">Template</text>
              <text x="650" y="180" text-anchor="middle" class="component-sublabel">{{'{{'}}count(){{'}}'}}</text>

              <!-- Arrows -->
              <line x1="230" y1="145" x2="300" y2="90" stroke="#a18cd1" stroke-width="2" marker-end="url(#signalArrow)" class="animated-signal"/>
              <line x1="230" y1="165" x2="300" y2="220" stroke="#a18cd1" stroke-width="2" marker-end="url(#signalArrow)" class="animated-signal"/>
              <line x1="480" y1="90" x2="550" y2="145" stroke="#667eea" stroke-width="2" marker-end="url(#signalArrow)" class="animated-signal"/>
              <line x1="480" y1="220" x2="550" y2="165" stroke="#fa709a" stroke-width="2" marker-end="url(#signalArrow)" class="animated-signal"/>

              <!-- Labels -->
              <text x="260" y="105" class="signal-label">derives</text>
              <text x="260" y="215" class="signal-label">watches</text>
              <text x="510" y="105" class="signal-label">updates</text>
              <text x="510" y="215" class="signal-label">triggers</text>

              <!-- Update arrow back -->
              <path d="M 140 205 L 140 300 L 390 300 L 390 280" stroke="#f5576c" stroke-width="2" fill="none" marker-end="url(#signalArrow)" class="animated-signal-back"/>
              <text x="265" y="320" class="signal-label">count.update(v => v + 1)</text>
            </svg>
          </div>
        }
      </div>

      <div class="flow-info">
        <div class="info-card">
          <h4>@Input()</h4>
          <p>Pass data from parent to child. One-way data flow. Child receives updates automatically.</p>
        </div>
        <div class="info-card">
          <h4>@Output()</h4>
          <p>Send events from child to parent using EventEmitter. Custom event payloads.</p>
        </div>
        <div class="info-card">
          <h4>Signals</h4>
          <p>Reactive primitives that notify consumers on change. Fine-grained updates without Zone.js.</p>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .flow-container {
      background: white;
      border-radius: 16px;
      padding: 32px;
      box-shadow: 0 4px 24px rgba(0,0,0,0.08);
      margin: 32px 0;
    }
    .flow-header {
      text-align: center;
      margin-bottom: 32px;
    }
    .flow-header h2 {
      margin: 0 0 8px;
      font-size: 28px;
      color: #1a1a1a;
    }
    .flow-header p {
      margin: 0;
      color: #666;
    }
    .flow-tabs {
      display: flex;
      justify-content: center;
      gap: 8px;
      margin-bottom: 32px;
    }
    .flow-tabs button {
      padding: 12px 24px;
      border: 2px solid #e0e0e0;
      background: white;
      border-radius: 8px;
      font-size: 14px;
      font-weight: 600;
      cursor: pointer;
      transition: all 0.2s;
    }
    .flow-tabs button:hover {
      border-color: #667eea;
      color: #667eea;
    }
    .flow-tabs button.active {
      background: #667eea;
      border-color: #667eea;
      color: white;
    }
    .flow-visual {
      background: #f9f9f9;
      border-radius: 12px;
      padding: 24px;
      margin-bottom: 24px;
    }
    .flow-svg {
      width: 100%;
      height: auto;
    }
    .component-label {
      font-size: 14px;
      font-weight: 600;
      fill: white;
    }
    .component-sublabel {
      font-size: 11px;
      fill: rgba(255,255,255,0.8);
    }
    .arrow-label {
      font-size: 11px;
      fill: #43e97b;
      font-weight: 500;
    }
    .arrow-label-reverse {
      font-size: 11px;
      fill: #fa709a;
      font-weight: 500;
    }
    .arrow-label-down {
      font-size: 11px;
      fill: #43e97b;
      font-weight: 500;
    }
    .arrow-label-up {
      font-size: 11px;
      fill: #fa709a;
      font-weight: 500;
    }
    .center-label {
      font-size: 12px;
      font-weight: 600;
      fill: #e65100;
    }
    .section-label {
      font-size: 12px;
      fill: #666;
      font-weight: 500;
    }
    .signal-label {
      font-size: 10px;
      fill: #666;
    }
    .animated-arrow line {
      stroke-dasharray: 8 4;
      animation: flowRight 1s linear infinite;
    }
    .animated-arrow-reverse line {
      stroke-dasharray: 8 4;
      animation: flowLeft 1s linear infinite;
    }
    .animated-arrow-down line {
      stroke-dasharray: 8 4;
      animation: flowDown 1s linear infinite;
    }
    .animated-arrow-up line {
      stroke-dasharray: 8 4;
      animation: flowUp 1s linear infinite;
    }
    .animated-signal {
      stroke-dasharray: 6 4;
      animation: flowDiagonal 1s linear infinite;
    }
    .animated-signal-back {
      stroke-dasharray: 6 4;
      animation: flowDiagonal 1.5s linear infinite;
    }
    @keyframes flowRight {
      from { stroke-dashoffset: 24; }
      to { stroke-dashoffset: 0; }
    }
    @keyframes flowLeft {
      from { stroke-dashoffset: -24; }
      to { stroke-dashoffset: 0; }
    }
    @keyframes flowDown {
      from { stroke-dashoffset: 24; }
      to { stroke-dashoffset: 0; }
    }
    @keyframes flowUp {
      from { stroke-dashoffset: -24; }
      to { stroke-dashoffset: 0; }
    }
    @keyframes flowDiagonal {
      from { stroke-dashoffset: 20; }
      to { stroke-dashoffset: 0; }
    }
    .flow-info {
      display: grid;
      grid-template-columns: repeat(3, 1fr);
      gap: 16px;
    }
    .info-card {
      background: #f5f5f7;
      padding: 20px;
      border-radius: 12px;
    }
    .info-card h4 {
      margin: 0 0 8px;
      color: #1a1a1a;
      font-size: 16px;
    }
    .info-card p {
      margin: 0;
      font-size: 14px;
      color: #666;
      line-height: 1.5;
    }

    @media (max-width: 768px) {
      .flow-info { grid-template-columns: 1fr; }
    }
  `]
})
export class DataFlowDiagramComponent {
  activeFlow = signal<'one-way' | 'two-way' | 'signals'>('one-way');
}
