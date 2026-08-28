import { NextRequest, NextResponse } from "next/server";
import { WorkspaceService } from "@/server/modules/workspace/workspace.service"
import { QuerySchema, WorkspaceCreateSchema } from "@/server/modules/workspace/workspace.schema";
import type { workspace } from "@/server/modules/workspace/workspace.types"
import { ApiResponse } from "@/server/modules/shared/apiResponse"

export const WorkspaceController = {

    async getAll(req: NextRequest) {
        const url = new URL(req.url);

        const query = Object.fromEntries(url.searchParams);

        const result = await WorkspaceService.getAll(
            QuerySchema.parse(query)
        );

        return NextResponse.json({
            success: true,
            ...result,
        } as ApiResponse<workspace[]>);
    },

    async getByid(id: string) {
        const workspace = await WorkspaceService.findById(id);
        if (!workspace) {
            return Response.json({
                success: false,
                error: 'workspcae is not found!'
            }, {
                status: 404
            })
        }
        return Response.json({
            success: true,
            data: workspace
        }, {
            status: 200
        })
    },

    async create(req: Request) {
        const body = await req.json();
        const validate = WorkspaceCreateSchema.parse(body);
        const workspace = await WorkspaceService.create(validate);
        return Response.json({
            success: true,
            data: workspace
        }, {
            status: 201
        })
    },

    async delete(id: string) {
        await WorkspaceService.delete(id);
        return Response.json({
            success: true,
            message: 'workspace deleted successfully'
        })
    },




    async isWorkspaceUnique(req: Request) {
        try {
            const body = await req.json();

            const { userId, workspace } = body;

            if (
                userId === undefined ||
                userId === null ||
                !workspace ||
                typeof workspace !== "string"
            ) {
                return Response.json(
                    {
                        success: false,
                        error: "userId and workspace are required!",
                    },
                    {
                        status: 400,
                    }
                );
            }

            const isUnique = await WorkspaceService.isWorkspaceUnique(
                Number(userId),
                workspace.trim()
            );

            return Response.json(
                {
                    success: true,
                    data: isUnique,
                },
                {
                    status: 200,
                }
            );
        } catch (error) {
            console.error("Check workspace uniqueness error:", error);

            return Response.json(
                {
                    success: false,
                    error: "Failed to check workspace uniqueness",
                },
                {
                    status: 500,
                }
            );
        }
    },

    async createSubjectwise(req: NextRequest) {
        const body = await req.json();
        const {
            workspace,
            target_company,
            target_role,
            years_of_experience,
            userId,
            subject
        } = body;

        if (!workspace) {
            return Response.json(
                {
                    success: false,
                    error: "workspace is required!",
                },
                { status: 400 }
            );
        }

        if (!target_company) {
            return Response.json(
                {
                    success: false,
                    error: "target_company is required!",
                },
                { status: 400 }
            );
        }

        if (!target_role) {
            return Response.json(
                {
                    success: false,
                    error: "target_role is required!",
                },
                { status: 400 }
            );
        }
        if (
            years_of_experience === undefined ||
            years_of_experience === null ||
            typeof years_of_experience !== "number" ||
            Number.isNaN(years_of_experience)
        ) {
            return Response.json(
                {
                    success: false,
                    error: "years_of_experience is required!",
                },
                { status: 400 }
            );
        }

        if (!userId) {
            return Response.json(
                {
                    success: false,
                    error: "userId is required!",
                },
                { status: 400 }
            );
        }

        if (!subject) {
            return Response.json(
                {
                    success: false,
                    error: "subject is required!",
                },
                { status: 400 }
            );
        }

        const subejectWiseWorkspace = await WorkspaceService.createSubjectwise(
            workspace,
            target_company,
            target_role,
            years_of_experience,
            userId,
            subject
        )
        return Response.json({
            success: true,
            data: subejectWiseWorkspace
        }, {
            status: 201
        })
    },


}