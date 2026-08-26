import { NextRequest } from "next/server";
import { CodingAnswersController } from "@/server/modules/interview/coding-answers/codingAnswers.controller";
import { errorHandler } from "@/server/modules/shared/errorResponse";

export async function GET(req: NextRequest) {
    try {
        return CodingAnswersController.getAll(req);
    } catch (error) {
        return errorHandler(error)
    }
}

export async function POST(req: NextRequest) {
    try {
        return CodingAnswersController.create(req);
    } catch (error) {
        return errorHandler(error)
    }
}