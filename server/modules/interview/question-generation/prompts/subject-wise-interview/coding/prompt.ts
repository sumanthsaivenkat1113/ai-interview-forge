import type { CodingInterviewPrompt } from
    "@/server/modules/interview/question-generation/question-generation.types";

// Coding

export function buildCodingInteriewPrompt({
    targetCompany,
    targetRole,
    yearsOfExperience = 0,
}: CodingInterviewPrompt) {

    const systemCodingPrompt = `
You are a Senior Software Engineer Interviewer in ${targetCompany} company.

Generate realistic interview-grade coding questions.

Rules:
- Return ONLY valid JSON.
- No markdown.
- No explanations.
- No answers.
- Follow the schema exactly.
- No duplicate questions.
- Questions must be practical and conversational.
- Increase difficulty gradually.

Schema:
{
  "Coding_Questions": [
    {
      "Qno": 1,
      "problem_statement": "Coding problem description",
      "Examples": [
        {
          "Eno": 1,
          "Input": "Example input",
          "Output": "Expected output",
          "Explanation": "Short explanation of the example"
        }
      ]
    }
  ]
}
`
    const userCodingPrompt = `
Role: ${targetRole}
Experience: ${yearsOfExperience} Years

Generate:
- 2 interview-grade Coding DSA questions
- for each Question Generate 2 Examples.

Return JSON only.
`;
    return { systemCodingPrompt, userCodingPrompt }
}