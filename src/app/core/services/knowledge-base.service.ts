import { Injectable, inject, signal, computed } from '@angular/core';
import { LessonService, LessonCategory } from './lesson.service';
import { Lesson } from '../models/lesson.model';

export interface KnowledgeNode {
  id: number;
  title: string;
  category: LessonCategory;
  level: 'beginner' | 'intermediate' | 'advanced';
  tags: string[];
  prerequisites: number[];
  relatedTopics: number[];
  concepts: string[];
  difficulty: number; // 1-10
}

export interface SearchResult {
  lesson: Lesson;
  score: number;
  matchType: 'title' | 'tag' | 'concept' | 'content';
}

@Injectable({ providedIn: 'root' })
export class KnowledgeBaseService {
  private lessonService = inject(LessonService);

  private knowledgeGraph = signal<Map<number, KnowledgeNode>>(new Map());
  private allTags = signal<Set<string>>(new Set());
  private allConcepts = signal<Set<string>>(new Set());

  graph = this.knowledgeGraph.asReadonly();
  tags = computed(() => Array.from(this.allTags()));
  concepts = computed(() => Array.from(this.allConcepts()));

  constructor() {
    this.buildKnowledgeGraph();
  }

  private buildKnowledgeGraph(): void {
    const graph = new Map<number, KnowledgeNode>();
    const tags = new Set<string>();
    const concepts = new Set<string>();

    const categoryMap: Record<LessonCategory, string[]> = {
      angular: ['angular', 'component', 'directive', 'pipe', 'service', 'dependency-injection', 'routing', 'forms', 'http', 'rxjs', 'signals', 'ssr', 'animation', 'testing', 'performance', 'architecture'],
      javascript: ['javascript', 'es6', 'async', 'promises', 'closures', 'prototypes', 'modules', 'iterators', 'generators', 'proxy', 'reflect', 'weakmap', 'event-loop', 'functional-programming', 'design-patterns'],
      typescript: ['typescript', 'interfaces', 'types', 'generics', 'utility-types', 'type-guards', 'decorators', 'mapped-types', 'conditional-types', 'template-literals'],
    'html-css': ['html', 'css', 'semantic-html', 'forms', 'accessibility', 'seo', 'meta-tags', 'canvas', 'web-components', 'dialog', 'popover', 'flexbox', 'grid', 'animations'],
      react: ['react', 'hooks', 'state', 'props', 'context', 'redux', 'server-components', 'server-actions', 'next-js', 'performance', 'testing', 'patterns'],
      vue: ['vue', 'composition-api', 'pinia', 'vue-router', 'reactivity', 'nuxt', 'testing', 'performance'],
      'system-design': ['system-design', 'scalability', 'load-balancing', 'caching', 'database', 'api-design', 'microservices', 'architecture'],
      database: ['database', 'mysql', 'postgresql', 'mongodb', 'redis', 'elasticsearch', 'sql', 'nosql', 'migrations', 'security', 'performance'],
      networking: ['networking', 'http', 'rest', 'graphql', 'websockets', 'cors', 'caching', 'authentication', 'rate-limiting', 'grpc'],
      browser: ['browser', 'rendering', 'event-loop', 'dom', 'devtools', 'web-workers', 'security', 'apis', 'storage', 'performance'],
      performance: ['performance', 'web-vitals', 'bundle', 'code-splitting', 'lazy-loading', 'caching', 'images', 'monitoring', 'rum'],
      tooling: ['tooling', 'vite', 'webpack', 'swc', 'eslint', 'prettier', 'module-federation', 'monorepo', 'docker', 'ci-cd'],
      testing: ['testing', 'jest', 'vitest', 'playwright', 'cypress', 'mocking', 'tdd', 'visual-regression', 'component-testing', 'e2e'],
      'design-systems': ['design-systems', 'tokens', 'components', 'storybook', 'theming', 'accessibility', 'governance'],
      'dsa-frontend': ['algorithms', 'data-structures', 'big-o', 'arrays', 'trees', 'graphs', 'dynamic-programming', 'sorting', 'searching'],
      'soft-skills': ['communication', 'code-review', 'mentoring', 'leadership', 'incident-response', 'technical-decisions', 'time-management'],
      security: ['security', 'xss', 'csrf', 'csp', 'authentication', 'owasp', 'tls', 'secrets', 'dependency-security'],
    };

    const allLessons = this.lessonService.getLessons();

    for (const lesson of allLessons) {
      const category = this.getCategoryForLesson(lesson.id);
      const catTags = categoryMap[category] || [];

      const lessonTags = catTags.slice(0, 5);
      const lessonConcepts = lesson.topics.map(t => t.title.toLowerCase());

      lessonTags.forEach(t => tags.add(t));
      lessonConcepts.forEach(c => concepts.add(c));

      const node: KnowledgeNode = {
        id: lesson.id,
        title: lesson.title,
        category,
        level: lesson.level,
        tags: lessonTags,
        prerequisites: this.findPrerequisites(lesson, allLessons),
        relatedTopics: this.findRelatedTopics(lesson, allLessons, category),
        concepts: lessonConcepts,
        difficulty: this.calculateDifficulty(lesson),
      };

      graph.set(lesson.id, node);
    }

    this.knowledgeGraph.set(graph);
    this.allTags.set(tags);
    this.allConcepts.set(concepts);
  }

