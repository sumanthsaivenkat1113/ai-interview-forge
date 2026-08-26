export interface CodingQuestion {
    id: string;
    qno: number;
    problem_statement: string;
    examples: unknown;
    workspaceId: string;
}

export interface ExecutionResult {
    output: string;
    error: string;
    status: string;
    exit_code: number;
    signal: string | null;
    time: string;
    memory: string;
    total: string;
}

export interface CodingAnswer {
    answer: string;
    codingQuestionId: string;
}

export interface ExampleItem {
    Input?: string;
    Output?: string;
    Explanation?: string;
}

export type ExecutionMeta = Pick<ExecutionResult, "status" | "time" | "memory">;
