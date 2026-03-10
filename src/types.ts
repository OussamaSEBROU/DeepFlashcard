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

export type Theme = 'light' | 'dark';
export type ViewMode = 'manage' | 'present';
export type Language = 'ar' | 'en';
