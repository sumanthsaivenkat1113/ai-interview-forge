import { uniqueStrings } from "../lib/utils/string";
import { calculateQuestionScore, validateScore } from "../lib/scoring";
import type {
    RawQuestionEvaluation,
    NormalizedQuestionEvaluation,
} from "../interview-evaluation/interviewEvaluation.types";

// ============================================================
// NORMALIZE LLM EVALUATION
// ============================================================

export function normalizeEvaluation(
    evaluation: RawQuestionEvaluation
): NormalizedQuestionEvaluation {

    return {

        qno:
            Number(evaluation.qno),

        scores: {

            accuracy:
                validateScore(
                    evaluation.accuracy
                ),

            depth:
                validateScore(
                    evaluation.depth
                ),

            clarity:
                validateScore(
                    evaluation.clarity
                ),

            relevance:
                validateScore(
                    evaluation.relevance
                )
        },

        missing_concepts:
            Array.isArray(
                evaluation.missing
            )
                ? uniqueStrings(
                    evaluation.missing
                )
                : [],

        question_score:
            calculateQuestionScore({

                accuracy:
                    evaluation.accuracy,

                depth:
                    evaluation.depth,

                clarity:
                    evaluation.clarity,

                relevance:
                    evaluation.relevance
            })
    };
}
