import { Injectable, signal } from '@angular/core';

export interface SearchResult {
  id: number;
  type: 'lesson' | 'project';
  title: string;
  description: string;
  path: string;
  level?: string;
  tags: string[];
}

@Injectable({
  providedIn: 'root'
})
export class SearchService {
  private searchIndex: SearchResult[] = [
    { id: 1, type: 'lesson', title: 'What is Angular?', description: 'Learn what Angular is, its history, and why it is used for building web applications.', path: '/lesson/1', level: 'beginner', tags: ['introduction', 'overview', 'history', 'comparison'] },
    { id: 2, type: 'lesson', title: 'Components & Templates', description: 'Master Angular components and template syntax with live examples.', path: '/lesson/2', level: 'beginner', tags: ['components', 'templates', 'lifecycle', 'communication'] },
    { id: 3, type: 'lesson', title: 'Component Lifecycle', description: 'Understand all lifecycle hooks and when to use each.', path: '/lesson/3', level: 'beginner', tags: ['lifecycle', 'hooks', 'ngoninit', 'ngondestroy'] },
    { id: 4, type: 'lesson', title: 'Directives & Pipes', description: 'Master directives and pipes for dynamic behavior.', path: '/lesson/4', level: 'beginner', tags: ['directives', 'pipes', 'custom', 'structural'] },
    { id: 5, type: 'lesson', title: 'Dependency Injection Basics', description: 'Understanding Angular\'s DI system.', path: '/lesson/5', level: 'beginner', tags: ['di', 'injection', 'services', 'providers'] },
    { id: 6, type: 'lesson', title: 'RxJS Fundamentals', description: 'Master RxJS observables, operators, and reactive patterns.', path: '/lesson/6', level: 'intermediate', tags: ['rxjs', 'observables', 'operators', 'subscriptions'] },
    { id: 7, type: 'lesson', title: 'RxJS Advanced Patterns', description: 'Advanced RxJS patterns and custom operators.', path: '/lesson/7', level: 'intermediate', tags: ['rxjs', 'switchmap', 'mergemap', 'custom-operators'] },
    { id: 8, type: 'lesson', title: 'Angular Signals', description: 'Master Angular Signals - the future of reactivity.', path: '/lesson/8', level: 'intermediate', tags: ['signals', 'computed', 'effects', 'reactivity'] },
    { id: 9, type: 'lesson', title: 'Routing Deep Dive', description: 'Master Angular routing including guards, resolvers, and lazy loading.', path: '/lesson/9', level: 'intermediate', tags: ['routing', 'guards', 'resolvers', 'lazy-loading'] },
    { id: 10, type: 'lesson', title: 'Forms Deep Dive', description: 'Master reactive forms, validators, and Signal Forms.', path: '/lesson/10', level: 'intermediate', tags: ['forms', 'reactive', 'validators', 'signal-forms'] },
    { id: 11, type: 'lesson', title: 'HTTP & Interceptors', description: 'Master HTTP client and interceptors.', path: '/lesson/11', level: 'intermediate', tags: ['http', 'interceptors', 'error-handling', 'retry'] },
    { id: 12, type: 'lesson', title: 'Component Communication', description: 'Master all patterns for component interaction.', path: '/lesson/12', level: 'intermediate', tags: ['inputs', 'outputs', 'services', 'state'] },
    { id: 13, type: 'lesson', title: 'Advanced Content Projection', description: 'Master content projection patterns and ContentChild.', path: '/lesson/13', level: 'intermediate', tags: ['ng-content', 'contentchild', 'projection'] },
    { id: 14, type: 'lesson', title: 'Advanced Pipes', description: 'Create complex pipes and understand pipe performance.', path: '/lesson/14', level: 'intermediate', tags: ['pipes', 'async', 'pure', 'impure'] },
    { id: 15, type: 'lesson', title: 'Resource API', description: 'Master Angular Resource API for async data loading.', path: '/lesson/15', level: 'intermediate', tags: ['resource', 'async', 'signals', 'loading'] },
    { id: 16, type: 'lesson', title: 'Advanced Component Interaction', description: 'Master advanced patterns for component communication.', path: '/lesson/16', level: 'intermediate', tags: ['viewchild', 'dynamic-components', 'ng-template'] },
    { id: 17, type: 'lesson', title: 'Template-Driven Forms', description: 'Master template-driven forms approach.', path: '/lesson/17', level: 'intermediate', tags: ['template-driven', 'ngmodel', 'ngform'] },
    { id: 18, type: 'lesson', title: 'DI Intermediate Patterns', description: 'Master intermediate dependency injection patterns.', path: '/lesson/18', level: 'intermediate', tags: ['di', 'environment', 'factory', 'multi-providers'] },
    { id: 19, type: 'lesson', title: 'TypeScript for Angular', description: 'Master TypeScript patterns used in Angular.', path: '/lesson/19', level: 'intermediate', tags: ['typescript', 'generics', 'interfaces', 'decorators'] },
    { id: 20, type: 'lesson', title: 'State Management & NgRx', description: 'Master state management patterns including NgRx.', path: '/lesson/20', level: 'advanced', tags: ['ngrx', 'state', 'store', 'effects'] },
    { id: 21, type: 'lesson', title: 'Performance Optimization', description: 'Master Angular performance techniques.', path: '/lesson/21', level: 'advanced', tags: ['performance', 'onpush', 'lazy-loading', 'virtual-scrolling'] },
    { id: 22, type: 'lesson', title: 'Testing', description: 'Master unit testing and integration testing.', path: '/lesson/22', level: 'advanced', tags: ['testing', 'unit-tests', 'jest', 'karma'] },
    { id: 23, type: 'lesson', title: 'Security', description: 'Master Angular security best practices.', path: '/lesson/23', level: 'advanced', tags: ['security', 'xss', 'csrf', 'sanitization'] },
    { id: 24, type: 'lesson', title: 'SSR & Hydration', description: 'Master Server-Side Rendering and hydration.', path: '/lesson/24', level: 'advanced', tags: ['ssr', 'hydration', 'universal', 'transfer-state'] },
    { id: 25, type: 'lesson', title: 'Advanced DI Patterns', description: 'Master hierarchical injectors and custom tokens.', path: '/lesson/25', level: 'advanced', tags: ['di', 'tokens', 'hierarchy', 'multi-providers'] },
    { id: 26, type: 'lesson', title: 'Change Detection Deep Dive', description: 'Understand Angular change detection internals.', path: '/lesson/26', level: 'advanced', tags: ['change-detection', 'zonejs', 'onpush', 'cdr'] },
    { id: 27, type: 'lesson', title: 'Architecture Patterns', description: 'Master Angular architecture and design patterns.', path: '/lesson/27', level: 'advanced', tags: ['architecture', 'solid', 'patterns', 'structure'] },
    { id: 28, type: 'lesson', title: 'Angular Internals', description: 'Understand how Angular works under the hood.', path: '/lesson/28', level: 'advanced', tags: ['internals', 'ivy', 'compilation', 'di-resolution'] },
    { id: 29, type: 'lesson', title: 'Advanced Patterns', description: 'Master advanced Angular patterns.', path: '/lesson/29', level: 'advanced', tags: ['barrel-exports', 'mfe', 'decorators'] },
    { id: 30, type: 'lesson', title: 'Interview Preparation', description: 'Senior Angular developer interview questions.', path: '/lesson/30', level: 'advanced', tags: ['interview', 'system-design', 'trade-offs'] },
    { id: 31, type: 'lesson', title: 'Debugging & DevTools', description: 'Master Angular debugging techniques and tools.', path: '/lesson/31', level: 'advanced', tags: ['debugging', 'devtools', 'performance'] },
    { id: 32, type: 'lesson', title: 'Internationalization (i18n)', description: 'Master Angular internationalization.', path: '/lesson/32', level: 'advanced', tags: ['i18n', 'translation', 'localization'] },
    { id: 33, type: 'lesson', title: 'Animations', description: 'Master Angular animations.', path: '/lesson/33', level: 'advanced', tags: ['animations', 'transitions', 'triggers'] },
    { id: 34, type: 'lesson', title: 'Web Workers', description: 'Use Web Workers in Angular.', path: '/lesson/34', level: 'advanced', tags: ['web-workers', 'parallel', 'performance'] },
    { id: 35, type: 'lesson', title: 'Build & Deployment', description: 'Master Angular build optimization and deployment.', path: '/lesson/35', level: 'advanced', tags: ['deployment', 'build', 'ci-cd', 'docker'] },
    { id: 36, type: 'lesson', title: 'AI Integration with Angular', description: 'Build AI-powered features in Angular applications.', path: '/lesson/36', level: 'advanced', tags: ['ai', 'openai', 'chatbot', 'streaming'] },
    { id: 37, type: 'lesson', title: 'GraphQL with Angular', description: 'Master GraphQL integration in Angular.', path: '/lesson/37', level: 'advanced', tags: ['graphql', 'apollo', 'queries', 'mutations'] },
    { id: 38, type: 'lesson', title: 'WebSockets & Real-Time', description: 'Build real-time features with WebSockets.', path: '/lesson/38', level: 'advanced', tags: ['websockets', 'real-time', 'streaming'] },
    { id: 39, type: 'lesson', title: 'Progressive Web Apps', description: 'Build PWAs with Angular.', path: '/lesson/39', level: 'advanced', tags: ['pwa', 'service-worker', 'offline'] },
    { id: 40, type: 'lesson', title: 'Standalone Migration', description: 'Migrate from NgModules to standalone components.', path: '/lesson/40', level: 'advanced', tags: ['standalone', 'migration', 'ngmodule'] },
    { id: 41, type: 'lesson', title: 'Angular Material', description: 'Master Angular Material components and theming.', path: '/lesson/41', level: 'advanced', tags: ['material', 'ui', 'theming'] },
    { id: 42, type: 'lesson', title: 'AI-Powered Angular Patterns', description: 'Modern patterns for AI-enhanced Angular applications.', path: '/lesson/42', level: 'advanced', tags: ['ai', 'chat', 'streaming', 'state'] },
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
