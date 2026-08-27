import prisma from "@/lib/prisma";
import { CodingEvaluationLLMResult } from "./codingEvaluation.types";

interface CreateCodingEvaluationParams {
  workspaceId: string;
  workspace: string;
  targetRole: string;
  language: string;
  result: CodingEvaluationLLMResult;
}

/**
 * Persists an LLM-generated coding evaluation, along with its per-question
 * breakdown, in a single nested-write transaction.
 */
export async function createCodingEvaluation(params: CreateCodingEvaluationParams) {
  const { workspaceId, workspace, targetRole, language, result } = params;

  return prisma.codingEvaluation.create({
    data: {
      workspaceId,
      workspace,
      targetRole,
      language,
      overallScore: result.overall_score,
      classification: result.classification,
      summary: result.summary,
      questions: {
        create: result.questions.map((q) => ({
          qno: q.qno,

          algorithmProblemSolving: q.scores.algorithm_problem_solving,
          codeCorrectness: q.scores.code_correctness,
          timeComplexity: q.scores.time_complexity,
          spaceComplexity: q.scores.space_complexity,
          edgeCases: q.scores.edge_cases,
          testPerformance: q.scores.test_performance,
          codeQuality: q.scores.code_quality,
          efficiency: q.scores.efficiency,

          expectedTimeComplexity: q.technical_analysis.expected_time_complexity,
          expectedSpaceComplexity: q.technical_analysis.expected_space_complexity,
          candidateTimeComplexity: q.technical_analysis.candidate_time_complexity,
          candidateSpaceComplexity: q.technical_analysis.candidate_space_complexity,
          isCorrect: q.technical_analysis.is_correct,
          testsPassed: q.technical_analysis.tests_passed,
          testsFailed: q.technical_analysis.tests_failed,

          strengths: q.strengths ?? [],
          improvements: q.improvements ?? [],
          criticalIssues: q.critical_issues ?? [],
        })),
      },
    },
    include: { questions: true },
  });
}

export async function findCodingEvaluationById(evaluationId: string) {
  return prisma.codingEvaluation.findUnique({
    where: { id: evaluationId },
    include: {
      questions: {
        orderBy: { qno: "asc" },
      },
    },
  });
}

export async function getEvaluationIdByWorkspace(workspaceId: string) {
  return prisma.codingEvaluation.findFirst({
    where: {
      workspaceId,
    },
    select: {
      id: true,
    },
  });
}