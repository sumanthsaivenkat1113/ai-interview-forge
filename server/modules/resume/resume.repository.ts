import { createResumeDTO } from "@/server/modules/resume/resume.dto";
import type { resume } from "@/server/modules/resume/resume.types"
import prisma from "@/lib/prisma";
import { Prisma } from "@/lib/generated/prisma/client";
// @ts-ignore
import pdf from "pdf-parse/lib/pdf-parse.js";
import fs from "fs";
import path from "path";


type sortParams = {
    sortBy: string;
    sortOrder: 'asc' | 'desc';
};

type FilterParams = {
    search?: string;
    fileName?: string;
    skills?: string;
    project?: string;
    experience?: string;
    otherFields?: string;
    workspaceId?: string;
};

type FindManyResumeParams = {
    skip: number;
    take: number;
    filters: FilterParams;
    sort: sortParams;
};



const uploadsDir = path.join(
    process.cwd(),
    "uploads"
);


if (!fs.existsSync(uploadsDir)) {
    fs.mkdirSync(uploadsDir, {
        recursive: true
    });
}


// Save uploaded PDF temporarily
export const savePdfFile = (
    buffer: Buffer,
    fileName: string
): string => {

    const filePath = path.join(
        uploadsDir,
        `${Date.now()}-${fileName}`
    );

    fs.writeFileSync(
        filePath,
        buffer
    );

    return filePath;
};


// Extract PDF text
export const parsePdf = async (
    buffer: Buffer
) => {

    const data = await pdf(buffer);

    return {
        text: data.text,
        pages: data.numpages
    };

};

// Delete temporary file
export const removePdfFile = (
    filePath: string
) => {

    if (
        filePath &&
        fs.existsSync(filePath)
    ) {
        fs.unlinkSync(filePath);
    }

};

export const ResumeRepository = {

    async FindMany({
        skip,
        take,
        filters,
        sort,
    }: FindManyResumeParams) {

        const where: Prisma.ResumePdfDetailsWhereInput = {};

        // General search
        if (filters?.search) {
            where.OR = [
                {
                    fileName: {
                        contains: filters.search,
                        mode: 'insensitive',
                    },
                },
                {
                    text: {
                        contains: filters.search,
                        mode: 'insensitive',
                    },
                },
                {
                    skills: {
                        contains: filters.search,
                        mode: 'insensitive',
                    },
                },
                {
                    project: {
                        contains: filters.search,
                        mode: 'insensitive',
                    },
                },
                {
                    experience: {
                        contains: filters.search,
                        mode: 'insensitive',
                    },
                },
                {
                    otherFields: {
                        contains: filters.search,
                        mode: 'insensitive',
                    },
                },
            ];
        }

        // Individual filters
        if (filters?.fileName) {
            where.fileName = {
                contains: filters.fileName,
                mode: 'insensitive',
            };
        }

        if (filters?.skills) {
            where.skills = {
                contains: filters.skills,
                mode: 'insensitive',
            };
        }

        if (filters?.project) {
            where.project = {
                contains: filters.project,
                mode: 'insensitive',
            };
        }

        if (filters?.experience) {
            where.experience = {
                contains: filters.experience,
                mode: 'insensitive',
            };
        }

        if (filters?.otherFields) {
            where.otherFields = {
                contains: filters.otherFields,
                mode: 'insensitive',
            };
        }

        // Since workspaceId is unique, this is an exact filter
        if (filters?.workspaceId) {
            where.workspaceId = filters.workspaceId;
        }

        const orderBy: Prisma.ResumePdfDetailsOrderByWithRelationInput =
            sort
                ? {
                    [sort.sortBy]: sort.sortOrder,
                }
                : {
                    createdAt: 'desc',
                };

        const [data, total] = await Promise.all([
            prisma.resumePdfDetails.findMany({
                skip,
                take,
                where,
                orderBy,
            }),

            prisma.resumePdfDetails.count({
                where,
            }),
        ]);

        return {
            data,
            total,
        };
    },


    async findById(id: string): Promise<resume | null> {
        return prisma.resumePdfDetails.findUnique({
            where: { id }
        })
    },

    async create(data: createResumeDTO): Promise<resume> {
        return prisma.resumePdfDetails.create({
            data
        })
    },

    async delete(id: string): Promise<resume> {
        return prisma.resumePdfDetails.delete({
            where: { id }
        })
    }

};
