export interface createInterviewDTO {
    qno: number,
    question: string,
    workspaceId: string,
}

export type createManyInterviewDTO = {
  qno: number;
  question: string;
  workspaceId: string;
}[];

export type createCodingQuestionExampleDTO = {
  Eno: number,
  Input: string,
  Output: string,
  Explanation: string,
};

export type createManyCodingQuestionsDTO = {
  qno: number,
  problem_statement: string,
  examples: createCodingQuestionExampleDTO[],
  workspaceId: string,
}[];