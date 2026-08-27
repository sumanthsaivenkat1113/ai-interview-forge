export type Classification =
  | "Excellent"
  | "Good"
  | "Average"
  | "Needs Improvement"
  | "Poor";

export interface CodingEvaluationScores {
  algorithm_problem_solving: number;
  code_correctness: number;
  time_complexity: number;
  space_complexity: number;
  edge_cases: number;
  test_performance: number;
  code_quality: number;
  efficiency: number;
}

export interface CodingEvaluationTechnicalAnalysis {
  expected_time_complexity: string;
  expected_space_complexity: string;
  candidate_time_complexity: string;
  candidate_space_complexity: string;
  is_correct: boolean;
  tests_passed: number;
  tests_failed: number;
}

export interface CodingEvaluationQuestionResult {
  qno: number;
  scores: CodingEvaluationScores;
  technical_analysis: CodingEvaluationTechnicalAnalysis;
  strengths: string[];
  improvements: string[];
  critical_issues: string[];
}

/** Shape the LLM must return, matching the predefined JSON schema. */
export interface CodingEvaluationLLMResult {
  overall_score: number;
  classification: Classification;
  summary: string;
  questions: CodingEvaluationQuestionResult[];
}

/** Minimal shape we need from getQuestionAnswersService(). */
export interface QuestionAnswersData {
  workspace: string;
  target_role: string;
  QnA: {
    qno: number;
    question: string;
    answer: string;
  }[];
  codingQnA: {
    qno: number;
    problem_statement: string;
    examples: unknown;
    answer: string;
  }[];
}
