// repositories/stt.repository.ts
//
// Repository layer: the ONLY place that talks to Prisma directly.
// Services call this — never Prisma itself.

import prisma from "@/lib/prisma";

export const sttRepository = {
    async create(text: string) {
        return prisma.stt.create({
            data: { text },
        });
    },

    async findById(id: string) {
        return prisma.stt.findUnique({
            where: { id },
        });
    },

    async findAll() {
        return prisma.stt.findMany({
            orderBy: { id: "desc" },
        });
    },
};
