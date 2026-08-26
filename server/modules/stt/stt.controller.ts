// controllers/stt.controller.ts
//
// Controller layer: parses the HTTP request, calls the service,
// and shapes the HTTP response. No business logic, no Prisma, no Groq here.

import { NextRequest, NextResponse } from "next/server";
import { sttService } from "@/server/modules/stt/stt.service";

export const sttController = {
    async transcribe(req: NextRequest) {
        try {
            const formData = await req.formData();
            const file = formData.get("file");

            if (!file || !(file instanceof Blob)) {
                return NextResponse.json(
                    { error: "No audio file provided. Attach it under the 'file' field." },
                    { status: 400 }
                );
            }

            const arrayBuffer = await file.arrayBuffer();
            const buffer = Buffer.from(arrayBuffer);
            const fileName = (file as File).name || "audio.webm";
            const mimeType = file.type || "audio/webm";

            const { text, saved } = await sttService.transcribeAndSave({
                buffer,
                fileName,
                mimeType,
            });

            if (!text) {
                return NextResponse.json(
                    { error: "No speech detected in the audio." },
                    { status: 422 }
                );
            }

            return NextResponse.json({ text, id: saved?.id });
        } catch (err) {
            console.error("STT controller error:", err);
            return NextResponse.json(
                { error: "Transcription failed" },
                { status: 500 }
            );
        }
    },

    async list() {
        try {
            const records = await sttService.getAll();
            return NextResponse.json({ data: records });
        } catch (err) {
            console.error("STT controller list error:", err);
            return NextResponse.json(
                { error: "Failed to fetch records" },
                { status: 500 }
            );
        }
    },
};
