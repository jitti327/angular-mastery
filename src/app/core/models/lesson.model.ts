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
