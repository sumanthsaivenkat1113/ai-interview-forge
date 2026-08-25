import { NextRequest } from "next/server";
import { InterviewController } from "@/server/modules/interview/interview/interview.controller";
import { errorHandler } from "@/server/modules/shared/errorResponse";

type RouteParams = {
    params: Promise<{ id: string }>;
};

export async function GET(req: NextRequest, { params }: RouteParams) {
    try {
        const { id } = await params;
        return await InterviewController.getCodingQuestionsByWorkspaceId(id);
    } catch (error) {
        return errorHandler(error);
    }
}
