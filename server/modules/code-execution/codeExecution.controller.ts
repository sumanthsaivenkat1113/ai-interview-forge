import { CodeExecutionService } from "./codeExecution.service";
import { NextRequest, NextResponse } from "next/server";

export const CodeExecutionController = {
    async codeExecute(req: NextRequest) {
        const body = await req.json();
        if (!body) {
            return NextResponse.json(
                { error: "code and compiler are required" },
                { status: 400 }
            );
        }
        const response = await CodeExecutionService.codeExecute(body)
        const result = await response.json();
        return NextResponse.json({
            success: true,
            data: {
                result,
                output: result.output,
            },
        });
    }
}