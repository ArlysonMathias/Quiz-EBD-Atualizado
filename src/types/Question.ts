export interface Question {
  id: number;
  text: string;
  options: string[];
  correct: number;
}

export interface QuestionsFile {
  easy: Question[];
  medium: Question[];
  hard: Question[];
}
