import prisma from "@/lib/prisma";
import { CreateUserDTO } from "./user.dto";

export const UserRepository = {
  findByClerkId(clerkId: string) {
    return prisma.user.findUnique({
      where: { clerkId },
    });
  },

  upsert(data: CreateUserDTO) {
    return prisma.user.upsert({
      where: { clerkId: data.clerkId },
      create: data,
      update: {
        email: data.email,
        name: data.name,
        profileImageUrl: data.profileImageUrl,
        lastLoginAt: new Date(),
      },
    });
  },
};