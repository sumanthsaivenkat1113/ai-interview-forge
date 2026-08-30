import { NextRequest } from "next/server";
import { WorkspaceController } from "@/server/modules/workspace/workspace.controller";
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
        return WorkspaceController.getByid(id)
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
        return WorkspaceController.delete(id)
    } catch (error) {
        return errorHandler(error)
    }
}