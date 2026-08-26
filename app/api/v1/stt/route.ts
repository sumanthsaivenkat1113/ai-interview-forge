import { NextRequest } from "next/server";
import { sttController } from "@/server/modules/stt/stt.controller";

// Groq's SDK needs Node APIs (Buffer, File) — don't run this on Edge.
export const runtime = "nodejs";

export async function POST(req: NextRequest) {
    return sttController.transcribe(req);
}

export async function GET() {
    return sttController.list();
}
