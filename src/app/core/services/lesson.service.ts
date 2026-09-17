import { Injectable } from '@angular/core';
import { Lesson } from '../models/lesson.model';
import { LESSONS } from './lessons-foundation.data';
import { INTERMEDIATE_LESSONS } from './lessons-intermediate.data';
import { ADVANCED_LESSONS } from './lessons-advanced.data';
import { ANGULAR_EXTRA_LESSONS } from './angular-extra.data';
import { JAVASCRIPT_LESSONS } from './js-lessons-foundation.data';
import { JS_INTERMEDIATE_LESSONS } from './js-lessons-intermediate.data';
import { JS_ADVANCED_LESSONS } from './js-lessons-advanced.data';
import { JS_EXTRA_LESSONS } from './js-extra.data';
import { TS_FOUNDATION_LESSONS } from './ts-lessons-foundation.data';
import { TS_INTERMEDIATE_LESSONS } from './ts-lessons-intermediate.data';
import { TS_ADVANCED_LESSONS } from './ts-lessons-advanced.data';
import { TS_EXTRA_LESSONS } from './ts-extra.data';
import { HTML_CSS_LESSONS } from './html-css.data';
import { REACT_LESSONS } from './react.data';
import { REACT_EXTRA_LESSONS } from './react-extra.data';
import { VUE_LESSONS } from './vue.data';
import { VUE_EXTRA_LESSONS } from './vue-extra.data';
import { TOOLING_LESSONS } from './tooling.data';
import { PERFORMANCE_LESSONS } from './performance.data';
import { TESTING_LESSONS } from './testing.data';
import { SYSTEM_DESIGN_LESSONS } from './system-design.data';
import { DATABASE_LESSONS } from './database.data';
import { NETWORKING_LESSONS } from './networking.data';
import { BROWSER_LESSONS } from './browser.data';
import { DESIGN_SYSTEMS_LESSONS } from './design-systems.data';
import { DSA_FRONTEND_LESSONS } from './dsa-frontend.data';
import { SOFT_SKILLS_LESSONS } from './soft-skills.data';
import { SECURITY_LESSONS } from './security.data';

export type LessonCategory =
  | 'angular' | 'javascript' | 'typescript' | 'html-css'
  | 'react' | 'vue' | 'tooling' | 'performance' | 'testing'
  | 'system-design' | 'database' | 'networking' | 'browser'
  | 'design-systems' | 'dsa-frontend' | 'soft-skills' | 'security';

@Injectable({
  providedIn: 'root'
})
export class LessonService {
  private angularLessons: Lesson[] = [...LESSONS, ...INTERMEDIATE_LESSONS, ...ADVANCED_LESSONS, ...ANGULAR_EXTRA_LESSONS];
  private jsLessons: Lesson[] = [...JAVASCRIPT_LESSONS, ...JS_INTERMEDIATE_LESSONS, ...JS_ADVANCED_LESSONS, ...JS_EXTRA_LESSONS];
  private tsLessons: Lesson[] = [...TS_FOUNDATION_LESSONS, ...TS_INTERMEDIATE_LESSONS, ...TS_ADVANCED_LESSONS, ...TS_EXTRA_LESSONS];
  private htmlCssLessons: Lesson[] = HTML_CSS_LESSONS;
  private reactLessons: Lesson[] = [...REACT_LESSONS, ...REACT_EXTRA_LESSONS];
  private vueLessons: Lesson[] = [...VUE_LESSONS, ...VUE_EXTRA_LESSONS];
  private toolingLessons: Lesson[] = TOOLING_LESSONS;
  private performanceLessons: Lesson[] = PERFORMANCE_LESSONS;
  private testingLessons: Lesson[] = TESTING_LESSONS;
  private systemDesignLessons: Lesson[] = SYSTEM_DESIGN_LESSONS;
  private databaseLessons: Lesson[] = DATABASE_LESSONS;
  private networkingLessons: Lesson[] = NETWORKING_LESSONS;
  private browserLessons: Lesson[] = BROWSER_LESSONS;
  private designSystemsLessons: Lesson[] = DESIGN_SYSTEMS_LESSONS;
  private dsaFrontendLessons: Lesson[] = DSA_FRONTEND_LESSONS;
  private softSkillsLessons: Lesson[] = SOFT_SKILLS_LESSONS;
  private securityLessons: Lesson[] = SECURITY_LESSONS;

