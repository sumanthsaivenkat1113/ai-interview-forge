import { average } from "./utils/array";
import { uniqueStrings } from "./utils/string";
import type { NormalizedQuestionEvaluation } from "../interview-evaluation/interviewEvaluation.types";

// ============================================================
// AGGREGATE STRENGTHS
// ============================================================
//
// This is deterministic rather than another LLM request.
//
// You can later customize these thresholds.
//

export function generateStrengths(
    questions: NormalizedQuestionEvaluation[]
): string[] {

    const strengths: string[] = [];


    const accuracyAverage =
        average(
            questions.map(
                (q) =>
                    q.scores.accuracy
            )
        );


    const depthAverage =
        average(
            questions.map(
                (q) =>
                    q.scores.depth
            )
        );


    const clarityAverage =
        average(
            questions.map(
                (q) =>
                    q.scores.clarity
            )
        );


    const relevanceAverage =
        average(
            questions.map(
                (q) =>
                    q.scores.relevance
            )
        );


    if (
        accuracyAverage >= 8.5
    ) {

        strengths.push(
            "Strong technical accuracy across the interview."
        );
    }


    if (
        depthAverage >= 8
    ) {

        strengths.push(
            "Good depth of technical understanding."
        );
    }


    if (
        clarityAverage >= 8.5
    ) {

        strengths.push(
            "Clear and well-structured explanations."
        );
    }


    if (
        relevanceAverage >= 8.5
    ) {

        strengths.push(
            "Consistently relevant answers."
        );
    }


    return strengths;
}


// ============================================================
// AGGREGATE IMPROVEMENT AREAS
// ============================================================

export function generateImprovementAreas(
    questions: NormalizedQuestionEvaluation[]
): string[] {

    const areas: string[] = [];


    const accuracyAverage =
        average(
            questions.map(
                (q) =>
                    q.scores.accuracy
            )
        );


    const depthAverage =
        average(
            questions.map(
                (q) =>
                    q.scores.depth
            )
        );


    const clarityAverage =
        average(
            questions.map(
                (q) =>
                    q.scores.clarity
            )
        );


    const relevanceAverage =
        average(
            questions.map(
                (q) =>
                    q.scores.relevance
            )
        );


    if (
        accuracyAverage < 8
    ) {

        areas.push(
            "Improve technical accuracy and avoid incorrect technical claims."
        );
    }


    if (
        depthAverage < 8
    ) {

        areas.push(
            "Improve technical depth by explaining important underlying concepts and trade-offs."
        );
    }


    if (
        clarityAverage < 8
    ) {

        areas.push(
            "Improve explanation structure and clarity."
        );
    }


    if (
        relevanceAverage < 8
    ) {

        areas.push(
            "Keep answers more directly focused on the question."
        );
    }


    return areas;
}


// ============================================================
// KNOWLEDGE GAPS
// ============================================================

export function generateKnowledgeGaps(
    questions: NormalizedQuestionEvaluation[]
): string[] {

    const concepts =
        questions.flatMap(
            (question) =>
                question.missing_concepts || []
        );


    return uniqueStrings(
        concepts
    );
}


// ============================================================
// RECOMMENDATION
// ============================================================

export function generateRecommendation(
    score: number
): string {

    if (score >= 90) {

        return (
            "Strong Hire"
        );
    }


    if (score >= 80) {

        return (
            "Hire"
        );
    }


    if (score >= 70) {

        return (
            "Consider"
        );
    }


    if (score >= 60) {

        return (
            "Needs Improvement"
        );
    }


    return (
        "Not Ready"
    );
}
