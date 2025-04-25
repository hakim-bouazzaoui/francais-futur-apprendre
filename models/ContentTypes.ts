export interface Flashcard {
  id: string;
  category: string;
  type: "Flashcard";
  tags: string[];
  front: string;
  back: string;
  difficulty: number;
  notes?: string;
  image_ref?: string; // Added based on GEO021 example
}

export interface QuizOption {
  text: string;
  isCorrect: boolean;
}

export interface Quiz {
  id: string;
  category: string;
  type: "Quiz";
  tags: string[];
  question: string;
  answer: string; // This seems to be the correct answer text, not the index
  options?: QuizOption[]; // Use the QuizOption interface
  difficulty: number;
  notes?: string;
  image_ref?: string;
}

export interface Lesson {
  id: string;
  category: string;
  type: "Lesson";
  tags: string[];
  title: string;
  key_points: string[];
  difficulty: number;
  notes?: string;
  image_ref?: string;
}

export interface Term {
  id: string;
  category: string;
  type: "Term";
  tags: string[];
  term: string;
  definition: string;
  difficulty: number;
  notes?: string;
  image_ref?: string;
}

// Union type for all content items
export type ContentItem = Flashcard | Quiz | Lesson | Term;