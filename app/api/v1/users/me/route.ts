export const dynamic = "force-dynamic";

import { UserController } from "@/server/modules/user/user.controller";
import { errorHandler } from "@/server/modules/shared/shared.error";

export async function GET() {
    try {
        return await UserController.me();
    } catch (error) {
        return errorHandler(error);
    }
}