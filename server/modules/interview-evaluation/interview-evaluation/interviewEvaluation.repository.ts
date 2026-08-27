import prisma from "@/lib/prisma";
import { NotFoundError } from "../lib/errors";
import type { EvaluationResult } from "./interviewEvaluation.types";

// ============================================================
// INCLUDE SHAPE
// ============================================================
//
// Shared between create/read so callers always get the full
// evaluation graph back.
//

const fullInclude = {
    categoryScores: true,
    strengths: true,
    improvementAreas: true,
    knowledgeGaps: true,
    timeTaken: true,
    apiRequests: true,
    questions: {
        include: {
            missingConcepts: true,
        },
    },
} as const;


// ============================================================
// CREATE
// ============================================================
//
// Persists the full evaluation result graph in one nested
// Prisma write. Note: `missing_questions` from the LLM result
// has no corresponding column in the schema, so it is not
// persisted here — log it upstream in the service if you need
// visibility into it.
//

export async function createInterviewEvaluation(
    result: EvaluationResult
) {

    return prisma.interviewEvaluation.create({

        data: {

            workspace: result.workspace,
            totalQuestions: result.total_questions,
            evaluatedQuestions: result.evaluated_questions,
            overallScore: result.overall_score,
            performanceLevel: result.performance_level,
            recommendation: result.recommendation,

            categoryScores: {
                create: Object.entries(result.category_scores).map(
                    ([category, score]) => ({
                        category,
                        score,
                    })
                ),
            },

            strengths: {
                create: result.strengths.map((description) => ({
                    description,
                })),
            },

            improvementAreas: {
                create: result.improvement_areas.map((description) => ({
                    description,
                })),
            },

            knowledgeGaps: {
                create: result.knowledge_gaps.map((description) => ({
                    description,
                })),
            },

            timeTaken: {
                create: {
                    milliseconds: result.time_taken.milliseconds,
                    seconds: result.time_taken.seconds,
                },
            },

            apiRequests: {
                create: result.api_requests.map((request) => ({
                    chunk: request.chunk,
                    questions: request.questions,
                    timeTakenSeconds: request.time_taken_seconds,
                })),
            },

            questions: {
                create: result.per_question.map((question) => ({
                    qno: question.qno,
                    accuracy: question.scores.accuracy,
                    depth: question.scores.depth,
                    clarity: question.scores.clarity,
                    relevance: question.scores.relevance,
                    questionScore: question.question_score,

                    missingConcepts: {
                        create: question.missing_concepts.map(
                            (concept) => ({ concept })
                        ),
                    },
                })),
            },
        },

        include: fullInclude,
    });
}


// ============================================================
// FIND BY ID
// ============================================================

export async function findInterviewEvaluationById(
    evaluationId: string
) {

    const evaluation =
        await prisma.interviewEvaluation.findUnique({
            where: { id: evaluationId },
            include: fullInclude,
        });

    if (!evaluation) {

        throw new NotFoundError(
            `Interview evaluation ${evaluationId} not found`
        );
    }

    return evaluation;
}


// ============================================================
// FIND LATEST BY WORKSPACE
// ============================================================

export async function findLatestInterviewEvaluationByWorkspace(
    workspace: string
) {

    return prisma.interviewEvaluation.findFirst({
        where: { workspace },
        orderBy: { createdAt: "desc" },
        include: fullInclude,
    });
}


export async function getEvaluationIdByWorkspace(workspaceId: string) {
    const workspace = await prisma.workspace.findUnique({
        where: {
            id: workspaceId,
        },
        select: {
            workspace: true,
        },
    });

    if (!workspace) {
        return null;
    }

    const evaluation = await prisma.interviewEvaluation.findFirst({
        where: {
            workspace: workspace.workspace,
        },
        select: {
            id: true,
        },
    });

    return evaluation?.id ?? null;
}

