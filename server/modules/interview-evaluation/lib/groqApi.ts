import { groq } from "../lib/groqClient";
import { MODEL, MAX_RETRIES, MAX_COMPLETION_TOKENS } from "../lib/config";
import { sleep } from "../lib/utils/sleep";
import { getRetryDelay, isRetryableError } from "../lib/utils/retry";
import { theoryEvaluationSystemPrompt } from "../prompt";
import { UpstreamServiceError } from "../lib/errors";
import type {
    TheoryQnA,
    ChunkEvaluationResult,
} from "../interview-evaluation/interviewEvaluation.types";

// ============================================================
// GROQ API CALL WITH RETRY
// ============================================================

async function callGroqWithRetry(
    messages: { role: "system" | "user"; content: string }[],
    chunkNumber: number
) {

    for (
        let attempt = 1;
        attempt <= MAX_RETRIES;
        attempt++
    ) {

        try {

            console.log(
                `Chunk ${chunkNumber}: API request started (attempt ${attempt})`
            );


            const response =
                await groq.chat.completions.create({

                    model: MODEL,

                    messages,

                    temperature: 0,

                    max_completion_tokens:
                        MAX_COMPLETION_TOKENS,

                    top_p: 1,

                    reasoning_effort: "none",

                    reasoning_format: "hidden",

                    response_format: {
                        type: "json_object"
                    },

                    stream: false
                });


            return response;


        } catch (error) {

            console.error(
                `Chunk ${chunkNumber}: attempt ${attempt} failed`
            );

            console.error(
                (error as any)?.message || error
            );


            if (
                !isRetryableError(error)
            ) {

                throw error;
            }


            if (
                attempt >= MAX_RETRIES
            ) {

                console.error(
                    `Chunk ${chunkNumber}: maximum retries reached`
                );

                throw error;
            }


            const retryDelay =
                getRetryDelay(error);


            console.log(
                `Chunk ${chunkNumber}: retrying in ${(retryDelay / 1000).toFixed(2)} seconds...`
            );


            await sleep(
                retryDelay
            );
        }
    }


    throw new Error(
        `Chunk ${chunkNumber}: API request failed`
    );
}


// ============================================================
// EVALUATE ONE CHUNK
// ============================================================

export async function evaluateQuestionChunk(
    questionChunk: TheoryQnA[],
    chunkNumber: number
): Promise<ChunkEvaluationResult> {

    const startTime =
        performance.now();


    const userPrompt = `
Evaluate the following questions and answers.

Questions and Answers:

${JSON.stringify(
        questionChunk,
        null,
        2
    )}

Return JSON only.
`;


    const messages: { role: "system" | "user"; content: string }[] = [

        {
            role: "system",

            content:
                theoryEvaluationSystemPrompt
        },

        {
            role: "user",

            content:
                userPrompt
        }

    ];


    try {

        const response =
            await callGroqWithRetry(
                messages,
                chunkNumber
            );


        const content =
            response
                ?.choices?.[0]
                ?.message
                ?.content;


        if (!content) {

            throw new UpstreamServiceError(
                `Chunk ${chunkNumber}: Empty response from model`
            );
        }


        let parsed: { per_question?: unknown[] };

        try {

            parsed =
                JSON.parse(content);

        } catch (error) {

            console.error(
                `Chunk ${chunkNumber}: Invalid JSON returned by model`
            );

            console.error(
                content
            );

            throw new UpstreamServiceError(
                `Chunk ${chunkNumber}: Invalid JSON returned by model`,
                error
            );
        }


        const endTime =
            performance.now();


        const timeTakenMs =
            endTime - startTime;


        const timeTakenSeconds =
            timeTakenMs / 1000;


        console.log(
            `Chunk ${chunkNumber}: completed in ${timeTakenSeconds.toFixed(2)} seconds`
        );


        return {

            chunk_number:
                chunkNumber,

            per_question:
                (parsed.per_question as any[]) || [],

            time_taken_ms:
                Number(
                    timeTakenMs.toFixed(2)
                ),

            time_taken_seconds:
                Number(
                    timeTakenSeconds.toFixed(2)
                )
        };


    } catch (error) {

        const endTime =
            performance.now();


        const timeTakenSeconds =
            (
                endTime - startTime
            ) / 1000;


        console.error(
            `Chunk ${chunkNumber}: failed after ${timeTakenSeconds.toFixed(2)} seconds`
        );


        throw error;
    }
}
