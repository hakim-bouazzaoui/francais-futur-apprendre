export type RootStackParamList = {
  MainTabs: undefined;
  LessonDetail: {
    moduleId: string;
    lessonTitle: string;
    lessonContent?: string;
  };
  Quiz: {
    moduleId: string;
    lessonTitle: string;
    questions: QuizQuestion[];
  };
  QuizResults: {
    result: QuizResult;
  };
  SRSReview: {
    items: SRSItem[];
  };
  ContentList: undefined;
  ContentTest: undefined;
  ContentSyncTest: undefined; // Added for sync testing
};

export type MainTabParamList = {
  Home: undefined;
  Lessons: undefined;
  Content: undefined;
  Revision: undefined;
  Profile: undefined;
};

export interface QuizQuestion {
  id: string;
  question: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
}

export interface QuizResult {
  moduleId: string;
  lessonTitle: string;
  date: string;
  score: number;
  totalQuestions: number;
  timeSpent: number;
  questions: QuizQuestion[];
  answers: {
    questionId: string;
    correct: boolean;
  }[];
}

export interface QuizStats {
  totalQuizzes: number;
  averageScore: number;
  totalTimeSpent: number;
  streakDays: number;
}

export interface SRSItem {
  id: string;
  moduleId: string;
  lessonTitle: string;
  question: string;
  nextReview: number;
  interval: number;
  easeFactor: number;
  consecutive: number;
  lastReviewed?: number;
}

export interface ContentStats {
  totalItems: number;
  byCategory: Record<string, CategoryStats>;
}

export interface CategoryStats {
  total: number;
  byType: {
    Quiz: number;
    Flashcard: number;
    Lesson: number;
    Term: number;
  };
}