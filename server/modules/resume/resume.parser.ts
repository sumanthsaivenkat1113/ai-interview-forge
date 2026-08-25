import {
  ResumeParserSystemPrompt,
  ResumeParserUserPrompt,
} from "@/server/modules/resume/resume.parser.prompt";

import { callGroqJSONResumeParser } from "@/server/providers/groq/LLM/groq.provider";

import { GroqLLMModels } from "@/server/providers/groq/LLM/groq.models";

interface ResumeData {
  skills: string;
  projects: string;
  experience: string;
  otherFields: string;
}

/**
 * Extracts structured sections from a resume using Groq.
 */
export async function getResumeSections(
  resumeText: string
): Promise<ResumeData> {
  const systemPrompt = ResumeParserSystemPrompt();
  const userPrompt = ResumeParserUserPrompt(resumeText);

  const resumeSections = await callGroqJSONResumeParser<ResumeData>(
    systemPrompt,
    userPrompt,
    GroqLLMModels.openai_gpt_oss_20b,
    2000,
    0.1,
    {
      name: "resume_sections",
      strict: true,
      schema: {
        type: "object",

        properties: {
          skills: {
            type: "string",
          },

          projects: {
            type: "string",
          },

          experience: {
            type: "string",
          },

          otherFields: {
            type: "string",
          },
        },

        required: [
          "skills",
          "projects",
          "experience",
          "otherFields",
        ],

        additionalProperties: false,
      },
    }
  );

  return resumeSections;
}