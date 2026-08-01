import { z } from 'zod';

export const userCreateSchema = z.object({
    clerkId: z.string().trim().min(1,),
    email: z.email().trim(),
    name: z.string().trim().min(1, 'title is required').max(100),
    profileImageUrl: z.string()
})