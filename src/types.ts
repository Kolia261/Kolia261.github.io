export interface Question {
  id: string;
  text: string;
  options: string[];
  correctAnswer: number;
}

export interface Test {
  id: string;
  title: string;
  description: string;
  questions: Question[];
  createdAt: Date;
}