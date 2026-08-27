import { NextRequest } from "next/server";
import { getQuestionAnswersController } from "@/server/modules/question-answers-result/questionAnswersResults.controller";

export async function GET(
    req: NextRequest,
    { params }: { params: Promise<{ id: string }> }
) {
    return getQuestionAnswersController(req, params);
}