import { getQuestionAnswersService } from "@/server/modules/question-answers-result/questionAnswersResults.service";
import { groq, GROQ_CODING_EVAL_MODEL } from "../lib/llm/groqClient";
import {
  codingEvaluationSystemPrompt,
  buildCodingEvaluationUserPrompt,
} from "../lib/prompts/codingEvaluation.prompt";
import {
  createCodingEvaluation,
  findCodingEvaluationById,
  getEvaluationIdByWorkspace,
} from "./codingEvaluation.repository";
import { CodingEvaluationLLMResult } from "./codingEvaluation.types";

export class CodingEvaluationError extends Error {
  statusCode: number;

  constructor(message: string, statusCode = 500) {
    super(message);
    this.name = "CodingEvaluationError";
    this.statusCode = statusCode;
  }
}

/**
 * Orchestrates a full coding evaluation run:
 *  1. Load the workspace's Q&A / codingQnA payload.
 *  2. Build the LLM prompts.
 *  3. Call Groq and parse the structured JSON response.
 *  4. Validate the response against the expected schema.
 *  5. Persist it and return the new evaluation's id.
 */
export async function evaluateCodingInterview(
  workspaceId: string,
  language: string = "JavaScript"
) {
  const data = await getQuestionAnswersService(workspaceId);

  if (!data) {
    throw new CodingEvaluationError("Workspace not found", 404);
  }

  if (!data.codingQnA || data.codingQnA.length === 0) {
    throw new CodingEvaluationError(
      "No coding questions found for this workspace",
      400
    );
  }

  const userPrompt = buildCodingEvaluationUserPrompt({
    language,
    codingQnA: data.codingQnA,
  });

  let raw: string | null | undefined;

  try {
    const completion = await groq.chat.completions.create({
      model: GROQ_CODING_EVAL_MODEL,
      messages: [
        { role: "system", content: codingEvaluationSystemPrompt },
        { role: "user", content: userPrompt },
      ],
      temperature: 0,
      max_completion_tokens: 1500,
      top_p: 1,
      reasoning_effort: "none",
      reasoning_format: "hidden",
      response_format: { type: "json_object" },
      stream: false,
    });

    raw = completion.choices?.[0]?.message?.content;
  } catch (err) {
    console.error("[CodingEvaluationService] Groq call failed:", err);
    throw new CodingEvaluationError("Failed to reach the evaluation model", 502);
  }

  if (!raw) {
    throw new CodingEvaluationError("LLM returned an empty response", 502);
  }

  let parsed: CodingEvaluationLLMResult;
  try {
    parsed = JSON.parse(raw);
  } catch (err) {
    console.error("[CodingEvaluationService] Failed to parse LLM JSON:", raw);
    throw new CodingEvaluationError("Failed to parse LLM response as JSON", 502);
  }

  assertValidLLMResult(parsed);

  const evaluation = await createCodingEvaluation({
    workspaceId,
    workspace: data.workspace,
    targetRole: data.target_role,
    language,
    result: parsed,
  });

  return { evaluationId: evaluation.id };
}

export async function getCodingEvaluationResult(evaluationId: string) {
  const evaluation = await findCodingEvaluationById(evaluationId);

  if (!evaluation) {
    throw new CodingEvaluationError("Evaluation not found", 404);
  }

  return evaluation;
}

/**
 * Lightweight structural validation of the LLM's JSON response. Throws a
 * CodingEvaluationError (502 - bad upstream response) if the shape is off,
 * rather than letting a malformed payload silently corrupt the DB write.
 */
function assertValidLLMResult(
  result: any
): asserts result is CodingEvaluationLLMResult {
  const isValid =
    typeof result?.overall_score === "number" &&
    typeof result?.classification === "string" &&
    typeof result?.summary === "string" &&
    Array.isArray(result?.questions) &&
    result.questions.every(
      (q: any) =>
        typeof q?.qno === "number" &&
        q?.scores &&
        q?.technical_analysis &&
        Array.isArray(q?.strengths) &&
        Array.isArray(q?.improvements) &&
        Array.isArray(q?.critical_issues)
    );

  if (!isValid) {
    throw new CodingEvaluationError(
      "LLM response did not match the expected evaluation schema",
      502
    );
  }
}


export async function getEvaluationIdByWorkspaceService(workspaceId: string) {
  return getEvaluationIdByWorkspace(workspaceId);
}
