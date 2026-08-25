import { NextRequest, NextResponse } from "next/server";

import { CodingAnswersService } from "./codingAnswers.service";
import { QuerySchema, CodingAnswersCreateSchema } from "./codingAnswers.schema";
import { ApiResponse } from "@/server/modules/shared/apiResponse"
import type { codingAnswers } from
    "@/server/modules/interview/coding-answers/codingAnswers.types"

export const CodingAnswersController = {
    async getAll(req: NextRequest) {
        const url = new URL(req.url);
        const query = Object.fromEntries(url.searchParams);
        const result = await CodingAnswersService.getAll(
            QuerySchema.parse(query)
        );
        return NextResponse.json({
            success: true,
            ...result,
        } as ApiResponse<codingAnswers[]>);
    },

    async getById(id: string) {
        const answer = await CodingAnswersService.findById(id);
        if (!answer) {
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
                data: answer
            },
            {
                status: 200,
            }
        );
    },


    async create(req: Request) {
        const body = await req.json();
        const validate = CodingAnswersCreateSchema.parse(body);
        const answers = await CodingAnswersService.createMany(validate);
        return Response.json({
            success: true,
            date: answers
        }, {
            status: 201
        })
    },

    async delete(id: string) {
        await CodingAnswersService.delete(id);
        return NextResponse.json({
            success: true,
            message: "answer deleted successfully",
        });
    },

}
