import prisma from "@/lib/prisma";

export async function getQuestionAnswersResults(id: string) {
  return prisma.workspace.findUnique({
    where: {
      id,
    },

    select: {
      id: true,
      workspace: true,
      target_role: true,

      // Theory / Interview Questions
      questions: {
        orderBy: {
          qno: "asc",
        },

        select: {
          id: true,
          qno: true,
          question: true,

          answers: {
            orderBy: {
              createdAt: "desc",
            },

            take: 1,

            select: {
              answer: true,
            },
          },
        },
      },

      // Coding Questions
      codingQuestions: {
        orderBy: {
          qno: "asc",
        },

        select: {
          id: true,
          qno: true,
          problem_statement: true,
          examples: true,

          codingAnswers: {
            orderBy: {
              createdAt: "desc",
            },

            take: 1,

            select: {
              answer: true,
            },
          },
        },
      },
    },
  });
}