  private getCategoryForLesson(id: number): LessonCategory {
    if (id >= 1 && id <= 5) return 'angular';
    if (id >= 6 && id <= 19) return 'angular';
    if (id >= 20 && id <= 47) return 'angular';
    if (id >= 101 && id <= 105) return 'javascript';
    if (id >= 106 && id <= 128) return 'javascript';
    if (id >= 115 && id <= 120) return 'javascript';
    if (id >= 201 && id <= 210) return 'typescript';
    if (id >= 206 && id <= 219) return 'typescript';
    if (id >= 301 && id <= 325) return 'html-css';
    if (id >= 401 && id <= 420) return 'react';
    if (id >= 501 && id <= 515) return 'vue';
    if (id >= 601 && id <= 615) return 'tooling';
    if (id >= 701 && id <= 710) return 'performance';
    if (id >= 801 && id <= 812) return 'testing';
    if (id >= 901 && id <= 912) return 'system-design';
    if (id >= 940 && id <= 953) return 'networking';
    if (id >= 960 && id <= 971) return 'browser';
    if (id >= 980 && id <= 988) return 'design-systems';
    if (id >= 990 && id <= 998) return 'database';
    if (id >= 1000 && id <= 1007) return 'dsa-frontend';
    if (id >= 1020 && id <= 1028) return 'soft-skills';
    if (id >= 1101 && id <= 1112) return 'security';
    return 'angular';
  }

  private findPrerequisites(lesson: Lesson, allLessons: Lesson[]): number[] {
    const prereqs: number[] = [];
    if (lesson.level === 'intermediate') {
      const beginnerLessons = allLessons.filter(l => l.level === 'beginner' && l.id < lesson.id);
      if (beginnerLessons.length > 0) {
        prereqs.push(beginnerLessons[beginnerLessons.length - 1].id);
      }
    } else if (lesson.level === 'advanced') {
      const intermediateLessons = allLessons.filter(l => l.level === 'intermediate' && l.id < lesson.id);
      if (intermediateLessons.length > 0) {
        prereqs.push(intermediateLessons[intermediateLessons.length - 1].id);
      }
    }
    return prereqs;
  }

  private findRelatedTopics(lesson: Lesson, allLessons: Lesson[], category: LessonCategory): number[] {
    return allLessons
      .filter(l => l.id !== lesson.id && this.getCategoryForLesson(l.id) === category)
      .slice(0, 3)
      .map(l => l.id);
  }

  private calculateDifficulty(lesson: Lesson): number {
    switch (lesson.level) {
      case 'beginner': return 3;
      case 'intermediate': return 6;
      case 'advanced': return 9;
    }
  }

  search(query: string): SearchResult[] {
    const lowerQuery = query.toLowerCase();
    const results: SearchResult[] = [];
    const allLessons = this.lessonService.getLessons();

    for (const lesson of allLessons) {
      let score = 0;
      let matchType: SearchResult['matchType'] = 'content';

      if (lesson.title.toLowerCase().includes(lowerQuery)) {
        score += 10;
        matchType = 'title';
      }

      const node = this.knowledgeGraph().get(lesson.id);
      if (node) {
        for (const tag of node.tags) {
          if (tag.includes(lowerQuery)) {
            score += 5;
            matchType = 'tag';
          }
        }
        for (const concept of node.concepts) {
          if (concept.includes(lowerQuery)) {
            score += 3;
            matchType = 'concept';
          }
        }
      }

      if (lesson.description.toLowerCase().includes(lowerQuery)) {
        score += 2;
      }

      for (const topic of lesson.topics) {
        if (topic.content.toLowerCase().includes(lowerQuery)) {
          score += 1;
        }
      }

      if (score > 0) {
        results.push({ lesson, score, matchType });
      }
    }

    return results.sort((a, b) => b.score - a.score);
  }

  getLessonsByCategory(category: LessonCategory): KnowledgeNode[] {
    return Array.from(this.knowledgeGraph().values())
      .filter(n => n.category === category);
  }

  getLessonsByLevel(level: 'beginner' | 'intermediate' | 'advanced'): KnowledgeNode[] {
    return Array.from(this.knowledgeGraph().values())
      .filter(n => n.level === level);
  }

  getLessonsByTag(tag: string): KnowledgeNode[] {
    return Array.from(this.knowledgeGraph().values())
      .filter(n => n.tags.includes(tag));
  }

  getPrerequisites(lessonId: number): KnowledgeNode[] {
    const node = this.knowledgeGraph().get(lessonId);
    if (!node) return [];
    return node.prerequisites
      .map(id => this.knowledgeGraph().get(id))
      .filter((n): n is KnowledgeNode => n !== undefined);
  }

  getRelatedLessons(lessonId: number): KnowledgeNode[] {
    const node = this.knowledgeGraph().get(lessonId);
    if (!node) return [];
    return node.relatedTopics
      .map(id => this.knowledgeGraph().get(id))
      .filter((n): n is KnowledgeNode => n !== undefined);
  }

  getLearningPath(category: LessonCategory): KnowledgeNode[] {
    const nodes = this.getLessonsByCategory(category);
    return nodes.sort((a, b) => {
      const levelOrder = { beginner: 0, intermediate: 1, advanced: 2 };
      return levelOrder[a.level] - levelOrder[b.level];
    });
  }

  getStats(): { totalLessons: number; totalCategories: number; totalTags: number; byLevel: Record<string, number> } {
    const graph = this.knowledgeGraph();
    const byLevel: Record<string, number> = { beginner: 0, intermediate: 0, advanced: 0 };

    graph.forEach(node => {
      byLevel[node.level]++;
    });

    return {
      totalLessons: graph.size,
      totalCategories: new Set(Array.from(graph.values()).map(n => n.category)).size,
      totalTags: this.allTags().size,
      byLevel,
    };
  }
}
