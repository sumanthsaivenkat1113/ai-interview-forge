import { NextRequest, NextResponse } from "next/server";
import { CheckService } from "@/server/modules/check/check.service";

export const CheckController = {
    async checkIsTheoryInterviewCompleted(req: NextRequest) {
        try {
            const body = await req.json();

            if (!body?.workspaceId) {
                return NextResponse.json(
                    {
                        success: false,
                        message: "workspaceId is required",
                    },
                    { status: 400 }
                );
            }

            const result =
                await CheckService.checkIsTheoryInterviewCompleted(
                    body.workspaceId
                );

            return NextResponse.json({
                success: true,
                data: result,
            });
        } catch (error) {
            console.error(
                "Failed to check theory interview:",
                error
            );

            return NextResponse.json(
                {
                    success: false,
                    message: "Failed to check theory interview",
                },
                { status: 500 }
            );
        }
    },

    async checkIsCodingInterviewCompleted(req: NextRequest) {
        try {
            const body = await req.json();

            if (!body?.workspaceId) {
                return NextResponse.json(
                    {
                        success: false,
                        message: "workspaceId is required",
                    },
                    { status: 400 }
                );
            }

            const result =
                await CheckService.checkIsCodingInterviewCompleted(
                    body.workspaceId
                );

            return NextResponse.json({
                success: true,
                data: result,
            });
        } catch (error) {
            console.error(
                "Failed to check coding interview:",
                error
            );

            return NextResponse.json(
                {
                    success: false,
                    message: "Failed to check coding interview",
                },
                { status: 500 }
            );
        }
    },
};