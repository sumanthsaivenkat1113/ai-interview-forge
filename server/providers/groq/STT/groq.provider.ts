import { groqClient } from "@/server/providers/groq/groqClient";

export const groqSTT = {
    async transcribe({
        buffer,
        fileName,
        mimeType,
    }: {
        buffer: Buffer;
        fileName: string;
        mimeType: string;
    }) {

        const file = new File(
            [new Uint8Array(buffer)],
            fileName,
            {
                type: mimeType,
            }
        );

        return groqClient.audio.transcriptions.create({
            file,
            model: "whisper-large-v3-turbo",
            response_format: "json",
            language: "en",
            temperature: 0.0,
        });
    },
};