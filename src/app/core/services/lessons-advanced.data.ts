import { Lesson } from '../models/lesson.model';

export const ADVANCED_LESSONS: Lesson[] = [
  {
    id: 20, slug: 'state-ngrx', title: 'State Management & NgRx',
    description: 'Master state management patterns including NgRx.',
    level: 'advanced', duration: '50 min',
    objectives: ['Manage state with services', 'Implement NgRx', 'Understand store patterns'],
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
    topics: [
      { id: 'chat-ui', title: 'AI Chat Interface', content: '**Practice - Chat Component:**\n```typescript\n@Component({})\nexport class AiChatComponent {\n  messages = signal<ChatMessage[]>([\n    { role: \'assistant\', content: \'Hello! How can I help you today?\' }\n  ]);\n  input = signal(\'\');\n  isStreaming = signal(false);\n\n  async sendMessage() {\n    const userMessage = this.input();\n    if (!userMessage.trim()) return;\n\n    this.messages.update(msgs => [...msgs, { role: \'user\', content: userMessage }]);\n    this.input.set(\'\');\n    this.isStreaming.set(true);\n\n    // Stream AI response\n    let aiResponse = \'\';\n    this.aiService.streamChat(this.messages()).subscribe({\n      next: (chunk) => {\n        aiResponse += chunk;\n        this.messages.update(msgs => {\n          const updated = [...msgs];\n          const last = updated[updated.length - 1];\n          if (last.role === \'assistant\') {\n            last.content = aiResponse;\n          } else {\n            updated.push({ role: \'assistant\', content: aiResponse });\n          }\n          return updated;\n        });\n      },\n      complete: () => this.isStreaming.set(false)\n    });\n  }\n}\n```' },
      { id: 'streaming-ui', title: 'Streaming UI Patterns', content: '**Practice - Typing Indicator:**\n```html\n@if (isStreaming()) {\n  <div class="typing-indicator">\n    <span class="dot"></span>\n    <span class="dot"></span>\n    <span class="dot"></span>\n  </div>\n}\n\n@for (message of messages(); track $index) {\n  <div class="message" [class.user]="message.role === \'user\'">\n    {{ message.content }}\n  </div>\n}\n```' },
      { id: 'ai-state', title: 'AI State Management', content: '**Practice - AI State Service:**\n```typescript\n@Injectable({ providedIn: \'root\' })\nexport class AiStateService {\n  private conversations = signal<Map<string, ChatMessage[]>>(new Map());\n  private currentConversation = signal<string | null>(null);\n\n  readonly messages = computed(() => {\n    const id = this.currentConversation();\n    return id ? this.conversations().get(id) || [] : [];\n  });\n\n  createConversation() {\n    const id = crypto.randomUUID();\n    this.conversations.update(map => {\n      const newMap = new Map(map);\n      newMap.set(id, []);\n      return newMap;\n    });\n    this.currentConversation.set(id);\n    return id;\n  }\n}\n```' }
    ]
  }
];
