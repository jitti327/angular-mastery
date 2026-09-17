import { Component, signal, computed } from '@angular/core';

@Component({
  selector: 'app-concept-cards',
  standalone: true,
  template: `
    <div class="concepts-container">
      <div class="concepts-header">
        <h2>Key Angular Concepts</h2>
        <p>Master these core concepts to become an Angular expert</p>
      </div>

      <div class="concepts-grid">
        @for (concept of concepts; track concept.title) {
          <div class="concept-card"
               [class.flipped]="flippedCards().has(concept.title)"
               (click)="toggleFlip(concept.title)">
            <div class="card-front" [style.background]="concept.gradient">
              <span class="card-icon">{{ concept.icon }}</span>
              <h3>{{ concept.title }}</h3>
              <p class="card-preview">{{ concept.preview }}</p>
              <span class="flip-hint">Click to learn more →</span>
            </div>
            <div class="card-back">
              <h3>{{ concept.title }}</h3>
              <p>{{ concept.description }}</p>
              <div class="card-code">
                <pre><code>{{ concept.code }}</code></pre>
              </div>
              <span class="flip-hint">← Click to flip back</span>
            </div>
          </div>
        }
      </div>
    </div>
  `,
  styles: [`
    .concepts-container {
      margin: 48px 0;
    }
    .concepts-header {
      text-align: center;
      margin-bottom: 40px;
    }
    .concepts-header h2 {
      margin: 0 0 8px;
      font-size: 28px;
      color: var(--text-primary);
    }
    .concepts-header p {
      margin: 0;
      color: var(--text-secondary);
    }
    .concepts-grid {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
      gap: 24px;
    }
    .concept-card {
      height: 320px;
      perspective: 1000px;
      cursor: pointer;
    }
    .card-front, .card-back {
      position: absolute;
      width: 100%;
      height: 100%;
      backface-visibility: hidden;
      border-radius: 16px;
      padding: 28px;
      display: flex;
      flex-direction: column;
      transition: transform 0.6s cubic-bezier(0.4, 0, 0.2, 1);
    }
    .card-front {
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
      color: white;
      transform: rotateY(0deg);
    }
    .concept-card.flipped .card-front {
      transform: rotateY(-180deg);
    }
    .card-back {
      background: var(--bg-primary);
      border: 1px solid var(--border-color);
      transform: rotateY(180deg);
      overflow-y: auto;
    }
    .concept-card.flipped .card-back {
      transform: rotateY(0deg);
    }
    .card-icon {
      font-size: 48px;
      margin-bottom: 16px;
    }
    .card-front h3 {
      margin: 0 0 12px;
      font-size: 22px;
    }
    .card-preview {
      flex: 1;
      margin: 0;
      opacity: 0.9;
      line-height: 1.5;
    }
    .card-back h3 {
      margin: 0 0 12px;
      font-size: 18px;
      color: var(--text-primary);
    }
    .card-back p {
      margin: 0 0 16px;
      font-size: 14px;
      color: var(--text-secondary);
      line-height: 1.6;
    }
    .card-code {
      flex: 1;
      background: #1e1e1e;
      border-radius: 8px;
      overflow: hidden;
      min-height: 120px;
    }
    .card-code pre {
      margin: 0;
      padding: 14px;
      overflow: auto;
      height: 100%;
      scrollbar-width: thin;
      scrollbar-color: #555 #1e1e1e;
    }
    .card-code pre::-webkit-scrollbar {
      width: 6px;
      height: 6px;
    }
    .card-code pre::-webkit-scrollbar-track {
      background: #1e1e1e;
    }
    .card-code pre::-webkit-scrollbar-thumb {
      background: #555;
      border-radius: 3px;
    }
    .card-code code {
      color: #d4d4d4;
      font-size: 13px;
      font-family: 'SF Mono', 'Fira Code', monospace;
      line-height: 1.5;
      white-space: pre;
    }
    .flip-hint {
      font-size: 12px;
      opacity: 0.7;
      margin-top: 12px;
    }
    .card-back .flip-hint {
      color: var(--text-secondary);
    }

    @media (max-width: 768px) {
      .concepts-grid {
        grid-template-columns: 1fr;
      }
    }
  `]
})
export class ConceptCardsComponent {
  flippedCards = signal<Set<string>>(new Set());

  concepts = [
    {
      title: 'Components',
      icon: '🧩',
      preview: 'UI building blocks that combine HTML, CSS, and TypeScript',
      description: 'Components are the fundamental building blocks of Angular applications. Each component has a template, a class, and metadata.',
      gradient: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      code: `@Component({
  selector: 'app-hello',
  template: \`<h1>Hello {{name}}!</h1>\`
})
export class HelloComponent {
  name = 'Angular';
}`
    },
    {
      title: 'Templates',
      icon: '📝',
      preview: 'HTML with Angular syntax for dynamic views',
      description: 'Templates define the view for a component. They use special syntax for data binding, directives, and more.',
      gradient: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
      code: `<!-- Interpolation -->
<h1>{{title}}</h1>

<!-- Property Binding -->
<img [src]="imageUrl">

<!-- Event Binding -->
<button (click)="save()">Save</button>

<!-- Structural Directive -->
@for (item of items; track item) {
  <p>{{item}}</p>
}`
    },
    {
      title: 'Signals',
      icon: '⚡',
      preview: 'Reactive state primitives for fine-grained updates',
      description: 'Signals are reactive containers that notify consumers when their value changes, enabling efficient UI updates.',
      gradient: 'linear-gradient(135deg, #a18cd1 0%, #fbc2eb 100%)',
      code: `// Create a signal
const count = signal(0);

// Read value
console.log(count());

// Update
count.set(5);
count.update(v => v + 1);

// Computed (derived)
const double = computed(() => count() * 2);`
    },
    {
      title: 'Dependency Injection',
      icon: '💉',
      preview: 'Powerful system for providing dependencies',
      description: 'DI is Angular\'s dependency injection system. It provides services and values to components throughout your app.',
      gradient: 'linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)',
      code: `@Injectable({ providedIn: 'root' })
export class DataService {
  private data = signal([]);
  
  getData() {
    return this.data.asReadonly();
  }
}

// Use in component
@Component({...})
export class MyComponent {
  private data = inject(DataService);
}`
    },
    {
      title: 'Routing',
      icon: '🧭',
      preview: 'Navigate between different views and components',
      description: 'The Angular Router enables navigation from one view to another as users perform app tasks.',
      gradient: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)',
      code: `const routes: Routes = [
  { path: '', component: Home },
  { path: 'about', component: About },
  { path: '**', component: NotFound }
];

// Navigation
this.router.navigate(['/about']);

// Template
<a routerLink="/about">About</a>`
    },
    {
      title: 'HTTP Client',
      icon: '🌐',
      preview: 'Communicate with backend APIs',
      description: 'HttpClient enables communication with backend services using HTTP requests and Observables.',
      gradient: 'linear-gradient(135deg, #fa709a 0%, #fee140 100%)',
      code: `// Modern Resource API (Angular 22)
users = httpResource(() => ({
  url: '/api/users',
  method: 'GET' as const
}));

// Traditional HttpClient
this.http.get<User[]>('/api/users')
  .pipe(
    map(users => users.filter(u => u.active)),
    catchError(this.handleError)
  )
  .subscribe(users => this.users = users);`
    },
  ];

  toggleFlip(title: string): void {
    this.flippedCards.update(cards => {
      const newCards = new Set(cards);
      if (newCards.has(title)) {
        newCards.delete(title);
      } else {
        newCards.add(title);
      }
      return newCards;
    });
  }
}
