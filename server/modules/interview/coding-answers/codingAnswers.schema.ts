import { z } from 'zod';

export const CodingAnswersCreateSchema = z
    .array(
        z
            .object({
                answer: z.string().trim().min(1),
                codingQuestionId: z.string().trim().min(1),
            })
            .strict()
    )
    .min(1);

export const QuerySchema = z.object({
    page: z.coerce.number().int().positive().default(1),
    limit: z.coerce.number().int().positive().max(100).default(10),
    search: z.string().trim().optional(),
    answer: z.string().trim().optional(),
    codingQuestionId: z.string().trim().optional(),
    sortBy: z.enum(['answer', 'codingQuestionId', 'createdAt']).default('createdAt'),
    sortOrder: z.enum(['asc', 'desc']).default('desc')
}).strict();