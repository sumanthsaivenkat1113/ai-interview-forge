import { NextRequest } from "next/server";
import { CheckController } from "@/server/modules/check/check.controller";
import { errorHandler } from "@/server/modules/shared/errorResponse";

export async function POST(req: NextRequest) {
    try {
        return CheckController.checkIsTheoryInterviewCompleted(req);
    } catch (error) {
        return errorHandler(error)
    }
}