/* =========================================================
   Types (unchanged from source data contract)
========================================================= */

export type WorkspaceQuestion = {
    qno: number;
    question: string;
    answer: string;
};

export type WorkspaceCodingQuestion = {
    qno: number;
    problem_statement: string;
    examples: {
        Input: string;
        Output: string;
    }[];
    answer: string;
};

export type WorkspaceData = {
    workspace: string;
    target_role: string;
    QnA: WorkspaceQuestion[];
    codingQnA: WorkspaceCodingQuestion[];
};

export type WorkspaceResponse = {
    success: boolean;
    data?: WorkspaceData;
    message?: string;
};

export type MissingConcept = {
    id: string;
    questionEvaluationId: string;
    concept: string;
};

export type TheoryQuestionEvaluation = {
    id: string;
    evaluationId: string;
    qno: number;
    accuracy: string;
    depth: string;
    clarity: string;
    relevance: string;
    questionScore: string;
    missingConcepts: MissingConcept[];
};

export type EvaluationResults = {
    success: boolean;
    results?: {
        theory: {
            success: boolean;
            data: {
                id: string;
                workspace: string;
                totalQuestions: number;
                evaluatedQuestions: number;
                overallScore: string;
                performanceLevel: string;
                recommendation: string;
                createdAt: string;
                updatedAt: string;

                categoryScores: {
                    id: string;
                    evaluationId: string;
                    category: string;
                    score: string;
                }[];

                strengths: {
                    id: string;
                    evaluationId: string;
                    description: string;
                }[];
                improvementAreas: {
                    id: string;
                    evaluationId: string;
                    description: string;
                }[];

                knowledgeGaps: string[];

                timeTaken: {
                    id: string;
                    evaluationId: string;
                    milliseconds: string;
                    seconds: string;
                };

                questions: TheoryQuestionEvaluation[];
            };
        };

        coding: {
            success: boolean;
            data: {
                id: string;
                workspaceId: string;
                workspace: string;
                targetRole: string;
                language: string;
                overallScore: number;
                classification: string;
                summary: string;
                createdAt: string;
                updatedAt: string;

                questions: {
                    id: string;
                    evaluationId: string;
                    qno: number;
                    algorithmProblemSolving: number;
                    codeCorrectness: number;
                    timeComplexity: number;
                    spaceComplexity: number;
                    edgeCases: number;
                    testPerformance: number;
                    codeQuality: number;
                    efficiency: number;
                    expectedTimeComplexity: string;
                    expectedSpaceComplexity: string;
                    candidateTimeComplexity: string;
                    candidateSpaceComplexity: string;
                    isCorrect: boolean;
                    testsPassed: number;
                    testsFailed: number;
                    strengths: string[];
                    improvements: string[];
                    criticalIssues: string[];
                }[];
            };
        };
    };
};

export type Tone = "success" | "warning" | "danger" | "accent";
