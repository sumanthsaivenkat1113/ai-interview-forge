export const dynamic = "force-dynamic";

import { UserController } from "@/server/modules/user/user.controller";
import { errorHandler } from "@/server/modules/shared/shared.error";

export async function POST() {
    try {
        return await UserController.create();
    } catch (error) {
        return errorHandler(error);
    }
}