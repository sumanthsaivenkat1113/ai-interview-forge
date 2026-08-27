import prisma from "@/lib/prisma";

export const CheckRepository = {
    async checkIsTheoryInterviewCompleted(workspaceId: string) {
        const totalQuestions = await prisma.questions.count({
            where: {
                workspaceId,
            },
        });

        if (totalQuestions === 0) {
            return {
                exists: false,
                completed: false,
            };
        }

        const unansweredQuestions = await prisma.questions.count({
            where: {
                workspaceId,
                answers: {
                    none: {},
                },
            },
        });

        return {
            exists: true,
            completed: unansweredQuestions === 0,
        };
    },

    async checkIsCodingInterviewCompleted(workspaceId: string) {
        // Check whether coding questions exist
        const totalCodingQuestions = await prisma.codingQuestion.count({
            where: {
                workspaceId,
            },
        });

        // No coding interview/questions exist
        if (totalCodingQuestions === 0) {
            return {
                exists: false,
                completed: false,
            };
        }

        // Count questions that have no answers
        const unansweredCodingQuestions =
            await prisma.codingQuestion.count({
                where: {
                    workspaceId,
                    codingAnswers: {
                        none: {},
                    },
                },
            });

        return {
            exists: true,
            completed: unansweredCodingQuestions === 0,
        };
    },
};