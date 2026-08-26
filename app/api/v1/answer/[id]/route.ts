import { NextRequest } from "next/server";
import { AnswersController } from "@/server/modules/interview/answers/answers.controller";
import { errorHandler } from "@/server/modules/shared/errorResponse";

type RouteParams = {
    params: Promise<{ id: string }>
}

export async function GET(
    req: NextRequest,
    { params }: RouteParams
) {
    try {
        const { id } = await params;
        return AnswersController.getById(id)
    } catch (error) {
        return errorHandler(error)
    }
}

export async function DELETE(
    req: NextRequest,
    { params }: RouteParams
) {
    try {
        const { id } = await params;
        return AnswersController.delete(id)
    } catch (error) {
        return errorHandler(error)
    }
}