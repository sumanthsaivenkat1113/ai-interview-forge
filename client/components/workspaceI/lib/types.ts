export interface WorkspaceFormState {
  workspaceName: string;
  interviewType: "coding" | "theory" | "";
  subject: string;
  targetCompany: string;
  targetRole: string;
  yearsOfExperience: string;
}

export type WorkspaceFormField = keyof WorkspaceFormState;
