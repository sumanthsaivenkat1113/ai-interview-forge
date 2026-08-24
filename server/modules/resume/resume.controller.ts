import { NextRequest, NextResponse } from "next/server";
import { ResumeService } from "@/server/modules/resume/resume.service";
import { QuerySchema, ResumeCreateSchema } from "@/server/modules/resume/resume.schema";
import { ApiResponse } from "@/server/modules/shared/apiResponse"
import type { resume } from "@/server/modules/resume/resume.types"
import { getResumeSections } from "@/server/modules/resume/resume.parser";

export const ResumeController = {

    async getAll(req: NextRequest) {
        const url = new URL(req.url);

        const query = Object.fromEntries(url.searchParams);

        const result = await ResumeService.getAll(
            QuerySchema.parse(query)
        );

        return NextResponse.json({
            success: true,
            ...result,
        } as ApiResponse<resume[]>);
    },

    async getByid(id: string) {
        const resume = await ResumeService.findById(id);
        if (!resume) {
            return Response.json({
                success: false,
                error: 'workspcae is not found!'
            }, {
                status: 404
            })
        }
        return Response.json({
            success: true,
            data: resume
        }, {
            status: 200
        })
    },


    async create(req: NextRequest) {
        const formData = await req.formData();

        const workspaceId = formData.get("workspaceId");
        const file = formData.get("file");

        // Validate workspaceId
        if (typeof workspaceId !== "string" || !workspaceId.trim()) {
            return NextResponse.json(
                {
                    success: false,
                    error: "workspaceId is required",
                },
                {
                    status: 400,
                }
            );
        }

        // Validate file
        if (!(file instanceof File)) {
            return NextResponse.json(
                {
                    success: false,
                    error: "No PDF file uploaded",
                },
                {
                    status: 400,
                }
            );
        }

        if (file.type !== "application/pdf") {
            return NextResponse.json(
                {
                    success: false,
                    error: "Only PDF files are allowed",
                },
                {
                    status: 400,
                }
            );
        }

        // Parse PDF
        const pdf = await ResumeService.processPdf(file);

        // Extract resume sections using LLM
        const resumeData = await getResumeSections(pdf.text);
        const data = {
            fileName: file.name,
            text: pdf.text,
            pages: pdf.pages,
            skills: resumeData.skills,
            project: resumeData.projects,
            experience: resumeData.experience || "none",
            otherFields: resumeData.otherFields,
            workspaceId,
        };
        const validate = ResumeCreateSchema.parse(data);
        const resume = await ResumeService.create(validate)
        return NextResponse.json(
            {
                success: true,
                data: resume,
            },
            {
                status: 201,
            }
        );
    },

    async delete(id: string) {
        await ResumeService.delete(id);
        return Response.json({
            success: true,
            message: 'resume deleted successfully'
        })
    }


}