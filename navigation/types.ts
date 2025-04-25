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
};

export type MainTabParamList = {
  Home: undefined;
  Lessons: undefined;
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