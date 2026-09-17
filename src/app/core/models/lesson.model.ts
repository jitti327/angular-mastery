export interface Lesson {
  id: number;
  slug: string;
  title: string;
  description: string;
  level: 'beginner' | 'intermediate' | 'advanced';
  duration: string;
  topics: Topic[];
  prerequisites?: string[];
  objectives: string[];
  quiz?: QuizQuestion[];
}

export interface Topic {
  id: string;
  title: string;
  content: string;
  codeExample?: CodeExample;
  diagram?: DiagramData;
  animation?: AnimationData;
}

export interface CodeExample {
  title: string;
  description: string;
  typescript: string;
  html: string;
  css?: string;
  output?: string;
}

export interface DiagramData {
  title: string;
  type: 'architecture' | 'lifecycle' | 'dataflow' | 'comparison';
  nodes: DiagramNode[];
  edges: DiagramEdge[];
}

export interface DiagramNode {
  id: string;
  label: string;
  x: number;
  y: number;
  color?: string;
  icon?: string;
}

export interface DiagramEdge {
  from: string;
  to: string;
  label?: string;
  type?: 'solid' | 'dashed' | 'animated';
}

export interface AnimationData {
  title: string;
  type: 'lifecycle' | 'binding' | 'routing' | 'signal';
  frames: AnimationFrame[];
}

export interface AnimationFrame {
  step: number;
  label: string;
  description: string;
}

export interface Quiz {
  lessonId: number;
  questions: QuizQuestion[];
}

export interface QuizQuestion {
  id: number;
  question: string;
  options: string[];
  correctIndex: number;
  explanation: string;
}

export interface UserProgress {
  completedLessons: number[];
  quizScores: { [lessonId: number]: number };
  currentLesson: number;
  lastAccessed: Date;
}

export interface VersionFeature {
  feature: string;
  version: string;
  status: 'stable' | 'deprecated' | 'experimental' | 'removed';
  description: string;
}

export interface CodingChallenge {
  id: number;
  slug: string;
  title: string;
  description: string;
  difficulty: 'easy' | 'medium' | 'hard';
  category: string;
  duration: string;
  starterCode: string;
  testCases: TestCase[];
  hints: string[];
  solution: string;
  concepts: string[];
}

export interface TestCase {
  id: number;
  input: string;
  expected: string;
  description: string;
}

export interface ChallengeResult {
  challengeId: number;
  passed: boolean;
  passedTests: number;
  totalTests: number;
  completedAt: Date;
}

export interface LearningPath {
  id: string;
  title: string;
  description: string;
  icon: string;
  difficulty: 'beginner' | 'intermediate' | 'advanced' | 'mixed';
  estimatedWeeks: number;
  milestones: Milestone[];
  lessonIds: number[];
}

export interface Milestone {
  id: number;
  title: string;
  description: string;
  lessonIds: number[];
  challengeIds: number[];
}

export interface Certificate {
  id: string;
  pathId: string;
  pathTitle: string;
  completedAt: Date;
  totalLessons: number;
  totalChallenges: number;
  averageScore: number;
  learnerName: string;
}

export interface Comment {
  id: string;
  lessonId: number;
  author: string;
  content: string;
  createdAt: Date;
  likes: number;
  likedBy: string[];
  replies: Comment[];
}

export interface ReviewCard {
  lessonId: number;
  nextReview: Date;
  easeFactor: number;
  interval: number;
  repetitions: number;
  lastReviewed: Date;
}
