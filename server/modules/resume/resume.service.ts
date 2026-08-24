import { ResumeRepository } from "@/server/modules/resume/resume.repository";
import { QuerySchema } from "@/server/modules/resume/resume.schema"
import { createResumeDTO } from "@/server/modules/resume/resume.dto";
import {
    savePdfFile,
    parsePdf,
    removePdfFile,
} from "@/server/modules/resume/resume.repository"

export const ResumeService = {

    async getAll(query: unknown) {
        const validatedQuery = QuerySchema.parse(query);

        const {
            page,
            limit,
            search,
            fileName,
            skills,
            project,
            experience,
            otherFields,
            workspaceId,
            sortBy,
            sortOrder,
        } = validatedQuery;

        const skip = (page - 1) * limit;

        const filters = {
            search,
            fileName,
            skills,
            project,
            experience,
            otherFields,
            workspaceId,
        };
        const sort = { sortBy, sortOrder };

        const { data, total } = await ResumeRepository.FindMany({
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

    async processPdf(
        file: File,
    ) {
        const buffer = Buffer.from(await file.arrayBuffer());

        let tempFilePath = "";

        try {
            tempFilePath = savePdfFile(buffer, file.name);

            const pdfData = await parsePdf(buffer);

            return pdfData;

        } finally {
            if (tempFilePath) {
                removePdfFile(tempFilePath);
            }
        }
    },

    async findById(id: string) {
        return ResumeRepository.findById(id);
    },

    async create(data: createResumeDTO) {
        return ResumeRepository.create(data);
    },

    async delete(id: string) {
        return ResumeRepository.delete(id);
    },


}