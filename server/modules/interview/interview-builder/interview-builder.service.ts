import { WorkspaceService } from "@/server/modules/workspace/workspace.service";
import { QuestionGenerationService } from "@/server/modules/interview/question-generation"
import { QuestionBankService } from "@/server/modules/interview/question-bank"
import type { FinalInterviewQuestion, TheoryInterviewQuestion } from
  "@/server/modules/interview/interview-builder/interview-builder.types";
import type {
  QuestionSection,
  TheoryQuestion,
  LLMTheoryResponse,
  CodingQuestionExample,
  CodingQuestions,
  LLMCodingResponse,
  FMI_NoExperienceInterviewPromptInput,
  FMI_ExperienceInterviewPromptInput,
  CodingInterviewPrompt,
  TheoryInterviewPrompt
} from "@/server/modules/interview/question-generation"


/**
 * Full Mock Interview with No Experience Interview Questions Generation
 * 
 * @param WorkspaceId 
 * @returns 
 */

async function getFMINoExperienceInterviewQuestions(
  WorkspaceId: string
): Promise<LLMTheoryResponse> {

  const resume = await WorkspaceService.getResume(WorkspaceId)
  if (!resume) {
    throw new Error("Resume not found");
  }
  const workspaceId = resume.workspaceId;

  const workspace = await WorkspaceService.findById(workspaceId);
  if (!workspace) {
    throw new Error("workspace not found");
  }
  const promptArgs: FMI_NoExperienceInterviewPromptInput = {
    targetCompany: workspace.target_company,
    targetRole: workspace.target_role,
    yearsOfExperience: workspace.years_of_experience,
    skills: resume.skills,
    projects: resume.project,
    skillsQuestions: 6,
    projectQuestions: 6,
    baseQuestions: 3,
    followUpQuestions: 3,
  };

  return QuestionGenerationService.generate_FMI_NoExperienceInterviewQuestions(promptArgs);

}


/**
 * Full Mock Interview with Experience Interview Questions Generation
 * 
 * @param WorkspaceId 
 * @returns 
 */


async function getFMIExperienceInterviewQuestions(
  WorkspaceId: string
): Promise<LLMTheoryResponse> {

  const resume = await WorkspaceService.getResume(WorkspaceId)
  if (!resume) {
    throw new Error("Resume not found");
  }
  const workspaceId = resume.workspaceId;

  const workspace = await WorkspaceService.findById(workspaceId);
  if (!workspace) {
    throw new Error("workspace not found");
  }

  const PromptAgrs: FMI_ExperienceInterviewPromptInput = {
    targetCompany: workspace.target_company,
    targetRole: workspace.target_role,
    yearsOfExperience: workspace.years_of_experience,
    skills: resume.skills,
    projects: resume.project,
    experience: resume.experience,
    skillsQuestions: 4,
    projectQuestions: 4,
    experienceQuestions: 4,
    baseQuestions: 2,
    followUpQuestions: 2,
  }

  return QuestionGenerationService.generate_FMI_ExperienceInterviewQuestions(PromptAgrs);

}


/**
 * Coding Questions
 * @param workspaceId 
 * @returns 
 */

async function getCodingQuestions(
  workspaceId: string
): Promise<LLMCodingResponse> {

  const workspace = await WorkspaceService.findById(workspaceId);
  if (!workspace) {
    throw new Error("workspace not found");
  }

  const PromptAgrs: CodingInterviewPrompt = {
    targetCompany: workspace.target_company,
    targetRole: workspace.target_role,
    yearsOfExperience: workspace.years_of_experience,
  }

  return QuestionGenerationService.generateCodingInterviewQuestions(PromptAgrs)

}

