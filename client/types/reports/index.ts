export type InterviewKind = "full" | "coding" | "theory";

export interface Workspace {
  id: string;
  workspace: string;
  target_company: string;
  target_role: string;
  years_of_experience: number;
  userId: number;
  createdAt: string;
  updatedAt: string;
}

export interface Subject {
  id: string;
  workspaceId: string;
  subject: string;
  createdAt: string;
  updatedAt: string;
}

export interface SubjectWiseWorkspace extends Workspace {
  subjects: Subject;
}

export interface WorkspaceListResponse {
  success: boolean;
  data: Workspace[];
  meta?: {
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

export interface InterviewAnalytics {
  workspaceId: string;
  score: number;
  questionsAsked: number;
  questionsAnswered: number;
  codingProblems: number;
  codingSolved: number;
  completed: boolean;
  theoryScore?: number;
  codingScore?: number;
  completedAt?: string;
}

export interface ClassifiedWorkspace extends Workspace {
  kind: InterviewKind;
  subject?: string;
  analytics?: InterviewAnalytics;
}

export type LoadStatus = "loading" | "ready" | "error";