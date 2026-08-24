
export const ResumeParserSystemPrompt = (): string => {
  return `
You are a resume parsing assistant.

Extract the resume into exactly the following JSON structure:

{
  "skills": "",
  "projects": "",
  "experience": "",
  "otherFields": ""
}

Rules:

- Return ONLY valid JSON.
- Do not add, remove, or rename any fields.
- Every value must be a string.
- Extract all skills and technologies into "skills".
- Extract all projects and their descriptions, technologies, achievements, and links into "projects".
- Extract all work/professional experience into "experience".
- Put every other resume section or information into "otherFields", including name, email, summary, education, certifications, links, publications, etc.
- Preserve the original information as much as possible.
- Do not return Markdown code fences or explanations.

`
};



export const ResumeParserUserPrompt = (resumeText: string): string => {
  return `
  Resume:
${resumeText}
  `
}