import { z } from 'zod';

export const interviewCreateSchema = z.object({
    qno: z.coerce.number().int().positive(),
    question: z.string().trim().min(1),
    workspaceId: z.string().trim().min(1),
})


export const QuerySchema = z.object({
    page: z.coerce.number().int().positive().default(1),
    limit: z.coerce.number().int().positive().max(100).default(10),
    search: z.string().trim().optional(),
    question: z.string().trim().optional(),
    workspaceId: z.string().trim().optional(),
    sortBy: z.enum(['question', 'workspaceId', 'createdAt']).default('createdAt'),
    sortOrder: z.enum(['asc', 'desc']).default('desc')
}).strict();