  private allLessons: Lesson[] = [
    ...this.angularLessons, ...this.jsLessons, ...this.tsLessons,
    ...this.htmlCssLessons, ...this.reactLessons, ...this.vueLessons,
    ...this.toolingLessons, ...this.performanceLessons, ...this.testingLessons,
    ...this.systemDesignLessons, ...this.databaseLessons, ...this.networkingLessons,
    ...this.browserLessons, ...this.designSystemsLessons, ...this.dsaFrontendLessons,
    ...this.softSkillsLessons, ...this.securityLessons
  ];

  private categoryMap: Record<LessonCategory, Lesson[]> = {
    angular: this.angularLessons,
    javascript: this.jsLessons,
    typescript: this.tsLessons,
    'html-css': this.htmlCssLessons,
    react: this.reactLessons,
    vue: this.vueLessons,
    tooling: this.toolingLessons,
    performance: this.performanceLessons,
    testing: this.testingLessons,
    'system-design': this.systemDesignLessons,
    database: this.databaseLessons,
    networking: this.networkingLessons,
    browser: this.browserLessons,
    'design-systems': this.designSystemsLessons,
    'dsa-frontend': this.dsaFrontendLessons,
    'soft-skills': this.softSkillsLessons,
    security: this.securityLessons
  };

  getLessons(category?: LessonCategory): Lesson[] {
    if (category && this.categoryMap[category]) return this.categoryMap[category];
    return this.allLessons;
  }

  getLesson(id: number): Lesson | undefined {
    return this.allLessons.find(l => l.id === id);
  }

  getLessonBySlug(slug: string): Lesson | undefined {
    return this.allLessons.find(l => l.slug === slug);
  }

  getLessonsByLevel(level: 'beginner' | 'intermediate' | 'advanced', category?: LessonCategory): Lesson[] {
    const lessons = category ? this.getLessons(category) : this.allLessons;
    return lessons.filter(l => l.level === level);
  }

  getLessonCount(): number {
    return this.allLessons.length;
  }

  getLessonCountByCategory(category: LessonCategory): number {
    return this.getLessons(category).length;
  }

  getLessonCategory(id: number): LessonCategory | undefined {
    for (const [cat, lessons] of Object.entries(this.categoryMap)) {
      if (lessons.some(l => l.id === id)) return cat as LessonCategory;
    }
    return undefined;
  }

  getPrevLesson(id: number): Lesson | undefined {
    const category = this.getLessonCategory(id);
    const lessons = category ? this.getLessons(category) : this.allLessons;
    const index = lessons.findIndex(l => l.id === id);
    return index > 0 ? lessons[index - 1] : undefined;
  }

  getNextLesson(id: number): Lesson | undefined {
    const category = this.getLessonCategory(id);
    const lessons = category ? this.getLessons(category) : this.allLessons;
    const index = lessons.findIndex(l => l.id === id);
    return index >= 0 && index < lessons.length - 1 ? lessons[index + 1] : undefined;
  }

  getLessonIndexInCategory(id: number): number {
    const category = this.getLessonCategory(id);
    const lessons = category ? this.getLessons(category) : this.allLessons;
    return lessons.findIndex(l => l.id === id) + 1;
  }

  getLessonCountInCategory(id: number): number {
    const category = this.getLessonCategory(id);
    return category ? this.getLessons(category).length : this.allLessons.length;
  }

  getAllCategories(): LessonCategory[] {
    return Object.keys(this.categoryMap) as LessonCategory[];
  }

  getCategoryDisplayName(category: LessonCategory): string {
    const names: Record<LessonCategory, string> = {
      angular: 'Angular',
      javascript: 'JavaScript',
      typescript: 'TypeScript',
      'html-css': 'HTML & CSS',
      react: 'React',
      vue: 'Vue',
      tooling: 'Tooling',
      performance: 'Performance',
      testing: 'Testing',
      'system-design': 'System Design',
      database: 'Databases',
      networking: 'Networking & APIs',
      browser: 'Browser Internals',
      'design-systems': 'Design Systems',
      'dsa-frontend': 'DSA for Frontend',
      'soft-skills': 'Soft Skills & Leadership',
      security: 'Web Security'
    };
    return names[category] || category;
  }
}
