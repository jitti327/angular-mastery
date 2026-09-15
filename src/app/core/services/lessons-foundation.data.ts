import { Lesson } from '../models/lesson.model';

export const LESSONS: Lesson[] = [
  // ═══════════════════════════════════════════════════════════════
  // FOUNDATION LEVEL (1-5)
  // ═══════════════════════════════════════════════════════════════
  {
    id: 1, slug: 'introduction', title: 'What is Angular?',
    description: 'Complete introduction to Angular - history, philosophy, and comparisons.',
    level: 'beginner', duration: '20 min',
    objectives: ['Understand Angular\'s purpose', 'Compare with React/Vue', 'Understand TypeScript role', 'Setup environment'],
    quiz: [
      {
        id: 1,
        question: 'Which company develops and maintains Angular?',
        options: ['Meta', 'Google', 'Microsoft', 'Apple'],
        correctIndex: 1,
        explanation: 'Angular is developed and maintained by Google.'
      },
      {
        id: 2,
        question: 'What is a key difference between Angular and React?',
        options: ['Angular is a library, React is a framework', 'Angular is opinionated, React is a library', 'React uses TypeScript, Angular does not', 'Angular cannot be used for enterprise apps'],
        correctIndex: 1,
        explanation: 'Angular is a full, opinionated framework with routing, forms, and HTTP built in. React is a library focused only on UI components.'
      },
      {
        id: 3,
        question: 'What was the default renderer introduced in Angular 9?',
        options: ['ViewEngine', 'Ivy', 'Turbopack', 'Vite'],
        correctIndex: 1,
        explanation: 'Angular 9 made Ivy the default renderer, replacing the older ViewEngine.'
      }
    ],
    topics: [
      { id: 'what', title: 'What is Angular?', content: '**Angular** is a platform and framework for building client applications in HTML and TypeScript. Developed by Google.\n\n**Key Characteristics:**\n- **Platform**: Complete platform, not just a library\n- **TypeScript-first**: Built with TypeScript for type safety\n- **Component-based**: UI from composable components\n- **Reactive**: Supports reactive programming\n- **Opinionated**: Clear patterns and conventions\n\n**Why Choose Angular?**\n- Enterprise-grade features out of the box\n- Consistent patterns across teams\n- Strong typing catches errors early\n- Comprehensive testing support\n- Long-term support from Google' },
      { id: 'history', title: 'Angular Version History', content: '**AngularJS (1.x) - 2010-2016**\n- JavaScript-based, not TypeScript\n- Two-way data binding with dirty checking\n- Controllers and $scope\n\n**Angular 2+ (2016-present)**\n- Complete rewrite in TypeScript\n- Component-based architecture\n- Improved performance with Ivy\n\n**Key Milestones:**\n- Angular 9 (2020): Ivy default\n- Angular 14 (2022): Standalone components\n- Angular 17 (2023): New control flow\n- Angular 19 (2024): Zoneless stable\n- Angular 22 (2026): Signal Forms stable, OnPush default' },
      { id: 'comparison', title: 'Angular vs React vs Vue', content: '**Angular:**\n- Full framework (routing, forms, HTTP)\n- TypeScript-first, strict typing\n- Best for large enterprise apps\n- Backed by Google\n\n**React:**\n- Library for UI components only\n- JavaScript/TypeScript (optional)\n- Flexible ecosystem\n- Backed by Meta\n\n**Vue:**\n- Progressive framework\n- Easiest learning curve\n- Great for small-medium projects\n\n**Choose Angular When:**\n- Building large, complex applications\n- Need strict type safety\n- Want complete, opinionated solution\n- Team needs clear patterns' }
    ]
  },
  {
    id: 2, slug: 'components', title: 'Components & Templates',
    description: 'Deep dive into components - the building blocks of Angular.',
    level: 'beginner', duration: '30 min',
    objectives: ['Create components', 'Master template syntax', 'Understand standalone components'],
    quiz: [
      {
        id: 1,
        question: 'Which Angular 17+ syntax replaces *ngIf?',
        options: ['ngIf', '@if', '*if', 'ng-if'],
        correctIndex: 1,
        explanation: 'The new control flow syntax uses @if instead of the older *ngIf structural directive.'
      },
      {
        id: 2,
        question: 'How do you pass data from a parent to a child component?',
        options: ['Using @Output()', 'Using @Input()', 'Using services', 'Using event emitters'],
        correctIndex: 1,
        explanation: '@Input() allows a parent component to pass data down to a child component.'
      },
      {
        id: 3,
        question: 'What does the @defer block do?',
        options: ['Defers CSS loading', 'Lazy-loads component templates', 'Delays change detection', 'Defers HTTP requests'],
        correctIndex: 1,
        explanation: '@defer enables lazy loading of components, loading them only when a specified trigger occurs (e.g., on viewport).'
      }
    ],
    topics: [
      { id: 'anatomy', title: 'Component Anatomy', content: '**Component Parts:**\n1. TypeScript Class: Data and logic\n2. HTML Template: View definition\n3. CSS Styles: Component styling\n\n**Component Decorator:**\n```typescript\n@Component({\n  selector: \'app-user\',\n  standalone: true,\n  imports: [CommonModule],\n  template: `...`,\n  styles: [`...`]\n})\n```\n\n**Standalone vs NgModule:**\n- Standalone: No NgModule needed (modern)\n- NgModule: Legacy approach\n- Angular 22 defaults to standalone' },
      { id: 'templates', title: 'Template Syntax Deep Dive', content: '**Interpolation:** {{ expression }}\n**Property Binding:** [property]="expression"\n**Event Binding:** (event)="handler($event)"\n**Two-Way Binding:** [(ngModel)]="property"\n\n**New Control Flow (Angular 17+):**\n```html\n@if (isLoggedIn) { <p>Welcome!</p> }\n@for (user of users; track user.id) { <p>{{user.name}}</p> }\n@switch (role) { @case (\'admin\') { <admin/> } }\n```\n\n**@defer (Lazy Loading):**\n```html\n@defer (on viewport) { <heavy-component /> }\n@loading { <spinner /> }\n@placeholder { <div>Load me</div> }\n```' },
      { id: 'inputs-outputs', title: 'Component Inputs & Outputs', content: '**@Input() - Pass Data In:**\n```typescript\n@Component({})\nexport class ChildComponent {\n  @Input() name = \'\';\n  @Input({ required: true }) id!: string;\n}\n```\n\n**Modern input() Function:**\n```typescript\nname = input(\'\');\nid = input.required<string>();\n```\n\n**@Output() - Send Events Out:**\n```typescript\n@Output() userClicked = new EventEmitter<User>();\nonClick() { this.userClicked.emit(this.user); }\n```\n\n**Modern output() Function:**\n```typescript\nuserClicked = output<User>();\n```' }
    ]
  },
  {
    id: 3, slug: 'lifecycle', title: 'Component Lifecycle',
    description: 'Master the component lifecycle hooks.',
    level: 'beginner', duration: '25 min',
    objectives: ['Understand all lifecycle hooks', 'Know when to use each', 'Handle cleanup properly'],
    quiz: [
      {
        id: 1,
        question: 'Which lifecycle hook is called first when an input changes?',
        options: ['ngOnInit', 'ngOnChanges', 'ngDoCheck', 'constructor'],
        correctIndex: 1,
        explanation: 'ngOnChanges is called before ngOnInit and fires every time an input binding changes.'
      },
      {
        id: 2,
        question: 'What is the modern approach for cleaning up subscriptions?',
        options: ['ngOnDestroy with unsubscribe()', 'takeUntilDestroyed() from @angular/core/rxjs-interop', 'Manually storing Subscription objects', 'Using the async pipe'],
        correctIndex: 1,
        explanation: 'takeUntilDestroyed() automatically unsubscribes when the component is destroyed, eliminating manual cleanup.'
      },
      {
        id: 3,
        question: 'When is ngOnInit called?',
        options: ['Before the component is created', 'Once, after the first ngOnChanges', 'Every time an input changes', 'After the view is destroyed'],
        correctIndex: 1,
        explanation: 'ngOnInit is called once after the component is initialized and after the first ngOnChanges.'
      }
    ],
    topics: [
      { id: 'overview', title: 'Lifecycle Overview', content: '**Creation Phase:**\n- constructor: Class instantiation\n- ngOnChanges: Input changes\n- ngOnInit: Component initialization\n\n**Detection Phase:**\n- ngDoCheck: Custom change detection\n- ngAfterContentInit: Content projected\n- ngAfterViewInit: View initialized\n\n**Destruction Phase:**\n- ngOnDestroy: Cleanup before destruction' },
      { id: 'creation', title: 'Creation Hooks', content: '**ngOnChanges(changes: SimpleChanges):**\n- Called before ngOnInit\n- Called every time inputs change\n```typescript\nngOnChanges(changes: SimpleChanges) {\n  if (changes[\'userId\']) {\n    this.loadUser(changes[\'userId\'].currentValue);\n  }\n}\n```\n\n**ngOnInit():**\n- Called once after first ngOnChanges\n- Best place for initialization' },
      { id: 'destruction', title: 'Cleanup & Destruction', content: '**Modern Approach - takeUntilDestroyed():**\n```typescript\nimport { takeUntilDestroyed } from \'@angular/core/rxjs-interop\';\n\nconstructor() {\n  this.dataService.getData()\n    .pipe(takeUntilDestroyed())\n    .subscribe(data => this.data = data);\n}\n```' }
    ]
  },
  {
    id: 4, slug: 'directives', title: 'Directives & Pipes',
    description: 'Master directives and pipes.',
    level: 'beginner', duration: '25 min',
    objectives: ['Understand directive types', 'Create custom directives', 'Use and create pipes'],
    quiz: [
      {
        id: 1,
        question: 'What are the three types of Angular directives?',
        options: ['Component, Structural, Attribute', 'Component, Functional, Class', 'Template, Pipe, Directive', 'Input, Output, View'],
        correctIndex: 0,
        explanation: 'The three types are Components (directives with templates), Structural (modify DOM layout like *ngFor), and Attribute (modify appearance like ngClass).'
      },
      {
        id: 2,
        question: 'What decorator marks a pipe?',
        options: ['@Directive', '@Component', '@Pipe', '@Injectable'],
        correctIndex: 2,
        explanation: 'The @Pipe decorator is used to define a pipe that transforms data in templates.'
      },
      {
        id: 3,
        question: 'What does @HostListener do in a directive?',
        options: ['Listens to host element attributes', 'Listens to DOM events on the host element', 'Creates a host binding', 'Injects the host component'],
        correctIndex: 1,
        explanation: '@HostListener allows a directive to listen to events on the host element, such as mouseenter or click.'
      }
    ],
    topics: [
      { id: 'types', title: 'Directive Types', content: '**Three Types:**\n1. Components: Directives with templates\n2. Structural: Modify DOM layout (*ngIf, *ngFor)\n3. Attribute: Modify appearance (ngClass, ngStyle)\n\n**New Control Flow:**\n```html\n@if (isLoggedIn) { <p>Welcome!</p> }\n@for (user of users; track user.id) { <p>{{user.name}}</p> }\n```' },
      { id: 'custom-directives', title: 'Custom Directives', content: '**Highlight Directive:**\n```typescript\n@Directive({ selector: \'[appHighlight]\', standalone: true })\nexport class HighlightDirective {\n  @Input() appHighlight = \'yellow\';\n  \n  constructor(private el: ElementRef) {}\n  \n  @HostListener(\'mouseenter\') onMouseEnter() {\n    this.el.nativeElement.style.backgroundColor = this.appHighlight;\n  }\n  \n  @HostListener(\'mouseleave\') onMouseLeave() {\n    this.el.nativeElement.style.backgroundColor = \'\';\n  }\n}\n```' },
      { id: 'pipes', title: 'Pipes', content: '**Custom Pipe:**\n```typescript\n@Pipe({ name: \'truncate\', standalone: true })\nexport class TruncatePipe implements PipeTransform {\n  transform(value: string, limit: number = 50): string {\n    return value.length > limit ? value.substring(0, limit) + \'...\' : value;\n  }\n}\n```' }
    ]
  },
  {
    id: 5, slug: 'di-basics', title: 'Dependency Injection Basics',
    description: 'Understanding Angular\'s DI system.',
    level: 'beginner', duration: '25 min',
    objectives: ['Understand DI concept', 'Create services', 'Learn providers', 'Use inject()'],
    quiz: [
      {
        id: 1,
        question: 'What does DI stand for?',
        options: ['Data Integration', 'Dependency Injection', 'Dynamic Import', 'Direct Initialization'],
        correctIndex: 1,
        explanation: 'Dependency Injection is a design pattern where a class receives its dependencies from outside rather than creating them internally.'
      },
      {
        id: 2,
        question: 'What does providedIn: "root" do?',
        options: ['Provides a new instance per component', 'Makes the service a singleton available app-wide', 'Provides the service only in the root module', 'Makes the service lazy-loaded'],
        correctIndex: 1,
        explanation: 'providedIn: "root" registers the service as a singleton at the root injector level, making it tree-shakable and available everywhere.'
      },
      {
        id: 3,
        question: 'What is the modern alternative to constructor-based injection?',
        options: ['new() function', 'inject() function', 'create() function', 'resolve() function'],
        correctIndex: 1,
        explanation: 'The inject() function allows you to inject services without using a constructor, which is the modern approach in Angular.'
      }
    ],
    topics: [
      { id: 'concept', title: 'What is Dependency Injection?', content: '**DI is a design pattern where:**\n- A class receives dependencies from outside\n- Dependencies are "injected" not created\n- Promotes loose coupling and testability\n\n**Without DI (Bad):**\n```typescript\nexport class UserService {\n  private http = new HttpClient(); // Tight coupling!\n}\n```\n\n**With DI (Good):**\n```typescript\nexport class UserService {\n  constructor(private http: HttpClient) {} // Injected!\n}\n```' },
      { id: 'services', title: 'Creating Services', content: '**Service with @Injectable:**\n```typescript\n@Injectable({ providedIn: \'root\' })\nexport class DataService {\n  private data = signal<any[]>([]);\n  getData() { return this.data.asReadonly(); }\n}\n```\n\n**providedIn Options:**\n- \'root\': Singleton, tree-shakable (recommended)\n- NgModule: Legacy approach\n- Component: New instance per component' },
      { id: 'inject-function', title: 'Modern inject() Function', content: '**inject() Function:**\n```typescript\n@Component({})\nexport class MyComponent {\n  private dataService = inject(DataService);\n  private router = inject(Router);\n  \n  // With options\n  private service = inject(Service, { optional: true });\n}\n```' }
    ]
  }
];
