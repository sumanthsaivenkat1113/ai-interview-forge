import { NextRequest, NextResponse } from "next/server";

import { InterviewService } from "@/server/modules/interview/interview/interview.service";
import { QuerySchema } from "@/server/modules/interview/interview/interview.schema";
import { ApiResponse, interview } from "@/server/modules/interview/interview/interview.types";

export const InterviewController = {

    async getAll(req: NextRequest) {
        const url = new URL(req.url);
        const query = Object.fromEntries(url.searchParams);
        const result = await InterviewService.getAll(
            QuerySchema.parse(query)
        );
        return NextResponse.json({
            success: true,
            ...result,
        } as ApiResponse<interview[]>);
    },

    async getById(id: string) {
        const interview = await InterviewService.findById(id);
        if (!interview) {
            return NextResponse.json(
                {
                    success: false,
                    error: "not found",
                },
                {
                    status: 404,
                }
            );
        }
        return NextResponse.json(
            {
                success: true,
                data: interview,
            },
            {
                status: 200,
            }
        );
    },


    async getByWorkspaceId(workspaceId: string) {
        try {
            const interview = await InterviewService.findByWorkspaceId(workspaceId)
            return NextResponse.json(
                {
                    success: true,
                    data: interview,
                },
                {
                    status: 200,
                }
            );

        } catch (error: any) {
            console.error(error);
            return NextResponse.json(
                {
                    success: false,
                    error: error.message
                },
                {
                    status: 500,
                }
            );
        }
    },

    async create(req: NextRequest) {
        try {
            const { workspaceId } = await req.json();
            const interview = await InterviewService.create(workspaceId)
            const codingQuestion = await InterviewService.createCodingQuestions(workspaceId)
            console.log('testing...')
            return NextResponse.json(
                {
                    success: true,
                    data: {
                        TheoryQuestions: interview,
                        CodingQuestions: codingQuestion,
                    },
                },
                {
                    status: 201,
                }
            );
        } catch (error: any) {
            console.error(error);
            return NextResponse.json(
                {
                    success: false,
                    error: error.message
                },
                {
                    status: 500,
                }
            );
        }
    },


    async createFMIE(req: NextRequest) {
        try {
            const { workspaceId } = await req.json();
            const interview = await InterviewService.createFMIE(workspaceId)
            const codingQuestion = await InterviewService.createCodingQuestions(workspaceId)
            console.log('testing... FMIE')
            return NextResponse.json(
                {
                    success: true,
                    data: {
                        TheoryQuestions: interview,
                        CodingQuestions: codingQuestion,
                    },
                },
                {
                    status: 201,
                }
            );
        } catch (error: any) {
            console.error(error);
            return NextResponse.json(
                {
                    success: false,
                    error: error.message
                },
                {
                    status: 500,
                }
            );
        }
    },



    async createManyCodingQuestions(req: NextRequest) {
        try {
            const { workspaceId } = await req.json();
            const interview = await InterviewService.createCodingQuestions(workspaceId)
            return NextResponse.json(
                {
                    success: true,
                    data: interview,
                },
                {
                    status: 201,
                }
            );
        } catch (error: any) {
            console.error(error);
            return NextResponse.json(
                {
                    success: false,
                    error: error.message
                },
                {
                    status: 500,
                }
            );
        }
    },


    async getCodingQuestionsByWorkspaceId(workspaceId: string) {
        try {
            const interview = await InterviewService.findCodingQuestionsByWorkspcaeId(workspaceId)
            return NextResponse.json(
                {
                    success: true,
                    data: interview,
                },
                {
                    status: 200,
                }
            );

        } catch (error: any) {
            console.error(error);
            return NextResponse.json(
                {
                    success: false,
                    error: error.message
                },
                {
                    status: 500,
                }
            );
        }
    },


    async createSubjectWiseTheoryQuestions(req: NextRequest) {
        try {
            const { workspaceId } = await req.json();
            const interview = await
                InterviewService.createTheoryInterviewQuestions(workspaceId)
            return NextResponse.json(
                {
                    success: true,
                    data: interview,
                },
                {
                    status: 201,
                }
            );
        } catch (error: any) {
            console.error(error);
            return NextResponse.json(
                {
                    success: false,
                    error: error.message
                },
                {
                    status: 500,
                }
            );
        }
    },



    async delete(id: string) {
        await InterviewService.delete(id);
        return NextResponse.json({
            success: true,
            message: "interview deleted successfully",
        });
    },


}