import prisma from "@/lib/prisma";
import { Prisma } from "@/lib/generated/prisma/client";

import { createAnswersDTO, createManyAnswersDTO } from "./answers.dto";
import { answers } from "./answers.types"

type sortParams = {
    sortBy: string,
    sortOrder: 'asc' | 'desc'
}

type FiterParams = {
    search?: string,
    answer?: string,
    questionId?: string,
}

type FindManyAnswersParams = {
    skip: number,
    take: number,
    filters: FiterParams,
    sort: sortParams
}


export const AnswerRepository = {

    async FindMany({
        skip,
        take,
        filters,
        sort
    }: FindManyAnswersParams) {

        const where: Prisma.answersWhereInput = {};

        if (filters?.search) {
            where.OR = [
                {
                    answer: {
                        contains: filters.search,
                        mode: 'insensitive'
                    },
                    questionId: {
                        contains: filters.search,
                        mode: 'insensitive'
                    },
                }
            ]
        }

        if (filters?.answer) {
            where.answer = filters.answer
        }

        if (filters?.questionId) {
            where.questionId = filters.questionId
        }


        const orderBy: Prisma.answersOrderByWithRelationInput =
            sort ? {
                [sort.sortBy]: sort.sortOrder
            } : {
                createdAt: 'desc'
            }

        const [data, total] = await Promise.all([
            prisma.answers.findMany({
                skip,
                take,
                where,
                orderBy
            }),
            prisma.answers.count({ where })
        ])

        return { data, total };

    },

    async findById(id: string): Promise<answers | null> {
        return prisma.answers.findUnique({
            where: { id }
        })
    },

    async create(data: createAnswersDTO): Promise<answers> {
        return prisma.answers.create({
            data
        })
    },

    async createMany(data: createManyAnswersDTO) {
        return prisma.answers.createMany({
            data,
        })
    },

    async delete(id: string): Promise<answers> {
        return prisma.answers.delete({
            where: { id }
        })
    }

}