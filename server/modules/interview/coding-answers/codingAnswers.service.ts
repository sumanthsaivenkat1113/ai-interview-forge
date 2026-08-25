import { CodingAnswerRepository } from "./codingAnswers.repository";
import { QuerySchema } from "./codingAnswers.schema";
import { createCodingAnswersDTO, createManyCodingAnswersDTO } from "./codingAnswers.dto";

export const CodingAnswersService = {

    async getAll(query: unknown) {
        const validatedQuery = QuerySchema.parse(query);

        const {
            page,
            limit,
            search,
            answer,
            codingQuestionId,
            sortBy,
            sortOrder,
        } = validatedQuery;

        const skip = (page - 1) * limit;

        const filters = { search, answer, codingQuestionId };
        const sort = { sortBy, sortOrder };

        const { data, total } = await CodingAnswerRepository.FindMany({
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
        return CodingAnswerRepository.findById(id);
    },

    async createMany(data: createManyCodingAnswersDTO) {
        return CodingAnswerRepository.createMany(data);
    },

    async delete(id: string) {
        return CodingAnswerRepository.delete(id);
    },

}