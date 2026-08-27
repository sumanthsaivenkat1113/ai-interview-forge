import { getQuestionAnswersService } from "@/server/modules/question-answers-result/questionAnswersResults.service";
import { QUESTIONS_PER_REQUEST, MAX_CONCURRENT_REQUESTS, BATCH_DELAY_MS } from "../lib/config";
import { chunkArray, average } from "../lib/utils/array";
import { sleep } from "../lib/utils/sleep";
import { evaluateQuestionChunk } from "../lib/groqApi";
import { normalizeEvaluation } from "../lib/normalize";
import { getPerformanceLevel } from "../lib/scoring";
import {
    generateStrengths,
    generateImprovementAreas,
    generateKnowledgeGaps,
    generateRecommendation,
} from "../lib/aggregate";
import {
    createInterviewEvaluation,
    findInterviewEvaluationById,
    getEvaluationIdByWorkspace
} from "./interviewEvaluation.repository";
import { NotFoundError, ValidationError } from "../lib/errors";
import type {
    TheoryQnA,
    NormalizedQuestionEvaluation,
    ChunkEvaluationResult,
    EvaluationResult,
} from "./interviewEvaluation.types";

// ============================================================
// RUN INTERVIEW EVALUATION
// ============================================================
//
// 1. Fetch the workspace's Q&A via the existing service layer
// 2. Chunk the theory Q&A and send each chunk to the LLM
// 3. Normalize + aggregate the per-chunk results
// 4. Persist the final evaluation via the repository
//
// NOTE: `codingQnA` is returned by getQuestionAnswersService
// but isn't scored here — the current schema and prompt only
// cover theory Q&A. Extend with a separate coding-evaluation
// prompt + Prisma model when that's ready.
//

