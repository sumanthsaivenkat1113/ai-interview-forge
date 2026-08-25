import { z } from 'zod';

export const AnswersCreateSchema = z
    .array(
        z
            .object({
                qno: z.coerce.number().int().positive(),
                answer: z.string().trim().min(1),
                questionId: z.string().trim().min(1),
            })
            .strict()
    )
    .min(1);

export const QuerySchema = z.object({
    page: z.coerce.number().int().positive().default(1),
    limit: z.coerce.number().int().positive().max(100).default(10),
    search: z.string().trim().optional(),
    answer: z.string().trim().optional(),
    questionId: z.string().trim().optional(),
    sortBy: z.enum(['answer', 'questionId', 'createdAt']).default('createdAt'),
    sortOrder: z.enum(['asc', 'desc']).default('desc')
}).strict();