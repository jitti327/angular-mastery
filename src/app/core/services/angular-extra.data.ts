import { Lesson } from '../models/lesson.model';

export const ANGULAR_EXTRA_LESSONS: Lesson[] = [
  {
    id: 48,
    slug: 'angular-testing-unit',
    title: 'Unit Testing in Angular',
    description: 'Master unit testing with Angular\'s TestBed and writing effective tests.',
    level: 'intermediate',
    duration: '45 min',
    objectives: [
      'Configure TestBed for component and service testing',
      'Use ComponentFixture to interact with component instances',
      'Write meaningful unit tests with proper assertions'
    ],
    quiz: [
      {
        id: 1,
        question: 'What does TestBed.configureTestingModule do?',
        options: [
          'Creates a test module based on configuration',
          'Compiles the component immediately',
          'Injects dependencies into the test',
          'Runs the Angular change detection'
        ],
        correctIndex: 0,
        explanation: 'TestBed.configureTestingModule creates a dynamic module that mimics your module for testing purposes.'
      },
      {
        id: 2,
        question: 'How do you access the component instance from a fixture?',
        options: [
          'fixture.componentInstance',
          'fixture.instance',
          'fixture.nativeElement',
          'fixture.debugElement.componentInstance'
        ],
        correctIndex: 0,
        explanation: 'fixture.componentInstance gives direct access to the component instance for testing.'
      },
      {
        id: 3,
        question: 'What is the purpose of detectChanges()?',
        options: [
          'Triggers Angular change detection manually',
          'Detects all DOM elements',
          'Finds all components in the view',
          'Runs the HTTP interceptors'
        ],
        correctIndex: 0,
        explanation: 'detectChanges() triggers Angular\'s change detection cycle to update the view.'
      }
    ],
    topics: [
      {
        id: 'testbed-setup',
        title: 'TestBed Configuration',
        content: 'TestBed is Angular\'s primary testing utility for configuring and initializing the testing module. It creates a dynamic module that mimics your AppModule for testing purposes. To configure TestBed, call TestBed.configureTestingModule with a module definition that mirrors your application module. You can import other modules, declare components, and provide services. TestBed.resetTestingModule should be called between tests to ensure isolation. TestBed.compileComponents is needed for testing components with external templates when not using a bundler. The configuration is created fresh for each test to prevent state leakage between test cases. You can override providers to inject test doubles and override modules to provide mock dependencies.'
      },
      {
        id: 'component-fixture',
        title: 'ComponentFixture Usage',
        content: 'ComponentFixture is a test wrapper around the component being tested. It provides access to the component instance, the native element, and the debug element. The componentInstance property gives you direct access to the component class instance for testing methods and properties. The nativeElement property provides access to the root DOM element for querying. The debugElement property wraps the native element with debugging utilities. After calling detectChanges, the component view is updated and you can inspect the rendered output. The whenStable method resolves when all async operations complete. You can override component inputs using componentRef.setInput and override outputs by subscribing to componentRef.output.'
      },
      {
        id: 'writing-tests',
        title: 'Writing Effective Tests',
        content: 'Effective unit tests follow the Arrange-Act-Assert pattern. First set up the test environment with TestBed.configureTestingModule, declare the component, and provide mock services. Then create the fixture and component instance. Act by calling component methods or simulating user interactions. Assert that the expected results occur using Jasmine matchers. Use spy objects to mock service calls and verify interactions. Test both synchronous and asynchronous scenarios. For async tests use async-await or fakeAsync with tick for timer-based operations. Keep tests focused on one behavior each. Name tests descriptively to document what behavior is being verified. Avoid testing implementation details and focus on observable outcomes.'
      }
    ]
  },
  {
    id: 49,
    slug: 'angular-testing-integration',
    title: 'Integration Testing',
    description: 'Learn to test component interactions, HTTP calls, and routing together.',
    level: 'advanced',
    duration: '55 min',
    objectives: [
      'Test HTTP calls with HttpClientTestingModule',
      'Test routing with RouterTestingModule',
      'Test reactive and template-driven forms'
    ],
    quiz: [
      {
        id: 1,
        question: 'How do you mock HTTP calls in Angular tests?',
        options: [
          'HttpClientTestingModule with HttpTestingController',
          'HttpClientMock from @angular/common/http',
          'Using fetch API mocking',
          'With a real HTTP backend'
        ],
        correctIndex: 0,
        explanation: 'HttpClientTestingModule provides HttpTestingController to intercept and verify HTTP requests.'
      },
      {
        id: 2,
        question: 'What does RouterTestingModule provide?',
        options: [
          'A test router with configurable navigation',
          'A real router that navigates',
          'A mock for all routing services',
          'A URL parsing utility'
        ],
        correctIndex: 0,
        explanation: 'RouterTestingModule sets up a test router that can simulate navigation and verify route parameters.'
      },
      {
        id: 3,
        question: 'Which utility tests form validation in Angular?',
        options: [
          'TestBed with FormsModule and ReactiveFormsModule',
          'FormTestUtil from @angular/forms',
          'NgFormValidator',
          'FormControlTestingModule'
        ],
        correctIndex: 0,
        explanation: 'Configure TestBed with the appropriate form module and test validation by setting control values and checking errors.'
      }
    ],
    topics: [
      {
        id: 'http-testing',
        title: 'HTTP Testing',
        content: 'Integration testing of HTTP calls requires HttpClientTestingModule. Import HttpClientTestingModule in your TestBed configuration to replace the real HTTP backend. After making HTTP calls in your component or service, use HttpTestingController to intercept them. Call httpTestingController.expectOne with the URL to verify the request was made. Use flush or flushOne to complete pending requests. Call httpTestingController.verify in afterEach to ensure no unexpected requests were made. You can simulate error responses using the error method. For multiple requests, use expectNone or match patterns to handle batch operations. Always verify the request method, headers, and body to ensure correct API usage.'
      },
      {
        id: 'router-testing',
        title: 'Router Testing',
        content: 'RouterTestingModule provides a complete testing environment for Angular routing. Configure TestBed with RouterTestingModule and pass initial navigation routes. You can test navigation by calling router.navigate and verifying the component rendered. Use ActivatedRoute mock to test route parameters by providing snapshot data. Spy on router.navigate to verify navigation calls without actually navigating. For guards, provide mock services and test the guard function directly. Test resolver functions by setting up the router with the resolver route and verifying resolved data. Mock child routes to isolate parent component testing. Use location service from RouterTestingModule to verify URL changes after navigation events.'
      },
      {
        id: 'form-testing',
        title: 'Form Testing',
        content: 'Testing Angular forms involves setting form control values and verifying validation states. For reactive forms, create the form in the test and set control values using the setValue or patchValue methods. Access form errors through formGroup.get returns and check the errors object. For template-driven forms, use fixture.detectChanges to trigger form binding then query the DOM for form controls. Dispatch input events to simulate user typing. Verify form submission by triggering the submit event and checking the component handler was called. Test asynchronous validators by waiting for promises to resolve. Use form control statusChanges observable to verify validation state transitions.'
      }
    ]
  },
  {
    id: 50,
    slug: 'angular-testing-e2e',
    title: 'E2E Testing',
    description: 'Set up and write end-to-end tests with Playwright for Angular applications.',
    level: 'advanced',
    duration: '50 min',
    objectives: [
      'Set up Playwright for Angular E2E testing',
      'Create page objects for test organization',
      'Integrate E2E tests into CI/CD pipelines'
    ],
    quiz: [
      {
        id: 1,
        question: 'What command initializes Playwright in an Angular project?',
        options: [
          'npx playwright install',
          'ng add @playwright/test',
          'npm install playwright',
          'ng e2e --playwright'
        ],
        correctIndex: 1,
        explanation: 'ng add @playwright/test installs and configures Playwright for Angular projects.'
      },
      {
        id: 2,
        question: 'What is a page object in E2E testing?',
        options: [
          'A class that encapsulates page selectors and actions',
          'An HTML page fixture',
          'A Playwright configuration file',
          'A type of test runner'
        ],
        correctIndex: 0,
        explanation: 'Page objects encapsulate page-specific selectors and actions to improve test maintainability.'
      },
      {
        id: 3,
        question: 'How do you run Playwright tests in CI?',
        options: [
          'Use npx playwright test command in your pipeline',
          'Run the Angular dev server manually',
          'Use a browser extension',
          'Cannot run Playwright in CI'
        ],
        correctIndex: 0,
        explanation: 'The npx playwright test command runs E2E tests and can be integrated into any CI/CD pipeline.'
      }
    ],
    topics: [
      {
        id: 'playwright-setup',
        title: 'Playwright Setup',
        content: 'Playwright provides reliable end-to-end testing for Angular applications. Install it using ng add @playwright/test which sets up configuration and dependencies. The playwright.config.ts file defines test directory, browsers, and web server settings. Configure the webServer option to start your Angular dev server before tests run. Set baseURL to point to your development server URL. Define browser projects for Chromium, Firefox, and WebKit to test cross-browser compatibility. Use the testDir option to specify where your test files are located. Configure screenshots and video recording for debugging failed tests. Set timeouts appropriately for your application. Run npx playwright install to download browser binaries.'
      },
      {
        id: 'page-objects',
        title: 'Page Object Pattern',
        content: 'The page object pattern separates test logic from page structure. Create a class for each major page that encapsulates selectors and interactions. Define locators as properties using getByRole, getByText, or CSS selectors. Implement methods for common actions like login, search, or navigation. Keep assertions in the test file not in page objects. Page objects should return new page objects when navigation occurs. Use Playwright Locator API for auto-waiting and retry capabilities. Group related actions into meaningful methods that represent user workflows. Inherit common page functionality from a base class. Page objects make tests more maintainable when the UI changes because you only update selectors in one place.'
      },
      {
        id: 'ci-integration',
        title: 'CI/CD Integration',
        content: 'Integrating Playwright into CI/CD ensures E2E tests run on every code change. Start by configuring the playwright.config.ts with CI-specific settings like increased timeouts. Use the --reporter option to generate JUnit XML reports for CI systems. Install Playwright browsers as a CI step using npx playwright install --with-deps. Configure your CI to start the application server before running tests. Use GitHub Actions workflow with actions/setup-node and actions/install-playwright. Cache the Playwright browser directory to speed up CI runs. Set parallel test execution to reduce total test time. Configure test retries for flaky tests in CI environments. Publish test reports as artifacts for debugging failures.'
      }
    ]
  },
  {
    id: 51,
    slug: 'angular-ssr-hydration',
    title: 'SSR and Hydration',
    description: 'Understand server-side rendering and the hydration process in Angular.',
    level: 'advanced',
    duration: '50 min',
    objectives: [
      'Configure Angular Universal for server-side rendering',
      'Understand the hydration process and its benefits',
      'Use transfer state to avoid duplicate HTTP calls'
    ],
    quiz: [
      {
        id: 1,
        question: 'What does Angular hydration do?',
        options: [
          'Reuses server-rendered DOM and attaches event listeners',
          'Compiles templates on the server',
          'Sends HTML from server to client',
          'Caches server responses'
        ],
        correctIndex: 0,
        explanation: 'Hydration reuses the server-rendered DOM structure and attaches Angular event listeners and interactivity.'
      },
      {
        id: 2,
        question: 'What module is used for transfer state in SSR?',
        options: [
          'TransferState from @angular/platform-browser',
          'HttpClientTransferModule',
          'ServerTransferModule',
          'PlatformTransferModule'
        ],
        correctIndex: 0,
        explanation: 'TransferState from @angular/platform-browser allows sharing data between server and client.'
      },
      {
        id: 3,
        question: 'How do you enable hydration in Angular?',
        options: [
          'Add withHydration() to bootstrapApplication',
          'Enable it in angular.json',
          'Import HydrationModule',
          'Set ssr: true in component decorator'
        ],
        correctIndex: 0,
        explanation: 'withHydration() is passed to bootstrapApplication to enable the hydration process.'
      }
    ],
    topics: [
      {
        id: 'server-rendering',
        title: 'Server-Side Rendering',
        content: 'Angular Universal enables server-side rendering for Angular applications. SSR renders your application on the server and sends complete HTML to the client. This improves initial load time and SEO because search engines receive fully rendered content. Configure SSR by adding the server option to your build configuration in angular.json. The server bundle runs in a Node.js environment and renders the application using platformServer. The rendered HTML is served to the client which then hydrates it to add interactivity. SSR handles route parameters by rendering the requested page on the server. You can use TransferState to pass data from server to client to prevent duplicate HTTP requests. SSR works with Angular Router to handle client-side navigation after initial load.'
      },
      {
        id: 'hydration-process',
        title: 'Hydration Process',
        content: 'Hydration is the process where Angular takes over the server-rendered DOM and makes it interactive. When the client application bootstraps it does not recreate the entire DOM from scratch. Instead it walks through the existing DOM nodes and attaches Angular components to them. This significantly reduces the time to first meaningful paint. Angular matches server-rendered DOM nodes with the component tree structure. Event listeners are attached to existing elements without replacing them. The hydration process preserves form state and input values. If the server and client render different content Angular will perform a full client render as a fallback. Hydration errors appear in the console when DOM mismatches occur. Testing hydration requires careful alignment between server and client environments.'
      },
      {
        id: 'transfer-state',
        title: 'Transfer State',
        content: 'TransferState allows sharing data between server-side and client-side rendering. When the server makes HTTP requests during rendering the responses are captured in TransferState. The serialized state is embedded in the HTML sent to the client. When the client hydrates it reads the state instead of making duplicate HTTP calls. Use TransferState with the makeStateKey function to create keys for your data. The HTTP interceptor can be configured to automatically cache responses in TransferState. Use the isPlatformServer check to determine if you are on the server or client. This pattern eliminates the double-fetch problem common in SSR applications. TransferState works with any data source including databases and external APIs. Configure the transfer cache size and expiration for optimal performance.'
      }
    ]
  },
  {
    id: 52,
    slug: 'angular-performance-lazy',
    title: 'Lazy Loading',
    description: 'Optimize your Angular application with route and component lazy loading.',
    level: 'intermediate',
    duration: '40 min',
    objectives: [
      'Configure route-based lazy loading with loadComponent',
      'Implement dynamic component lazy loading',
      'Set up preloading strategies for optimal performance'
    ],
    quiz: [
      {
        id: 1,
        question: 'What is route-based lazy loading in Angular?',
        options: [
          'Loading feature modules or components only when their route is visited',
          'Loading all modules at application startup',
          'Deferring HTTP calls until route activation',
          'Loading styles only when components render'
        ],
        correctIndex: 0,
        explanation: 'Route lazy loading defers loading feature code until the user navigates to that route.'
      },
      {
        id: 2,
        question: 'How do you preload lazy loaded routes?',
        options: [
          'Use PreloadAllModules strategy',
          'Set preload: true in route config',
          'Add preload directive to router',
          'Use HTTP prefetch headers'
        ],
        correctIndex: 0,
        explanation: 'PreloadingAllModules loads all lazy routes in the background after initial load.'
      },
      {
        id: 3,
        question: 'What function loads components dynamically?',
        options: [
          'loadComponent in route configuration',
          'DynamicComponent function',
          'importComponent lazily',
          'ComponentLoader.load'
        ],
        correctIndex: 0,
        explanation: 'The loadComponent property in route config defines a function that imports the component when the route is accessed.'
      }
    ],
    topics: [
      {
        id: 'route-lazy-loading',
        title: 'Route Lazy Loading',
        content: 'Route-based lazy loading splits your Angular application into separate bundles loaded on demand. Instead of loading the entire application at startup each feature loads only when its route is visited. Use the loadComponent property in your route definition to specify a function that imports the component. The import function returns a promise that resolves to the component class. This creates a separate chunk that is fetched from the server when needed. Route lazy loading significantly reduces the initial bundle size and improves load time. Combine it with standalone components for even cleaner lazy loading configuration. The router handles loading the chunk transparently and displays a loading indicator during the fetch. You can also use loadChildren for module-based lazy loading in traditional NgModule architectures.'
      },
      {
        id: 'component-lazy-loading',
        title: 'Component Lazy Loading',
        content: 'Dynamic component lazy loading allows loading components outside of route navigation. Use the ViewContainerRef to dynamically create component instances from lazy loaded code. The import function loads the component module on demand. This is useful for modals dialogs and conditional content that may never be needed. Call the import function to get the component factory then create the component in a view container. The component renders at the insertion point you specify. Lazy loaded components participate in Angular change detection normally. You can pass inputs and subscribe to outputs on dynamically created components. Clean up by destroying the component ref when no longer needed. This pattern works well with Angular standalone components.'
      },
      {
        id: 'preloading',
        title: 'Preloading Strategies',
        content: 'Preloading strategies fetch lazy loaded modules before the user needs them. The NoPreloading strategy loads modules only when the route is activated. The PreloadAllModules strategy loads all lazy routes after the initial bundle downloads. You can create custom strategies by implementing the PreloadingStrategy interface. Custom strategies can preload based on network conditions user preferences or route metadata. Configure preloading by passing the strategy toRouterModule.forRoot. Preloading reduces perceived navigation time for subsequent route visits. The background loading happens after the application becomes interactive. Monitor network usage when preloading on mobile devices. You can combine strategies using a custom function that checks route data for preload flags. Preloading works with service worker caching for optimal offline support.'
      }
    ]
  },
  {
    id: 53,
    slug: 'angular-performance-virtual',
    title: 'Virtual Scrolling',
    description: 'Implement efficient scrolling for large datasets using Angular CDK.',
    level: 'advanced',
    duration: '45 min',
    objectives: [
      'Set up CDK virtual scroll module',
      'Handle large lists with cdkVirtualFor',
      'Implement window-based scrolling'
    ],
    quiz: [
      {
        id: 1,
        question: 'What Angular CDK module provides virtual scrolling?',
        options: [
          'ScrollingModule',
          'VirtualScrollModule',
          'CdkVirtualScrollModule',
          'ScrollPerformanceModule'
        ],
        correctIndex: 0,
        explanation: 'ScrollingModule from @angular/cdk/scrolling provides virtual scroll directives.'
      },
      {
        id: 2,
        question: 'What directive replaces ngFor in virtual scroll?',
        options: [
          'cdkVirtualFor',
          'virtualFor',
          'cdkScrollFor',
          'scrollVirtualFor'
        ],
        correctIndex: 0,
        explanation: 'cdkVirtualFor is the virtual scroll equivalent of ngFor that renders only visible items.'
      },
      {
        id: 3,
        question: 'What container is needed for virtual scrolling?',
        options: [
          'cdk-virtual-scroll-viewport',
          'virtual-scroll-container',
          'scroll-viewport',
          'cdk-scroll-view'
        ],
        correctIndex: 0,
        explanation: 'The cdk-virtual-scroll-viewport element wraps the virtual scroll content and manages rendering.'
      }
    ],
    topics: [
      {
        id: 'cdk-virtual-scroll',
        title: 'CDK Virtual Scroll',
        content: 'The Angular CDK Virtual Scrolling module renders only the items visible in the viewport. Import ScrollingModule from @angular/cdk/scrolling to access the directives. The cdk-virtual-scroll-viewport wraps your scrollable content and manages the visible window. Use cdkVirtualFor instead of ngFor to iterate over your data collection. The viewport calculates which items to render based on scroll position and item size. Configure itemSize to specify the estimated height of each item in pixels. Set maxBufferPx and minBufferPx to control how many extra items render outside the viewport. The viewport dispatches scrolled events for scroll position tracking. Virtual scrolling handles dynamic item heights with careful configuration. It maintains scroll position when items are added or removed.'
      },
      {
        id: 'large-lists',
        title: 'Large List Handling',
        content: 'Virtual scrolling enables rendering thousands of items without performance degradation. Without virtual scrolling rendering 10000 items would create 10000 DOM nodes. Virtual scrolling creates only enough nodes to fill the viewport plus buffer. For fixed height items set the itemSize to the exact pixel height. For variable height items use the autosize option to measure items dynamically. The CDK handles scroll position restoration when navigating back to a list. You can combine virtual scrolling with filtering and sorting by updating the data source. The viewport recalculates visible items when the data changes. Use trackBy with cdkVirtualFor for efficient DOM recycling. Memory usage stays constant regardless of list size. Performance benchmarks show smooth scrolling with over 100000 items.'
      },
      {
        id: 'window-scrolling',
        title: 'Window Scrolling',
        content: 'Window scrolling mode uses the entire browser window as the scroll container instead of a fixed viewport. Configure this by passing the scrollWindow option to the viewport. The viewport then listens to window scroll events instead of an element scroll event. This is useful for page layouts where the entire page scrolls and virtual content appears inline. Items render as the user scrolls down the page naturally. The viewport calculates which items are visible based on window scroll position. This approach works well for infinite scroll patterns where new items load as the user reaches the bottom. You can combine window scrolling with lazy loading for optimal performance. The viewport handles resize events to recalculate visible items. Window scrolling integrates with Angular Router scroll position restoration.'
      }
    ]
  },
  {
    id: 54,
    slug: 'angular-i18n-runtime',
    title: 'Runtime i18n',
    description: 'Implement runtime internationalization with translation loading and formatting.',
    level: 'advanced',
    duration: '50 min',
    objectives: [
      'Load translations dynamically at runtime',
      'Format dates numbers and currencies per locale',
      'Implement pluralization rules for different languages'
    ],
    quiz: [
      {
        id: 1,
        question: 'What is runtime i18n in Angular?',
        options: [
          'Loading translations without rebuilding the application',
          'Compile-time translation extraction',
          'Static string replacement',
          'CSS-based locale styling'
        ],
        correctIndex: 0,
        explanation: 'Runtime i18n loads translation files dynamically allowing language switching without redeployment.'
      },
      {
        id: 2,
        question: 'Which Angular service handles date formatting for locales?',
        options: [
          'DatePipe',
          'IntlService',
          'LocaleService',
          'DateFormatService'
        ],
        correctIndex: 0,
        explanation: 'DatePipe uses the Intl API to format dates according to the current locale.'
      },
      {
        id: 3,
        question: 'How do you define pluralization in Angular i18n?',
        options: [
          'Use the plural ICU format in translation files',
          'Add plural attributes to components',
          'Use the PluralizationService',
          'Define plural rules in angular.json'
        ],
        correctIndex: 0,
        explanation: 'ICU message format with plural categories defines how translations handle singular and plural forms.'
      }
    ],
    topics: [
      {
        id: 'translation-loading',
        title: 'Translation Loading',
        content: 'Runtime translation loading fetches translation files based on the active locale. Store translation files as JSON with keys mapping to translated strings. Use HttpClient to load translations dynamically when the locale changes. The TranslateService or a custom service manages the current locale and loaded translations. Create a TranslationLoader that fetches the appropriate JSON file for the requested locale. Cache loaded translations to avoid redundant HTTP requests. Use the transfer state to pass translations from server to client in SSR applications. The translation service should emit events when translations change so components re-render. Store the user locale preference in localStorage for persistence. Load the default locale eagerly and other locales lazily. Handle missing translations gracefully with fallback strings.'
      },
      {
        id: 'formatting',
        title: 'Date and Number Formatting',
        content: 'Angular provides pipes for locale-aware formatting of dates numbers and currencies. The DatePipe formats dates using the Intl.DateTimeFormat API. The DecimalPipe formats numbers with locale-specific grouping and decimal separators. The CurrencyPipe formats monetary values with the appropriate currency symbol. The PercentPipe formats percentages with locale-specific display. Each pipe accepts a locale parameter to override the default. The currency pipe also accepts a currency code parameter. Use the translate directive to format strings with embedded formatted values. The format rules are derived from the CLDR data set. Pipes automatically update when the locale changes at runtime. You can create custom pipes for specialized formatting requirements like relative time.'
      },
      {
        id: 'pluralization',
        title: 'Pluralization Rules',
        content: 'Pluralization handles different word forms for singular and plural quantities. Angular i18n uses ICU message format for pluralization. Define plural messages with categories for zero one two few many and other. The plural category selection depends on the locale rules. English uses singular and plural while Arabic uses six different categories. The translate pipe automatically selects the correct form based on the count value. You can nest pluralization within other ICU format features like select. Plural rules are locale-specific and defined in CLDR. Custom plural rules can be defined for languages with complex pluralization. The pluralization works with both compile-time and runtime i18n approaches. Test pluralization with different count values to verify correct form selection.'
      }
    ]
  },
  {
    id: 55,
    slug: 'angular-pwa-service-worker',
    title: 'Service Workers',
    description: 'Configure Angular service workers for offline support and caching.',
    level: 'advanced',
    duration: '50 min',
    objectives: [
      'Set up Angular service worker with ng add',
      'Configure different caching strategies',
      'Implement offline data synchronization'
    ],
    quiz: [
      {
        id: 1,
        question: 'How do you add a service worker to an Angular project?',
        options: [
          'ng add @angular/pwa',
          'npm install @angular/service-worker',
          'ng generate service-worker',
          'Configure manifest.json manually'
        ],
        correctIndex: 0,
        explanation: 'ng add @angular/pwa installs the service worker package and generates configuration files.'
      },
      {
        id: 2,
        question: 'What caching strategy serves cached content first then updates from network?',
        options: [
          'Freshness',
          'Performance',
          'Lazy',
          'Double'
        ],
        correctIndex: 1,
        explanation: 'Performance strategy caches resources and serves from cache first then updates the cache in the background.'
      },
      {
        id: 3,
        question: 'How does the service worker handle offline API requests?',
        options: [
          'Returns cached responses and queues requests for later',
          'Throws an error immediately',
          'Redirects to a static page',
          'Ignores the requests'
        ],
        correctIndex: 0,
        explanation: 'The service worker returns cached data and queues requests to be sent when connectivity is restored.'
      }
    ],
    topics: [
      {
        id: 'sw-setup',
        title: 'Service Worker Setup',
        content: 'Angular service worker setup begins with ng add @angular/pwa which installs dependencies and creates configuration. The ngsw-config.json file defines caching rules and resource groups. Register the service worker in your main.ts or app.module using ServiceWorkerModule. Enable the service worker in angular.json by setting serviceWorker to true in the build configuration. The service worker installs on first visit and activates immediately or on next visit depending on configuration. It intercepts all fetch requests and applies caching rules from the config. The ngsw-manifest.json is auto-generated during build and lists all application resources. Test the service worker using Chrome DevTools Application tab. Check the Cache Storage to verify cached resources. Use the Update on reload option to test new service worker versions.'
      },
      {
        id: 'caching-strategies',
        title: 'Caching Strategies',
        content: 'Angular service workers support multiple caching strategies for different resource types. The Freshness strategy fetches from network first and falls back to cache. This is best for API calls that need the latest data. The Performance strategy serves from cache first and updates in the background. This is ideal for static assets like images and scripts. The Refresh strategy always fetches from network but uses cached content as a placeholder during loading. Group resources by type in ngsw-config.json with resourceGroups. Define installMode as prefetch for resources needed immediately or lazy for on-demand resources. Configure updateMode to control how cached resources are refreshed. Versioned resources use hash-based cache busting. You can set maximum cache sizes and expiration times per group. Custom strategies can be implemented for advanced use cases.'
      },
      {
        id: 'offline-sync',
        title: 'Offline Synchronization',
        content: 'Offline sync allows users to interact with the application without network connectivity. Queue user actions like form submissions and data updates when offline. When connectivity returns replay the queued actions against the server. Angular does not provide a built-in offline sync mechanism but you can implement one. Store pending actions in IndexedDB which persists across browser sessions. Register a sync event with the Background Sync API when actions are queued. The service worker fires the sync event when connectivity is restored. Process the queued actions in order and handle conflicts. Show sync status to the user with a pending or synced indicator. Use optimistic UI updates to improve perceived performance. Implement retry logic for failed sync attempts. Test offline behavior using Chrome DevTools network throttling and offline mode.'
      }
    ]
  },
  {
    id: 56,
    slug: 'angular-custom-elements',
    title: 'Web Components',
    description: 'Create and use Angular components as custom elements in any framework.',
    level: 'advanced',
    duration: '45 min',
    objectives: [
      'Convert Angular components to custom elements with createApplication',
      'Configure CUSTOM_ELEMENTS_SCHEMA for custom element usage',
      'Integrate Angular custom elements in other frameworks'
    ],
    quiz: [
      {
        id: 1,
        question: 'What function creates a custom element from an Angular component?',
        options: [
          'createApplication',
          'customElement',
          'ElementBuilder.create',
          'AngularElement.create'
        ],
        correctIndex: 0,
        explanation: 'createApplication from @angular/elements sets up the Angular runtime for custom elements.'
      },
      {
        id: 2,
        question: 'What schema allows unknown elements in Angular templates?',
        options: [
          'CUSTOM_ELEMENTS_SCHEMA',
          'NO_ERRORS_SCHEMA',
          'ELEMENTS_SCHEMA',
          'UNKNOWN_ELEMENTS_SCHEMA'
        ],
        correctIndex: 0,
        explanation: 'CUSTOM_ELEMENTS_SCHEMA tells Angular to allow custom element tags in templates.'
      },
      {
        id: 3,
        question: 'How do you set properties on a custom element?',
        options: [
          'Use standard DOM property assignment',
          'Call element.setAngularProperty',
          'Use Angular input binding',
          'Call customElement.bind'
        ],
        correctIndex: 0,
        explanation: 'Custom elements support standard DOM property assignment which Angular maps to component inputs.'
      }
    ],
    topics: [
      {
        id: 'create-application',
        title: 'createApplication Setup',
        content: 'createApplication initializes the Angular runtime for custom elements. Import createApplication from @angular/elements and call it with your application configuration. This returns a promise that resolves to the ApplicationRef. Use the injector from ApplicationRef to create custom element constructors. The injector provides all application-level services to the custom element. Create a constructor for your component using the injector. Register the custom element with customElements.define. The custom element becomes a standard Web Component usable in any HTML page. Unlike traditional Angular bootstrapping createApplication does not attach to a DOM element. The custom element manages its own lifecycle. You can create multiple custom elements from a single application instance. Each element gets its own component instance and change detection cycle.'
      },
      {
        id: 'elements-schema',
        title: 'CUSTOM_ELEMENTS_SCHEMA',
        content: 'CUSTOM_ELEMENTS_SCHEMA allows Angular to recognize custom element tags in templates. Without this schema Angular raises errors for unknown HTML elements. Add CUSTOM_ELEMENTS_SCHEMA to the schemas array in your NgModule or component decorator. This tells the compiler to skip validation for custom element tags. The schema only affects template compilation not runtime behavior. Custom elements still need to be defined before they appear in the DOM. Use the schemas option in @Component or @NgModule decorator. For standalone components add schemas to the component metadata. The NO_ERRORS_SCHEMA skips all error checking but is not recommended for production. CUSTOM_ELEMENTS_SCHEMA is the safer option as it only allows custom elements. Use it when embedding Angular components in non-Angular applications.'
      },
      {
        id: 'cross-framework',
        title: 'Cross-Framework Usage',
        content: 'Angular custom elements can be used in React Vue jQuery or plain HTML. Build your Angular application with the custom-elements build target in angular.json. This produces a standalone JavaScript bundle with all Angular runtime included. Include the bundle in any web page with a script tag. Use the custom element tag in any framework template. Frameworks that support custom elements recognize them as valid HTML. Pass properties using standard DOM attribute or property assignment. Listen for custom events using addEventListener or framework event binding. The custom element handles Angular change detection internally. Cleanup occurs when the element is removed from the DOM. Communication between Angular custom elements uses custom events for loose coupling. This approach enables incremental migration from legacy frameworks to Angular.'
      }
    ]
  },
  {
    id: 57,
    slug: 'angular-signals-deep',
    title: 'Signals Deep Dive',
    description: 'Master Angular signals including computed and effect patterns.',
    level: 'intermediate',
    duration: '45 min',
    objectives: [
      'Create and use signals for reactive state management',
      'Build computed signals for derived state',
      'Implement effects for side effects and synchronization'
    ],
    quiz: [
      {
        id: 1,
        question: 'How do you create a signal in Angular?',
        options: [
          'signal(initialValue)',
          'createSignal(initialValue)',
          'Signal.create(initialValue)',
          'new Signal(initialValue)'
        ],
        correctIndex: 0,
        explanation: 'The signal function from @angular/core creates a new signal with the given initial value.'
      },
      {
        id: 2,
        question: 'What is a computed signal?',
        options: [
          'A derived signal that updates when dependencies change',
          'A signal with a fixed value',
          'A signal that computes on the server',
          'A signal with async operations'
        ],
        correctIndex: 0,
        explanation: 'Computed signals automatically recalculate when their dependency signals change.'
      },
      {
        id: 3,
        question: 'When does an effect run?',
        options: [
          'When any signal it reads changes',
          'Only on initial render',
          'On every change detection cycle',
          'When the component is destroyed'
        ],
        correctIndex: 0,
        explanation: 'Effects run whenever any signal they read during execution changes value.'
      }
    ],
    topics: [
      {
        id: 'signal-basics',
        title: 'Signal Fundamentals',
        content: 'Signals are reactive primitives that hold values and notify consumers when they change. Create a signal using the signal function from @angular/core. Read a signal value by calling it as a function with no arguments. Update a signal by calling the set method or using the update method for derived values. Signals are synchronous and immediately reflect their latest value. Unlike observables signals do not require subscription management. Signals work with Angular templates and are automatically unwrapped in template expressions. The writable signal maintains a list of dependents that are notified on change. Signals provide fine-grained reactivity without zone.js. They update only the parts of the DOM that depend on changed values. Signals integrate with Angular change detection for optimal performance.'
      },
      {
        id: 'computed-signals',
        title: 'Computed Signals',
        content: 'Computed signals derive values from other signals without storing their own state. Create a computed signal using the computed function which takes a derivation function. The derivation function receives no arguments and reads source signals inside. When any source signal changes the computed value recalculates lazily. Computed signals are memoized and only recompute when dependencies actually change. They form a dependency graph that Angular tracks automatically. Computed signals are read-only and cannot be set directly. They update synchronously when dependencies change. Use computed for derived state like filtered lists or formatted values. Computed signals are useful in templates for conditional rendering. They prevent unnecessary recalculations by tracking exact dependencies. Computed chains work where one computed depends on another computed signal.'
      },
      {
        id: 'effect-signals',
        title: 'Effect Signals',
        content: 'Effects run side effects in response to signal changes. Create an effect using the effect function from @angular/core. The effect function receives an cleanup function for registering cleanup handlers. Effects run immediately after creation and whenever any signal they read changes. Use untracked to read signals without creating dependencies. Effects are destroyed when the component or injector is destroyed. Use the injector option to tie effects to a specific injector. The allowSignalWrites option enables writing to signals inside effects. Effects should be lightweight and avoid expensive operations. Use computed for derived values and effects for side effects. Effects run outside Angular change detection zone. Register cleanup handlers in the effect function to prevent memory leaks. Effects are not available in template expressions.'
      }
    ]
  },
  {
    id: 58,
    slug: 'angular-resource-api',
    title: 'Resource API',
    description: 'Use Angular Resource API for managing async data loading states.',
    level: 'intermediate',
    duration: '40 min',
    objectives: [
      'Create resources with the resource function',
      'Use resourceRef for imperative resource management',
      'Handle loading and error states effectively'
    ],
    quiz: [
      {
        id: 1,
        question: 'What does the resource function return?',
        options: [
          'A ResourceRef object with value status and reload',
          'An Observable of the resource value',
          'A Promise of the resource data',
          'A Signal of the resource state'
        ],
        correctIndex: 0,
        explanation: 'The resource function returns a ResourceRef with reactive properties for value status and error.'
      },
      {
        id: 2,
        question: 'How do you reload a resource?',
        options: [
          'Call resource.reload()',
          'Set resource.value to null',
          'Call resource.refresh()',
          'Trigger resource.update()'
        ],
        correctIndex: 0,
        explanation: 'The reload method on ResourceRef triggers the request function to execute again.'
      },
      {
        id: 3,
        question: 'What status values can a resource have?',
        options: [
          'idle loading resolved error',
          'pending success failure',
          'loading loaded failed',
          'waiting active complete'
        ],
        correctIndex: 0,
        explanation: 'Resource status progresses through idle loading resolved and error states.'
      }
    ],
    topics: [
      {
        id: 'resource-function',
        title: 'resource() Function',
        content: 'The resource function creates a reactive resource that manages async data loading. Call resource with a configuration object containing request and loader functions. The request function returns parameters that the loader needs. The loader receives those parameters and returns a Promise with the data. The resource automatically tracks signal dependencies from the request function. When any dependency signal changes the resource re-executes the loader. The returned ResourceRef provides reactive access to value status and error. The value is undefined while loading and contains the loaded data on resolution. Status reflects the current state: idle loading resolved or error. The resource manages its own lifecycle and cleans up when destroyed. Resources integrate with Angular templates for automatic UI updates.'
      },
      {
        id: 'resource-ref',
        title: 'resourceRef() Usage',
        content: 'resourceRef provides imperative control over a resource instance. Access the resource value using the value property which returns a signal. The status property indicates the current loading state. Use hasValue to check if the resource contains data. The reload method re-executes the loader with the current request parameters. Call reload to refresh stale data after mutations. The error property contains any error from the loader. Use hasError to conditionally show error states in the UI. The isLoading method is a convenience getter for checking the loading state. Combine multiple resources for complex data dependencies. Resources can be created dynamically in component constructors. The injector context determines resource lifecycle management. Clean up resources when components are destroyed to prevent memory leaks.'
      },
      {
        id: 'loading-states',
        title: 'Loading States Management',
        content: 'Managing loading states improves user experience during async operations. The resource status property drives UI conditional rendering. Show a loading spinner when status is idle or loading. Display the data when status is resolved and value is available. Show error messages when status is error. Use the value signal in templates with async pipe equivalent unwrapping. Angular templates automatically unwrap signal values. Combine multiple resource loading states with computed signals. Show a skeleton loader while any resource is loading. Use the isResolved status for data-dependent UI rendering. Handle partial loading when fetching multiple data sources. The error property provides detailed error information for debugging. Use catchError in the loader to handle and transform errors gracefully. Implement retry logic for transient failures using the reload method.'
      }
    ]
  },
  {
    id: 59,
    slug: 'angular-control-flow',
    title: 'Control Flow',
    description: 'Use Angular new control flow syntax for cleaner template logic.',
    level: 'intermediate',
    duration: '35 min',
    objectives: [
      'Use @if and @else for conditional rendering',
      'Implement @for with track for list rendering',
      'Apply @switch for multi-way branching'
    ],
    quiz: [
      {
        id: 1,
        question: 'What replaces *ngIf in Angular control flow?',
        options: [
          '@if',
          '*if',
          '#if',
          'ngIf'
        ],
        correctIndex: 0,
        explanation: '@if is the new control flow syntax that replaces *ngIf for conditional rendering.'
      },
      {
        id: 2,
        question: 'What is required in the @for block?',
        options: [
          'track expression to identify items',
          'key expression for identification',
          'index expression',
          'filter expression'
        ],
        correctIndex: 0,
        explanation: '@for requires a track expression to uniquely identify each item for efficient DOM updates.'
      },
      {
        id: 3,
        question: 'What replaces *ngSwitch?',
        options: [
          '@switch',
          '*switch',
          '#switch',
          'ngSwitch'
        ],
        correctIndex: 0,
        explanation: '@switch is the new control flow syntax for multi-way conditional rendering.'
      }
    ],
    topics: [
      {
        id: 'if-else',
        title: '@if and @else Blocks',
        content: 'The @if block provides conditional rendering in Angular templates. Use @if to render content when a condition is truthy. Add @else to render alternative content when the condition is falsy. Chain multiple conditions with @else if for complex branching. The condition can be any expression that evaluates to truthy or falsy. Unlike *ngIf the @if syntax does not require importing a directive. The control flow is built into the Angular compiler. Use @if with signal values for reactive conditional rendering. The block renders and destroys content as the condition changes. You can nest @if blocks for complex conditional structures. @defer blocks with @if can conditionally load content lazily. The syntax is more concise than directive-based approaches. @if blocks work with template variables for scoped conditions.'
      },
      {
        id: 'for-loop',
        title: '@for List Rendering',
        content: 'The @for block renders a template for each item in a collection. Provide a track expression to uniquely identify each item for efficient updates. The track expression determines how Angular matches items between renders. Use item identity for reference tracking or index for position-based tracking. The @for block provides implicit variables like index and first and last. Use $index to access the current item position in the iteration. @empty provides fallback content when the collection is empty. Unlike *ngFor the @for syntax requires the track expression. This ensures optimal DOM recycling when the list changes. Nested @for blocks are supported for multi-level iterations. Combine @for with @if for filtered list rendering. The syntax integrates with Angular signals for reactive list updates. Performance is optimized through efficient list diffing algorithms.'
      },
      {
        id: 'switch',
        title: '@switch Multi-Way Branching',
        content: 'The @switch block replaces ngSwitch for multi-way conditional rendering. Define the expression to evaluate using @switch(expression). Use @case(value) to render content matching specific values. Add a @default case for unmatched values. Unlike ngSwitch directives the @switch syntax is built into the compiler. Cases do not fall through like traditional switch statements. Each case renders independently without needing break statements. The expression can be any value type including strings numbers and enums. You can nest @switch blocks for complex branching logic. Combine @case with conditions using @if for advanced matching. @switch is more readable than multiple @else if chains. The syntax works with signals for reactive switching. Template variables are scoped within each case block.'
      }
    ]
  },
  {
    id: 60,
    slug: 'angular-di-advanced',
    title: 'Advanced DI',
    description: 'Master advanced dependency injection patterns in Angular.',
    level: 'advanced',
    duration: '50 min',
    objectives: [
      'Work with hierarchical injectors and scoping',
      'Configure multi-provider values and arrays',
      'Create and use injection tokens effectively'
    ],
    quiz: [
      {
        id: 1,
        question: 'What is a hierarchical injector?',
        options: [
          'An injector that follows the component tree for service resolution',
          'A single root-level injector for all services',
          'An injector that only works in modules',
          'An injector that replaces the root injector'
        ],
        correctIndex: 0,
        explanation: 'Hierarchical injectors provide services by traversing up the component tree until a provider is found.'
      },
      {
        id: 2,
        question: 'What does the multi option do in a provider?',
        options: [
          'Provides multiple values for a single token',
          'Creates multiple instances of the service',
          'Provides the service to multiple modules',
          'Enables multi-tenancy support'
        ],
        correctIndex: 0,
        explanation: 'The multi option allows providing multiple values under a single injection token.'
      },
      {
        id: 3,
        question: 'What is an InjectionToken used for?',
        options: [
          'Providing type-safe injection keys for non-class values',
          'Creating class-based services',
          'Defining component interfaces',
          'Registering module providers'
        ],
        correctIndex: 0,
        explanation: 'InjectionToken provides a type-safe way to inject values that are not classes.'
      }
    ],
    topics: [
      {
        id: 'hierarchical-injectors',
        title: 'Hierarchical Injectors',
        content: 'Angular hierarchical injectors follow the component tree structure. When a component requests a service Angular first checks the element injector. If not found it traverses up to parent component injectors. The root injector is the last resort for service resolution. Element-level providers are created fresh for each component instance. Providers at the application level are singletons shared across the app. Use providers array in component metadata to provide services at specific levels. The @SkipSelf decorator skips the current injector and looks up the tree. The @Host decorator limits search to the host component and its parents. @Optional makes a dependency optional returning null if not found. Hierarchical injection enables scoped services like component-level state. Understanding injector hierarchy prevents unintended singleton sharing between components.'
      },
      {
        id: 'multi-providers',
        title: 'Multi-Providers',
        content: 'Multi-providers allow registering multiple values under a single injection token. Use the multi option in the provider configuration to add values to an array. When injecting the token you receive an array of all registered values. Multi-providers are useful for plugin architectures and extension points. HTTP interceptors use multi-providers to register multiple interceptors. The order of registration determines the array order. Each multi-provider entry uses the same token but provides different values. You can mix multi and single providers for the same token. The useValue useFactory and useClass providers all support the multi option. Multi-providers work across modules and lazy loaded features. Use multi-providers to build configurable middleware pipelines. The provided values are available in all child injectors that inherit the token.'
      },
      {
        id: 'injection-tokens',
        title: 'Injection Tokens',
        content: 'InjectionToken provides type-safe injection keys for values that are not classes. Create a token using new InjectionToken with a description string. The generic parameter specifies the type of value the token provides. Use InjectionToken for configuration objects environment variables and third-party libraries. The token is used in the providers array with useValue or useFactory. InjectionToken prevents naming collisions between different providers. Use the InjectionToken in constructor injection with the @Inject decorator. The token includes metadata for debugging and dependency visualization. Create hierarchical tokens by providing values at different injector levels. InjectionToken integrates with AOT compilation for tree-shaking. Use the providedIn option for tree-shakeable singleton providers. Tokens can provide default values using the optional fallback parameter. Advanced patterns include token factories that create values based on injector context.'
      }
    ]
  }
];
