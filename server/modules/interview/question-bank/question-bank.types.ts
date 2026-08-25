export interface CSQuestion {
  qno: number;
  baseQuestion: string;
  followUpQuestions: {
    question1: string;
    question2: string;
  };
}
