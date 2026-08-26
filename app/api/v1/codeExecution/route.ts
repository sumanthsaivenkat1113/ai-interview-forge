import { NextResponse, NextRequest } from "next/server";
import { CodeExecutionController } from "@/server/modules/code-execution/codeExecution.controller";

export async function POST(request: NextRequest) {
    try {
        return CodeExecutionController.codeExecute(request)
    } catch (error) {
        console.error("[code-execution-api] Error:", error);
        return NextResponse.json(
            { error: "Failed to execute code" },
            { status: 500 }
        );
    }
}