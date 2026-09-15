import { Injectable, signal } from '@angular/core';

export interface SearchResult {
  id: number;
  type: 'lesson' | 'project';
  title: string;
  description: string;
  path: string;
  level?: string;
  tags: string[];
  category?: string;
}

@Injectable({
  providedIn: 'root'
})
export class SearchService {
  private searchIndex: SearchResult[] = [
    // Angular Lessons
    { id: 1, type: 'lesson', title: 'What is Angular?', description: 'Learn what Angular is, its history, and why it is used for building web applications.', path: '/lesson/1', level: 'beginner', tags: ['introduction', 'overview', 'history', 'comparison'], category: 'angular' },
    { id: 2, type: 'lesson', title: 'Components & Templates', description: 'Master Angular components and template syntax with live examples.', path: '/lesson/2', level: 'beginner', tags: ['components', 'templates', 'lifecycle', 'communication'], category: 'angular' },
    { id: 3, type: 'lesson', title: 'Component Lifecycle', description: 'Understand all lifecycle hooks and when to use each.', path: '/lesson/3', level: 'beginner', tags: ['lifecycle', 'hooks', 'ngoninit', 'ngondestroy'], category: 'angular' },
    { id: 4, type: 'lesson', title: 'Directives & Pipes', description: 'Master directives and pipes for dynamic behavior.', path: '/lesson/4', level: 'beginner', tags: ['directives', 'pipes', 'custom', 'structural'], category: 'angular' },
    { id: 5, type: 'lesson', title: 'Dependency Injection Basics', description: 'Understanding Angular\'s DI system.', path: '/lesson/5', level: 'beginner', tags: ['di', 'injection', 'services', 'providers'], category: 'angular' },
    { id: 6, type: 'lesson', title: 'RxJS Fundamentals', description: 'Master RxJS observables, operators, and reactive patterns.', path: '/lesson/6', level: 'intermediate', tags: ['rxjs', 'observables', 'operators', 'subscriptions'], category: 'angular' },
    { id: 7, type: 'lesson', title: 'RxJS Advanced Patterns', description: 'Advanced RxJS patterns and custom operators.', path: '/lesson/7', level: 'intermediate', tags: ['rxjs', 'switchmap', 'mergemap', 'custom-operators'], category: 'angular' },
    { id: 8, type: 'lesson', title: 'Angular Signals', description: 'Master Angular Signals - the future of reactivity.', path: '/lesson/8', level: 'intermediate', tags: ['signals', 'computed', 'effects', 'reactivity'], category: 'angular' },
    { id: 9, type: 'lesson', title: 'Routing Deep Dive', description: 'Master Angular routing including guards, resolvers, and lazy loading.', path: '/lesson/9', level: 'intermediate', tags: ['routing', 'guards', 'resolvers', 'lazy-loading'], category: 'angular' },
    { id: 10, type: 'lesson', title: 'Forms Deep Dive', description: 'Master reactive forms, validators, and Signal Forms.', path: '/lesson/10', level: 'intermediate', tags: ['forms', 'reactive', 'validators', 'signal-forms'], category: 'angular' },
    { id: 11, type: 'lesson', title: 'HTTP & Interceptors', description: 'Master HTTP client and interceptors.', path: '/lesson/11', level: 'intermediate', tags: ['http', 'interceptors', 'error-handling', 'retry'], category: 'angular' },
    { id: 12, type: 'lesson', title: 'Component Communication', description: 'Master all patterns for component interaction.', path: '/lesson/12', level: 'intermediate', tags: ['inputs', 'outputs', 'services', 'state'], category: 'angular' },
    { id: 13, type: 'lesson', title: 'Advanced Content Projection', description: 'Master content projection patterns and ContentChild.', path: '/lesson/13', level: 'intermediate', tags: ['ng-content', 'contentchild', 'projection'], category: 'angular' },
    { id: 14, type: 'lesson', title: 'Advanced Pipes', description: 'Create complex pipes and understand pipe performance.', path: '/lesson/14', level: 'intermediate', tags: ['pipes', 'async', 'pure', 'impure'], category: 'angular' },
    { id: 15, type: 'lesson', title: 'Resource API', description: 'Master Angular Resource API for async data loading.', path: '/lesson/15', level: 'intermediate', tags: ['resource', 'async', 'signals', 'loading'], category: 'angular' },
    { id: 16, type: 'lesson', title: 'Advanced Component Interaction', description: 'Master advanced patterns for component communication.', path: '/lesson/16', level: 'intermediate', tags: ['viewchild', 'dynamic-components', 'ng-template'], category: 'angular' },
    { id: 17, type: 'lesson', title: 'Template-Driven Forms', description: 'Master template-driven forms approach.', path: '/lesson/17', level: 'intermediate', tags: ['template-driven', 'ngmodel', 'ngform'], category: 'angular' },
    { id: 18, type: 'lesson', title: 'DI Intermediate Patterns', description: 'Master intermediate dependency injection patterns.', path: '/lesson/18', level: 'intermediate', tags: ['di', 'environment', 'factory', 'multi-providers'], category: 'angular' },
    { id: 19, type: 'lesson', title: 'TypeScript for Angular', description: 'Master TypeScript patterns used in Angular.', path: '/lesson/19', level: 'intermediate', tags: ['typescript', 'generics', 'interfaces', 'decorators'], category: 'angular' },
    { id: 20, type: 'lesson', title: 'State Management & NgRx', description: 'Master state management patterns including NgRx.', path: '/lesson/20', level: 'advanced', tags: ['ngrx', 'state', 'store', 'effects'], category: 'angular' },
    { id: 21, type: 'lesson', title: 'Performance Optimization', description: 'Master Angular performance techniques.', path: '/lesson/21', level: 'advanced', tags: ['performance', 'onpush', 'lazy-loading', 'virtual-scrolling'], category: 'angular' },
    { id: 22, type: 'lesson', title: 'Testing', description: 'Master unit testing and integration testing.', path: '/lesson/22', level: 'advanced', tags: ['testing', 'unit-tests', 'jest', 'karma'], category: 'angular' },
    { id: 23, type: 'lesson', title: 'Security', description: 'Master Angular security best practices.', path: '/lesson/23', level: 'advanced', tags: ['security', 'xss', 'csrf', 'sanitization'], category: 'angular' },
    { id: 24, type: 'lesson', title: 'SSR & Hydration', description: 'Master Server-Side Rendering and hydration.', path: '/lesson/24', level: 'advanced', tags: ['ssr', 'hydration', 'universal', 'transfer-state'], category: 'angular' },
    { id: 25, type: 'lesson', title: 'Advanced DI Patterns', description: 'Master hierarchical injectors and custom tokens.', path: '/lesson/25', level: 'advanced', tags: ['di', 'tokens', 'hierarchy', 'multi-providers'], category: 'angular' },
    { id: 26, type: 'lesson', title: 'Change Detection Deep Dive', description: 'Understand Angular change detection internals.', path: '/lesson/26', level: 'advanced', tags: ['change-detection', 'zonejs', 'onpush', 'cdr'], category: 'angular' },
    { id: 27, type: 'lesson', title: 'Architecture Patterns', description: 'Master Angular architecture and design patterns.', path: '/lesson/27', level: 'advanced', tags: ['architecture', 'solid', 'patterns', 'structure'], category: 'angular' },
    { id: 28, type: 'lesson', title: 'Angular Internals', description: 'Understand how Angular works under the hood.', path: '/lesson/28', level: 'advanced', tags: ['internals', 'ivy', 'compilation', 'di-resolution'], category: 'angular' },
    { id: 29, type: 'lesson', title: 'Advanced Patterns', description: 'Master advanced Angular patterns.', path: '/lesson/29', level: 'advanced', tags: ['barrel-exports', 'mfe', 'decorators'], category: 'angular' },
    { id: 30, type: 'lesson', title: 'Interview Preparation', description: 'Senior Angular developer interview questions.', path: '/lesson/30', level: 'advanced', tags: ['interview', 'system-design', 'trade-offs'], category: 'angular' },
    { id: 31, type: 'lesson', title: 'Debugging & DevTools', description: 'Master Angular debugging techniques and tools.', path: '/lesson/31', level: 'advanced', tags: ['debugging', 'devtools', 'performance'], category: 'angular' },
    { id: 32, type: 'lesson', title: 'Internationalization (i18n)', description: 'Master Angular internationalization.', path: '/lesson/32', level: 'advanced', tags: ['i18n', 'translation', 'localization'], category: 'angular' },
    { id: 33, type: 'lesson', title: 'Animations', description: 'Master Angular animations.', path: '/lesson/33', level: 'advanced', tags: ['animations', 'transitions', 'triggers'], category: 'angular' },
    { id: 34, type: 'lesson', title: 'Web Workers', description: 'Use Web Workers in Angular.', path: '/lesson/34', level: 'advanced', tags: ['web-workers', 'parallel', 'performance'], category: 'angular' },
    { id: 35, type: 'lesson', title: 'Build & Deployment', description: 'Master Angular build optimization and deployment.', path: '/lesson/35', level: 'advanced', tags: ['deployment', 'build', 'ci-cd', 'docker'], category: 'angular' },
    { id: 36, type: 'lesson', title: 'AI Integration with Angular', description: 'Build AI-powered features in Angular applications.', path: '/lesson/36', level: 'advanced', tags: ['ai', 'openai', 'chatbot', 'streaming'], category: 'angular' },
    { id: 37, type: 'lesson', title: 'GraphQL with Angular', description: 'Master GraphQL integration in Angular.', path: '/lesson/37', level: 'advanced', tags: ['graphql', 'apollo', 'queries', 'mutations'], category: 'angular' },
    { id: 38, type: 'lesson', title: 'WebSockets & Real-Time', description: 'Build real-time features with WebSockets.', path: '/lesson/38', level: 'advanced', tags: ['websockets', 'real-time', 'streaming'], category: 'angular' },
    { id: 39, type: 'lesson', title: 'Progressive Web Apps', description: 'Build PWAs with Angular.', path: '/lesson/39', level: 'advanced', tags: ['pwa', 'service-worker', 'offline'], category: 'angular' },
    { id: 40, type: 'lesson', title: 'Standalone Migration', description: 'Migrate from NgModules to standalone components.', path: '/lesson/40', level: 'advanced', tags: ['standalone', 'migration', 'ngmodule'], category: 'angular' },
    { id: 41, type: 'lesson', title: 'Angular Material', description: 'Master Angular Material components and theming.', path: '/lesson/41', level: 'advanced', tags: ['material', 'ui', 'theming'], category: 'angular' },
    { id: 42, type: 'lesson', title: 'AI-Powered Angular Patterns', description: 'Modern patterns for AI-enhanced Angular applications.', path: '/lesson/42', level: 'advanced', tags: ['ai', 'chat', 'streaming', 'state'], category: 'angular' },
    
    // JavaScript Lessons
    { id: 101, type: 'lesson', title: 'JavaScript Fundamentals', description: 'Master the core building blocks of JavaScript.', path: '/lesson/101', level: 'beginner', tags: ['javascript', 'variables', 'datatypes', 'operators'], category: 'javascript' },
    { id: 102, type: 'lesson', title: 'Functions & Scope', description: 'Master functions, scope, closures, and higher-order functions.', path: '/lesson/102', level: 'beginner', tags: ['functions', 'scope', 'closures', 'higher-order'], category: 'javascript' },
    { id: 103, type: 'lesson', title: 'Objects & Arrays', description: 'Master objects, arrays, destructuring, and spread/rest.', path: '/lesson/103', level: 'beginner', tags: ['objects', 'arrays', 'destructuring', 'spread'], category: 'javascript' },
    { id: 104, type: 'lesson', title: 'Asynchronous JavaScript', description: 'Master async/await, promises, and event loop.', path: '/lesson/104', level: 'beginner', tags: ['async', 'promises', 'await', 'event-loop'], category: 'javascript' },
    { id: 105, type: 'lesson', title: 'ES6+ Features', description: 'Master modern JavaScript features (ES6 and beyond).', path: '/lesson/105', level: 'beginner', tags: ['es6', 'template-literals', 'optional-chaining', 'nullish'], category: 'javascript' },
    { id: 106, type: 'lesson', title: 'Error Handling', description: 'Master error handling, custom errors, and debugging.', path: '/lesson/106', level: 'intermediate', tags: ['errors', 'try-catch', 'debugging', 'custom-errors'], category: 'javascript' },
    { id: 107, type: 'lesson', title: 'Iterators & Generators', description: 'Master iterators, generators, and custom iteration.', path: '/lesson/107', level: 'intermediate', tags: ['iterators', 'generators', 'yield', 'symbol-iterator'], category: 'javascript' },
    { id: 108, type: 'lesson', title: 'Modules', description: 'Master ES modules and module patterns.', path: '/lesson/108', level: 'intermediate', tags: ['modules', 'import', 'export', 'dynamic-import'], category: 'javascript' },
    { id: 109, type: 'lesson', title: 'Prototypes & Inheritance', description: 'Master prototypal inheritance and class syntax.', path: '/lesson/109', level: 'intermediate', tags: ['prototypes', 'classes', 'inheritance', 'extends'], category: 'javascript' },
    { id: 110, type: 'lesson', title: 'Regular Expressions', description: 'Master regex patterns and methods.', path: '/lesson/110', level: 'intermediate', tags: ['regex', 'patterns', 'match', 'replace'], category: 'javascript' },
    { id: 111, type: 'lesson', title: 'Functional Programming', description: 'Master functional programming concepts.', path: '/lesson/111', level: 'intermediate', tags: ['functional', 'pure-functions', 'immutability', 'composition'], category: 'javascript' },
    { id: 112, type: 'lesson', title: 'Proxy & Reflection', description: 'Master Proxy and Reflect APIs.', path: '/lesson/112', level: 'intermediate', tags: ['proxy', 'reflect', 'reactive', 'validation'], category: 'javascript' },
    { id: 113, type: 'lesson', title: 'WeakMap & WeakSet', description: 'Master WeakMap, WeakSet, and memory management.', path: '/lesson/113', level: 'intermediate', tags: ['weakmap', 'weakset', 'memory', 'garbage-collection'], category: 'javascript' },
    { id: 114, type: 'lesson', title: 'Advanced Patterns', description: 'Master advanced JavaScript patterns.', path: '/lesson/114', level: 'intermediate', tags: ['module-pattern', 'mixins', 'builder', 'singleton'], category: 'javascript' },
    { id: 115, type: 'lesson', title: 'Performance Optimization', description: 'Master JavaScript performance techniques.', path: '/lesson/115', level: 'advanced', tags: ['performance', 'memoization', 'lazy-loading', 'optimization'], category: 'javascript' },
    { id: 116, type: 'lesson', title: 'Concurrency & Web Workers', description: 'Master concurrent JavaScript with Web Workers.', path: '/lesson/116', level: 'advanced', tags: ['web-workers', 'concurrency', 'shared-array-buffer', 'async-iteration'], category: 'javascript' },
    { id: 117, type: 'lesson', title: 'Security Best Practices', description: 'Master JavaScript security patterns.', path: '/lesson/117', level: 'advanced', tags: ['security', 'xss', 'csrf', 'sanitization'], category: 'javascript' },
    { id: 118, type: 'lesson', title: 'Testing Patterns', description: 'Master JavaScript testing patterns.', path: '/lesson/118', level: 'advanced', tags: ['testing', 'mocking', 'unit-tests', 'async-testing'], category: 'javascript' },
    { id: 119, type: 'lesson', title: 'Design Patterns', description: 'Master JavaScript design patterns.', path: '/lesson/119', level: 'advanced', tags: ['singleton', 'factory', 'observer', 'design-patterns'], category: 'javascript' },
    { id: 120, type: 'lesson', title: 'Interview Preparation', description: 'JavaScript interview questions and answers.', path: '/lesson/120', level: 'advanced', tags: ['interview', 'hoisting', 'this', 'closures'], category: 'javascript' },
    
    // TypeScript Lessons
    { id: 201, type: 'lesson', title: 'TypeScript Fundamentals', description: 'Master the core building blocks of TypeScript.', path: '/lesson/201', level: 'beginner', tags: ['typescript', 'type-annotations', 'basic-types', 'interfaces'], category: 'typescript' },
    { id: 202, type: 'lesson', title: 'Interfaces & Type Aliases', description: 'Master interfaces, type aliases, and their differences.', path: '/lesson/202', level: 'beginner', tags: ['interfaces', 'type-aliases', 'intersections', 'unions'], category: 'typescript' },
    { id: 203, type: 'lesson', title: 'Functions in TypeScript', description: 'Master typed functions and function overloads.', path: '/lesson/203', level: 'beginner', tags: ['functions', 'optional-parameters', 'overloads', 'generics'], category: 'typescript' },
    { id: 204, type: 'lesson', title: 'Generics', description: 'Master generics for reusable, type-safe code.', path: '/lesson/204', level: 'beginner', tags: ['generics', 'constraints', 'defaults', 'utility-types'], category: 'typescript' },
    { id: 205, type: 'lesson', title: 'Advanced Types', description: 'Master advanced TypeScript type features.', path: '/lesson/205', level: 'beginner', tags: ['conditional-types', 'mapped-types', 'template-literals', 'infer'], category: 'typescript' },
    { id: 206, type: 'lesson', title: 'Advanced Interfaces', description: 'Master advanced interface patterns.', path: '/lesson/206', level: 'intermediate', tags: ['index-signatures', 'nested-interfaces', 'mixins', 'declaration-merging'], category: 'typescript' },
    { id: 207, type: 'lesson', title: 'Advanced Generics', description: 'Master advanced generic patterns.', path: '/lesson/207', level: 'intermediate', tags: ['deep-constraints', 'generic-defaults', 'type-inference', 'higher-kinded'], category: 'typescript' },
    { id: 208, type: 'lesson', title: 'Advanced Utility Types', description: 'Master advanced built-in utility types.', path: '/lesson/208', level: 'intermediate', tags: ['extract', 'exclude', 'returntype', 'parameters', 'instance-type'], category: 'typescript' },
    { id: 209, type: 'lesson', title: 'Type Guards', description: 'Master type guards and narrowing.', path: '/lesson/209', level: 'intermediate', tags: ['typeof', 'instanceof', 'custom-guards', 'narrowing'], category: 'typescript' },
    { id: 210, type: 'lesson', title: 'Enums & Const Enums', description: 'Master enums and const enums.', path: '/lesson/210', level: 'intermediate', tags: ['enums', 'const-enums', 'numeric-enums', 'string-enums'], category: 'typescript' },
    { id: 211, type: 'lesson', title: 'Modules & Namespaces', description: 'Master TypeScript modules and namespaces.', path: '/lesson/211', level: 'intermediate', tags: ['es-modules', 'namespaces', 'ambient-declarations', 'declaration-merging'], category: 'typescript' },
    { id: 212, type: 'lesson', title: 'Mapped Types', description: 'Master mapped types and transformations.', path: '/lesson/212', level: 'intermediate', tags: ['mapped-types', 'key-remapping', 'modifiers', 'transformations'], category: 'typescript' },
    { id: 213, type: 'lesson', title: 'Conditional Types', description: 'Master conditional types and type-level programming.', path: '/lesson/213', level: 'advanced', tags: ['conditional-types', 'infer-keyword', 'distributive-types', 'type-level'], category: 'typescript' },
    { id: 214, type: 'lesson', title: 'Template Literal Types', description: 'Master template literal types for string manipulation.', path: '/lesson/214', level: 'advanced', tags: ['template-literals', 'string-manipulation', 'inference-patterns', 'type-level'], category: 'typescript' },
    { id: 215, type: 'lesson', title: 'Advanced Generic Patterns', description: 'Master advanced generic patterns and techniques.', path: '/lesson/215', level: 'advanced', tags: ['higher-kinded', 'type-level-computation', 'generic-inference', 'advanced-generics'], category: 'typescript' },
    { id: 216, type: 'lesson', title: 'Type-Level Programming', description: 'Master type-level programming techniques.', path: '/lesson/216', level: 'advanced', tags: ['tuple-types', 'recursive-types', 'type-arithmetic', 'type-level'], category: 'typescript' },
    { id: 217, type: 'lesson', title: 'Decorators', description: 'Master TypeScript decorators and metadata.', path: '/lesson/217', level: 'advanced', tags: ['decorators', 'class-decorators', 'method-decorators', 'parameter-decorators'], category: 'typescript' },
    { id: 218, type: 'lesson', title: 'TypeScript Performance', description: 'Optimize TypeScript compilation and type checking.', path: '/lesson/218', level: 'advanced', tags: ['performance', 'compilation', 'type-checking', 'project-references'], category: 'typescript' },
    { id: 219, type: 'lesson', title: 'Interview Preparation', description: 'TypeScript interview questions and answers.', path: '/lesson/219', level: 'advanced', tags: ['interview', 'union-intersection', 'type-assertion', 'common-patterns'], category: 'typescript' },
    
    // Projects
    { id: 43, type: 'project', title: 'Todo App', description: 'Learn components, events, and basic state management.', path: '/practice/todo', tags: ['todo', 'beginner', 'components', 'signals'] },
    { id: 44, type: 'project', title: 'Weather Dashboard', description: 'HTTP calls, services, and async data handling.', path: '/practice/weather', tags: ['weather', 'http', 'services', 'async'] },
    { id: 45, type: 'project', title: 'E-commerce', description: 'Routing, forms, and component communication.', path: '/practice/ecommerce', tags: ['ecommerce', 'routing', 'forms', 'state'] },
    { id: 46, type: 'project', title: 'Real-time Chat', description: 'Signals, WebSockets, and advanced patterns.', path: '/practice/chat', tags: ['chat', 'signals', 'real-time', 'advanced'] },
  ];

  searchQuery = signal('');
  searchResults = signal<SearchResult[]>([]);
  isSearchOpen = signal(false);

  search(query: string): SearchResult[] {
    if (!query.trim()) return [];
    const lower = query.toLowerCase();
    return this.searchIndex.filter(item =>
      item.title.toLowerCase().includes(lower) ||
      item.description.toLowerCase().includes(lower) ||
      item.tags.some(tag => tag.toLowerCase().includes(lower))
    );
  }

  openSearch(): void {
    this.isSearchOpen.set(true);
  }

  closeSearch(): void {
    this.isSearchOpen.set(false);
    this.searchQuery.set('');
    this.searchResults.set([]);
  }
}
