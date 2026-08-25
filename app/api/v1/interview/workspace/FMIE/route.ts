import { NextRequest } from "next/server";
import { InterviewController } from "@/server/modules/interview/interview/interview.controller";
import { errorHandler } from "@/server/modules/shared/errorResponse";

export async function POST(req: NextRequest) {
  try {
    return await InterviewController.createFMIE(req);
  } catch (error) {
    return errorHandler(error);
  }
}
