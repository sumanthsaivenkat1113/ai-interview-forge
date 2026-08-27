import { NextRequest, NextResponse } from "next/server";
import { getQuestionAnswersService } from
    "@/server/modules/question-answers-result/questionAnswersResults.service"

export async function getQuestionAnswersController(
    req: NextRequest,
    params: Promise<{ id: string }>
) {
    try {
        const { id } = await params;

        if (!id) {
            return NextResponse.json(
                {
                    success: false,
                    error: "Workspace id is required",
                },
                { status: 400 }
            );
        }

        const data = await getQuestionAnswersService(id);

        return NextResponse.json({
            success: true,
            data,
        });
    } catch (error: any) {
        console.error("Workspace Q&A Controller error:", error);

        if (error.message === "Workspace not found") {
            return NextResponse.json(
                {
                    success: false,
                    error: error.message,
                },
                { status: 404 }
            );
        }

        return NextResponse.json(
            {
                success: false,
                error: error.message || "Internal server error",
            },
            { status: 500 }
        );
    }
}