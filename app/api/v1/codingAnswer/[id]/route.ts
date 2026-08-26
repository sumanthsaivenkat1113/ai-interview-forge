import { NextRequest } from "next/server";
import { CodingAnswersController } from "@/server/modules/interview/coding-answers/codingAnswers.controller";
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
        return CodingAnswersController.getById(id)
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
        return CodingAnswersController.delete(id)
    } catch (error) {
        return errorHandler(error)
    }
}