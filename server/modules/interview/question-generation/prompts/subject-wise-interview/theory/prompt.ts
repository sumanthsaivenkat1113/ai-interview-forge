import type { TheoryInterviewPrompt } from
    "@/server/modules/interview/question-generation/question-generation.types";

// Theory

export function buildTheoryInterviewPrompt({
    targetCompany,
    targetRole,
    yearsOfExperience = 0,
    subject,
    baseQuestions = 5,
    followUpQuestions = 5,
}: TheoryInterviewPrompt) {

    const systemPrompt = `
You are a realistic ${targetCompany} interviewer hiring for ${targetRole}.

Generate practical, interview-grade questions appropriate for ${yearsOfExperience} years of experience.

Rules:
- Return ONLY valid JSON.
- Follow the schema exactly.
- No markdown, answers, explanations, or duplicate questions.
- Questions must be concise, conversational, and practical.
- Prioritize real-world usage, projects, and relevant skills.
- Start easy and gradually increase difficulty.
- Follow-up questions must relate to their base question.
- Theory questions must be at most 2 lines.

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
Subject: ${subject}

Generate ${baseQuestions} base questions and ${followUpQuestions} follow-up questions per section.
Generate 10 theory questions total.
Return JSON only.
`;

    return { systemPrompt, userPrompt };

}