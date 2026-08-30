// ---------------------------------------------------------------------------
// Shared types for the workspace dashboard feature
// ---------------------------------------------------------------------------

export interface WorkspaceBase {
  id: string;
  workspace: string;
  target_company: string;
  target_role: string;
  years_of_experience: number;
  userId: number;
  createdAt: string;
  updatedAt: string;
}

export interface SubjectInfo {
  id: string;
  workspaceId: string;
  subject: string;
  createdAt: string;
  updatedAt: string;
}

export interface SubjectWiseWorkspace extends WorkspaceBase {
  subjects: SubjectInfo;
}

export type InterviewKind = "full" | "coding" | "theory" | "unknown";

export interface ClassifiedWorkspace extends WorkspaceBase {
  kind: InterviewKind;
  subject?: string;
}

export interface WorkspaceListResponse {
  success: boolean;
  data: WorkspaceBase[];
  meta: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
    hasNext: boolean;
    hasPrev: boolean;
  };
}

export interface SubjectWiseResponse {
  success: boolean;
  message: SubjectWiseWorkspace[];
}

export interface KindResponse {
  success: boolean;
  data: "coding" | "theory";
}

export interface DeleteWorkspaceResponse {
  success: boolean;
  message?: string;
}