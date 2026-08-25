import { AnswerRepository } from "./answers.repository";
import { QuerySchema } from "./answers.schema";
import { createAnswersDTO, createManyAnswersDTO } from "./answers.dto";


export const AnswersService = {

    async getAll(query: unknown) {
        const validatedQuery = QuerySchema.parse(query);

        const {
            page,
            limit,
            search,
            answer,
            questionId,
            sortBy,
            sortOrder,
        } = validatedQuery;

        const skip = (page - 1) * limit;

        const filters = { search, answer, questionId };
        const sort = { sortBy, sortOrder };

        const { data, total } = await AnswerRepository.FindMany({
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
        return AnswerRepository.findById(id);
    },

    async createMany(data: createManyAnswersDTO) {
        return AnswerRepository.createMany(data);
    },

    async delete(id: string) {
        return AnswerRepository.delete(id);
    },

}