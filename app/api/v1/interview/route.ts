import { NextRequest } from "next/server";
import { InterviewController } from "@/server/modules/interview/interview/interview.controller";
import { errorHandler } from "@/server/modules/shared/errorResponse";

export async function GET(req: NextRequest) {
  try {
    return await InterviewController.getAll(req);
  } catch (error) {
    return errorHandler(error);
  }
}
