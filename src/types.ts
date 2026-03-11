export interface Flashcard {
  id: string;
  question: string;
  answer: string;
  createdAt: number;
}

export interface FlashcardSet {
  id: string;
  title: string;
  cards: Flashcard[];
  createdAt: number;
}

export interface QuizQuestion {
  id: string;
  question: string;
  options: string[];
  correctOptionIndex?: number; // Legacy support
  correctOptionIndices: number[]; // New support for multiple correct options
  createdAt: number;
}

export interface QuizSet {
  id: string;
  title: string;
  questions: QuizQuestion[];
  timeLimit: number; // in seconds
  createdAt: number;
}

export type Theme = 'light' | 'dark';
export type ViewMode = 'manage' | 'present';
export type Language = 'ar' | 'en';
export type AppMode = 'home' | 'flashcards' | 'quizzes';
