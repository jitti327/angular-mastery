import { Component, signal } from '@angular/core';

interface VersionFeature {
  feature: string;
  angular14: string;
  angular15: string;
  angular16: string;
  angular17: string;
  angular18: string;
  angular19: string;
  angular20: string;
  angular21: string;
  angular22: string;
}

@Component({
  selector: 'app-version-comparator',
  standalone: true,
  template: `
    <div class="comparator-container">
      <h2>Angular Version Comparison (14 → 22)</h2>
      
      <div class="version-selector">
        <span class="selector-label">Compare versions:</span>
        <select [value]="fromVersion()" (change)="fromVersion.set($any($event.target).value)">
          @for (v of versions; track v) {
            <option [value]="v">Angular {{ v }}</option>
          }
        </select>
        <span>→</span>
        <select [value]="toVersion()" (change)="toVersion.set($any($event.target).value)">
          @for (v of versions; track v) {
            <option [value]="v">Angular {{ v }}</option>
          }
        </select>
      </div>

      <div class="features-table-wrapper">
        <table class="features-table">
          <thead>
            <tr>
              <th>Feature</th>
              <th>Angular {{ fromVersion() }}</th>
              <th>Angular {{ toVersion() }}</th>
              <th>Changes</th>
            </tr>
          </thead>
          <tbody>
            @for (feature of filteredFeatures(); track feature.feature) {
              <tr>
                <td class="feature-name">{{ feature.feature }}</td>
                <td [class]="getStatusClass(getFeatureValue(feature, fromVersion()))">
                  {{ getFeatureValue(feature, fromVersion()) }}
                </td>
                <td [class]="getStatusClass(getFeatureValue(feature, toVersion()))">
                  {{ getFeatureValue(feature, toVersion()) }}
                </td>
                <td>
                  @if (getFeatureValue(feature, fromVersion()) !== getFeatureValue(feature, toVersion())) {
                    <span class="changed-badge">Changed</span>
                  } @else {
                    <span class="same-badge">Same</span>
                  }
                </td>
              </tr>
            }
          </tbody>
        </table>
      </div>

      <div class="key-changes">
        <h3>Key Changes in Angular {{ toVersion() }}</h3>
        <ul>
          @for (change of getKeyChanges(); track change) {
            <li>{{ change }}</li>
          }
        </ul>
      </div>
    </div>
  `,
  styles: [`
    .comparator-container {
      padding: 24px;
      background: var(--bg-primary);
      border-radius: 12px;
      box-shadow: 0 4px 12px rgba(0,0,0,0.1);
    }
    h2 {
      margin: 0 0 24px 0;
      color: var(--text-primary);
    }
    .version-selector {
      display: flex;
      align-items: center;
      gap: 12px;
      margin-bottom: 24px;
    }
    .selector-label {
      font-weight: 600;
    }
    select {
      padding: 8px 12px;
      border: 1px solid var(--border-color);
      border-radius: 6px;
      font-size: 14px;
      background: var(--bg-primary);
      color: var(--text-primary);
    }
    .features-table-wrapper {
      overflow-x: auto;
    }
    .features-table {
      width: 100%;
      border-collapse: collapse;
      margin-bottom: 24px;
    }
    .features-table th, .features-table td {
      padding: 12px 16px;
      text-align: left;
      border-bottom: 1px solid var(--border-color);
    }
    .features-table th {
      background: var(--bg-secondary);
      font-weight: 600;
      position: sticky;
      top: 0;
    }
    .feature-name {
      font-weight: 500;
      color: var(--text-primary);
    }
    .status-stable {
      color: #4caf50;
      font-weight: 500;
    }
    .status-deprecated {
      color: #ff9800;
      font-weight: 500;
    }
    .status-experimental {
      color: #2196f3;
      font-weight: 500;
    }
    .status-removed {
      color: #f44336;
      font-weight: 500;
    }
    .changed-badge {
      background: #fff3e0;
      color: #e65100;
      padding: 4px 8px;
      border-radius: 4px;
      font-size: 12px;
    }
    .same-badge {
      background: #e8f5e9;
      color: #2e7d32;
      padding: 4px 8px;
      border-radius: 4px;
      font-size: 12px;
    }
    .key-changes {
      background: var(--bg-secondary);
      padding: 20px;
      border-radius: 8px;
    }
    .key-changes h3 {
      margin: 0 0 12px 0;
      color: var(--text-primary);
    }
    .key-changes ul {
      margin: 0;
      padding-left: 20px;
    }
    .key-changes li {
      margin-bottom: 8px;
      color: var(--text-secondary);
    }
  `]
})
export class VersionComparatorComponent {
  versions = ['14', '15', '16', '17', '18', '19', '20', '21', '22'];
  fromVersion = signal('14');
  toVersion = signal('22');

