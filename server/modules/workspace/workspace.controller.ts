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
    }

}