export async function runInterviewEvaluation(
    workspaceId: string
) {

    if (!workspaceId) {

        throw new ValidationError(
            "workspaceId is required"
        );
    }


    // --------------------------------------------------------
    // FETCH Q&A DATA
    // --------------------------------------------------------

    const data =
        await getQuestionAnswersService(workspaceId);

    if (!data) {

        throw new NotFoundError(
            `No interview data found for workspace ${workspaceId}`
        );
    }


    const technicalQnA: TheoryQnA[] =
        data.QnA;


    if (
        !Array.isArray(technicalQnA) ||
        technicalQnA.length === 0
    ) {

        throw new ValidationError(
            `Workspace ${workspaceId} has no theory Q&A to evaluate`
        );
    }


    console.log(
        `Starting evaluation of ${technicalQnA.length} questions for workspace ${workspaceId}...`
    );


    // --------------------------------------------------------
    // CREATE CHUNKS
    // --------------------------------------------------------

    const chunks =
        chunkArray(
            technicalQnA,
            QUESTIONS_PER_REQUEST
        );


    console.log(
        `Total API requests: ${chunks.length}`
    );


    // --------------------------------------------------------
    // EVALUATE CHUNKS IN BATCHES
    // --------------------------------------------------------

    const results: ChunkEvaluationResult[] = [];


    for (
        let i = 0;
        i < chunks.length;
        i += MAX_CONCURRENT_REQUESTS
    ) {

        const currentBatch =
            chunks.slice(
                i,
                i + MAX_CONCURRENT_REQUESTS
            );


        const batchNumber =
            Math.floor(
                i /
                MAX_CONCURRENT_REQUESTS
            ) + 1;


        console.log(
            `\nStarting batch ${batchNumber}...`
        );


        const batchStartTime =
            performance.now();


        const batchResults =
            await Promise.all(
                currentBatch.map(
                    (chunk, index) =>
                        evaluateQuestionChunk(
                            chunk,
                            i + index + 1
                        )
                )
            );


        results.push(
            ...batchResults
        );


        const batchTime =
            (
                performance.now() -
                batchStartTime
            ) / 1000;


        console.log(
            `Batch ${batchNumber} completed in ${batchTime.toFixed(2)} seconds`
        );


        if (
            i +
            MAX_CONCURRENT_REQUESTS <
            chunks.length
        ) {

            console.log(
                "Waiting before next batch..."
            );


            await sleep(
                BATCH_DELAY_MS
            );
        }
    }


    // ========================================================
    // COMBINE ALL MODEL RESULTS
    // ========================================================

    const rawEvaluations =
        results.flatMap(
            (result) =>
                result.per_question
        );


    // ========================================================
    // NORMALIZE
    // ========================================================

    const evaluatedQuestions: NormalizedQuestionEvaluation[] =
        rawEvaluations.map(
            normalizeEvaluation
        );


    // ========================================================
    // CHECK FOR MISSING QUESTIONS
    // ========================================================

    const expectedQnos =
        new Set(
            technicalQnA.map(
                (q) =>
                    Number(q.qno)
            )
        );


    const evaluatedQnos =
        new Set(
            evaluatedQuestions.map(
                (q) =>
                    Number(q.qno)
            )
        );


    const missingQnos =
        [...expectedQnos].filter(
            (qno) =>
                !evaluatedQnos.has(qno)
        );


    if (
        missingQnos.length > 0
    ) {

        console.warn(
            "WARNING: Some questions were not evaluated:",
            missingQnos
        );
    }


    // ========================================================
    // FINAL SCORE
    // ========================================================

    const overallScore10 =
        average(
            evaluatedQuestions.map(
                (question) =>
                    question.question_score
            )
        );


    const overallScore100 =
        Number(
            (
                overallScore10 * 10
            ).toFixed(2)
        );


    // ========================================================
    // AGGREGATE INFORMATION
    // ========================================================

    const strengths =
        generateStrengths(
            evaluatedQuestions
        );


    const improvementAreas =
        generateImprovementAreas(
            evaluatedQuestions
        );


    const knowledgeGaps =
        generateKnowledgeGaps(
            evaluatedQuestions
        );


    const recommendation =
        generateRecommendation(
            overallScore100
        );


    // ========================================================
    // CATEGORY AVERAGES
    // ========================================================

    const categoryScores = {

        accuracy:
            Number(
                average(
                    evaluatedQuestions.map(
                        (q) =>
                            q.scores.accuracy
                    )
                ).toFixed(2)
            ),

        depth:
            Number(
                average(
                    evaluatedQuestions.map(
                        (q) =>
                            q.scores.depth
                    )
                ).toFixed(2)
            ),

        clarity:
            Number(
                average(
                    evaluatedQuestions.map(
                        (q) =>
                            q.scores.clarity
                    )
                ).toFixed(2)
            ),

        relevance:
            Number(
                average(
                    evaluatedQuestions.map(
                        (q) =>
                            q.scores.relevance
                    )
                ).toFixed(2)
            ),
    };


    // ========================================================
    // BUILD FINAL RESULT
    // ========================================================

    const finalResult: EvaluationResult = {

        workspace:
            data.workspace,

        total_questions:
            technicalQnA.length,

        evaluated_questions:
            evaluatedQuestions.length,

        missing_questions:
            missingQnos,

        overall_score:
            overallScore100,

        performance_level:
            getPerformanceLevel(
                overallScore100
            ),

        category_scores:
            categoryScores,

        recommendation,

        strengths,

        improvement_areas:
            improvementAreas,

        knowledge_gaps:
            knowledgeGaps,

        time_taken: {

            // Aggregated below from per-chunk timings, since
            // there's no single wall-clock span tracked here.
            milliseconds:
                Number(
                    results
                        .reduce(
                            (sum, r) =>
                                sum + r.time_taken_ms,
                            0
                        )
                        .toFixed(2)
                ),

            seconds:
                Number(
                    results
                        .reduce(
                            (sum, r) =>
                                sum + r.time_taken_seconds,
                            0
                        )
                        .toFixed(2)
                ),
        },

        api_requests:
            results.map((result) => ({

                chunk:
                    result.chunk_number,

                questions:
                    chunks[
                        result.chunk_number - 1
                    ].length,

                time_taken_seconds:
                    result.time_taken_seconds,
            })),

        per_question:
            evaluatedQuestions,
    };


    console.log(
        `Overall Score: ${finalResult.overall_score}/100 (${finalResult.performance_level}) — ${finalResult.recommendation}`
    );


    // ========================================================
    // PERSIST
    // ========================================================

    const saved =
        await createInterviewEvaluation(
            finalResult
        );


    return saved;
}


// ============================================================
// GET INTERVIEW EVALUATION
// ============================================================

export async function getInterviewEvaluation(
    evaluationId: string
) {

    if (!evaluationId) {

        throw new ValidationError(
            "evaluationId is required"
        );
    }

    return findInterviewEvaluationById(
        evaluationId
    );
}



export async function getEvaluationIdByWorkspaceService(workspaceId: string) {
    return getEvaluationIdByWorkspace(workspaceId);
}