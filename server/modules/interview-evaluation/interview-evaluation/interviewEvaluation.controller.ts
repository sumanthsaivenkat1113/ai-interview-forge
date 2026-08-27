import { NextRequest, NextResponse } from "next/server";
import {
    runInterviewEvaluation,
    getInterviewEvaluation,
    getEvaluationIdByWorkspaceService
} from "./interviewEvaluation.service";
import { NotFoundError, ValidationError, UpstreamServiceError } from "../lib/errors";

// ============================================================
// ERROR -> HTTP STATUS MAPPING
// ============================================================

function toErrorResponse(error: unknown) {

    if (error instanceof ValidationError) {

        return NextResponse.json(
            { success: false, message: error.message },
            { status: 400 }
        );
    }

    if (error instanceof NotFoundError) {

        return NextResponse.json(
            { success: false, message: error.message },
            { status: 404 }
        );
    }

    if (error instanceof UpstreamServiceError) {

        return NextResponse.json(
            { success: false, message: error.message },
            { status: 502 }
        );
    }

    console.error(
        "Interview evaluation controller error:",
        error
    );

    return NextResponse.json(
        { success: false, message: "Internal server error" },
        { status: 500 }
    );
}


// ============================================================
// POST /api/v1/workspace4/[id]/evaluate
// ============================================================
//
// Fetches the workspace's Q&A, runs the LLM evaluation
// pipeline, and persists + returns the result.
//

export async function evaluateInterviewController(
    _req: NextRequest,
    // params: { id: string }
    params: Promise<{ workspaceId: string }>
) {

    try {

        const { workspaceId } = await params;

        if (!workspaceId) {
            return NextResponse.json(
                {
                    success: false,
                    error: "Workspace id is required",
                },
                { status: 400 }
            );
        }
        const evaluation =
            await runInterviewEvaluation(workspaceId);

        return NextResponse.json(
            { success: true, data: evaluation },
            { status: 201 }
        );

    } catch (error) {

        return toErrorResponse(error);
    }
}


// ============================================================
// GET /api/v1/interview-evaluation/[evaluationId]
// ============================================================
//
// Returns a previously-saved evaluation.
//

export async function getInterviewEvaluationController(
    _req: NextRequest,
    params: Promise<{ evaluationId: string }>
) {

    try {

        const { evaluationId } = await params;

        if (!evaluationId) {
            return NextResponse.json(
                {
                    success: false,
                    error: "evaluation id is required",
                },
                { status: 400 }
            );
        }

        const evaluation =
            await getInterviewEvaluation(evaluationId);

        return NextResponse.json(
            { success: true, data: evaluation },
            { status: 200 }
        );

    } catch (error) {

        return toErrorResponse(error);
    }
}


// API : /api/v1/theory-evaluation/lookup

export async function
    getEvaluationIdByWorkspaceController(req: NextRequest) {
    const body = await req.json();
    if (!body) {
        return NextResponse.json(
            { success: false, message: "workspaceId is required" },
        )
    }
    const workspaceId = body.workspaceId;
    const theoryEvaluationId = await getEvaluationIdByWorkspaceService(workspaceId);
    return NextResponse.json(
        { success: true, data: theoryEvaluationId }
    )
}