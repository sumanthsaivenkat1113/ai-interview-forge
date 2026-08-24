import { WorkspaceRepository } from "@/server/modules/workspace/workspace.repository";
import { QuerySchema } from "@/server/modules/workspace/workspace.schema";
import { createWorkspaceDTO } from "@/server/modules/workspace/workspace.dto"

export const WorkspaceService = {

    async getAll(query: unknown) {
        const validatedQuery = QuerySchema.parse(query);

        const {
            page,
            limit,
            search,
            workspace,
            target_company,
            target_role,
            years_of_experience,
            sortBy,
            sortOrder,
        } = validatedQuery;

        const skip = (page - 1) * limit;

        const filters = { search, workspace, target_company, target_role, years_of_experience, };
        const sort = { sortBy, sortOrder };

        const { data, total } = await WorkspaceRepository.FindMany({
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
        return WorkspaceRepository.findById(id);
    },

    async create(data: createWorkspaceDTO) {
        return WorkspaceRepository.create(data);
    },

    async delete(id: string) {
        return WorkspaceRepository.delete(id);
    },

    async getResume(workspaceId: string){
        return WorkspaceRepository.getResume(workspaceId)
    }

}