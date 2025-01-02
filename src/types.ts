export interface WordPair {
  id: string;
  word: string;
  definition: string;
}

export interface Card {
  id: string;
  content: string;
  type: 'word' | 'definition';
  isFlipped: boolean;
  isMatched: boolean;
  originalId: string;
}