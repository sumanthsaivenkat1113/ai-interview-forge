import { NextRequest } from "next/server";
import { getEvaluationIdByWorkspaceController } from
    "@/server/modules/interview-evaluation/interview-evaluation/interviewEvaluation.controller";
import { errorHandler } from "@/server/modules/shared/errorResponse";

export async function POST(req: NextRequest) {
    try {
        return getEvaluationIdByWorkspaceController(req);
    } catch (error) {
        return errorHandler(error)
    }
}