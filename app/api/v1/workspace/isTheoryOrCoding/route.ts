import { NextRequest } from "next/server";
import { WorkspaceController } from "@/server/modules/workspace/workspace.controller";
import { errorHandler } from "@/server/modules/shared/errorResponse";


export async function POST(req: NextRequest) {
    try {
        return WorkspaceController.isTheoryOrCoding(req);
    } catch (error) {
        return errorHandler(error)
    }
}