import prisma from "@/lib/prisma";
import { Prisma } from "@/lib/generated/prisma/client";

import {
    createInterviewDTO,
    createManyInterviewDTO,
    createManyCodingQuestionsDTO
} from "@/server/modules/interview/interview/interview.dto";
import { interview } from "@/server/modules/interview/interview/interview.types";

type sortParams = {
    sortBy: string,
    sortOrder: 'asc' | 'desc'
}

type FiterParams = {
    search?: string,
    question?: string,
    workspaceId?: string,
}

type FindManyInterviewParams = {
    skip: number,
    take: number,
    filters: FiterParams,
    sort: sortParams
}

export const InterviewRepository = {

    async FindMany({
        skip,
        take,
        filters,
        sort
    }: FindManyInterviewParams) {

        const where: Prisma.questionsWhereInput = {};

        if (filters?.search) {
            where.OR = [
                {
                    question: {
                        contains: filters.search,
                        mode: 'insensitive'
                    },
                    workspaceId: {
                        contains: filters.search,
                        mode: 'insensitive'
                    },
                }
            ]
        }

        if (filters?.question) {
            where.question = filters.question
        }

        if (filters?.workspaceId) {
            where.workspaceId = filters.workspaceId
        }


        const orderBy: Prisma.questionsOrderByWithRelationInput =
            sort ? {
                [sort.sortBy]: sort.sortOrder
            } : {
                createdAt: 'desc'
            }

        const [data, total] = await Promise.all([
            prisma.questions.findMany({
                skip,
                take,
                where,
                orderBy
            }),
            prisma.questions.count({ where })
        ])

        return { data, total };

    },

    async findById(id: string): Promise<interview | null> {
        return prisma.questions.findUnique({
            where: { id }
        })
    },

    async findByWorkspaceId(workspaceId: string): Promise<interview[]> {
        return prisma.questions.findMany({
            where: {
                workspaceId,
            },
            orderBy: {
                qno: "asc",
            },
        });
    },

    async create(data: createInterviewDTO): Promise<interview> {
        return prisma.questions.create({
            data
        })
    },

    async createMany(data: createManyInterviewDTO) {
        return prisma.questions.createMany({
            data,
        });
    },

    async createManyCodingQuestions(data: createManyCodingQuestionsDTO) {
        return prisma.codingQuestion.createMany({
            data,
        })
    },


    async getCodingQuestionsByWorkspaceId(workspaceId: string) {
        return prisma.codingQuestion.findMany({
            where: {
                workspaceId,
            },
            orderBy: {
                qno: "asc",
            },
        });
    },

    async delete(id: string): Promise<interview> {
        return prisma.questions.delete({
            where: { id }
        })
    }
}
