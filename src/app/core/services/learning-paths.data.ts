import { LearningPath } from '../models/lesson.model';

export const LEARNING_PATHS: LearningPath[] = [
  {
    id: 'angular-zero-to-hero',
    title: 'Angular Zero to Hero',
    description: 'Complete Angular journey from basics to advanced patterns. Build real-world apps with signals, standalone components, and modern architecture.',
    icon: '🅰️',
    difficulty: 'mixed',
    estimatedWeeks: 12,
    lessonIds: [
      1, 2, 3, 4, 5,
      101, 102, 103, 104, 105, 106, 107, 108, 109, 110,
      201, 202, 203, 204, 205, 206, 207, 208, 209, 210, 211, 212, 213, 214, 215, 216, 217, 218, 219, 220, 221, 222, 223, 224, 225, 226, 227, 228, 229
    ],
    milestones: [
      {
        id: 1,
        title: 'Foundation',
        description: 'Core Angular concepts and basic components',
        lessonIds: [1, 2, 3, 4, 5],
        challengeIds: []
      },
      {
        id: 2,
        title: 'Component Mastery',
        description: 'Templates, data binding, and component interaction',
        lessonIds: [101, 102, 103, 104, 105, 106, 107, 108, 109, 110],
        challengeIds: []
      },
      {
        id: 3,
        title: 'Advanced Patterns',
        description: 'Signals, standalone components, and modern architecture',
        lessonIds: [201, 202, 203, 204, 205, 206, 207, 208, 209, 210, 211, 212, 213, 214, 215, 216, 217, 218, 219, 220, 221, 222, 223, 224, 225, 226, 227, 228, 229],
        challengeIds: []
      }
    ]
  },
  {
    id: 'javascript-mastery',
    title: 'JavaScript Mastery',
    description: 'Master JavaScript from fundamentals to advanced patterns. Learn closures, promises, async/await, and modern ES2024+ features.',
    icon: '📜',
    difficulty: 'mixed',
    estimatedWeeks: 10,
    lessonIds: [
      6, 7, 8, 9, 10,
      111, 112, 113, 114, 115, 116, 117, 118, 119, 120, 121, 122, 123, 124, 125, 126, 127, 128,
      301, 302, 303, 304, 305, 306
    ],
    milestones: [
      {
        id: 1,
        title: 'Fundamentals',
        description: 'Variables, functions, scope, and closures',
        lessonIds: [6, 7, 8, 9, 10],
        challengeIds: [1, 2, 6]
      },
      {
        id: 2,
        title: 'Intermediate Concepts',
        description: 'Objects, arrays, prototypes, and ES6+',
        lessonIds: [111, 112, 113, 114, 115, 116, 117, 118, 119, 120, 121, 122, 123, 124, 125, 126, 127, 128],
        challengeIds: [3, 7]
      },
      {
        id: 3,
        title: 'Advanced Patterns',
        description: 'Async patterns, design patterns, and performance',
        lessonIds: [301, 302, 303, 304, 305, 306],
        challengeIds: [4, 5, 8]
      }
    ]
  },
  {
    id: 'frontend-system-design',
    title: 'Frontend System Design',
    description: 'Learn to design scalable frontend architectures. Covers state management, micro-frontends, performance optimization, and more.',
    icon: '🏗️',
    difficulty: 'advanced',
    estimatedWeeks: 8,
    lessonIds: [
      401, 402, 403, 404, 405, 406, 407, 408, 409, 410, 411, 412, 413, 414, 415, 416, 417, 418, 419, 420, 421, 422
    ],
    milestones: [
      {
        id: 1,
        title: 'Architecture Fundamentals',
        description: 'Core architectural patterns and decisions',
        lessonIds: [401, 402, 403, 404, 405, 406, 407, 408],
        challengeIds: []
      },
      {
        id: 2,
        title: 'Scalability Patterns',
        description: 'State management, caching, and optimization',
        lessonIds: [409, 410, 411, 412, 413, 414, 415, 416],
        challengeIds: []
      },
      {
        id: 3,
        title: 'Production Concerns',
        description: 'Testing, monitoring, and deployment strategies',
        lessonIds: [417, 418, 419, 420, 421, 422],
        challengeIds: []
      }
    ]
  },
  {
    id: 'react-complete',
    title: 'React Complete Guide',
    description: 'Master React from JSX to server components. Learn hooks, state management, performance optimization, and Next.js patterns.',
    icon: '⚛️',
    difficulty: 'mixed',
    estimatedWeeks: 10,
    lessonIds: [
      501, 502, 503, 504, 505, 506, 507, 508, 509, 510,
      511, 512, 513, 514, 515, 516, 517, 518, 519, 520,
      521, 522, 523, 524, 525, 526, 527, 528, 529, 530
    ],
    milestones: [
      {
        id: 1,
        title: 'React Fundamentals',
        description: 'JSX, components, props, and state',
        lessonIds: [501, 502, 503, 504, 505, 506, 507, 508, 509, 510],
        challengeIds: []
      },
      {
        id: 2,
        title: 'Hooks & State Management',
        description: 'useState, useEffect, useContext, and Redux',
        lessonIds: [511, 512, 513, 514, 515, 516, 517, 518, 519, 520],
        challengeIds: []
      },
      {
        id: 3,
        title: 'Advanced React',
        description: 'Performance, patterns, and server components',
        lessonIds: [521, 522, 523, 524, 525, 526, 527, 528, 529, 530],
        challengeIds: []
      }
    ]
  },
  {
    id: 'vue-complete',
    title: 'Vue Complete Guide',
    description: 'Master Vue 3 with Composition API, Pinia, and Nuxt. Build production-ready applications.',
    icon: '💚',
    difficulty: 'mixed',
    estimatedWeeks: 10,
    lessonIds: [
      601, 602, 603, 604, 605, 606, 607, 608, 609, 610,
      611, 612, 613, 614, 615, 616, 617, 618, 619, 620,
      621, 622, 623, 624, 625, 626, 627, 628, 629, 630
    ],
    milestones: [
      {
        id: 1,
        title: 'Vue Fundamentals',
        description: 'Templates, reactivity, and components',
        lessonIds: [601, 602, 603, 604, 605, 606, 607, 608, 609, 610],
        challengeIds: []
      },
      {
        id: 2,
        title: 'Composition API',
        description: 'Composables, refs, and reactive system',
        lessonIds: [611, 612, 613, 614, 615, 616, 617, 618, 619, 620],
        challengeIds: []
      },
      {
        id: 3,
        title: 'Production Vue',
        description: 'Pinia, Vue Router, and Nuxt',
        lessonIds: [621, 622, 623, 624, 625, 626, 627, 628, 629, 630],
        challengeIds: []
      }
    ]
  },
  {
    id: 'testing-mastery',
    title: 'Testing Mastery',
    description: 'Master frontend testing from unit tests to E2E. Learn Jest, Playwright, TDD, and test architecture.',
    icon: '🧪',
    difficulty: 'intermediate',
    estimatedWeeks: 6,
    lessonIds: [
      801, 802, 803, 804, 805, 806, 807, 808, 809, 810, 811, 812
    ],
    milestones: [
      {
        id: 1,
        title: 'Testing Fundamentals',
        description: 'Unit testing, mocking, and test structure',
        lessonIds: [801, 802, 803, 804, 805, 806],
        challengeIds: []
      },
      {
        id: 2,
        title: 'Advanced Testing',
        description: 'E2E, visual regression, and test architecture',
        lessonIds: [807, 808, 809, 810, 811, 812],
        challengeIds: []
      }
    ]
  }
];
