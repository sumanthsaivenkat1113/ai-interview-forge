export interface createAnswersDTO {
    qno: number,
    answer: string,
    questionId: string,
}


export type createManyAnswersDTO = {
    qno: number;
    answer: string;
    questionId: string;
}[];