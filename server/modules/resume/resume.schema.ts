import { z } from 'zod';

export const ResumeCreateSchema = z.object({
    fileName: z.string().trim().min(3),
    text: z.string().trim().min(3),
    pages: z.coerce.number().int().nonnegative(),
    skills: z.string().trim().min(3),
    project: z.string().trim().min(3),
    experience: z.string().trim().min(3),
    otherFields: z.string().trim().min(3),
    workspaceId: z.string().trim().min(3),
}).strict();

export const QuerySchema = z.object({
    page: z.coerce.number().int().positive().default(1),
    limit: z.coerce.number().int().positive().max(100).default(10),
    search: z.string().trim().optional(),
    fileName: z.string().trim().optional(),
    skills: z.string().trim().optional(),
    project: z.string().trim().optional(),
    experience: z.string().trim().optional(),
    otherFields: z.string().trim().optional(),
    workspaceId: z.string().trim().optional(),
    sortBy: z.enum([
        'fileName',
        'skills',
        'project',
        'experience',
        'createdAt',
        'updatedAt',
    ]).default('createdAt'),
    sortOrder: z.enum([
        'asc',
        'desc',
    ]).default('desc'),
}).strict();


