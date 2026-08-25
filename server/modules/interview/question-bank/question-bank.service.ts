import { pickOne, pickMany } from "@/server/modules/shared/utils/shuffle";
import { CS_QUESTIONS } from
  "@/server/modules/interview/question-bank/data/cs-questions.data";
import { INTRO_QUESTION_VARIATIONS, HR_BEHAVIORAL_QUESTIONS } from
  "@/server/modules/interview/question-bank/data/hr-questions.data";

export const QuestionBankService = {
  /**
   * Returns one base CS question plus its two follow-ups.
   * Re-randomized on every call.
   */
  get3CSQuestions(): string[] {
    const selected = pickOne(CS_QUESTIONS);
    return [
      selected.baseQuestion,
      selected.followUpQuestions.question1,
      selected.followUpQuestions.question2,
    ];
  },

  /**
   * Returns a random "tell me about yourself" style intro question.
   * Re-randomized on every call.
   */
  getIntroQuestion(): string {
    return pickOne(INTRO_QUESTION_VARIATIONS);
  },

  /**
   * Returns `count` random, non-repeating HR/behavioral questions.
   * Re-randomized on every call.
   */
  getRandomHRQuestions(count = 2): string[] {
    return pickMany(HR_BEHAVIORAL_QUESTIONS, count);
  },
};