async function getTheoryQuestions(
  workspaceId: string
): Promise<TheoryInterviewQuestion[]> {

  const workspace = await WorkspaceService.findById(workspaceId);
  if (!workspace) {
    throw new Error("workspace not found");
  }

  const subject = await WorkspaceService.findSubjectByWorkspaceId(workspaceId)
  if (!subject) {
    throw new Error("subject not found");
  }

  const PromptAgrs: TheoryInterviewPrompt = {
    targetCompany: workspace.target_company,
    targetRole: workspace.target_role,
    subject: subject?.subject,
    yearsOfExperience: workspace.years_of_experience,
    baseQuestions: 5,
    followUpQuestions: 5,
  }

  const llmResponse: LLMTheoryResponse =
    await QuestionGenerationService.generateTheoryInterviewQuestions(PromptAgrs);

  const theoryQuestions = llmResponse.Theory_Questions;

  return theoryQuestions.map((q, index) => ({
    qno: index + 1,
    question: q.question,
    workspaceId,
  }));
}






/**
 * classify the Questions by sections
 * @param questions 
 * @param section 
 * @returns 
 */

function bySection(questions: TheoryQuestion[], section: TheoryQuestion["section"]) {
  return questions.filter((q) => q.section === section).map((q) => q.question);
}

/**
 * build the final FMI with NO Experince Questions
 * @param workspaceId 
 * @returns 
 */

export async function finalInterviewQuestions(
  workspaceId: string
): Promise<FinalInterviewQuestion[]> {
  const llmResponse = await getFMINoExperienceInterviewQuestions(workspaceId);
  const theoryQuestions = llmResponse.Theory_Questions;

  const skills = bySection(theoryQuestions, "Skills");
  const projects = bySection(theoryQuestions, "Projects");
  const experience = bySection(theoryQuestions, "Experience");

  const csQuestions = QuestionBankService.get3CSQuestions();
  const introQuestion = QuestionBankService.getIntroQuestion();
  const hrQuestions = QuestionBankService.getRandomHRQuestions(2);

  const [firstSection, secondSection] =
    Math.random() < 0.5 ? [projects, skills] : [skills, projects];

  const interview: string[] = [
    introQuestion,
    ...firstSection,
    ...secondSection,
    ...experience,
    ...csQuestions,
    ...hrQuestions,
  ];

  return interview.map((question, index) => ({
    qno: index + 1,
    question,
    workspaceId,
  }));
}

/**
 * build the final FMI with Experince Questions
 * @param workspaceId 
 * @returns 
 */

export async function finalFMIEInterviewQuestions(
  workspaceId: string
): Promise<FinalInterviewQuestion[]> {
  const llmResponse = await getFMIExperienceInterviewQuestions(workspaceId);
  const theoryQuestions = llmResponse.Theory_Questions;

  const skills = bySection(theoryQuestions, "Skills");
  const projects = bySection(theoryQuestions, "Projects");
  const experience = bySection(theoryQuestions, "Experience");

  const csQuestions = QuestionBankService.get3CSQuestions();
  const introQuestion = QuestionBankService.getIntroQuestion();
  const hrQuestions = QuestionBankService.getRandomHRQuestions(2);

  const [firstSection, secondSection] =
    Math.random() < 0.5 ? [projects, skills] : [skills, projects];

  const interview: string[] = [
    introQuestion,
    ...firstSection,
    ...secondSection,
    ...experience,
    ...csQuestions,
    ...hrQuestions,
  ];

  return interview.map((question, index) => ({
    qno: index + 1,
    question,
    workspaceId,
  }));
}


/**
 * 
 * @param workspaceId 
 */

export async function CodingQuestions(
  workspaceId: string
) {

  const llmResponse = await getCodingQuestions(workspaceId);
  console.log(llmResponse)
  const codingQuestion = llmResponse.Coding_Questions;

  return codingQuestion;
}


/**
 * 
 */

export async function TheoryQuestions(
  workspaceId: string
) {
  const theoryQuestions = await getTheoryQuestions(workspaceId);
  console.log(theoryQuestions)
  return theoryQuestions;
}