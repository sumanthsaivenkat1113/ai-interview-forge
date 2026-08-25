import { NextRequest } from "next/server";
import { InterviewController } from "@/server/modules/interview/interview/interview.controller";
import { errorHandler } from "@/server/modules/shared/errorResponse";

type RouteParams = {
  params: Promise<{ id: string }>;
};

export async function GET(req: NextRequest, { params }: RouteParams) {
  try {
    const { id } = await params;
    return await InterviewController.getById(id);
  } catch (error) {
    return errorHandler(error);
  }
}

// NOTE: was previously `Delete` (lowercase tail) — Next.js only recognizes
// exact-case HTTP verb exports (GET, POST, PUT, PATCH, DELETE). The old
// name meant this endpoint never matched a DELETE request.
export async function DELETE(req: NextRequest, { params }: RouteParams) {
  try {
    const { id } = await params;
    return await InterviewController.delete(id);
  } catch (error) {
    return errorHandler(error);
  }
}
