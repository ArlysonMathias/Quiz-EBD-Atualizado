export interface QuestionData {
  id: number;
  text: string;
  options: string[];
  correct: number;
}
export interface QuestionsFile {
  easy?: QuestionData[];
  medium?: QuestionData[];
  hard?: QuestionData[];
}
