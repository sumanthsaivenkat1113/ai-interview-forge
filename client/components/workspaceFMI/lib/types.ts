export interface WorkspaceFormState {
  workspaceName: string;
  resumeFile: File | null;
  jobDescription: string;
  targetCompany: string;
  targetRole: string;
  yearsOfExperience: string;
}

export type WorkspaceFormField = keyof WorkspaceFormState;
