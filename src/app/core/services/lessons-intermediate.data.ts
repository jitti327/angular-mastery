import { Lesson } from '../models/lesson.model';

export const INTERMEDIATE_LESSONS: Lesson[] = [
  {
    id: 6, slug: 'rxjs-fundamentals', title: 'RxJS Fundamentals',
    description: 'Master RxJS observables, operators, and reactive patterns.',
    level: 'intermediate', duration: '45 min',
    objectives: ['Understand observables', 'Master pipeable operators', 'Handle errors in streams'],
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
    topics: [
      { id: 'generics', title: 'Generics in Angular', content: '**Practice - Generic Service:**\n```typescript\n@Injectable({ providedIn: \'root\' })\nexport class ApiService<T> {\n  constructor(private http: HttpClient) {}\n\n  getAll(url: string): Observable<T[]> {\n    return this.http.get<T[]>(url);\n  }\n\n  create(url: string, item: T): Observable<T> {\n    return this.http.post<T>(url, item);\n  }\n}\n```\n\n**Usage:**\n```typescript\nuserApi = inject(ApiService<User>);\nproductApi = inject(ApiService<Product>);\n```' },
      { id: 'interfaces', title: 'Interfaces & Types', content: '**Practice - Defining Models:**\n```typescript\nexport interface User {\n  id: number;\n  name: string;\n  email: string;\n  role: \'admin\' | \'user\' | \'guest\';\n}\n\nexport type CreateUser = Omit<User, \'id\'>;\nexport type UpdateUser = Partial<User>;\n```' },
      { id: 'decorators', title: 'TypeScript Decorators', content: '**Practice - Custom Decorator:**\n```typescript\nfunction Log() {\n  return function (constructor: Function) {\n    console.log(`Created: ${constructor.name}`);\n  };\n}\n\n@Log()\nexport class MyComponent {}\n```' }
    ]
  }
];
