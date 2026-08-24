import { NextRequest } from "next/server";
import { ResumeController } from "@/modules/features/resume/resume.controller";
import { errorHandler } from "@/modules/features/shared/errorResponse";

type RouteParams = {
    params: Promise<{ id: string }>
}

export async function GET(
    req: NextRequest,
    { params }: RouteParams
) {
    try {
        const { id } = await params;
        return ResumeController.getByid(id)
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
        return ResumeController.delete(id)
    } catch (error) {
        return errorHandler(error)
    }
}