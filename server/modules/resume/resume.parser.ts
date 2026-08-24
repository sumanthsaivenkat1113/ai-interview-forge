import { ResumeParserSystemPrompt, ResumeParserUserPrompt } from "@/server/modules/resume/resume.parser.prompt";
import { callGroqJSON_NUP, callGroqJSON } from "@/server/providers/groq/LLM/groq.provider";
import { GroqLLMModels } from "@/server/providers/groq/LLM/groq.models";

/**
 * extracts the sections in resume.
 */

interface ResumeData {
    skills: string,
    projects: string,
    experience: string,
    otherFields: string,
}


export async function getResumeSections(
    resumeText: string
) {
    const systemPrompt = ResumeParserSystemPrompt();
    const userPrompt = ResumeParserUserPrompt(resumeText)

    const resumeSections = await callGroqJSON<ResumeData>(
        systemPrompt,
        userPrompt,
        GroqLLMModels.openai_gpt_oss_20b,
        3500,
        0.1
    );
    return resumeSections;
}
