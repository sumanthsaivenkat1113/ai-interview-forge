export type QuestionSection = "Skills" | "Projects" | "Experience";

export interface TheoryQuestion {
  section: QuestionSection;
  question: string;
}

export interface LLMTheoryResponse {
  Theory_Questions: TheoryQuestion[];
}

export interface CodingQuestionExample {
  Eno: number,
  Input: string,
  Output: string,
  Explanation: string,
}

export interface CodingQuestions {
  Qno: number,
  problem_statement: string,
  Examples: CodingQuestionExample[]
}

export interface LLMCodingResponse {
  Coding_Questions: CodingQuestions[]
}


export interface BuildPromptArgs {
  targetCompany: string;
  targetRole: string;
  yearsOfExperience: number;
  skills: string;
  projects: string;
  experience: string;
  skillsQuestions: number;
  projectQuestions: number;
  experienceQuestions: number;
  baseQuestions: number;
  followUpQuestions: number;
}

// Full-mock-inteview with no experience

export interface FMI_NoExperienceInterviewPromptInput {
  targetCompany: string;
  targetRole: string;
  yearsOfExperience: number;
  skills: string;
  projects: string;
  skillsQuestions: number;
  projectQuestions: number;
  baseQuestions: number;
  followUpQuestions: number;
}

// Full-mock-inteview with experience

export interface FMI_ExperienceInterviewPromptInput {
  targetCompany: string;
  targetRole: string;
  yearsOfExperience: number;
  skills: string;
  projects: string;
  experience: string;
  skillsQuestions: number;
  projectQuestions: number;
  experienceQuestions: number;
  baseQuestions: number;
  followUpQuestions: number;
}

// Coding

export interface CodingInterviewPrompt {
  targetCompany: string;
  targetRole: string;
  yearsOfExperience: number;
}

// Theory

export interface TheoryInterviewPrompt {
  targetCompany: string;
  targetRole: string;
  subject: string,
  yearsOfExperience: number;
  baseQuestions: number;
  followUpQuestions: number;
}