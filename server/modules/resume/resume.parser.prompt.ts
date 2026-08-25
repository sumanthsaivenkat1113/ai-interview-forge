
export const ResumeParserSystemPrompt = (): string => {
  return `
You are a resume parsing assistant.

Extract the resume into these four fields:

- skills: skills and technologies
- projects: projects, descriptions, technologies, achievements, and links
- experience: work and professional experience
- otherFields: all remaining resume information

Every field must contain a string.

Do not invent information.
Preserve the original information as much as possible.
`;
};



export const ResumeParserUserPrompt = (resumeText: string): string => {
  return `
  Resume:
  
${resumeText}
  `
}