import { NextRequest } from "next/server";
import { AnswersController } from "@/server/modules/interview/answers/answers.controller";
import { errorHandler } from "@/server/modules/shared/errorResponse";

export async function GET(req: NextRequest) {
    try {
        return AnswersController.getAll(req);
    } catch (error) {
        return errorHandler(error)
    }
}

export async function POST(req: NextRequest) {
    try {
        return AnswersController.create(req);
    } catch (error) {
        return errorHandler(error)
    }
}