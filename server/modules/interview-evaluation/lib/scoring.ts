import type { QuestionScores } from "../interview-evaluation/interviewEvaluation.types";

// ============================================================
// CALCULATE QUESTION SCORE
// ============================================================

export function calculateQuestionScore(
    scores: Partial<Record<keyof QuestionScores, number | string>>
): number {

    const accuracy =
        Number(scores.accuracy) || 0;

    const depth =
        Number(scores.depth) || 0;

    const clarity =
        Number(scores.clarity) || 0;

    const relevance =
        Number(scores.relevance) || 0;

    const score =
        (accuracy * 0.40) +
        (depth * 0.25) +
        (clarity * 0.20) +
        (relevance * 0.15);

    return Number(
        score.toFixed(2)
    );
}


// ============================================================
// PERFORMANCE LEVEL
// ============================================================

export function getPerformanceLevel(score: number): string {

    if (score >= 90) {
        return "Exceptional";
    }

    if (score >= 80) {
        return "Strong";
    }

    if (score >= 70) {
        return "Good";
    }

    if (score >= 60) {
        return "Developing";
    }

    if (score >= 50) {
        return "Needs Improvement";
    }

    return "Weak";
}


// ============================================================
// VALIDATE SCORES
// ============================================================

export function validateScore(score: unknown): number {

    const value =
        Number(score);

    if (
        !Number.isFinite(value)
    ) {
        return 0;
    }

    return Math.min(
        10,
        Math.max(
            0,
            Math.round(value)
        )
    );
}
