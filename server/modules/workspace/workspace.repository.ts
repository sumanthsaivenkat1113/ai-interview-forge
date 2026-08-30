import { createWorkspaceDTO } from "@/server/modules/workspace/workspace.dto";
import type { workspace } from "@/server/modules/workspace/workspace.types"
import prisma from "@/lib/prisma";
import { Prisma } from "@/lib/generated/prisma/client";

type sortParams = {
    sortBy: string,
    sortOrder: 'asc' | 'desc'
}

type FiterParams = {
    search?: string,
    workspace?: string,
    target_company?: string,
    target_role?: string,
    years_of_experience?: number,
}

type FindManyWorkspaceParams = {
    skip: number,
    take: number,
    filters: FiterParams,
    sort: sortParams
}

export const WorkspaceRepository = {

    async FindMany({
        skip,
        take,
        filters,
        sort,
    }: FindManyWorkspaceParams) {
        const where: Prisma.WorkspaceWhereInput = {};

        if (filters?.search) {
            where.OR = [
                {
                    workspace: {
                        contains: filters.search,
                        mode: 'insensitive',
                    },
                },
                {
                    target_company: {
                        contains: filters.search,
                        mode: 'insensitive',
                    },
                },
                {
                    target_role: {
                        contains: filters.search,
                        mode: 'insensitive',
                    },
                },
            ];
        }

        if (filters?.workspace) {
            where.workspace = {
                contains: filters.workspace,
                mode: 'insensitive',
            };
        }

        if (filters?.target_company) {
            where.target_company = {
                contains: filters.target_company,
                mode: 'insensitive',
            };
        }

        if (filters?.target_role) {
            where.target_role = {
                contains: filters.target_role,
                mode: 'insensitive',
            };
        }

        if (filters?.years_of_experience !== undefined) {
            where.years_of_experience = filters.years_of_experience;
        }

        const orderBy: Prisma.WorkspaceOrderByWithRelationInput = sort
            ? {
                [sort.sortBy]: sort.sortOrder,
            }
            : {
                createdAt: 'desc',
            };

        const [data, total] = await Promise.all([
            prisma.workspace.findMany({
                skip,
                take,
                where,
                orderBy,
            }),
            prisma.workspace.count({
                where,
            }),
        ]);

        return {
            data,
            total,
        };
    },

    async findById(id: string): Promise<workspace | null> {
        return prisma.workspace.findUnique({
            where: { id }
        })
    },

    async create(data: createWorkspaceDTO): Promise<workspace> {
        return prisma.workspace.create({
            data
        })
    },

    async delete(workspaceId: string) {
        return prisma.$transaction(async (tx) => {

            // Get workspace name because InterviewEvaluation
            // uses `workspace`, not `workspaceId`
            const workspaceRecord = await tx.workspace.findUnique({
                where: {
                    id: workspaceId,
                },
                select: {
                    workspace: true,
                },
            });

            if (!workspaceRecord) {
                throw new Error("Workspace not found");
            }

            /*
             * Delete coding evaluation.
             *
             * CodingEvaluationQuestion will cascade.
             */
            await tx.codingEvaluation.deleteMany({
                where: {
                    workspaceId,
                },
            });

            /*
             * Delete interview evaluation.
             *
             * All its children will cascade.
             */
            await tx.interviewEvaluation.deleteMany({
                where: {
                    workspace: workspaceRecord.workspace,
                },
            });

            /*
             * Delete questions.
             *
             * Answers will cascade.
             */
            await tx.questions.deleteMany({
                where: {
                    workspaceId,
                },
            });

            /*
             * Delete coding questions.
             *
             * CodingAnswers will cascade.
             */
            await tx.codingQuestion.deleteMany({
                where: {
                    workspaceId,
                },
            });

            /*
             * Delete direct workspace data
             */
            await tx.subject.deleteMany({
                where: {
                    workspaceId,
                },
            });

            await tx.resumePdfDetails.deleteMany({
                where: {
                    workspaceId,
                },
            });

            /*
             * Finally delete workspace
             */
            await tx.workspace.delete({
                where: {
                    id: workspaceId,
                },
            });

            return {
                success: true,
            };
        });
    },

    async getResume(workspaceId: string) {
        return prisma.resumePdfDetails.findUnique({
            where: {
                workspaceId,
            },
        });
    },


    async isWorkspaceUnique(
        userId: number,
        workspace: string
    ): Promise<boolean> {
        const existingWorkspace = await prisma.workspace.findUnique({
            where: {
                userId_workspace: {
                    userId,
                    workspace,
                },
            },
        });

        return existingWorkspace === null;
    },


    async findSubjectByWorkspaceId(workspaceId: string) {
        return prisma.subject.findUnique({
            where: {
                workspaceId
            },
        })
    },


    async createSubjectwise(
        workspace: string,
        target_company: string,
        target_role: string,
        years_of_experience: number,
        userId: number,
        subject: string
    ) {
        return prisma.workspace.create({
            data: {
                workspace,
                target_company,
                target_role,
                years_of_experience,
                userId,

                subjects: {
                    create: {
                        subject,
                    },
                },
            },

            include: {
                subjects: true,
            },
        });
    },

    async getAllSubjectwise() {
        return prisma.workspace.findMany({
            include: {
                subjects: true,
            },
        });
    },

    async isTheoryOrCoding(workspaceId: string): Promise<"theory" | "coding"> {
        const [theoryQuestion, codingQuestion] = await Promise.all([
            prisma.questions.findFirst({
                where: {
                    workspaceId,
                },
                select: {
                    id: true,
                },
            }),

            prisma.codingQuestion.findFirst({
                where: {
                    workspaceId,
                },
                select: {
                    id: true,
                },
            }),
        ]);

        // Theory questions exist and coding questions do not exist
        if (theoryQuestion && !codingQuestion) {
            return "theory";
        }

        // Otherwise, it is coding
        return "coding";

    }


}
