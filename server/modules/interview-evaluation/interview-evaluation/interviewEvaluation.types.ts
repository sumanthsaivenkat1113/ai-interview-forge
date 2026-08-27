// ============================================================
// INPUT: Q&A DATA (from getQuestionAnswersService)
// ============================================================

export interface TheoryQnA {
    qno: number;
    question: string;
    answer: string;
}

export interface CodingQnA {
    qno: number;
    problem_statement: string;
    examples: unknown; // Prisma JsonValue
    answer: string;
}

export interface QuestionAnswersData {
    workspace: string;
    target_role: string;
    QnA: TheoryQnA[];
    codingQnA: CodingQnA[];
}


// ============================================================
// LLM RAW EVALUATION (per chunk, before normalization)
// ============================================================

export interface RawQuestionEvaluation {
    qno: number | string;
    accuracy: number | string;
    depth: number | string;
    clarity: number | string;
    relevance: number | string;
    missing?: unknown[];
}

export interface ChunkEvaluationResult {
    chunk_number: number;
    per_question: RawQuestionEvaluation[];
    time_taken_ms: number;
    time_taken_seconds: number;
}


// ============================================================
// NORMALIZED PER-QUESTION EVALUATION
// ============================================================

export interface QuestionScores {
    accuracy: number;
    depth: number;
    clarity: number;
    relevance: number;
}

export interface NormalizedQuestionEvaluation {
    qno: number;
    scores: QuestionScores;
    missing_concepts: string[];
    question_score: number;
}


// ============================================================
// FINAL AGGREGATED EVALUATION RESULT
// (this is the shape returned by the LLM pipeline, and the
// shape persisted via the repository)
// ============================================================

export interface CategoryScores {
    accuracy: number;
    depth: number;
    clarity: number;
    relevance: number;
}

export interface TimeTaken {
    milliseconds: number;
    seconds: number;
}

export interface ApiRequestSummary {
    chunk: number;
    questions: number;
    time_taken_seconds: number;
}

export interface EvaluationResult {
    workspace: string;
    total_questions: number;
    evaluated_questions: number;
    missing_questions: number[];
    overall_score: number;
    performance_level: string;
    category_scores: CategoryScores;
    recommendation: string;
    strengths: string[];
    improvement_areas: string[];
    knowledge_gaps: string[];
    time_taken: TimeTaken;
    api_requests: ApiRequestSummary[];
    per_question: NormalizedQuestionEvaluation[];
}
