import { NextRequest } from "next/server";
import { ResumeController } from "@/server/modules/resume/resume.controller";
import { errorHandler } from "@/server/modules/shared/errorResponse";

export async function GET(req: NextRequest) {
    try {
        return ResumeController.getAll(req);
    } catch (error) {
        return errorHandler(error)
    }
}

export async function POST(req: NextRequest) {
    try {
        return ResumeController.create(req);
    } catch (error) {
        return errorHandler(error)
    }
}