import { Lesson } from '../models/lesson.model';

export const ADVANCED_LESSONS: Lesson[] = [
  {
    id: 20, slug: 'state-ngrx', title: 'State Management & NgRx',
    description: 'Master state management patterns including NgRx.',
    level: 'advanced', duration: '50 min',
    objectives: ['Manage state with services', 'Implement NgRx', 'Understand store patterns'],
    quiz: [
      {
        id: 1,
        question: 'What is the main advantage of using signals for state management?',
        options: ['They are always async', 'They provide simple, synchronous state updates without RxJS boilerplate', 'They replace all HTTP calls', 'They only work with NgRx'],
        correctIndex: 1,
        explanation: 'Signals provide a simpler, synchronous way to manage state with automatic dependency tracking, reducing the boilerplate of RxJS-based approaches.'
      },
      {
        id: 2,
        question: 'What does an NgRx reducer do?',
        options: ['Makes HTTP requests', 'Returns a new state based on the current state and an action', 'Displays the UI', 'Handles route navigation'],
        correctIndex: 1,
        explanation: 'A reducer is a pure function that takes the current state and an action, and returns a new state without modifying the original.'
      },
      {
        id: 3,
        question: 'What is the purpose of NgRx effects?',
        options: ['To create side effects like API calls in response to actions', 'To render the template', 'To manage form validation', 'To handle CSS styles'],
        correctIndex: 0,
        explanation: 'Effects listen for dispatched actions and perform side effects like HTTP requests, then dispatch new actions with the results.'
      }
    ],
    topics: [
      { id: 'service-state', title: 'Service-Based State', content: '**Practice - Signal-Based State Service:**\n```typescript\n@Injectable({ providedIn: \'root\' })\nexport class TodoStateService {\n  private todos = signal<Todo[]>([]);\n  private filter = signal<\'all\' | \'active\' | \'completed\'>(\'all\');\n\n  readonly filteredTodos = computed(() => {\n    const all = this.todos();\n    const f = this.filter();\n    if (f === \'active\') return all.filter(t => !t.completed);\n    if (f === \'completed\') return all.filter(t => t.completed);\n    return all;\n  });\n\n  addTodo(text: string) {\n    this.todos.update(list => [...list, { id: Date.now(), text, completed: false }]);\n  }\n}\n```' },
      { id: 'ngrx-setup', title: 'NgRx Setup', content: '**Practice - Create Feature:**\n```typescript\n// actions.ts\nexport const addTodo = createAction(\'[Todo] Add\', props<{ text: string }>());\nexport const toggleTodo = createAction(\'[Todo] Toggle\', props<{ id: number }>());\n\n// reducer.ts\nexport const todoReducer = createReducer(\n  initialState,\n  on(addTodo, (state, { text }) => ({\n    ...state,\n    todos: [...state.todos, { id: Date.now(), text, completed: false }]\n  }))\n);\n```' },
      { id: 'effects', title: 'NgRx Effects', content: '**Practice - Effects:**\n```typescript\n@Injectable()\nexport class TodoEffects {\n  loadTodos$ = createEffect(() => this.actions$.pipe(\n    ofType(TodoActions.loadTodos),\n    switchMap(() => this.todoService.getTodos()),\n    map(todos => TodoActions.loadTodosSuccess({ todos })),\n    catchError(error => of(TodoActions.loadTodosFailure({ error })))\n  ));\n}\n```' }
    ]
  },
  {
    id: 21, slug: 'performance', title: 'Performance Optimization',
    description: 'Master Angular performance techniques.',
    level: 'advanced', duration: '40 min',
    objectives: ['Optimize change detection', 'Lazy load effectively', 'Reduce bundle size'],
    quiz: [
      {
        id: 1,
        question: 'What does OnPush change detection do?',
        options: ['Runs change detection every cycle', 'Only runs change detection when inputs change, async events occur, or markForCheck() is called', 'Disables change detection entirely', 'Only runs in production'],
        correctIndex: 1,
        explanation: 'OnPush skips change detection unless triggered by an explicit signal like input changes, events, or markForCheck(), significantly improving performance.'
      },
      {
        id: 2,
        question: 'What does CDK virtual scrolling do?',
        options: ['Scrolls the entire page', 'Only renders visible items in a large list, recycling DOM elements', 'Disables scrolling', 'Adds infinite scroll'],
        correctIndex: 1,
        explanation: 'Virtual scrolling renders only the items visible in the viewport and recycles DOM nodes, making it efficient for lists with thousands of items.'
      },
      {
        id: 3,
        question: 'What is route-based lazy loading?',
        options: ['Loading all routes at startup', 'Loading route components only when the user navigates to them', 'Loading CSS lazily', 'Loading images on scroll'],
        correctIndex: 1,
        explanation: 'Route-based lazy loading splits your app into chunks and only loads the code for a route when the user navigates to it, reducing initial bundle size.'
      }
    ],
    topics: [
      { id: 'onpush', title: 'OnPush Change Detection', content: '**Practice - OnPush Component:**\n```typescript\n@Component({\n  changeDetection: ChangeDetectionStrategy.OnPush,\n  standalone: true,\n  template: `<p>{{ user().name }}</p>`\n})\nexport class UserComponent {\n  user = input.required<User>();\n  private cdr = inject(ChangeDetectorRef);\n\n  update() {\n    this.cdr.markForCheck();\n  }\n}\n```' },
      { id: 'lazy-loading', title: 'Lazy Loading Strategies', content: '**Practice - Route-Based Lazy Loading:**\n```typescript\nconst routes: Routes = [\n  { path: \'admin\', loadComponent: () => \n    import(\'./admin/admin.component\').then(m => m.AdminComponent) \n  }\n];\n```' },
      { id: 'virtual-scrolling', title: 'Virtual Scrolling', content: '**Practice - Virtual Scroll:**\n```typescript\n@Component({\n  imports: [ScrollingModule],\n  template: `\n    <cdk-virtual-scroll-viewport itemSize="50" class="viewport">\n      @for (item of items; track item.id) {\n        <div class="item">{{ item.name }}</div>\n      }\n    </cdk-virtual-scroll-viewport>\n  `\n})\nexport class ListComponent {\n  items = Array.from({ length: 10000 }, (_, i) => ({\n    id: i,\n    name: `Item ${i}`\n  }));\n}\n```' }
    ]
  },
  {
    id: 22, slug: 'testing', title: 'Testing',
    description: 'Master unit testing and integration testing.',
    level: 'advanced', duration: '45 min',
    objectives: ['Write unit tests', 'Test components', 'Test services'],
    quiz: [
      {
        id: 1,
        question: 'What does TestBed.configureTestingModule do?',
        options: ['Creates a production build', 'Configures a testing module with dependencies and metadata for unit testing', 'Runs end-to-end tests', 'Configures the build system'],
        correctIndex: 1,
        explanation: 'TestBed.configureTestingModule creates a dynamic testing module that mimics an Angular module for isolated unit testing.'
      },
      {
        id: 2,
        question: 'What does HttpTestingController do?',
        options: ['Tests database connections', 'Intercepts HTTP calls during tests so you can simulate responses', 'Makes real HTTP requests', 'Tests WebSocket connections'],
        correctIndex: 1,
        explanation: 'HttpTestingController intercepts outgoing HTTP requests during tests, allowing you to mock responses without making real network calls.'
      },
      {
        id: 3,
        question: 'What does fixture.detectChanges() do?',
        options: ['Creates the component', 'Triggers change detection to update the DOM', 'Destroys the component', 'Renders the template to a file'],
        correctIndex: 1,
        explanation: 'detectChanges() triggers Angular change detection, updating the DOM to reflect any data changes made in the test.'
      }
    ],
    topics: [
      { id: 'setup', title: 'Test Setup', content: '**Practice - Test Structure:**\n```typescript\nimport { ComponentFixture, TestBed } from \'@angular/core/testing\';\nimport { UserComponent } from \'./user.component\';\nimport { UserService } from \'./user.service\';\nimport { of } from \'rxjs\';\n\ndescribe(\'UserComponent\', () => {\n  let component: UserComponent;\n  let fixture: ComponentFixture<UserComponent>;\n  let userServiceSpy: jasmine.SpyObj<UserService>;\n\n  beforeEach(async () => {\n    userServiceSpy = jasmine.createSpyObj(\'UserService\', [\'getUsers\']);\n    userServiceSpy.getUsers.and.returnValue(of([]));\n\n    await TestBed.configureTestingModule({\n      imports: [UserComponent],\n      providers: [{ provide: UserService, useValue: userServiceSpy }]\n    }).compileComponents();\n\n    fixture = TestBed.createComponent(UserComponent);\n    component = fixture.componentInstance;\n  });\n\n  it(\'should create\', () => {\n    expect(component).toBeTruthy();\n  });\n});\n```' },
      { id: 'component-tests', title: 'Component Tests', content: '**Practice - Testing Inputs/Outputs:**\n```typescript\nit(\'should display user name\', () => {\n  component.user.set({ id: 1, name: \'John\' });\n  fixture.detectChanges();\n\n  const compiled = fixture.nativeElement as HTMLElement;\n  expect(compiled.querySelector(\'p\')?.textContent).toContain(\'John\');\n});\n```' },
      { id: 'service-tests', title: 'Service Tests', content: '**Practice - Testing HTTP:**\n```typescript\nimport { HttpTestingController, provideHttpClientTesting } from \'@angular/common/http/testing\';\n\ndescribe(\'ApiService\', () => {\n  let service: ApiService;\n  let httpMock: HttpTestingController;\n\n  beforeEach(() => {\n    TestBed.configureTestingModule({\n      providers: [provideHttpClient(), provideHttpClientTesting()]\n    });\n    service = TestBed.inject(ApiService);\n    httpMock = TestBed.inject(HttpTestingController);\n  });\n\n  afterEach(() => {\n    httpMock.verify();\n  });\n\n  it(\'should get users\', () => {\n    const mockUsers = [{ id: 1, name: \'John\' }];\n\n    service.getUsers().subscribe(users => {\n      expect(users).toEqual(mockUsers);\n    });\n\n    const req = httpMock.expectOne(\'/api/users\');\n    expect(req.request.method).toBe(\'GET\');\n    req.flush(mockUsers);\n  });\n});\n```' }
    ]
  },
  {
    id: 23, slug: 'security', title: 'Security',
    description: 'Master Angular security best practices.',
    level: 'advanced', duration: '30 min',
    objectives: ['Prevent XSS', 'Handle CSRF', 'Sanitize inputs'],
    quiz: [
      {
        id: 1,
        question: 'What does Angular\'s DomSanitizer do?',
        options: ['Cleans up HTML files', 'Sanitizes untrusted values to prevent XSS attacks', 'Validates form inputs', 'Encrypts data'],
        correctIndex: 1,
        explanation: 'DomSanitizer removes dangerous code from untrusted values (like HTML from users) to prevent cross-site scripting (XSS) attacks.'
      },
      {
        id: 2,
        question: 'What is CSRF?',
        options: ['A type of XSS attack', 'An attack where a malicious site tricks users into making unintended requests to your app', 'A SQL injection technique', 'A brute-force attack'],
        correctIndex: 1,
        explanation: 'Cross-Site Request Forgery tricks an authenticated user into performing unwanted actions on your application by submitting forged requests.'
      },
      {
        id: 3,
        question: 'When should you use bypassSecurityTrustHtml?',
        options: ['For all user content', 'Only when you absolutely trust the HTML source', 'Never', 'For every component'],
        correctIndex: 1,
        explanation: 'bypassSecurityTrustHtml skips Angular\'s built-in sanitization. Only use it when you are 100% certain the HTML is safe and comes from a trusted source.'
      }
    ],
    topics: [
      { id: 'xss', title: 'Cross-Site Scripting (XSS)', content: '**Practice - Sanitization:**\n```typescript\nimport { DomSanitizer, SafeHtml } from \'@angular/platform-browser\';\n\n@Component({})\nexport class SafeHtmlComponent {\n  constructor(private sanitizer: DomSanitizer) {}\n\n  getSafeHtml(html: string): SafeHtml {\n    return this.sanitizer.bypassSecurityTrustHtml(html);\n  }\n}\n```' },
      { id: 'csrf', title: 'Cross-Site Request Forgery (CSRF)', content: '**Practice - CSRF Configuration:**\n```typescript\nprovideHttpClient(\n  withXsrfConfiguration({\n    cookieName: \'XSRF-TOKEN\',\n    headerName: \'X-XSRF-TOKEN\'\n  })\n)\n```' },
      { id: 'best-practices', title: 'Security Best Practices', content: '**Practice - HTTP Security:**\n```typescript\n// Use HTTPS\nthis.http.get(\'https://api.example.com/data\');\n\n// Add authorization header\nreq = req.clone({\n  setHeaders: { Authorization: `Bearer ${token}` }\n});\n```' }
    ]
  },
  {
    id: 24, slug: 'ssr', title: 'SSR & Hydration',
    description: 'Master Server-Side Rendering and hydration.',
    level: 'advanced', duration: '40 min',
    objectives: ['Configure SSR', 'Understand hydration', 'Handle universal rendering'],
    quiz: [
      {
        id: 1,
        question: 'What is the main benefit of Server-Side Rendering (SSR)?',
        options: ['Faster runtime performance', 'Faster initial page load and better SEO', 'Smaller bundle size', 'Better debugging'],
        correctIndex: 1,
        explanation: 'SSR renders the initial page on the server, delivering fully-formed HTML to the browser for faster first paint and improved search engine indexing.'
      },
      {
        id: 2,
        question: 'What does provideClientHydration() do?',
        options: ['Caches API responses', 'Reuses the server-rendered DOM instead of re-rendering it on the client', 'Adds CSS hydration animations', 'Hydrates database connections'],
        correctIndex: 1,
        explanation: 'Client hydration reuses the server-rendered DOM, preventing a full re-render and improving perceived performance.'
      },
      {
        id: 3,
        question: 'What is TransferState used for?',
        options: ['Transferring component state between routes', 'Passing data from server to client to avoid duplicate API calls', 'Managing component lifecycle', 'Transferring files between microservices'],
        correctIndex: 1,
        explanation: 'TransferState serializes data fetched on the server and transfers it to the client, preventing the client from making the same API calls again.'
      }
    ],
    topics: [
      { id: 'ssr-setup', title: 'SSR Setup', content: '**Practice - Enable SSR:**\n```bash\nng add @angular/ssr\n```\n\n**SSR Benefits:**\n- Faster initial load\n- Better SEO\n- Social media previews' },
      { id: 'hydration', title: 'Hydration', content: '**Practice - Hydration:**\n```typescript\nprovideClientHydration()\n```\n\n**Tips:**\n- Use ngIf to conditionally render on server\n- Avoid window/document in main code\n- Use TransferState for API data' },
      { id: 'transfer-state', title: 'TransferState', content: '**Practice - TransferState:**\n```typescript\nconstructor() {\n  const transferState = inject(TransferState);\n  const data = transferState.get(\'dataKey\', null);\n  if (data) {\n    this.data.set(data);\n  } else {\n    this.loadData();\n  }\n}\n```' }
    ]
  },
  {
    id: 25, slug: 'di-advanced', title: 'Advanced DI Patterns',
    description: 'Master hierarchical injectors and custom tokens.',
    level: 'advanced', duration: '40 min',
    objectives: ['Understand injector hierarchy', 'Create custom tokens', 'Use multi-providers'],
    quiz: [
      {
        id: 1,
        question: 'What does { self: true } do in inject()?',
        options: ['Injects from the parent injector', 'Restricts injection to the current injector only', 'Skips the current injector', 'Makes the service a singleton'],
        correctIndex: 1,
        explanation: 'The self option tells inject() to only look in the current injector, throwing an error if the service is not provided there.'
      },
      {
        id: 2,
        question: 'What is an InjectionToken?',
        options: ['A class that provides services', 'A typed token for providing non-class values through DI', 'A token for authentication', 'A string identifier for components'],
        correctIndex: 1,
        explanation: 'InjectionToken allows you to provide primitive values, configurations, or any non-class value through the dependency injection system with type safety.'
      },
      {
        id: 3,
        question: 'What does { skipSelf: true } do?',
        options: ['Injects from the root only', 'Skips the current injector and looks up the injector hierarchy', 'Prevents injection', 'Creates a new injector'],
        correctIndex: 1,
        explanation: 'skipSelf tells inject() to ignore the current injector and search up the injector hierarchy, useful when a parent component provides a different instance.'
      }
    ],
    topics: [
      { id: 'hierarchy', title: 'Injector Hierarchy', content: '**Practice - Self vs SkipSelf:**\n```typescript\n// Self: Only look in current injector\ninject(Service, { self: true })\n\n// SkipSelf: Skip current, look up\ninject(Service, { skipSelf: true })\n```' },
      { id: 'tokens', title: 'Injection Tokens', content: '**Practice - Custom Tokens:**\n```typescript\nexport const API_URL = new InjectionToken<string>(\'API_URL\');\n\nproviders: [\n  { provide: API_URL, useValue: \'https://api.example.com\' }\n]\n\nconstructor(@Inject(API_URL) private apiUrl: string) {}\n```' },
      { id: 'multi-providers', title: 'Multi-Providers', content: '**Practice - Multiple Providers:**\n```typescript\nexport const HTTP_INTERCEPTORS = new InjectionToken<HttpInterceptor[]>(\'HTTP_INTERCEPTORS\');\n\nproviders: [\n  { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },\n  { provide: HTTP_INTERCEPTORS, useClass: LoggingInterceptor, multi: true }\n]\n```' }
    ]
  },
  {
    id: 26, slug: 'change-detection', title: 'Change Detection Deep Dive',
    description: 'Understand Angular change detection internals.',
    level: 'advanced', duration: '35 min',
    objectives: ['Understand zone.js', 'Master OnPush', 'Use ChangeDetectorRef'],
    quiz: [
      {
        id: 1,
        question: 'What does zone.js do in Angular?',
        options: ['Handles routing', 'Patches async APIs to trigger change detection automatically', 'Manages HTTP requests', 'Compiles templates'],
        correctIndex: 1,
        explanation: 'Zone.js patches browser APIs (setTimeout, XMLHttpRequest, etc.) to notify Angular when async operations complete, triggering change detection.'
      },
      {
        id: 2,
        question: 'What does provideZonelessChangeDetection() enable?',
        options: ['Disables change detection entirely', 'Uses signals instead of zone.js for automatic change detection', 'Enables zone.js in production', 'Adds extra change detection cycles'],
        correctIndex: 1,
        explanation: 'Zoneless change detection relies on signals and explicit triggers instead of zone.js, resulting in fewer unnecessary change detection cycles.'
      },
      {
        id: 3,
        question: 'What does cdr.markForCheck() do?',
        options: ['Removes the component from the DOM', 'Tells Angular to check the component and its ancestors on the next change detection run', 'Destroys the component', 'Forces an immediate re-render'],
        correctIndex: 1,
        explanation: 'markForCheck() marks the component and its ancestors as dirty, ensuring they are checked during the next change detection cycle, even with OnPush.'
      }
    ],
    topics: [
      { id: 'zonejs', title: 'Zone.js', content: '**Practice - Zoneless Mode:**\n```typescript\nbootstrapApplication(AppComponent, {\n  providers: [\n    provideZonelessChangeDetection()\n  ]\n});\n```' },
      { id: 'cdr', title: 'ChangeDetectorRef', content: '**Practice - ChangeDetectorRef:**\n```typescript\nconstructor(private cdr: ChangeDetectorRef) {}\n\ncdr.detectChanges();\ncdr.markForCheck();\ncdr.detach();\ncdr.reattach();\n```' },
      { id: 'strategies', title: 'Detection Strategies', content: '**Practice - Zoneless + OnPush:**\n```typescript\nbootstrapApplication(AppComponent, {\n  providers: [\n    provideZonelessChangeDetection()\n  ]\n});\n\n@Component({\n  changeDetection: ChangeDetectionStrategy.OnPush\n})\nexport class AppComponent {}\n```' }
    ]
  },
  {
    id: 27, slug: 'architecture', title: 'Architecture Patterns',
    description: 'Master Angular architecture and design patterns.',
    level: 'advanced', duration: '45 min',
    objectives: ['Apply SOLID principles', 'Use design patterns', 'Structure large apps'],
    quiz: [
      {
        id: 1,
        question: 'What does the Single Responsibility Principle (SRP) mean in Angular?',
        options: ['One component per file', 'Each class should have only one reason to change', 'One service per application', 'One module per feature'],
        correctIndex: 1,
        explanation: 'SRP means each class (component, service, etc.) should handle only one concern. If a service manages users AND products, it violates SRP.'
      },
      {
        id: 2,
        question: 'What is the recommended project structure for a large Angular app?',
        options: ['All files in one folder', 'Feature-based structure with core/, shared/, and features/', 'Grouped by file type (all .ts together)', 'No specific structure needed'],
        correctIndex: 1,
        explanation: 'A feature-based structure organizes code by domain/feature (core for singletons, shared for reusable, features for domain modules).'
      },
      {
        id: 3,
        question: 'What is the factory pattern used for in Angular DI?',
        options: ['Creating components dynamically', 'Creating service instances based on configuration at runtime', 'Building HTML forms', 'Managing route transitions'],
        correctIndex: 1,
        explanation: 'A factory provider uses a function to create and return the service instance, allowing runtime decisions like selecting a different logger for production vs development.'
      }
    ],
    topics: [
      { id: 'solid', title: 'SOLID in Angular', content: '**Practice - Separate Concerns:**\n```typescript\n// Bad: One big service\n@Injectable() export class AppService {\n  getUsers() {}\n  getProducts() {}\n  handleAuth() {}\n}\n\n// Good: Separate concerns\n@Injectable() export class UserService {}\n@Injectable() export class ProductService {}\n@Injectable() export class AuthService {}\n```' },
      { id: 'patterns', title: 'Design Patterns', content: '**Practice - Factory Pattern:**\n```typescript\nexport function createLogger(level: LogLevel): Logger {\n  return new Logger(level);\n}\n\nproviders: [\n  { provide: Logger, useFactory: () => createLogger(\'debug\') }\n]\n```' },
      { id: 'structure', title: 'Project Structure', content: '**Practice - Feature-Based Structure:**\n```\nsrc/app/\n├── core/           # Singleton services, guards\n├── shared/         # Reusable components, pipes\n├── features/       # Feature modules\n└── store/          # State management\n```' }
    ]
  },
  {
    id: 28, slug: 'internals', title: 'Angular Internals',
    description: 'Understand how Angular works under the hood.',
    level: 'advanced', duration: '50 min',
    objectives: ['Understand compilation', 'Know Ivy renderer', 'Understand dependency resolution'],
    quiz: [
      {
        id: 1,
        question: 'What is the difference between AOT and JIT compilation?',
        options: ['AOT is faster at runtime, JIT is faster at build time', 'AOT compiles at build time, JIT compiles at runtime in the browser', 'JIT is more secure than AOT', 'AOT only works with TypeScript'],
        correctIndex: 1,
        explanation: 'AOT (Ahead-of-Time) compiles templates and components during the build, while JIT (Just-in-Time) compiles in the browser at runtime.'
      },
      {
        id: 2,
        question: 'What is the Ivy renderer?',
        options: ['A testing framework', 'Angular\'s compilation and rendering engine that generates efficient instructions', 'A CSS preprocessor', 'A dependency injection system'],
        correctIndex: 1,
        explanation: 'Ivy is Angular\'s rendering engine that compiles templates into efficient JavaScript instructions for DOM manipulation.'
      },
      {
        id: 3,
        question: 'What happens during Angular\'s DI resolution?',
        options: ['It creates new instances every time', 'It traverses the injector hierarchy from child to parent to find a provider', 'It only checks the root injector', 'It ignores decorators'],
        correctIndex: 1,
        explanation: 'Angular\'s DI resolution walks up the injector hierarchy from the current component to its parents until it finds a matching provider.'
      }
    ],
    topics: [
      { id: 'compilation', title: 'Compilation Process', content: '**Practice - Build Commands:**\n```bash\nng build --configuration production  # AOT\nng serve --configuration development   # JIT\n```' },
      { id: 'ivy', title: 'Ivy Renderer', content: '**Practice - Ivy Instructions:**\n- elementStart/elementEnd\n- text\n- listener\n- pipe\n- directiveCreate' },
      { id: 'di-resolution', title: 'DI Resolution', content: '**Practice - Multi-Injector Patterns:**\n```typescript\n// Self: Only current injector\ninject(Service, { self: true })\n\n// SkipSelf: Skip current\ninject(Service, { skipSelf: true })\n\n// Parent: Go up one level\ninject(Service, { host: true })\n```' }
    ]
  },
  {
    id: 29, slug: 'advanced-patterns', title: 'Advanced Patterns',
    description: 'Master advanced Angular patterns.',
    level: 'advanced', duration: '45 min',
    objectives: ['Use barrel exports', 'Create micro-frontends', 'Use custom decorators'],
    quiz: [
      {
        id: 1,
        question: 'What is a barrel export (index.ts)?',
        options: ['A type of component', 'A file that re-exports public APIs from a module for cleaner imports', 'A testing utility', 'A build optimization'],
        correctIndex: 1,
        explanation: 'Barrel files (index.ts) collect and re-export public symbols, allowing cleaner imports like \'./features/users\' instead of \'./features/users/user.service\'.'
      },
      {
        id: 2,
        question: 'What is Module Federation used for?',
        options: ['Merging multiple modules into one', 'Enabling independently deployed applications to share code at runtime', 'Combining CSS modules', 'Managing NgModules'],
        correctIndex: 1,
        explanation: 'Module Federation allows multiple independently built and deployed Angular applications to share code and modules at runtime.'
      },
      {
        id: 3,
        question: 'What does a custom class decorator do?',
        options: ['Renders the component', 'Modifies or extends class behavior by running a function when the class is defined', 'Validates inputs', 'Manages HTTP interceptors'],
        correctIndex: 1,
        explanation: 'A class decorator receives the class constructor and can modify its behavior, add metadata, or perform side effects at class definition time.'
      }
    ],
    topics: [
      { id: 'barrel-exports', title: 'Barrel Exports', content: '**Practice - index.ts Files:**\n```typescript\n// features/users/index.ts\nexport * from \'./user.service\';\nexport * from \'./user.model\';\nexport * from \'./user.component\';\n```' },
      { id: 'mfe', title: 'Micro-Frontends', content: '**Practice - Module Federation:**\n```typescript\nnew ModuleFederationPlugin({\n  name: \'shell\',\n  remotes: {\n    remote: \'remote@http://localhost:4201/remoteEntry.js\'\n  },\n  shared: {\n    \'@angular/core\': { singleton: true },\n    \'@angular/common\': { singleton: true }\n  }\n})\n```' },
      { id: 'custom-decorators', title: 'Custom Decorators', content: '**Practice - Class Decorator:**\n```typescript\nexport function Log() {\n  return function (constructor: Function) {\n    console.log(`Created: ${constructor.name}`);\n  };\n}\n\n@Log()\nexport class MyComponent {}\n```' }
    ]
  },
  {
    id: 30, slug: 'interview-prep', title: 'Interview Preparation',
    description: 'Senior Angular developer interview questions.',
    level: 'advanced', duration: '60 min',
    objectives: ['Answer common questions', 'Demonstrate deep knowledge', 'Discuss trade-offs'],
    quiz: [
      {
        id: 1,
        question: 'When would you choose Signals over Observables?',
        options: ['For all async operations', 'For simple, synchronous component state like UI toggles and form inputs', 'Signals cannot handle async data', 'Observables are deprecated'],
        correctIndex: 1,
        explanation: 'Signals excel at simple, synchronous state in components. Observables are better for complex async streams, multi-source composition, and cancellation.'
      },
      {
        id: 2,
        question: 'What trade-off does NgRx introduce?',
        options: ['No trade-offs, it is always better', 'More boilerplate but better dev tools, predictable state, and team patterns', 'It is simpler than services', 'It eliminates the need for services'],
        correctIndex: 1,
        explanation: 'NgRx adds boilerplate (actions, reducers, effects) but provides DevTools, predictable state flow, and clear patterns that scale well for large teams.'
      },
      {
        id: 3,
        question: 'What should you check during an Angular code review?',
        options: ['Only formatting', 'OnPush usage, error handling, memory leak prevention, security, and test coverage', 'Only TypeScript syntax', 'Only CSS styling'],
        correctIndex: 1,
        explanation: 'A thorough Angular code review checks OnPush, error handling, memory leaks (subscriptions), security, test coverage, and documentation.'
      }
    ],
    topics: [
      { id: 'system-design', title: 'System Design Questions', content: '**Practice - Design a Large-Scale App:**\n1. Discuss modular architecture\n2. Explain lazy loading strategies\n3. Cover state management (signals vs NgRx)\n4. Address performance optimization' },
      { id: 'trade-offs', title: 'Trade-Off Discussions', content: '**Practice - Signals vs Observables:**\n- Signals: Simpler, synchronous, component state\n- Observables: Powerful, async, complex flows\n- Use both strategically\n\n**NgRx vs Service State:**\n- NgRx: Boilerplate, DevTools, team patterns\n- Services: Simpler, less overhead' },
      { id: 'code-review', title: 'Code Review Tips', content: '**Practice - Review Checklist:**\n- [ ] OnPush enabled\n- [ ] Proper error handling\n- [ ] Memory leak prevention\n- [ ] Security considerations\n- [ ] Test coverage\n- [ ] Documentation' }
    ]
  },
  {
    id: 31, slug: 'debugging', title: 'Debugging & DevTools',
    description: 'Master Angular debugging techniques and tools.',
    level: 'advanced', duration: '30 min',
    objectives: ['Use Angular DevTools', 'Debug change detection', 'Profile performance'],
    quiz: [
      {
        id: 1,
        question: 'What can Angular DevTools help you inspect?',
        options: ['Only CSS styles', 'Component tree, component properties, and change detection cycles', 'Only network requests', 'Only JavaScript errors'],
        correctIndex: 1,
        explanation: 'Angular DevTools (Chrome extension) lets you explore the component tree, inspect component state, and profile change detection performance.'
      },
      {
        id: 2,
        question: 'What does the CLS metric measure?',
        options: ['Content loading speed', 'Cumulative Layout Shift - how much the page layout shifts during loading', 'Client-side latency', 'Component lifecycle speed'],
        correctIndex: 1,
        explanation: 'CLS measures visual stability by tracking how much visible content shifts during the page\'s lifespan, impacting user experience.'
      },
      {
        id: 3,
        question: 'How do you debug a component that is not updating?',
        options: ['Add more @Input properties', 'Check OnPush strategy, verify signals are updating, use markForCheck()', 'Clear browser cache', 'Reinstall Node modules'],
        correctIndex: 1,
        explanation: 'Common causes include OnPush without proper triggers, signals not being updated, or missing markForCheck() calls in imperative code.'
      }
    ],
    topics: [
      { id: 'devtools', title: 'Angular DevTools', content: '**Practice - Chrome Extension:**\n- Inspect component tree\n- View component properties\n- Profile change detection\n- Debug dependency injection' },
      { id: 'debugging', title: 'Debugging Techniques', content: '**Practice - Console Logging:**\n```typescript\nconsole.log(\'Component created\');\nconsole.log(this.data);\nconsole.table(this.items);\n```' },
      { id: 'performance', title: 'Performance Profiling', content: '**Practice - Performance Metrics:**\n- First Contentful Paint (FCP)\n- Largest Contentful Paint (LCP)\n- First Input Delay (FID)\n- Cumulative Layout Shift (CLS)' }
    ]
  },
  {
    id: 32, slug: 'i18n', title: 'Internationalization (i18n)',
    description: 'Master Angular internationalization.',
    level: 'advanced', duration: '35 min',
    objectives: ['Set up i18n', 'Translate content', 'Handle pluralization'],
    quiz: [
      {
        id: 1,
        question: 'What does the i18n attribute do?',
        options: ['Translates text automatically', 'Marks text as translatable for extraction into translation files', 'Enables multi-language support at runtime', 'Converts text to lowercase'],
        correctIndex: 1,
        explanation: 'The i18n attribute marks elements for extraction into translation files (like XLIFF) using ng extract-i18n.'
      },
      {
        id: 2,
        question: 'What format does Angular use for translation files?',
        options: ['JSON only', 'XLIFF (XML Localization Interchange File Format)', 'CSV', 'YAML only'],
        correctIndex: 1,
        explanation: 'Angular primarily uses XLIFF format for translation files, though it also supports other formats like XMB.'
      },
      {
        id: 3,
        question: 'What is the ICU format used for?',
        options: ['International keyboard layouts', 'Handling pluralization and gender-based translations', 'Unit conversion', 'Currency formatting'],
        correctIndex: 1,
        explanation: 'ICU format in Angular handles plural forms (e.g., "0 items", "1 item", "5 items") and gender-based translations in a single expression.'
      }
    ],
    topics: [
      { id: 'setup', title: 'i18n Setup', content: '**Practice - Mark Text:**\n```html\n<h1 i18n="@@welcome">Welcome to Angular</h1>\n```\n\n**Extract:**\n```bash\nng extract-i18n --format=xliff\n```' },
      { id: 'translation', title: 'Translation', content: '**Practice - XLIF File:**\n```xml\n<trans-unit id="welcome">\n  <source>Welcome to Angular</source>\n  <target>Bienvenido a Angular</target>\n</trans-unit>\n```' },
      { id: 'pluralization', title: 'Pluralization', content: '**Practice - ICU Format:**\n```html\n<p i18n>{count, plural, =0 {No items} =1 {One item} other {{{count}} items}}</p>\n```' }
    ]
  },
  {
    id: 33, slug: 'animations', title: 'Animations',
    description: 'Master Angular animations.',
    level: 'advanced', duration: '35 min',
    objectives: ['Create animations', 'Use triggers', 'Handle transitions'],
    quiz: [
      {
        id: 1,
        question: 'What does the :enter alias represent in Angular animations?',
        options: ['Element is being removed', 'Element is being inserted into the DOM', 'Element is already in the DOM', 'Element is being moved'],
        correctIndex: 1,
        explanation: ':enter (void => *) triggers when an element is inserted into the DOM, typically used for entrance animations.'
      },
      {
        id: 2,
        question: 'What does a state() function define in animations?',
        options: ['A CSS animation', 'A named set of styles for an element at a specific state', 'A transition between states', 'An animation delay'],
        correctIndex: 1,
        explanation: 'state() defines a named set of CSS styles that apply when the element reaches that state, like "open" or "closed".'
      },
      {
        id: 3,
        question: 'What are keyframes used for in Angular animations?',
        options: ['Defining CSS classes', 'Creating multi-step animations with intermediate style values', 'Setting animation duration', 'Defining transition delays'],
        correctIndex: 1,
        explanation: 'keyframes() allows you to define intermediate style values at specific offsets during an animation, creating complex multi-step effects.'
      }
    ],
    topics: [
      { id: 'setup', title: 'Animation Setup', content: '**Practice - Basic Animation:**\n```typescript\n@Component({\n  animations: [\n    trigger(\'fadeIn\', [\n      transition(\':enter\', [\n        style({ opacity: 0 }),\n        animate(\'300ms ease-in\', style({ opacity: 1 }))\n      ]),\n      transition(\':leave\', [\n        animate(\'300ms ease-out\', style({ opacity: 0 }))\n      ])\n    ])\n  ]\n})\nexport class FadeComponent {}\n```' },
      { id: 'triggers', title: 'Animation Triggers', content: '**Practice - State-Based:**\n```typescript\ntrigger(\'openClose\', [\n  state(\'open\', style({ height: \'200px\' })),\n  state(\'closed\', style({ height: \'100px\' })),\n  transition(\'open <=> closed\', animate(\'500ms ease-in-out\'))\n])\n```' },
      { id: 'advanced', title: 'Advanced Animations', content: '**Practice - Keyframes:**\n```typescript\ntrigger(\'bounce\', [\n  transition(\'* => *\', [\n    animate(\'500ms\', keyframes([\n      style({ transform: \'translateX(0)\', offset: 0 }),\n      style({ transform: \'translateX(-10px)\', offset: 0.3 }),\n      style({ transform: \'translateX(10px)\', offset: 0.6 }),\n      style({ transform: \'translateX(0)\', offset: 1.0 })\n    ]))\n  ])\n])\n```' }
    ]
  },
  {
    id: 34, slug: 'web-workers', title: 'Web Workers',
    description: 'Use Web Workers in Angular.',
    level: 'advanced', duration: '30 min',
    objectives: ['Create Web Workers', 'Communicate with main thread'],
    quiz: [
      {
        id: 1,
        question: 'What is the main purpose of a Web Worker?',
        options: ['Render the UI', 'Run heavy computations off the main thread to keep the UI responsive', 'Handle HTTP requests', 'Manage routing'],
        correctIndex: 1,
        explanation: 'Web Workers run JavaScript in a background thread, preventing heavy computations from blocking the main UI thread.'
      },
      {
        id: 2,
        question: 'How do you communicate with a Web Worker?',
        options: ['Using direct function calls', 'Using postMessage() and onmessage event handler', 'Using HTTP requests', 'Using signals'],
        correctIndex: 1,
        explanation: 'Communication with Web Workers uses postMessage() to send data and onmessage to receive responses, similar to cross-origin messaging.'
      },
      {
        id: 3,
        question: 'What is a common use case for Web Workers?',
        options: ['Simple form validation', 'Image processing, data sorting, and cryptographic operations', 'CSS animations', 'Template rendering'],
        correctIndex: 1,
        explanation: 'Web Workers are ideal for CPU-intensive tasks like image processing, large data sorting/filtering, and cryptography that would otherwise freeze the UI.'
      }
    ],
    topics: [
      { id: 'setup', title: 'Web Worker Setup', content: '**Practice - Create Worker:**\n```typescript\n// src/app/app.worker.ts\n/// <reference lib="webworker" />\n\naddEventListener(\'message\', ({ data }) => {\n  const result = heavyComputation(data);\n  postMessage(result);\n});\n```' },
      { id: 'communication', title: 'Worker Communication', content: '**Practice - Message Types:**\n```typescript\nworker.postMessage({ type: \'process\', data: this.largeArray });\n\nworker.onmessage = ({ data }) => {\n  console.log(\'Result:\', data);\n};\n```' },
      { id: 'use-cases', title: 'Web Worker Use Cases', content: '**Practice - Heavy Computations:**\n- Image processing\n- Data sorting/filtering\n- Mathematical calculations\n- Cryptography' }
    ]
  },
  {
    id: 35, slug: 'deployment', title: 'Build & Deployment',
    description: 'Master Angular build optimization and deployment.',
    level: 'advanced', duration: '35 min',
    objectives: ['Optimize builds', 'Configure environments', 'Deploy to platforms'],
    quiz: [
      {
        id: 1,
        question: 'What does ng build --configuration production do?',
        options: ['Runs the development server', 'Builds with AOT, minification, tree-shaking, and optimizations', 'Starts unit tests', 'Generates documentation'],
        correctIndex: 1,
        explanation: 'The production configuration enables AOT compilation, tree-shaking, minification, and other optimizations for a smaller, faster build.'
      },
      {
        id: 2,
        question: 'What is the purpose of environment.ts files?',
        options: ['To define CSS themes', 'To provide environment-specific configuration like API URLs and feature flags', 'To set up CI/CD pipelines', 'To configure Angular Material'],
        correctIndex: 1,
        explanation: 'Environment files let you define different configurations for development, staging, and production builds without changing code.'
      },
      {
        id: 3,
        question: 'What is tree-shaking?',
        options: ['Removing unused CSS', 'Removing unused JavaScript code from the final bundle', 'Shaking the DOM tree', 'Optimizing image sizes'],
        correctIndex: 1,
        explanation: 'Tree-shaking analyzes your code and eliminates unused imports/modules, reducing the final bundle size significantly.'
      }
    ],
    topics: [
      { id: 'build', title: 'Build Optimization', content: '**Practice - Production Build:**\n```bash\nng build --configuration production\n```' },
      { id: 'environments', title: 'Environment Configuration', content: '**Practice - Environment Files:**\n```typescript\n// environment.ts\nexport const environment = {\n  production: false,\n  apiUrl: \'http://localhost:3000\'\n};\n```' },
      { id: 'deployment', title: 'Deployment Platforms', content: '**Practice - Firebase Hosting:**\n```bash\nnpm install -g firebase-tools\nfirebase init hosting\nfirebase deploy\n```' }
    ]
  },
  // ═══════════════════════════════════════════════════════════════
  // NEW SENIOR-LEVEL TOPICS (36-42)
  // ═══════════════════════════════════════════════════════════════
  {
    id: 36, slug: 'ai-integration', title: 'AI Integration with Angular',
    description: 'Build AI-powered features in Angular applications.',
    level: 'advanced', duration: '45 min',
    objectives: ['Integrate AI SDKs', 'Build chatbots', 'Handle streaming responses', 'Implement AI patterns'],
    quiz: [
      {
        id: 1,
        question: 'What is streaming in the context of AI responses?',
        options: ['Downloading a large file', 'Receiving response tokens incrementally instead of waiting for the full response', 'Streaming video content', 'Using WebSockets only'],
        correctIndex: 1,
        explanation: 'Streaming delivers AI response tokens one at a time via Server-Sent Events, allowing the UI to display text as it is generated.'
      },
      {
        id: 2,
        question: 'What is the role of an AI state service?',
        options: ['To make HTTP requests only', 'To manage conversation history, current input, and streaming state across components', 'To render AI models locally', 'To replace HttpClient'],
        correctIndex: 1,
        explanation: 'An AI state service centralizes conversation data, loading states, and streaming flags, making them accessible to multiple UI components.'
      },
      {
        id: 3,
        question: 'What challenge does streaming present for Angular change detection?',
        options: ['No challenge exists', 'Rapid state updates may cause excessive change detection cycles', 'Streaming disables signals', 'Angular does not support streaming'],
        correctIndex: 1,
        explanation: 'Frequent signal updates from streaming tokens can trigger many change detection cycles, requiring careful optimization with OnPush and batching.'
      }
    ],
    topics: [
      { id: 'ai-sdk', title: 'AI SDK Integration', content: '**Practice - OpenAI Integration:**\n```typescript\n@Injectable({ providedIn: \'root\' })\nexport class AiService {\n  private apiUrl = \'https://api.openai.com/v1/chat/completions\';\n\n  constructor(private http: HttpClient) {}\n\n  chat(messages: ChatMessage[]): Observable<string> {\n    return this.http.post<any>(this.apiUrl, {\n      model: \'gpt-4\',\n      messages,\n      stream: true\n    }, {\n      headers: {\n        \'Authorization\': `Bearer ${environment.openaiKey}`\n      }\n    }).pipe(\n      map(response => response.choices[0].message.content)\n    );\n  }\n}\n```' },
      { id: 'streaming', title: 'Streaming AI Responses', content: '**Practice - Server-Sent Events:**\n```typescript\nchatStream(messages: ChatMessage[]): Observable<string> {\n  return new Observable(observer => {\n    const eventSource = new EventSource(\n      `${environment.apiUrl}/chat?messages=${JSON.stringify(messages)}`\n    );\n\n    eventSource.onmessage = (event) => {\n      observer.next(event.data);\n    };\n\n    eventSource.onerror = (error) => {\n      observer.error(error);\n    };\n\n    return () => eventSource.close();\n  });\n}\n```' },
      { id: 'chatbot', title: 'Building a Chatbot', content: '**Practice - Chat Component:**\n```typescript\n@Component({})\nexport class ChatComponent {\n  messages = signal<ChatMessage[]>([]);\n  isLoading = signal(false);\n\n  async sendMessage(content: string) {\n    this.messages.update(msgs => [...msgs, { role: \'user\', content }]);\n    this.isLoading.set(true);\n\n    this.aiService.chatStream(this.messages()).subscribe({\n      next: (chunk) => {\n        this.messages.update(msgs => {\n          const last = msgs[msgs.length - 1];\n          if (last.role === \'assistant\') {\n            last.content += chunk;\n            return [...msgs];\n          }\n          return [...msgs, { role: \'assistant\', content: chunk }];\n        });\n      },\n      complete: () => this.isLoading.set(false)\n    });\n  }\n}\n```' }
    ]
  },
  {
    id: 37, slug: 'graphql', title: 'GraphQL with Angular',
    description: 'Master GraphQL integration in Angular.',
    level: 'advanced', duration: '40 min',
    objectives: ['Set up Apollo Client', 'Write queries/mutations', 'Handle caching', 'Implement subscriptions'],
    quiz: [
      {
        id: 1,
        question: 'What is the main advantage of GraphQL over REST?',
        options: ['Simpler setup', 'Clients request exactly the data they need, no over-fetching or under-fetching', 'Better caching by default', 'GraphQL is always faster'],
        correctIndex: 1,
        explanation: 'GraphQL lets clients specify exactly which fields they need in a single request, eliminating the over-fetching and under-fetching problems of REST.'
      },
      {
        id: 2,
        question: 'What does Apollo Client\'s InMemoryCache do?',
        options: ['Stores HTTP responses permanently', 'Caches query results in memory for faster access and deduplication', 'Stores user sessions', 'Caches CSS styles'],
        correctIndex: 1,
        explanation: 'InMemoryCache stores query results client-side, avoiding redundant network requests and enabling optimistic updates and cache normalization.'
      },
      {
        id: 3,
        question: 'What is the gql tag function used for?',
        options: ['Making HTTP requests', 'Defining GraphQL queries and mutations as tagged template literals', 'Creating Angular components', 'Formatting JSON'],
        correctIndex: 1,
        explanation: 'The gql tag parses GraphQL query strings into a query document that Apollo Client can execute against the server.'
      }
    ],
    topics: [
      { id: 'setup', title: 'Apollo Client Setup', content: '**Practice - Install & Configure:**\n```bash\nng add apollo-angular\n```\n\n```typescript\nconst httpLink = createHttpLink({ uri: \'https://api.example.com/graphql\' });\nconst cache = new InMemoryCache();\n\nprovideApollo(() => ({\n  link: httpLink,\n  cache\n}));\n```' },
      { id: 'queries', title: 'Queries & Mutations', content: '**Practice - GraphQL Operations:**\n```typescript\nconst GET_USERS = gql`\n  query GetUsers {\n    users {\n      id\n      name\n      email\n    }\n  }\n`;\n\n@Component({})\nexport class UsersComponent {\n  users$ = this.apollo.watchQuery({ query: GET_USERS }).valueChanges;\n\n  constructor(private apollo: Apollo) {}\n}\n```' },
      { id: 'caching', title: 'Apollo Cache', content: '**Practice - Cache Management:**\n```typescript\n// Read from cache\nconst users = this.apollo.client.readQuery({ query: GET_USERS });\n\n// Write to cache\nthis.apollo.client.writeQuery({\n  query: GET_USERS,\n  data: { users: [...existingUsers, newUser] }\n});\n\n// Refetch\nthis.apollo.watchQuery({ query: GET_USERS, fetchPolicy: \'network-only\' });\n```' }
    ]
  },
  {
    id: 38, slug: 'websockets', title: 'WebSockets & Real-Time',
    description: 'Build real-time features with WebSockets.',
    level: 'advanced', duration: '40 min',
    objectives: ['Set up WebSocket connection', 'Handle real-time data', 'Implement reconnection'],
    quiz: [
      {
        id: 1,
        question: 'What is the key difference between HTTP and WebSockets?',
        options: ['HTTP is faster than WebSockets', 'HTTP is request-response, WebSockets maintain a persistent bidirectional connection', 'WebSockets only work with Angular', 'HTTP supports real-time, WebSockets do not'],
        correctIndex: 1,
        explanation: 'HTTP follows a request-response model, while WebSockets establish a persistent connection allowing both server and client to push messages at any time.'
      },
      {
        id: 2,
        question: 'What is WebSocketSubject in RxJS?',
        options: ['A regular Subject', 'An RxJS wrapper around WebSocket that exposes the socket as an Observable', 'A Promise-based API', 'A HTTP interceptor'],
        correctIndex: 1,
        explanation: 'WebSocketSubject wraps the WebSocket API in an Observable, enabling you to use RxJS operators like retry, map, and filter on WebSocket data.'
      },
      {
        id: 3,
        question: 'Why is reconnection logic important for WebSockets?',
        options: ['WebSockets are always stable', 'Connections can drop due to network issues, so automatic reconnection ensures reliability', 'Reconnection improves performance', 'It is required by Angular'],
        correctIndex: 1,
        explanation: 'WebSocket connections can drop for many reasons. Automatic reconnection with retry logic ensures the app recovers from transient failures.'
      }
    ],
    topics: [
      { id: 'setup', title: 'WebSocket Setup', content: '**Practice - WebSocket Service:**\n```typescript\n@Injectable({ providedIn: \'root\' })\nexport class WebSocketService {\n  private socket$!: WebSocketSubject<any>;\n\n  connect(url: string): Observable<any> {\n    this.socket$ = webSocket(url);\n    return this.socket$.asObservable();\n  }\n\n  send(message: any) {\n    this.socket$.next(message);\n  }\n\n  disconnect() {\n    this.socket$.complete();\n  }\n}\n```' },
      { id: 'realtime', title: 'Real-Time Data', content: '**Practice - Chat Component:**\n```typescript\n@Component({})\nexport class ChatComponent implements OnInit {\n  messages = signal<ChatMessage[]>([]);\n\n  ngOnInit() {\n    this.wsService.connect(\'wss://api.example.com/chat\').subscribe(message => {\n      this.messages.update(msgs => [...msgs, message]);\n    });\n  }\n\n  sendMessage(content: string) {\n    this.wsService.send({ content, timestamp: new Date() });\n  }\n}\n```' },
      { id: 'reconnection', title: 'Reconnection Logic', content: '**Practice - Auto-Reconnect:**\n```typescript\nconnectWithRetry(url: string, maxRetries = 5): Observable<any> {\n  return this.wsService.connect(url).pipe(\n    retryWhen(errors => errors.pipe(\n      delay(1000),\n      take(maxRetries),\n      tap(retryCount => console.log(`Retry ${retryCount}`))\n    ))\n  );\n}\n```' }
    ]
  },
  {
    id: 39, slug: 'pwa', title: 'Progressive Web Apps',
    description: 'Build PWAs with Angular.',
    level: 'advanced', duration: '35 min',
    objectives: ['Add service worker', 'Implement offline support', 'Handle push notifications'],
    quiz: [
      {
        id: 1,
        question: 'What does a service worker do in a PWA?',
        options: ['Makes HTTP requests faster', 'Caches app assets and intercepts network requests for offline support', 'Manages user authentication', 'Runs background JavaScript'],
        correctIndex: 1,
        explanation: 'A service worker is a background script that caches assets and API responses, enabling the app to work offline or with poor connectivity.'
      },
      {
        id: 2,
        question: 'What does the installMode: "prefetch" setting do?',
        options: ['Installs the app on the device', 'Downloads and caches all listed resources immediately during service worker installation', 'Preloads resources only when needed', 'Uninstalls old cached resources'],
        correctIndex: 1,
        explanation: 'prefetch downloads all listed resources as soon as the service worker installs, ensuring they are available for immediate offline use.'
      },
      {
        id: 3,
        question: 'What is the purpose of the Web Push API?',
        options: ['To push code updates', 'To send push notifications from the server to the user\'s device even when the app is not open', 'To push form data', 'To push route changes'],
        correctIndex: 1,
        explanation: 'The Web Push API allows servers to send push notifications to the user\'s device through the service worker, even when the app is not actively running.'
      }
    ],
    topics: [
      { id: 'setup', title: 'PWA Setup', content: '**Practice - Add PWA:**\n```bash\nng add @angular/pwa\n```\n\n**ngsw-config.json:**\n```json\n{\n  "index": "/index.html",\n  "assetGroups": [{\n    "name": "app-shell",\n    "installMode": "prefetch",\n    "resources": {\n      "files": ["/favicon.ico", "/index.html", "/*.css", "/*.js"]\n    }\n  }]\n}\n```' },
      { id: 'offline', title: 'Offline Support', content: '**Practice - Service Worker:**\n```typescript\nprovideServiceWorker(\'ngsw-worker\', {\n  enabled: !isDevMode(),\n  registrationStrategy: \'registerWhenStable:30000\'\n})\n```' },
      { id: 'push', title: 'Push Notifications', content: '**Practice - Push Notifications:**\n```typescript\nif (\'serviceWorker\' in navigator && \'PushManager\' in window) {\n  const registration = await navigator.serviceWorker.ready;\n  const subscription = await registration.pushManager.subscribe({\n    userVisibleOnly: true,\n    applicationServerKey: environment.vapidPublicKey\n  });\n  // Send subscription to server\n}\n```' }
    ]
  },
  {
    id: 40, slug: 'standalone-migration', title: 'Standalone Migration',
    description: 'Migrate from NgModules to standalone components.',
    level: 'advanced', duration: '35 min',
    objectives: ['Understand migration strategy', 'Convert components', 'Update routing', 'Handle lazy loading'],
    quiz: [
      {
        id: 1,
        question: 'What is the recommended first step when migrating to standalone components?',
        options: ['Convert all modules at once', 'Start with leaf components (components with no child dependencies)', 'Remove all NgModules', 'Convert the app module first'],
        correctIndex: 1,
        explanation: 'Start with leaf components that have no child dependencies, as they are the simplest to convert and reduce risk during migration.'
      },
      {
        id: 2,
        question: 'When converting to standalone, where do imports go?',
        options: ['Into the parent NgModule', 'Directly into the component\'s imports array', 'Into a separate imports file', 'Into the index.html'],
        correctIndex: 1,
        explanation: 'Standalone components declare their dependencies directly in the component\'s imports array, eliminating the need for separate NgModules.'
      },
      {
        id: 3,
        question: 'How does lazy loading change with standalone components?',
        options: ['It is no longer possible', 'loadComponent replaces loadChildren, directly importing the component', 'You must use NgModules for lazy loading', 'Lazy loading is automatic'],
        correctIndex: 1,
        explanation: 'With standalone components, loadComponent dynamically imports the component file directly, skipping the intermediate NgModule layer.'
      }
    ],
    topics: [
      { id: 'strategy', title: 'Migration Strategy', content: '**Practice - Step-by-Step:**\n1. Start with leaf components (no children)\n2. Add standalone: true\n3. Move imports to component\n4. Remove from NgModule\n5. Update routing\n6. Remove empty NgModules' },
      { id: 'conversion', title: 'Converting Components', content: '**Practice - Convert to Standalone:**\n```typescript\n// Before\n@NgModule({\n  declarations: [UserComponent],\n  imports: [CommonModule, FormsModule]\n})\nexport class UserModule {}\n\n// After\n@Component({\n  standalone: true,\n  imports: [CommonModule, FormsModule],\n  template: `...`\n})\nexport class UserComponent {}\n```' },
      { id: 'routing', title: 'Update Routing', content: '**Practice - Standalone Routing:**\n```typescript\n// Before\n{ path: \'users\', loadChildren: () => import(\'./user/user.module\').then(m => m.UserModule) }\n\n// After\n{ path: \'users\', loadComponent: () => import(\'./user/user.component\').then(m => m.UserComponent) }\n```' }
    ]
  },
  {
    id: 41, slug: 'angular-material', title: 'Angular Material',
    description: 'Master Angular Material components and theming.',
    level: 'advanced', duration: '40 min',
    objectives: ['Set up Material', 'Use components', 'Customize themes', 'Handle accessibility'],
    quiz: [
      {
        id: 1,
        question: 'What command adds Angular Material to a project?',
        options: ['npm install material', 'ng add @angular/material', 'ng generate material', 'yarn add angular-material'],
        correctIndex: 1,
        explanation: 'ng add @angular/material installs the package, sets up a theme, adds typography, and configures animations automatically.'
      },
      {
        id: 2,
        question: 'How do you import Material components?',
        options: ['Import all at once', 'Import individual component modules like MatButtonModule from @angular/material/button', 'Add them to index.html', 'Use CSS classes only'],
        correctIndex: 1,
        explanation: 'Material components are tree-shakable. Import only the specific component modules you need, like MatButtonModule or MatCardModule.'
      },
      {
        id: 3,
        question: 'What does mat.m2-define-palette do in theming?',
        options: ['Creates a component', 'Defines a color palette for the Material theme', 'Adds animations', 'Configures routing'],
        correctIndex: 1,
        explanation: 'mat.m2-define-palette creates a color palette (e.g., indigo, pink) that can be used in the theme definition for consistent component colors.'
      }
    ],
    topics: [
      { id: 'setup', title: 'Material Setup', content: '**Practice - Install:**\n```bash\nng add @angular/material\n```\n\n**Import:**\n```typescript\nimport { MatButtonModule } from \'@angular/material/button\';\nimport { MatInputModule } from \'@angular/material/input\';\nimport { MatCardModule } from \'@angular/material/card\';\n```' },
      { id: 'components', title: 'Material Components', content: '**Practice - Use Components:**\n```html\n<mat-card>\n  <mat-card-header>\n    <mat-card-title>User Profile</mat-card-title>\n  </mat-card-header>\n  <mat-card-content>\n    <mat-form-field>\n      <mat-label>Name</mat-label>\n      <input matInput [(ngModel)]="user.name" />\n    </mat-form-field>\n  </mat-card-content>\n  <mat-card-actions>\n    <button mat-raised-button color="primary">Save</button>\n  </mat-card-actions>\n</mat-card>\n```' },
      { id: 'theming', title: 'Custom Themes', content: '**Practice - Custom Theme:**\n```scss\n// styles.scss\n@use \'@angular/material\' as mat;\n\n$primary: mat.m2-define-palette(mat.$m2-indigo-palette);\n$theme: mat.m2-define-light-theme((color: (primary: $primary)));\n\n@include mat.core();\n@include mat.all-component-themes($theme);\n```' }
    ]
  },
  {
    id: 42, slug: 'ai-angular-patterns', title: 'AI-Powered Angular Patterns',
    description: 'Modern patterns for AI-enhanced Angular applications.',
    level: 'advanced', duration: '45 min',
    objectives: ['Build AI chat interfaces', 'Implement streaming UI', 'Handle AI state', 'Optimize AI performance'],
    quiz: [
      {
        id: 1,
        question: 'How do you display a typing indicator while waiting for an AI response?',
        options: ['Use a setTimeout', 'Check a streaming signal (isStreaming) and conditionally render the indicator with @if', 'Use a CSS animation only', 'Use a pipe'],
        correctIndex: 1,
        explanation: 'A streaming signal tracks whether the AI is responding. When true, the typing indicator renders using @if in the template.'
      },
      {
        id: 2,
        question: 'Why is batching important when streaming AI responses?',
        options: ['It is not important', 'Frequent signal updates from each token can cause excessive change detection, so batching reduces DOM updates', 'Batching prevents HTTP errors', 'Batching is only for WebSockets'],
        correctIndex: 1,
        explanation: 'Streaming AI tokens can fire hundreds of updates per second. Batching groups updates to reduce change detection cycles and improve performance.'
      },
      {
        id: 3,
        question: 'What is the benefit of a conversation history service?',
        options: ['It replaces the AI API', 'It persists conversations across navigation and manages multiple chat threads', 'It only stores the last message', 'It handles form validation'],
        correctIndex: 1,
        explanation: 'A conversation history service stores messages for each chat thread, allowing users to switch between conversations without losing context.'
      }
    ],
    topics: [
      { id: 'chat-ui', title: 'AI Chat Interface', content: '**Practice - Chat Component:**\n```typescript\n@Component({})\nexport class AiChatComponent {\n  messages = signal<ChatMessage[]>([\n    { role: \'assistant\', content: \'Hello! How can I help you today?\' }\n  ]);\n  input = signal(\'\');\n  isStreaming = signal(false);\n\n  async sendMessage() {\n    const userMessage = this.input();\n    if (!userMessage.trim()) return;\n\n    this.messages.update(msgs => [...msgs, { role: \'user\', content: userMessage }]);\n    this.input.set(\'\');\n    this.isStreaming.set(true);\n\n    // Stream AI response\n    let aiResponse = \'\';\n    this.aiService.streamChat(this.messages()).subscribe({\n      next: (chunk) => {\n        aiResponse += chunk;\n        this.messages.update(msgs => {\n          const updated = [...msgs];\n          const last = updated[updated.length - 1];\n          if (last.role === \'assistant\') {\n            last.content = aiResponse;\n          } else {\n            updated.push({ role: \'assistant\', content: aiResponse });\n          }\n          return updated;\n        });\n      },\n      complete: () => this.isStreaming.set(false)\n    });\n  }\n}\n```' },
      { id: 'streaming-ui', title: 'Streaming UI Patterns', content: '**Practice - Typing Indicator:**\n```html\n@if (isStreaming()) {\n  <div class="typing-indicator">\n    <span class="dot"></span>\n    <span class="dot"></span>\n    <span class="dot"></span>\n  </div>\n}\n\n@for (message of messages(); track $index) {\n  <div class="message" [class.user]="message.role === \'user\'">\n    {{ message.content }}\n  </div>\n}\n```' },
      { id: 'ai-state', title: 'AI State Management', content: '**Practice - AI State Service:**\n```typescript\n@Injectable({ providedIn: \'root\' })\nexport class AiStateService {\n  private conversations = signal<Map<string, ChatMessage[]>>(new Map());\n  private currentConversation = signal<string | null>(null);\n\n  readonly messages = computed(() => {\n    const id = this.currentConversation();\n    return id ? this.conversations().get(id) || [] : [];\n  });\n\n  createConversation() {\n    const id = crypto.randomUUID();\n    this.conversations.update(map => {\n      const newMap = new Map(map);\n      newMap.set(id, []);\n      return newMap;\n    });\n    this.currentConversation.set(id);\n    return id;\n  }\n}\n```' }
    ]
  }
];
