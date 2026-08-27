import { NextRequest, NextResponse } from "next/server";
import {
  evaluateCodingInterview,
  getCodingEvaluationResult,
  CodingEvaluationError,
  getEvaluationIdByWorkspaceService
} from "./codingEvaluation.service";

/**
 * POST /api/v1/workspace4/[workspaceId]/evaluate/coding
 * Body (optional): { "language": "Python" }
 * Returns: { success: true, evaluationId: string }
 */
export async function evaluateCodingController(
  req: NextRequest,
  params: Promise<{ workspaceId: string }>
) {
  try {
    const { workspaceId } = await params;
    if (!workspaceId) {
      return NextResponse.json(
        { success: false, message: "workspaceId is required" },
        { status: 400 }
      );
    }

    let language = "JavaScript";
    try {
      const body = await req.json();
      if (body?.language && typeof body.language === "string") {
        language = body.language;
      }
    } catch {
      // No/invalid JSON body — fall back to the default language.
    }

    const { evaluationId } = await evaluateCodingInterview(workspaceId, language);

    return NextResponse.json(
      { success: true, evaluationId },
      { status: 201 }
    );
  } catch (err) {
    return handleError(err);
  }
}

/**
 * GET /api/v1/interview-evaluation/coding/[evaluationId]
 * Returns: { success: true, data: CodingEvaluation }
 */
export async function getCodingEvaluationController(
  // evaluationId: string
  _req: NextRequest,
  // params: { id: string }
  params: Promise<{ evaluationId: string }>

) {
  try {
    const { evaluationId } = await params;
    if (!evaluationId) {
      return NextResponse.json(
        { success: false, message: "evaluationId is required" },
        { status: 400 }
      );
    }

    const evaluation = await getCodingEvaluationResult(evaluationId);

    return NextResponse.json(
      { success: true, data: evaluation },
      { status: 200 }
    );
  } catch (err) {
    return handleError(err);
  }
}

function handleError(err: unknown) {
  if (err instanceof CodingEvaluationError) {
    return NextResponse.json(
      { success: false, message: err.message },
      { status: err.statusCode }
    );
  }

  console.error("[CodingEvaluationController] Unexpected error:", err);
  return NextResponse.json(
    { success: false, message: "Internal server error" },
    { status: 500 }
  );
}

// API:  /api/v1/coding-evaluation/lookup

export async function
  getEvaluationIdByWorkspaceController(req: NextRequest) {
  const body = await req.json();
  if (!body) {
    return NextResponse.json(
      { success: false, message: "workspaceId is required" },
    )
  }
  const workspaceId = body.workspaceId;
  const codingEvaluationId = await getEvaluationIdByWorkspaceService(workspaceId);
  return NextResponse.json(
    { success: true, data: codingEvaluationId }
  )
}