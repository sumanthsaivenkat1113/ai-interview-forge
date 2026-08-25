
import { buildInterviewPrompts } from "@/server/modules/interview/question-generation/prompts/interview.prompt";
import type { BuildPromptArgs } from "@/server/modules/interview/question-generation/question-generation.types";

import { callGroqJSON } from "@/server/providers/groq/LLM/groq.provider"
import { GroqLLMModels } from "@/server/providers/groq/LLM/groq.models";

import { buildNoExperienceInterviewPrompt }
  from
  "@/server/modules/interview/question-generation/prompts/full-mock-interview/no-experience/prompt";

import { buildExperienceInterviewPrompt }
  from
  "@/server/modules/interview/question-generation/prompts/full-mock-interview/experience/prompt";

import { buildTheoryInterviewPrompt }
  from
  "@/server/modules/interview/question-generation/prompts/subject-wise-interview/theory/prompt";

import { buildCodingInteriewPrompt }
  from
  "@/server/modules/interview/question-generation/prompts/subject-wise-interview/coding/prompt";

import type {
  LLMCodingResponse,
  LLMTheoryResponse,
  FMI_NoExperienceInterviewPromptInput,
  FMI_ExperienceInterviewPromptInput,
  CodingInterviewPrompt,
  TheoryInterviewPrompt
}
  from "@/server/modules/interview/question-generation/question-generation.types"

export const QuestionGenerationService = {
  /**
   * Builds the interview prompt from workspace args and asks the LLM
   * to generate theory questions. Returns the parsed LLM response.
   */
  async generateTheoryQuestions(args: BuildPromptArgs): Promise<LLMTheoryResponse> {
    const { systemPrompt, userPrompt } = buildInterviewPrompts(args);

    const response = await callGroqJSON<LLMTheoryResponse>(
      systemPrompt,
      userPrompt,
      GroqLLMModels.openai_gpt_oos_120b,
      1500,
    );

    console.log(response)

    return response;
  },


  async generate_FMI_NoExperienceInterviewQuestions(
    args: FMI_NoExperienceInterviewPromptInput
  ): Promise<LLMTheoryResponse> {
    const { systemPrompt, userPrompt } = buildNoExperienceInterviewPrompt(args)

    const response = await callGroqJSON<LLMTheoryResponse>(
      systemPrompt,
      userPrompt,
      GroqLLMModels.openai_gpt_oos_120b,
      1500,
    );
    console.log(response)
    return response;
  },



  async generate_FMI_ExperienceInterviewQuestions(
    args: FMI_ExperienceInterviewPromptInput
  ): Promise<LLMTheoryResponse> {
    const { systemPrompt, userPrompt } = buildExperienceInterviewPrompt(args)

    const response = await callGroqJSON<LLMTheoryResponse>(
      systemPrompt,
      userPrompt,
      GroqLLMModels.openai_gpt_oos_120b,
      1500,
    );

    console.log(response)

    return response;
  },


  async generateTheoryInterviewQuestions(
    args: TheoryInterviewPrompt
  ): Promise<LLMTheoryResponse> {
    const { systemPrompt, userPrompt } = buildTheoryInterviewPrompt(args)

    const response = await callGroqJSON<LLMTheoryResponse>(
      systemPrompt,
      userPrompt,
      GroqLLMModels.openai_gpt_oos_120b,
      1000,
    );

    return response;
  },

  async generateCodingInterviewQuestions(
    args: CodingInterviewPrompt
  ): Promise<LLMCodingResponse> {
    const { systemCodingPrompt, userCodingPrompt } = buildCodingInteriewPrompt(args)

    const response = await callGroqJSON<LLMCodingResponse>(
      systemCodingPrompt,
      userCodingPrompt,
      GroqLLMModels.openai_gpt_oos_120b,
      1500,
    );
    console.log(response)
    return response;
  },


};
