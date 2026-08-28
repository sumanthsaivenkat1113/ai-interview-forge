import { InterviewRepository } from "@/server/modules/interview/interview/interview.repository";
import { QuerySchema } from "@/server/modules/interview/interview/interview.schema";
import {
    finalInterviewQuestions,
    finalFMIEInterviewQuestions,
    CodingQuestions,
    TheoryQuestions
}
    from "@/server/modules/interview/interview-builder/interview-builder.service";

export const InterviewService = {
    async getAll(query: unknown) {
        const validatedQuery = QuerySchema.parse(query);

        const {
            page,
            limit,
            search,
            question,
            workspaceId,
            sortBy,
            sortOrder,
        } = validatedQuery;

        const skip = (page - 1) * limit;

        const filters = { search, question, workspaceId };
        const sort = { sortBy, sortOrder };

        const { data, total } = await InterviewRepository.FindMany({
            skip,
            take: limit,
            filters,
            sort,
        });

        const totalPages = Math.ceil(total / limit);

        return {
            data,
            meta: {
                page,
                limit,
                total,
                totalPages,
                hasNext: page < totalPages,
                hasPrev: page > 1,
            },
        };
    },

    async findById(id: string) {
        return InterviewRepository.findById(id);
    },

    async findByWorkspaceId(workspaceId: string) {
        return InterviewRepository.findByWorkspaceId(workspaceId)
    },

    async create(workspaceId: string) {
        const finalQuestions = await finalInterviewQuestions(workspaceId);
        console.log(`final Questions -> ${finalQuestions}`)
        return InterviewRepository.createMany(
            finalQuestions.map((q) => ({
                qno: q.qno,
                question: q.question,
                workspaceId,
            }))
        );
    },

    async createFMIE(workspaceId: string) {
        const finalQuestions = await finalFMIEInterviewQuestions(workspaceId);
        console.log(`final Questions -> ${finalQuestions}`)
        return InterviewRepository.createMany(
            finalQuestions.map((q) => ({
                qno: q.qno,
                question: q.question,
                workspaceId,
            }))
        );
    },

    async createTheoryInterviewQuestions(workspaceId: string){
        const theoryQuestions = await TheoryQuestions(workspaceId);
        return InterviewRepository.createMany(
            theoryQuestions.map((q) => ({
                qno: q.qno,
                question: q.question,
                workspaceId,
            }))
        );
    },


    async createCodingQuestions(workspaceId: string) {
        const codingQuestions = await CodingQuestions(workspaceId);
        console.log(`coding questions -> ${codingQuestions}`);
        return InterviewRepository.createManyCodingQuestions(
            codingQuestions.map((q) => ({
                qno: q.Qno,
                problem_statement: q.problem_statement,
                examples: q.Examples,
                workspaceId
            }))
        )
    },

    async findCodingQuestionsByWorkspcaeId(workspaceId: string) {
        return InterviewRepository.getCodingQuestionsByWorkspaceId(workspaceId)
    },

    async delete(id: string) {
        return InterviewRepository.delete(id);
    },
};