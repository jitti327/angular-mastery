import { Lesson } from '../models/lesson.model';

export const INTERMEDIATE_LESSONS: Lesson[] = [
  {
    id: 6, slug: 'rxjs-fundamentals', title: 'RxJS Fundamentals',
    description: 'Master RxJS observables, operators, and reactive patterns.',
    level: 'intermediate', duration: '45 min',
    objectives: ['Understand observables', 'Master pipeable operators', 'Handle errors in streams'],
    quiz: [
      {
        id: 1,
        question: 'What is a key difference between an Observable and a Promise?',
        options: ['Observables are eager, Promises are lazy', 'Observables are lazy (execute on subscribe), Promises are eager', 'Promises support multiple values, Observables do not', 'Observables cannot be cancelled'],
        correctIndex: 1,
        explanation: 'Observables are lazy—they only execute when subscribed. Promises execute immediately (eagerly).'
      },
      {
        id: 2,
        question: 'Which operator should you use for a search input to cancel previous requests?',
        options: ['mergeMap', 'switchMap', 'concatMap', 'exhaustMap'],
        correctIndex: 1,
        explanation: 'switchMap cancels the previous inner observable when a new value arrives, making it ideal for search inputs.'
      },
      {
        id: 3,
        question: 'What does distinctUntilChanged() do?',
        options: ['Removes duplicates from an array', 'Filters out consecutive identical values', 'Sorts values by uniqueness', 'Throttles emissions'],
        correctIndex: 1,
        explanation: 'distinctUntilChanged() only emits when the current value is different from the previous value.'
      }
    ],
    topics: [
      { id: 'observables', title: 'Observables vs Promises', content: '**Observable:**\n- Lazy: Executes only when subscribed\n- Cancellable via Subscription\n- Multiple values over time\n\n**Promise:**\n- Eager: Executes immediately\n- Single value, not cancellable\n\n**Practice - Create Observable:**\n```typescript\nconst obs$ = of(1, 2, 3);\nconst fromArray$ = from([1, 2, 3]);\nconst interval$ = interval(1000);\nconst subject$ = new Subject<string>();\nsubject$.next(\'hello\');\n```' },
      { id: 'operators', title: 'Essential Pipeable Operators', content: '**Practice - Search with Debounce:**\n```typescript\nthis.searchControl.valueChanges\n  .pipe(\n    debounceTime(300),\n    distinctUntilChanged(),\n    filter(term => term.length >= 3),\n    switchMap(term => this.searchService.search(term))\n  )\n  .subscribe(results => this.results = results);\n```\n\n**Operators Cheat Sheet:**\n- map: Transform value\n- switchMap: Cancel previous (search)\n- mergeMap: Run parallel (fire-and-forget)\n- concatMap: Sequential (order matters)\n- exhaustMap: Ignore new (submit button)' },
      { id: 'error-handling', title: 'Error Handling in RxJS', content: '**Practice - Retry Pattern:**\n```typescript\nthis.http.get(\'/api/data\').pipe(\n  retry(3),\n  catchError(error => {\n    console.error(\'Error:\', error);\n    return of([]);\n  })\n).subscribe(data => this.data = data);\n```' }
    ]
  },
  {
    id: 7, slug: 'rxjs-advanced', title: 'RxJS Advanced Patterns',
    description: 'Advanced RxJS patterns and custom operators.',
    level: 'intermediate', duration: '40 min',
    objectives: ['Create custom operators', 'Master switchMap/mergeMap', 'Understand multicasting'],
    quiz: [
      {
        id: 1,
        question: 'Which operator runs all inner observables in parallel without cancelling?',
        options: ['switchMap', 'concatMap', 'mergeMap', 'exhaustMap'],
        correctIndex: 2,
        explanation: 'mergeMap runs all inner observables in parallel and does not cancel previous ones, making it suitable for fire-and-forget operations.'
      },
      {
        id: 2,
        question: 'What does shareReplay({ bufferSize: 1, refCount: true }) do?',
        options: ['Replays all past values', 'Caches the last value and replays it to new subscribers while tracking active subscribers', 'Throttles emissions', 'Deduplicates values'],
        correctIndex: 1,
        explanation: 'shareReplay with bufferSize: 1 caches the most recent value and refCount: true unsubscribes from the source when there are no active subscribers.'
      },
      {
        id: 3,
        question: 'Which operator ignores new emissions while processing the current one?',
        options: ['switchMap', 'mergeMap', 'concatMap', 'exhaustMap'],
        correctIndex: 3,
        explanation: 'exhaustMap ignores new inner observable emissions while the previous one is still in progress, which is useful for preventing double-click submissions.'
      }
    ],
    topics: [
      { id: 'map-switch', title: 'map vs switchMap vs mergeMap', content: '**Practice - Choose the Right Operator:**\n\n**switchMap (Search):**\n- Cancels previous request\n- Only latest result matters\n\n**mergeMap (Fire-and-forget):**\n- Runs all in parallel\n- Good for non-blocking operations\n\n**concatMap (Sequential):**\n- Preserves order\n- Good for sequential API calls\n\n**exhaustMap (Submit):**\n- Ignores new while processing\n- Prevents double-click submissions' },
      { id: 'multicasting', title: 'Multicasting with shareReplay', content: '**Practice - Avoid Multiple HTTP Calls:**\n```typescript\n// BAD: Triggers 3 HTTP calls\nthis.data$ = this.http.get(\'/api/data\');\n\n// GOOD: Triggers 1 HTTP call\nthis.data$ = this.http.get(\'/api/data\').pipe(\n  shareReplay({ bufferSize: 1, refCount: true })\n);\n```' },
      { id: 'custom-operators', title: 'Custom Operators', content: '**Practice - Log Timestamp Operator:**\n```typescript\nexport function logWithTimestamp<T>() {\n  return (source: Observable<T>) => \n    source.pipe(\n      tap(value => console.log(`[${new Date().toISOString()}]`, value))\n    );\n}\n\n// Usage\nthis.data$.pipe(\n  logWithTimestamp(),\n  map(data => data.filter(item => item.active))\n).subscribe();\n```' }
    ]
  },
  {
    id: 8, slug: 'signals', title: 'Angular Signals',
    description: 'Master Angular Signals - the future of reactivity.',
    level: 'intermediate', duration: '40 min',
    objectives: ['Create and use signals', 'Understand computed signals', 'Master effects'],
    quiz: [
      {
        id: 1,
        question: 'How do you read the value of a signal?',
        options: ['signal.value', 'signal()', 'signal.get()', 'signal.value()'],
        correctIndex: 1,
        explanation: 'Signals are read by calling them as functions: signal(). This allows Angular to track dependencies.'
      },
      {
        id: 2,
        question: 'What does a computed signal do?',
        options: ['Triggers HTTP requests', 'Derives a value from other signals automatically', 'Stores data permanently', 'Handles user input'],
        correctIndex: 1,
        explanation: 'A computed signal derives its value from other signals and automatically updates when its dependencies change.'
      },
      {
        id: 3,
        question: 'When does an effect() execute?',
        options: ['Only on component creation', 'When any signal it reads changes', 'Only on user interaction', 'On every change detection cycle'],
        correctIndex: 1,
        explanation: 'An effect() runs whenever any signal it reads during its execution changes.'
      }
    ],
    topics: [
      { id: 'basics', title: 'Signal Basics', content: '**Practice - Counter Component:**\n```typescript\n@Component({})\nexport class CounterComponent {\n  count = signal(0);\n  double = computed(() => this.count() * 2);\n\n  increment() {\n    this.count.update(v => v + 1);\n  }\n\n  set() {\n    this.count.set(5);\n  }\n}\n```\n\n**Signal vs Variable:**\n- Signal: Tracks changes, triggers updates\n- Variable: Regular JavaScript variable\n- Always access signal value with ()' },
      { id: 'computed', title: 'Computed Signals', content: '**Practice - Derived Values:**\n```typescript\nexport class UserComponent {\n  firstName = signal(\'John\');\n  lastName = signal(\'Doe\');\n  fullName = computed(() => `${this.firstName()} ${this.lastName()}`);\n  initials = computed(() => \n    this.fullName().split(\' \').map(n => n[0]).join(\'\')\n  );\n}\n```' },
      { id: 'effects', title: 'Effects', content: '**Practice - Side Effects:**\n```typescript\n@Component({})\nexport class LoggerComponent {\n  count = signal(0);\n\n  constructor() {\n    effect(() => {\n      console.log(\'Count changed:\', this.count());\n      return () => console.log(\'Cleaning up\');\n    });\n  }\n}\n```' }
    ]
  },
  {
    id: 9, slug: 'routing', title: 'Routing Deep Dive',
    description: 'Master Angular routing including guards, resolvers, and lazy loading.',
    level: 'intermediate', duration: '35 min',
    objectives: ['Configure complex routes', 'Implement guards', 'Use resolvers'],
    quiz: [
      {
        id: 1,
        question: 'What does loadComponent do in route configuration?',
        options: ['Eagerly loads the component module', 'Lazy-loads the component on demand', 'Preloads the component at startup', 'Creates a new instance per navigation'],
        correctIndex: 1,
        explanation: 'loadComponent uses dynamic import() to lazy-load a component only when the route is navigated to.'
      },
      {
        id: 2,
        question: 'What is the purpose of a route guard?',
        options: ['To protect routes with authentication/authorization logic', 'To cache route data', 'To pre-render routes', 'To add animations to routes'],
        correctIndex: 0,
        explanation: 'Route guards (like CanActivateFn) control access to routes based on conditions such as authentication status.'
      },
      {
        id: 3,
        question: 'What does a resolver do?',
        options: ['Transforms route parameters', 'Fetches data before the route activates', 'Cleans up data on route exit', 'Validates route URLs'],
        correctIndex: 1,
        explanation: 'A resolver fetches and provides data to the route before it activates, ensuring data is ready when the component loads.'
      }
    ],
    topics: [
      { id: 'configuration', title: 'Route Configuration', content: '**Practice - Lazy Loading:**\n```typescript\nconst routes: Routes = [\n  { path: \'users\', loadComponent: () => \n    import(\'./users/users.component\').then(m => m.UsersComponent) \n  }\n];\n```' },
      { id: 'guards', title: 'Route Guards', content: '**Practice - Auth Guard:**\n```typescript\nexport const authGuard: CanActivateFn = (route, state) => {\n  const authService = inject(AuthService);\n  const router = inject(Router);\n\n  if (authService.isLoggedIn()) {\n    return true;\n  }\n  return router.createUrlTree([\'/login\']);\n};\n```' },
      { id: 'resolvers', title: 'Resolvers', content: '**Practice - Data Resolver:**\n```typescript\nexport const userResolver: ResolveFn<User> = (route) => {\n  const userService = inject(UserService);\n  return userService.getUser(route.params[\'id\']);\n};\n```' }
    ]
  },
  {
    id: 10, slug: 'forms', title: 'Forms Deep Dive',
    description: 'Master reactive forms, validators, and Signal Forms.',
    level: 'intermediate', duration: '45 min',
    objectives: ['Build complex forms', 'Create custom validators', 'Understand Signal Forms'],
    quiz: [
      {
        id: 1,
        question: 'What is the main difference between template-driven and reactive forms?',
        options: ['Template-driven uses TypeScript, reactive uses HTML', 'Template-driven uses HTML, reactive uses TypeScript for form logic', 'There is no difference', 'Reactive forms are only for simple forms'],
        correctIndex: 1,
        explanation: 'Template-driven forms define validation and logic in the template with ngModel. Reactive forms define form models in TypeScript with FormControl and FormGroup.'
      },
      {
        id: 2,
        question: 'What does a custom ValidatorFn return when valid?',
        options: ['true', 'null', 'false', 'undefined'],
        correctIndex: 1,
        explanation: 'A ValidatorFn returns null when the control value is valid, and an error object when invalid.'
      },
      {
        id: 3,
        question: 'What is the purpose of Signal Forms?',
        options: ['Replace reactive forms entirely', 'Provide signal-based form APIs for reactive updates', 'Only work with template-driven forms', 'Handle file uploads'],
        correctIndex: 1,
        explanation: 'Signal Forms use Angular signals to provide reactive form state that integrates with the new reactivity model.'
      }
    ],
    topics: [
      { id: 'reactive', title: 'Reactive Forms', content: '**Practice - Complex Form:**\n```typescript\n@Component({})\nexport class UserFormComponent {\n  userForm = new FormGroup({\n    name: new FormControl(\'\', [\n      Validators.required,\n      Validators.minLength(3)\n    ]),\n    email: new FormControl(\'\', [\n      Validators.required,\n      Validators.email\n    ])\n  });\n\n  onSubmit() {\n    if (this.userForm.valid) {\n      console.log(this.userForm.value);\n    }\n  }\n}\n```' },
      { id: 'validators', title: 'Custom Validators', content: '**Practice - Forbidden Name Validator:**\n```typescript\nexport function forbiddenNameValidator(forbidden: string): ValidatorFn {\n  return (control: AbstractControl): ValidationErrors | null => {\n    const isForbidden = control.value === forbidden;\n    return isForbidden ? { forbidden: { value: control.value } } : null;\n  };\n}\n```' },
      { id: 'signal-forms', title: 'Signal Forms (Angular 22)', content: '**Practice - Signal-Based Forms:**\n```typescript\nimport { form, field, required, email } from \'@angular/forms/signals\';\n\n@Component({})\nexport class UserFormComponent {\n  userForm = form({\n    name: field(\'\', { validators: [required()] }),\n    email: field(\'\', { validators: [required(), email()] })\n  });\n}\n```' }
    ]
  },
  {
    id: 11, slug: 'http', title: 'HTTP & Interceptors',
    description: 'Master HTTP client and interceptors.',
    level: 'intermediate', duration: '35 min',
    objectives: ['Make HTTP requests', 'Handle errors', 'Implement interceptors'],
    quiz: [
      {
        id: 1,
        question: 'What does an HTTP interceptor do?',
        options: ['Validates form inputs', 'Modifies outgoing HTTP requests and incoming responses', 'Catches JavaScript errors', 'Manages authentication tokens locally'],
        correctIndex: 1,
        explanation: 'Interceptors can add headers, log requests, handle errors, or modify any aspect of HTTP communication before it leaves the app or after it arrives.'
      },
      {
        id: 2,
        question: 'How do you clone an HttpRequest to add headers?',
        options: ['req.headers.append()', 'req.clone({ setHeaders: {...} })', 'req.addHeader()', 'Object.assign(req, {headers})'],
        correctIndex: 1,
        explanation: 'HttpRequests are immutable. You must use req.clone() with the new configuration to modify them.'
      },
      {
        id: 3,
        question: 'What is the purpose of retry() in RxJS?',
        options: ['To log errors', 'To automatically retry failed HTTP requests', 'To cache responses', 'To throttle requests'],
        correctIndex: 1,
        explanation: 'retry() automatically resubscribes to the source observable when it errors, attempting the request again.'
      }
    ],
    topics: [
      { id: 'basics', title: 'HTTP Client', content: '**Practice - CRUD Operations:**\n```typescript\nexport class ApiService {\n  constructor(private http: HttpClient) {}\n\n  getUsers(): Observable<User[]> {\n    return this.http.get<User[]>(\'/api/users\');\n  }\n\n  createUser(user: User): Observable<User> {\n    return this.http.post<User>(\'/api/users\', user);\n  }\n}\n```' },
      { id: 'interceptors', title: 'Interceptors', content: '**Practice - Auth Interceptor:**\n```typescript\nexport const authInterceptor: HttpInterceptorFn = (req, next) => {\n  const authService = inject(AuthService);\n  const token = authService.getToken();\n\n  if (token) {\n    req = req.clone({\n      setHeaders: { Authorization: `Bearer ${token}` }\n    });\n  }\n\n  return next(req);\n};\n```' },
      { id: 'error-handling', title: 'HTTP Error Handling', content: '**Practice - Error Handler:**\n```typescript\nexport class ApiService {\n  getUsers(): Observable<User[]> {\n    return this.http.get<User[]>(\'/api/users\').pipe(\n      retry(2),\n      catchError(this.handleError<User[]>([]))\n    );\n  }\n}\n```' }
    ]
  },
  {
    id: 12, slug: 'component-communication', title: 'Component Communication',
    description: 'Master all patterns for component interaction.',
    level: 'intermediate', duration: '35 min',
    objectives: ['Use inputs/outputs effectively', 'Share state via services'],
    quiz: [
      {
        id: 1,
        question: 'What is the modern signal-based way to define an input?',
        options: ['@Input()', 'input()', 'input.required()', 'Both input() and input.required()'],
        correctIndex: 3,
        explanation: 'Both input() for optional inputs and input.required<T>() for required inputs are the modern signal-based alternatives to @Input() decorator.'
      },
      {
        id: 2,
        question: 'How do you share state between unrelated components?',
        options: ['Use @Input/@Output', 'Use a shared service with signals', 'Use localStorage only', 'Use EventEmitter'],
        correctIndex: 1,
        explanation: 'A shared injectable service with signals provides a centralized state that any component can inject and use.'
      },
      {
        id: 3,
        question: 'What does ng-content do?',
        options: ['Projects child content into the component template', 'Creates a new component', 'Handles form submissions', 'Manages route data'],
        correctIndex: 0,
        explanation: 'ng-content is used for content projection, allowing parent components to insert content into designated slots of a child component.'
      }
    ],
    topics: [
      { id: 'io', title: 'Input/Output Patterns', content: '**Practice - Input Signals:**\n```typescript\n@Component({})\nexport class UserCardComponent {\n  user = input.required<User>();\n  editable = input(false);\n  displayUser = computed(() => this.user().name);\n}\n```\n\n**Practice - Output Signals:**\n```typescript\n@Component({})\nexport class UserCardComponent {\n  userDeleted = output<User>();\n  onDelete() {\n    this.userDeleted.emit(this.user());\n  }\n}\n```' },
      { id: 'content-child', title: 'Content Projection', content: '**Practice - Card Component:**\n```typescript\n@Component({\n  selector: \'app-card\',\n  template: `\n    <div class="card">\n      <ng-content select="[card-header]"></ng-content>\n      <ng-content></ng-content>\n      <ng-content select="[card-footer]"></ng-content>\n    </div>\n  `\n})\nexport class CardComponent {}\n```' },
      { id: 'state-service', title: 'Shared State via Services', content: '**Practice - Signal-Based State:**\n```typescript\n@Injectable({ providedIn: \'root\' })\nexport class UserStateService {\n  private users = signal<User[]>([]);\n  readonly userList = this.users.asReadonly();\n\n  addUser(user: User) {\n    this.users.update(list => [...list, user]);\n  }\n}\n```' }
    ]
  },
  {
    id: 13, slug: 'content-projection', title: 'Advanced Content Projection',
    description: 'Master content projection patterns and ContentChild.',
    level: 'intermediate', duration: '30 min',
    objectives: ['Use ng-content effectively', 'Use ContentChild/ContentChildren'],
    quiz: [
      {
        id: 1,
        question: 'What does the select attribute on ng-content do?',
        options: ['Selects a CSS element', 'Projects content matching a CSS selector into that slot', 'Selects a component to render', 'Filters DOM elements'],
        correctIndex: 1,
        explanation: 'The select attribute uses CSS selectors to match and project specific content fragments into designated slots.'
      },
      {
        id: 2,
        question: 'What is ContentChildren used for?',
        options: ['Creating child components', 'Querying projected content (ng-content) from the parent', 'Managing route children', 'Handling DOM children'],
        correctIndex: 1,
        explanation: 'ContentChildren (or the signal-based equivalent) allows a component to access and interact with content that was projected into it via ng-content.'
      },
      {
        id: 3,
        question: 'What does ng-template enable?',
        options: ['Creating inline templates', 'Defining reusable template fragments that can be instantiated dynamically', 'Downloading external templates', 'Compiling templates ahead of time'],
        correctIndex: 1,
        explanation: 'ng-template defines a template that is not rendered directly but can be instantiated with ngTemplateOutlet or ViewContainerRef.'
      }
    ],
    topics: [
      { id: 'ng-content', title: 'ng-content Deep Dive', content: '**Practice - Dialog Component:**\n```typescript\n@Component({\n  selector: \'app-dialog\',\n  template: `\n    <div class="dialog">\n      <div class="header">\n        <ng-content select="[dialog-title]"></ng-content>\n      </div>\n      <div class="body">\n        <ng-content></ng-content>\n      </div>\n      <div class="footer">\n        <ng-content select="[dialog-actions]"></ng-content>\n      </div>\n    </div>\n  `\n})\nexport class DialogComponent {}\n```' },
      { id: 'contentchild', title: 'ContentChild & ContentChildren', content: '**Practice - Tabs Component:**\n```typescript\n@Component({})\nexport class TabsComponent {\n  @ContentChildren(TabComponent) tabs!: QueryList<TabComponent>;\n  \n  ngAfterContentInit() {\n    this.tabs.forEach(tab => console.log(tab.title));\n  }\n}\n```' },
      { id: 'dynamic', title: 'Dynamic Content Projection', content: '**Practice - ngTemplateOutlet:**\n```typescript\n@Component({})\nexport class TableComponent {\n  @Input() data: any[] = [];\n  @Input() columns: string[] = [];\n  @ContentChild(\'cellTemplate\') cellTemplate!: TemplateRef<any>;\n}\n```' }
    ]
  },
  {
    id: 14, slug: 'pipes-advanced', title: 'Advanced Pipes',
    description: 'Create complex pipes and understand pipe performance.',
    level: 'intermediate', duration: '25 min',
    objectives: ['Create async pipes', 'Build complex pipes'],
    quiz: [
      {
        id: 1,
        question: 'What does the async pipe do?',
        options: ['Makes asynchronous API calls', 'Unsubscribes from Observables/Promises automatically', 'Converts synchronous to asynchronous', 'Creates async/await syntax'],
        correctIndex: 1,
        explanation: 'The async pipe automatically subscribes to Observables or Promises and unsubscribes when the component is destroyed, preventing memory leaks.'
      },
      {
        id: 2,
        question: 'What happens when a pipe is impure (pure: false)?',
        options: ['It runs only once', 'It runs on every change detection cycle', 'It is cached', 'It only works with signals'],
        correctIndex: 1,
        explanation: 'An impure pipe runs on every change detection cycle, which can impact performance but is necessary when the transformation depends on external state.'
      },
      {
        id: 3,
        question: 'How does the async pipe work with the new control flow?',
        options: ['It does not work with @for', 'You can use it with the "as" keyword to unwrap observables in templates', 'It only works in TypeScript', 'It requires manual unsubscribe'],
        correctIndex: 1,
        explanation: 'The async pipe can be combined with template syntax to unwrap observable values directly in templates, e.g., {{ users$ | async as users }}.'
      }
    ],
    topics: [
      { id: 'async', title: 'Async Pipe', content: '**Practice - Async Pipe:**\n```html\n<div>{{ users$ | async }}</div>\n\n<!-- With as -->\n<div>{{ users$ | async as users }}\n  @for (user of users; track user.id) {\n    <p>{{ user.name }}</p>\n  }\n</div>\n```' },
      { id: 'async-signal', title: 'Async Pipe with Signals', content: '**Practice - Signals and Async:**\n```typescript\n@Component({})\nexport class UserComponent {\n  users = signal<User[]>([]);\n  loading = signal(false);\n\n  constructor() {\n    effect(() => {\n      if (!this.loading()) {\n        this.userService.getUsers().subscribe(users => {\n          this.users.set(users);\n        });\n      }\n    });\n  }\n}\n```' },
      { id: 'pure-impure', title: 'Pure vs Impure Pipes', content: '**Practice - Impure Pipe:**\n```typescript\n@Pipe({ name: \'filter\', pure: false })\nexport class FilterPipe implements PipeTransform {\n  transform(items: any[], field: string, value: any): any[] {\n    return items.filter(item => item[field] === value);\n  }\n}\n```' }
    ]
  },
  {
    id: 15, slug: 'resource-api', title: 'Resource API',
    description: 'Master Angular Resource API for async data loading.',
    level: 'intermediate', duration: '35 min',
    objectives: ['Understand Resource API', 'Create resources', 'Handle loading states'],
    quiz: [
      {
        id: 1,
        question: 'What does the Resource API provide?',
        options: ['A replacement for HttpClient', 'A declarative way to manage async data loading with built-in states', 'A file management system', 'A caching-only mechanism'],
        correctIndex: 1,
        explanation: 'The Resource API provides a declarative way to load async data with built-in loading, error, and value states.'
      },
      {
        id: 2,
        question: 'How do you trigger a resource reload?',
        options: ['Call resource.reload()', 'Call resource.refetch()', 'Set the request signal to a new value', 'Both A and C'],
        correctIndex: 3,
        explanation: 'You can call resource.reload() to force a reload, or update the request signal to trigger a new fetch with different parameters.'
      },
      {
        id: 3,
        question: 'What states does a resource have?',
        options: ['Ready, Loading, Error', 'Idle, Loading, Success, Failure', 'Pending, Active, Resolved, Rejected', 'None, Started, Completed, Failed'],
        correctIndex: 0,
        explanation: 'A resource has isLoading(), error(), and value() states that you can check in templates to conditionally render loading, error, or data views.'
      }
    ],
    topics: [
      { id: 'basics', title: 'Resource API Basics', content: '**Practice - User Resource:**\n```typescript\nimport { resource } from \'@angular/core\';\n\n@Component({})\nexport class UserComponent {\n  userId = signal(1);\n\n  userResource = resource({\n    request: () => ({ id: this.userId() }),\n    loader: async ({ request }) => {\n      const response = await fetch(`/api/users/${request.id}`);\n      return response.json();\n    }\n  });\n}\n```' },
      { id: 'states', title: 'Resource States', content: '**Practice - Loading States:**\n```html\n@if (userResource.isLoading()) {\n  <spinner />\n} @else if (userResource.error(); as error) {\n  <error-message [error]="error" />\n} @else if (userResource.value(); as user) {\n  <user-card [user]="user" />\n}\n```' },
      { id: 'caching', title: 'Resource Caching', content: '**Practice - Cache Management:**\n```typescript\n// Automatic caching\nthis.userId.set(2); // New request\nthis.userId.set(2); // Uses cache\n\n// Force reload\nthis.userResource.reload();\n```' }
    ]
  },
  {
    id: 16, slug: 'component-interaction', title: 'Advanced Component Interaction',
    description: 'Master advanced patterns for component communication.',
    level: 'intermediate', duration: '35 min',
    objectives: ['Use ViewChild/ContentChild', 'Implement dynamic components'],
    quiz: [
      {
        id: 1,
        question: 'What is the difference between ViewChild and ContentChild?',
        options: ['ViewChild queries the template, ContentChild queries projected content', 'ViewChild queries projected content, ContentChild queries the template', 'There is no difference', 'ViewChild only works with signals'],
        correctIndex: 0,
        explanation: 'ViewChild accesses elements defined in the component\'s own template, while ContentChild accesses content projected into the component via ng-content.'
      },
      {
        id: 2,
        question: 'When is the child accessible via ViewChild?',
        options: ['In the constructor', 'In ngOnInit', 'In ngAfterViewInit', 'In ngOnChanges'],
        correctIndex: 2,
        explanation: 'ViewChild children are only available after the view has been initialized, which is when ngAfterViewInit runs.'
      },
      {
        id: 3,
        question: 'How do you dynamically load a component?',
        options: ['Use @Component decorator', 'Use ViewContainerRef.createComponent() with a dynamic import', 'Use ng-template', 'Use *ngIf'],
        correctIndex: 1,
        explanation: 'ViewContainerRef allows you to programmatically create and insert component instances at runtime using createComponent().'
      }
    ],
    topics: [
      { id: 'viewchild', title: 'ViewChild & ContentChild', content: '**Practice - ViewChild:**\n```typescript\n@Component({})\nexport class ParentComponent {\n  @ViewChild(ChildComponent) child!: ChildComponent;\n  @ViewChild(\'inputRef\') input!: ElementRef;\n\n  ngAfterViewInit() {\n    this.child.doSomething();\n  }\n}\n```' },
      { id: 'dynamic', title: 'Dynamic Components', content: '**Practice - Dynamic Loading:**\n```typescript\n@Component({})\nexport class ParentComponent {\n  @ViewChild(\'container\', { read: ViewContainerRef }) container!: ViewContainerRef;\n\n  async loadComponent() {\n    const { ChildComponent } = await import(\'./child.component\');\n    this.container.clear();\n    const componentRef = this.container.createComponent(ChildComponent);\n    componentRef.instance.data = this.data;\n  }\n}\n```' },
      { id: 'ng-template', title: 'ng-template & ng-container', content: '**Practice - ngTemplateOutlet:**\n```typescript\n@Component({})\nexport class UserListComponent {\n  users = signal<User[]>([]);\n}\n```' }
    ]
  },
  {
    id: 17, slug: 'template-driven-forms', title: 'Template-Driven Forms',
    description: 'Master template-driven forms approach.',
    level: 'intermediate', duration: '30 min',
    objectives: ['Create template-driven forms', 'Use built-in directives'],
    quiz: [
      {
        id: 1,
        question: 'What does ngModel do in template-driven forms?',
        options: ['Creates a form group', 'Provides two-way data binding and tracks form state', 'Validates form inputs only', 'Submits the form'],
        correctIndex: 1,
        explanation: 'ngModel creates an FormControl instance and provides two-way data binding between the form input and the component property.'
      },
      {
        id: 2,
        question: 'How do you access the form\'s valid state in a template-driven form?',
        options: ['myForm.valid', 'ngForm.valid via template reference variable', 'formModel.isValid', 'form.controls.valid'],
        correctIndex: 1,
        explanation: 'You can reference ngForm via a template variable (e.g., #userForm="ngForm") and access userForm.valid to check if the form passes all validations.'
      },
      {
        id: 3,
        question: 'What is the main disadvantage of template-driven forms?',
        options: ['They cannot validate inputs', 'Logic is spread across templates, harder to unit test', 'They only support one input', 'They cannot use ngModel'],
        correctIndex: 1,
        explanation: 'Template-driven forms keep logic in the template, making them harder to unit test compared to reactive forms where logic lives in TypeScript.'
      }
    ],
    topics: [
      { id: 'basics', title: 'Template-Driven Basics', content: '**Practice - Template-Driven Form:**\n```html\n<form #userForm="ngForm" (ngSubmit)="onSubmit(userForm)">\n  <input name="name" [(ngModel)]="user.name" required />\n  <button [disabled]="userForm.invalid">Submit</button>\n</form>\n```' },
      { id: 'validation', title: 'Validation', content: '**Practice - Displaying Errors:**\n```html\n<input #name="ngModel" name="name" required />\n@if (name.invalid && name.touched) {\n  <div class="error">Name is required</div>\n}\n```' },
      { id: 'custom-validators', title: 'Custom Validators', content: '**Practice - Forbidden Name Validator:**\n```typescript\n@Directive({\n  selector: \'[appForbiddenName]\',\n  standalone: true,\n  providers: [{\n    provide: NG_VALIDATORS,\n    useExisting: ForbiddenNameValidator,\n    multi: true\n  }]\n})\nexport class ForbiddenNameValidator implements Validator {\n  @Input(\'appForbiddenName\') forbiddenName = \'\';\n\n  validate(control: AbstractControl): ValidationErrors | null {\n    return control.value === this.forbiddenName \n      ? { forbidden: true } \n      : null;\n  }\n}\n```' }
    ]
  },
  {
    id: 18, slug: 'di-intermediate', title: 'DI Intermediate Patterns',
    description: 'Master intermediate dependency injection patterns.',
    level: 'intermediate', duration: '35 min',
    objectives: ['Use environment injectors', 'Create factory providers'],
    quiz: [
      {
        id: 1,
        question: 'What does multi: true do in a provider?',
        options: ['Provides the service in multiple modules', 'Allows multiple providers for the same token', 'Creates multiple instances', 'Enables multi-tab support'],
        correctIndex: 1,
        explanation: 'multi: true allows multiple providers to register under the same injection token, creating an array of all provided values.'
      },
      {
        id: 2,
        question: 'What is a factory provider?',
        options: ['A provider that uses a class directly', 'A provider that uses a factory function to create the service instance', 'A provider that only works in factories', 'A provider that creates child modules'],
        correctIndex: 1,
        explanation: 'A factory provider uses a useFactory function to dynamically create and return the service instance based on configuration.'
      },
      {
        id: 3,
        question: 'What does provideRouter() do?',
        options: ['Creates the HttpClient', 'Sets up the router with the application\'s routes', 'Provides route guards automatically', 'Creates a new module for routing'],
        correctIndex: 1,
        explanation: 'provideRouter() is a standalone provider function that sets up the Angular router with the specified routes and required services.'
      }
    ],
    topics: [
      { id: 'environment', title: 'Environment Injectors', content: '**Practice - provideRouter:**\n```typescript\nbootstrapApplication(AppComponent, {\n  providers: [\n    provideRouter(routes),\n    provideHttpClient(),\n    provideAnimations()\n  ]\n});\n```' },
      { id: 'factory', title: 'Factory Providers', content: '**Practice - Factory Functions:**\n```typescript\nexport function createLogger(config: AppConfig): Logger {\n  if (config.environment === \'production\') {\n    return new ProdLogger();\n  }\n  return new DevLogger();\n}\n\nproviders: [\n  {\n    provide: Logger,\n    useFactory: createLogger,\n    deps: [APP_CONFIG]\n  }\n]\n```' },
      { id: 'multi', title: 'Multi-Providers', content: '**Practice - Interceptors:**\n```typescript\nexport const HTTP_INTERCEPTORS = new InjectionToken<HttpInterceptor[]>(\'HTTP_INTERCEPTORS\');\n\nproviders: [\n  { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },\n  { provide: HTTP_INTERCEPTORS, useClass: LoggingInterceptor, multi: true }\n]\n```' }
    ]
  },
  {
    id: 19, slug: 'typescript-angular', title: 'TypeScript for Angular',
    description: 'Master TypeScript patterns used in Angular.',
    level: 'intermediate', duration: '35 min',
    objectives: ['Use generics', 'Master interfaces/types', 'Understand decorators'],
    quiz: [
      {
        id: 1,
        question: 'Why are generics useful in Angular services?',
        options: ['They make services faster', 'They allow services to work with any type, avoiding code duplication', 'They replace the need for interfaces', 'They enable lazy loading'],
        correctIndex: 1,
        explanation: 'Generics let you write a single service implementation that works with different types, like ApiService<User> or ApiService<Product>.'
      },
      {
        id: 2,
        question: 'What is the difference between an interface and a type in TypeScript?',
        options: ['There is no practical difference', 'Interfaces support declaration merging, types support unions and intersections', 'Types are faster than interfaces', 'Interfaces work only in Angular, types work everywhere'],
        correctIndex: 1,
        explanation: 'Interfaces support declaration merging (extending across files), while types support unions, intersections, and mapped types. Both are similar for most use cases.'
      },
      {
        id: 3,
        question: 'What does the @Log() decorator do when applied to a class?',
        options: ['Logs all HTTP requests', 'Executes a function when the class is instantiated, logging the class name', 'Adds logging to all methods', 'Replaces console.log'],
        correctIndex: 1,
        explanation: 'A class decorator receives the class constructor and can run side effects, such as logging when the class is created.'
      }
    ],
    topics: [
      { id: 'generics', title: 'Generics in Angular', content: '**Practice - Generic Service:**\n```typescript\n@Injectable({ providedIn: \'root\' })\nexport class ApiService<T> {\n  constructor(private http: HttpClient) {}\n\n  getAll(url: string): Observable<T[]> {\n    return this.http.get<T[]>(url);\n  }\n\n  create(url: string, item: T): Observable<T> {\n    return this.http.post<T>(url, item);\n  }\n}\n```\n\n**Usage:**\n```typescript\nuserApi = inject(ApiService<User>);\nproductApi = inject(ApiService<Product>);\n```' },
      { id: 'interfaces', title: 'Interfaces & Types', content: '**Practice - Defining Models:**\n```typescript\nexport interface User {\n  id: number;\n  name: string;\n  email: string;\n  role: \'admin\' | \'user\' | \'guest\';\n}\n\nexport type CreateUser = Omit<User, \'id\'>;\nexport type UpdateUser = Partial<User>;\n```' },
      { id: 'decorators', title: 'TypeScript Decorators', content: '**Practice - Custom Decorator:**\n```typescript\nfunction Log() {\n  return function (constructor: Function) {\n    console.log(`Created: ${constructor.name}`);\n  };\n}\n\n@Log()\nexport class MyComponent {}\n```' }
    ]
  }
];
