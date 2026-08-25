import type { FMI_ExperienceInterviewPromptInput } from
    "@/server/modules/interview/question-generation/question-generation.types";

// Full-mock-inteview with experience

/**
 * 
 */

export function buildExperienceInterviewPrompt({
    targetCompany,
    targetRole,
    yearsOfExperience,
    skills,
    projects,
    experience,
    skillsQuestions = 4,
    projectQuestions = 4,
    experienceQuestions = 4,
    baseQuestions = 2,
    followUpQuestions = 2,
}: FMI_ExperienceInterviewPromptInput) {
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

Experience:
${experience}

Theory Distribution:
Projects (${projectQuestions}), Skills (${skillsQuestions}), Experience (${experienceQuestions})

Generate:

- 12 interview-grade theory questions
- For each section generate ${baseQuestions} base questions and ${followUpQuestions} follow-up questions.

Return JSON only.
`;

    return { systemPrompt, userPrompt };
}
