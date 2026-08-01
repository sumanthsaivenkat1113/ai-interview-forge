// server/modules/user/user.service.ts
import { auth, clerkClient } from "@clerk/nextjs/server";
import { UserRepository } from "./user.repository";

export const UserService = {
  async createOrSync() {
    const { userId } = await auth();

    if (!userId) {
      throw new Error("Unauthorized");
    }

    const client = await clerkClient();
    const clerkUser = await client.users.getUser(userId);

    return UserRepository.upsert({
      clerkId: clerkUser.id,
      email: clerkUser.primaryEmailAddress?.emailAddress ?? "",
      name:
        clerkUser.fullName ??
        `${clerkUser.firstName ?? ""} ${clerkUser.lastName ?? ""}`.trim(),
      profileImageUrl: clerkUser.imageUrl,
    });
  },

  async getMe() {
    const { userId } = await auth();

    if (!userId) {
      throw new Error("Unauthorized");
    }

    const user = await UserRepository.findByClerkId(userId);

    if (!user) {
      throw new Error("User not found");
    }

    return user;
  },
};