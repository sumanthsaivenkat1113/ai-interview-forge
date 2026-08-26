import { groqSTT } from "@/server/providers/groq/STT/groq.provider";
import { sttRepository } from "@/server/modules/stt/stt.repository";

export interface TranscribeInput {
    buffer: Buffer;
    fileName: string;
    mimeType: string;
}

export const sttService = {
    /**
     * Transcribes an audio buffer with Groq Whisper,
     * saves the resulting text, and returns the saved record.
     */
    async transcribeAndSave({
        buffer,
        fileName,
        mimeType,
    }: TranscribeInput) {
        const transcription = await groqSTT.transcribe({
            buffer,
            fileName,
            mimeType,
        });

        const text = (transcription.text ?? "").trim();

        if (!text) {
            return {
                text: "",
                saved: null,
            };
        }

        const saved = await sttRepository.create(text);

        return {
            text,
            saved,
        };
    },

    async getById(id: string) {
        return sttRepository.findById(id);
    },

    async getAll() {
        return sttRepository.findAll();
    },
};