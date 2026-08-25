import { WorkspaceService } from "@/modules/workspace/workspace.service";
import { QuestionGenerationService } from "@/modules/question-generation";
import { QuestionBankService } from "@/modules/question-bank";
import type { LLMTheoryResponse, TheoryQuestion } from "@/modules/question-generation";
import type { FinalInterviewQuestion } from "@/modules/interview-builder/interview-builder.types";

/**
 * Builds workspace-specific prompt args and asks the LLM for theory questions.
 */
async function getLLMTheoryQuestions(workspaceId: string): Promise<LLMTheoryResponse> {
  const workspace = await WorkspaceService.findById(workspaceId);

  if (!workspace) {
    throw new Error("Workspace not found");
  }

  const hasExperience = Boolean(workspace.experience);
  console.log(`hasExperience = ${hasExperience}`)

  const promptArgs = {
    targetCompany: workspace.target_company,
    targetRole: workspace.target_role,
    yearsOfExperience: workspace.years_of_experience,
    skills: workspace.skills,
    projects: workspace.project,
    experience: workspace.experience || "none",
    skillsQuestions: hasExperience ? 4 : 6,
    projectQuestions: hasExperience ? 4 : 6,
    experienceQuestions: hasExperience ? 4 : 0,
    baseQuestions: hasExperience ? 2 : 3,
    followUpQuestions: hasExperience ? 2 : 3,
  };

  return QuestionGenerationService.generateTheoryQuestions(promptArgs);
}

function bySection(questions: TheoryQuestion[], section: TheoryQuestion["section"]) {
  return questions.filter((q) => q.section === section).map((q) => q.question);
}

/**
 * Composes the full interview question set for a workspace:
 * intro -> skills/projects (random order) -> experience -> CS -> HR.
 */
export async function finalInterviewQuestions(
  workspaceId: string
): Promise<FinalInterviewQuestion[]> {
  const llmResponse = await getLLMTheoryQuestions(workspaceId);
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
