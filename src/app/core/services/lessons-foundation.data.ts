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
    topics: [
      { id: 'concept', title: 'What is Dependency Injection?', content: '**DI is a design pattern where:**\n- A class receives dependencies from outside\n- Dependencies are "injected" not created\n- Promotes loose coupling and testability\n\n**Without DI (Bad):**\n```typescript\nexport class UserService {\n  private http = new HttpClient(); // Tight coupling!\n}\n```\n\n**With DI (Good):**\n```typescript\nexport class UserService {\n  constructor(private http: HttpClient) {} // Injected!\n}\n```' },
      { id: 'services', title: 'Creating Services', content: '**Service with @Injectable:**\n```typescript\n@Injectable({ providedIn: \'root\' })\nexport class DataService {\n  private data = signal<any[]>([]);\n  getData() { return this.data.asReadonly(); }\n}\n```\n\n**providedIn Options:**\n- \'root\': Singleton, tree-shakable (recommended)\n- NgModule: Legacy approach\n- Component: New instance per component' },
      { id: 'inject-function', title: 'Modern inject() Function', content: '**inject() Function:**\n```typescript\n@Component({})\nexport class MyComponent {\n  private dataService = inject(DataService);\n  private router = inject(Router);\n  \n  // With options\n  private service = inject(Service, { optional: true });\n}\n```' }
    ]
  }
];