  features: VersionFeature[] = [
    { feature: 'Standalone Components', angular14: 'Experimental', angular15: 'Stable', angular16: 'Stable', angular17: 'Default', angular18: 'Default', angular19: 'Default', angular20: 'Default', angular21: 'Default', angular22: 'Default' },
    { feature: 'Signal-based Reactivity', angular14: 'N/A', angular15: 'N/A', angular16: 'Developer Preview', angular17: 'Stable', angular18: 'Stable', angular19: 'Stable', angular20: 'Stable', angular21: 'Stable', angular22: 'Stable' },
    { feature: 'New Control Flow', angular14: 'N/A', angular15: 'N/A', angular16: 'Developer Preview', angular17: 'Stable', angular18: 'Default', angular19: 'Default', angular20: 'Default', angular21: 'Default', angular22: 'Default' },
    { feature: 'Zoneless Change Detection', angular14: 'N/A', angular15: 'N/A', angular16: 'N/A', angular17: 'N/A', angular18: 'Experimental', angular19: 'Developer Preview', angular20: 'Stable', angular21: 'Stable', angular22: 'Default' },
    { feature: 'Signal Forms', angular14: 'N/A', angular15: 'N/A', angular16: 'N/A', angular17: 'N/A', angular18: 'N/A', angular19: 'N/A', angular20: 'N/A', angular21: 'Experimental', angular22: 'Stable' },
    { feature: 'Resource API', angular14: 'N/A', angular15: 'N/A', angular16: 'N/A', angular17: 'N/A', angular18: 'N/A', angular19: 'Developer Preview', angular20: 'Stable', angular21: 'Stable', angular22: 'Stable' },
    { feature: 'Angular Aria', angular14: 'N/A', angular15: 'N/A', angular16: 'N/A', angular17: 'N/A', angular18: 'N/A', angular19: 'N/A', angular20: 'N/A', angular21: 'Experimental', angular22: 'Stable' },
    { feature: 'OnPush Default', angular14: 'No', angular15: 'No', angular16: 'No', angular17: 'No', angular18: 'No', angular19: 'No', angular20: 'No', angular21: 'No', angular22: 'Yes' },
    { feature: 'TypeScript Version', angular14: '4.8', angular15: '4.8-4.9', angular16: '4.9-5.0', angular17: '5.2', angular18: '5.4', angular19: '5.5', angular20: '5.8', angular21: '5.9', angular22: '6.0' },
    { feature: 'Node.js Version', angular14: '14.15+', angular15: '14.20+ or 16.13+', angular16: '16.14+', angular17: '18.13+', angular18: '18.19+', angular19: '18.19+', angular20: '20.19+', angular21: '20.19+', angular22: '22.22+' },
    { feature: 'Ivy Renderer', angular14: 'Opt-in', angular15: 'Default', angular16: 'Default', angular17: 'Default', angular18: 'Default', angular19: 'Default', angular20: 'Default', angular21: 'Default', angular22: 'Default' },
    { feature: 'Lazy Loading', angular14: 'NgModules', angular15: 'Standalone', angular16: 'Standalone', angular17: 'Standalone', angular18: 'Standalone', angular19: 'Standalone', angular20: 'Standalone', angular21: 'Standalone', angular22: 'Standalone' },
    { feature: 'Functional Guards', angular14: 'Experimental', angular15: 'Stable', angular16: 'Stable', angular17: 'Stable', angular18: 'Stable', angular19: 'Stable', angular20: 'Stable', angular21: 'Stable', angular22: 'Stable' },
    { feature: 'HttpClient', angular14: 'XMLHttpRequest', angular15: 'XMLHttpRequest', angular16: 'XMLHttpRequest', angular17: 'XMLHttpRequest', angular18: 'XMLHttpRequest/Fetch', angular19: 'XMLHttpRequest/Fetch', angular20: 'Fetch', angular21: 'Fetch', angular22: 'Fetch' },
    { feature: 'WebMCP Support', angular14: 'N/A', angular15: 'N/A', angular16: 'N/A', angular17: 'N/A', angular18: 'N/A', angular19: 'N/A', angular20: 'N/A', angular21: 'N/A', angular22: 'Experimental' },
  ];

  filteredFeatures(): VersionFeature[] {
    return this.features;
  }

  getFeatureValue(feature: VersionFeature, version: string): string {
    const key = `angular${version}` as keyof VersionFeature;
    return (feature[key] as string) || 'N/A';
  }

  getStatusClass(status: string): string {
    const lower = status.toLowerCase();
    if (lower.includes('stable') || lower === 'yes' || lower === 'default') return 'status-stable';
    if (lower.includes('deprecated') || lower.includes('experimental')) return 'status-deprecated';
    if (lower.includes('removed') || lower === 'no') return 'status-removed';
    return '';
  }

  getKeyChanges(): string[] {
    const to = this.toVersion();
    const changes: { [key: string]: string[] } = {
      '15': ['Standalone APIs stable', 'Functional guards', 'Image directive'],
      '16': ['Signal-based reactivity (developer preview)', 'New control flow (developer preview)', 'Required inputs'],
      '17': ['New control flow stable (@if, @for)', 'Deferrable views', 'Signal-based inputs stable'],
      '18': ['Zoneless change detection (experimental)', 'Built-in control flow default', 'New emoji-based control flow migration'],
      '19': ['Zoneless change detection (developer preview)', 'Resource API (developer preview)', 'Signal inputs stable'],
      '20': ['Zoneless change detection stable', 'Signal-based forms (experimental)', 'Resource API stable'],
      '21': ['Angular Aria (experimental)', 'Signal Forms (experimental)', 'AI tooling improvements'],
      '22': ['Signal Forms stable', 'OnPush default', 'Zoneless default', 'TypeScript 6', 'WebMCP experimental']
    };
    return changes[to] || ['See release notes for details'];
  }
}
