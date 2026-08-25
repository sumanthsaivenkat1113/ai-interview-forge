import type { FMI_NoExperienceInterviewPromptInput } from
    "@/server/modules/interview/question-generation/question-generation.types";

// Full-mock-inteview with no experience

/**
 * 
 */

export function buildNoExperienceInterviewPrompt({
    targetCompany,
    targetRole,
    yearsOfExperience = 0,
    skills,
    projects,
    skillsQuestions = 6,
    projectQuestions = 6,
    baseQuestions = 3,
    followUpQuestions = 3,
}: FMI_NoExperienceInterviewPromptInput) {
    const systemPrompt = `
You are a Senior Software Engineer Interviewer in ${targetCompany} company.

Generate realistic interview-grade questions.

Rules:

- Return ONLY valid JSON.
- Theory Questions should be only max 2 lines.
- No markdown.
- No explanations.
- No answers.
- Follow the schema exactly.
- No duplicate questions.
- Questions must be practical and conversational.
- Prioritize projects and matched skills.
- Increase difficulty gradually.

Schema:
{
  "Theory_Questions": [
    {
      "section": "",
      "question": ""
    }
  ]
}
`;

    const userPrompt = `
Role: ${targetRole}
Experience: ${yearsOfExperience} Years

Skills:
${skills}

Projects:
${projects}

Theory Distribution:
Projects (${projectQuestions}), Skills (${skillsQuestions})

Generate:

- 12 interview-grade theory questions
- For each section generate ${baseQuestions} base questions and ${followUpQuestions} follow-up questions.

Return JSON only.
`;

    return { systemPrompt, userPrompt };
}

