import { UserService } from "./user.service";

export const UserController = {
  async create() {
    const user = await UserService.createOrSync();

    return Response.json(
      { success: true, data: user },
      { status: 200 }
    );
  },

  async me() {
    const user = await UserService.getMe();

    return Response.json({ success: true, data: user });
  },
};