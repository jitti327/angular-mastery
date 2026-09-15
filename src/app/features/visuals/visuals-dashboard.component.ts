import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ArchitectureDiagramComponent } from '../../shared/components/visuals/architecture-diagram.component';
import { LifecycleVisualizationComponent } from '../../shared/components/visuals/lifecycle-visualization.component';
import { DataFlowDiagramComponent } from '../../shared/components/visuals/data-flow-diagram.component';
import { ConceptCardsComponent } from '../../shared/components/visuals/concept-cards.component';
import { CodePlaygroundComponent } from '../../shared/components/visuals/code-playground.component';
import { AchievementBadgesComponent } from '../../shared/components/visuals/achievement-badges.component';

@Component({
  selector: 'app-visuals-dashboard',
  standalone: true,
  imports: [
    RouterLink,
    ArchitectureDiagramComponent,
    LifecycleVisualizationComponent,
    DataFlowDiagramComponent,
    ConceptCardsComponent,
    CodePlaygroundComponent,
    AchievementBadgesComponent
  ],
  template: `
    <div class="dashboard-container">
      <header class="dashboard-header">
        <a routerLink="/" class="back-link">← Back to Home</a>
        <h1>Visual Learning Dashboard</h1>
        <p>Interactive diagrams and visualizations to master Angular concepts</p>
      </header>

      <section class="visual-section">
        <app-architecture-diagram />
      </section>

      <section class="visual-section">
        <app-lifecycle-visualization />
      </section>

      <section class="visual-section">
        <app-data-flow-diagram />
      </section>

      <section class="visual-section">
        <app-concept-cards />
      </section>

      <section class="visual-section">
        <app-code-playground />
      </section>

      <section class="visual-section">
        <app-achievement-badges />
      </section>
    </div>
  `,
  styles: [`
    .dashboard-container {
      max-width: 1200px;
      margin: 0 auto;
      padding: 40px 24px;
    }
    .dashboard-header {
      text-align: center;
      margin-bottom: 60px;
    }
    .back-link {
      display: inline-block;
      margin-bottom: 16px;
      color: var(--accent);
      text-decoration: none;
      font-weight: 500;
    }
    .back-link:hover {
      text-decoration: underline;
    }
    .dashboard-header h1 {
      font-size: 42px;
      margin: 0 0 12px;
      color: var(--text-primary);
      letter-spacing: -0.5px;
    }
    .dashboard-header p {
      font-size: 18px;
      color: var(--text-secondary);
      margin: 0;
    }
    .visual-section {
      margin-bottom: 48px;
    }
  `]
})
export class VisualsDashboardComponent {}
