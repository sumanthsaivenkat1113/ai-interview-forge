import { NextRequest, NextResponse } from "next/server";

import { AnswersService } from "./answers.service";
import { QuerySchema, AnswersCreateSchema } from "./answers.schema";
import { ApiResponse } from "@/server/modules/shared/apiResponse"
import { answers } from "./answers.types";

export const AnswersController = {

    async getAll(req: NextRequest) {
        const url = new URL(req.url);
        const query = Object.fromEntries(url.searchParams);
        const result = await AnswersService.getAll(
            QuerySchema.parse(query)
        );
        return NextResponse.json({
            success: true,
            ...result,
        } as ApiResponse<answers[]>);
    },


    async getById(id: string) {
        const answer = await AnswersService.findById(id);
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
        const validate = AnswersCreateSchema.parse(body);
        const answers = await AnswersService.createMany(validate);
        return Response.json({
            success: true,
            date: answers
        }, {
            status: 201
        })
    },


    async delete(id: string) {
        await AnswersService.delete(id);
        return NextResponse.json({
            success: true,
            message: "answer deleted successfully",
        });
    },

}