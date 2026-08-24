import { z } from 'zod';

export const WorkspaceCreateSchema = z.object({
    userId:z.coerce.number().int().nonnegative(),
    workspace: z.string().trim().min(3),
    target_company: z.string().trim().min(3),
    target_role: z.string().trim().min(3),
    years_of_experience: z.coerce.number().int().nonnegative(),
}).strict();

export const QuerySchema = z.object({
    page: z.coerce.number().int().positive().default(1),
    limit: z.coerce.number().int().positive().max(100).default(10),
    search: z.string().trim().optional(),
    workspace: z.string().trim().optional(),
    target_company: z.string().trim().optional(),
    target_role: z.string().trim().optional(),
    years_of_experience: z.coerce.number().int().nonnegative().optional(),
    sortBy: z.enum([
        'workspace',
        'target_company',
        'target_role',
        'years_of_experience',
        'createdAt',
        'updatedAt',
    ]).default('createdAt'),
    sortOrder: z.enum(['asc', 'desc']).default('desc'),
}).strict();

