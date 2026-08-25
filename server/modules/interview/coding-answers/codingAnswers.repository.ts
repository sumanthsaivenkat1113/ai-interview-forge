import prisma from "@/lib/prisma";
import { Prisma } from "@/lib/generated/prisma/client";

import { createCodingAnswersDTO, createManyCodingAnswersDTO } from "./codingAnswers.dto";
import type { codingAnswers } from "@/server/modules/interview/coding-answers/codingAnswers.types"

type sortParams = {
    sortBy: string,
    sortOrder: 'asc' | 'desc'
}

type FiterParams = {
    search?: string,
    answer?: string,
    codingQuestionId?: string,
}

type FindManyCodingAnswersParams = {
    skip: number,
    take: number,
    filters: FiterParams,
    sort: sortParams
}

export const CodingAnswerRepository = {


    async FindMany({
        skip,
        take,
        filters,
        sort
    }: FindManyCodingAnswersParams) {

        const where: Prisma.CodingAnswersWhereInput = {};

        if (filters?.search) {
            where.OR = [
                {
                    answer: {
                        contains: filters.search,
                        mode: 'insensitive'
                    },
                    codingQuestionId: {
                        contains: filters.search,
                        mode: 'insensitive'
                    },
                }
            ]
        }

        if (filters?.answer) {
            where.answer = filters.answer
        }

        if (filters?.codingQuestionId) {
            where.codingQuestionId = filters.codingQuestionId
        }


        const orderBy: Prisma.CodingAnswersOrderByWithRelationInput =
            sort ? {
                [sort.sortBy]: sort.sortOrder
            } : {
                createdAt: 'desc'
            }

        const [data, total] = await Promise.all([
            prisma.codingAnswers.findMany({
                skip,
                take,
                where,
                orderBy
            }),
            prisma.codingAnswers.count({ where })
        ])

        return { data, total };

    },

    async findById(id: string): Promise<codingAnswers | null> {
        return prisma.codingAnswers.findUnique({
            where: { id }
        })
    },

    async create(data: createCodingAnswersDTO): Promise<codingAnswers> {
        return prisma.codingAnswers.create({
            data
        })
    },

    async createMany(data: createManyCodingAnswersDTO) {
        return prisma.codingAnswers.createMany({
            data,
        })
    },

    async delete(id: string): Promise<codingAnswers> {
        return prisma.codingAnswers.delete({
            where: { id }
        })
    }


}