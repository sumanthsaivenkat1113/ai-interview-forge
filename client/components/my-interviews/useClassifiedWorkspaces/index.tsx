import { useEffect, useState } from "react";
import {
  deleteWorkspaceRequest,
  fetchAllWorkspaces,
  fetchInterviewKind,
  fetchSubjectWiseWorkspaces,
} from "@/client/api/my-interviews";
import type { ClassifiedWorkspace, SubjectInfo } from "@/client/types/my-interviews";

// ---------------------------------------------------------------------------
// Main hook: fetch + classify + delete
// ---------------------------------------------------------------------------

export function useClassifiedWorkspaces() {
  const [workspaces, setWorkspaces] = useState<ClassifiedWorkspace[]>([]);

  const [status, setStatus] = useState<"loading" | "error" | "ready">(
    "loading"
  );

  const [deletingId, setDeletingId] = useState<string | null>(null);

  const [deleteError, setDeleteError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;

    async function run() {
      try {
        setStatus("loading");

        const [all, subjectWise] = await Promise.all([
          fetchAllWorkspaces(),
          fetchSubjectWiseWorkspaces(),
        ]);

        const subjectMap = new Map<string, SubjectInfo>(
          subjectWise.map((workspace) => [workspace.id, workspace.subjects])
        );

        const withSubject = all.filter((workspace) =>
          subjectMap.has(workspace.id)
        );

        const kinds = await Promise.all(
          withSubject.map((workspace) => fetchInterviewKind(workspace.id))
        );

        const kindMap = new Map<string, "coding" | "theory" | null>(
          withSubject.map((workspace, index) => [workspace.id, kinds[index]])
        );

        const classified: ClassifiedWorkspace[] = all.map((workspace) => {
          const subjectInfo = subjectMap.get(workspace.id);

          if (!subjectInfo) {
            return {
              ...workspace,
              kind: "full",
            };
          }

          const resolvedKind = kindMap.get(workspace.id);

          return {
            ...workspace,
            kind: resolvedKind ?? "unknown",
            subject: subjectInfo.subject,
          };
        });

        if (!cancelled) {
          setWorkspaces(classified);
          setStatus("ready");
        }
      } catch (error) {
        console.error("Failed to load workspaces", error);

        if (!cancelled) {
          setStatus("error");
        }
      }
    }

    run();

    return () => {
      cancelled = true;
    };
  }, []);

  async function deleteWorkspace(workspaceId: string) {
    setDeletingId(workspaceId);
    setDeleteError(null);

    const previousWorkspaces = workspaces;

    // Optimistic UI update.
    setWorkspaces((current) =>
      current.filter((workspace) => workspace.id !== workspaceId)
    );

    const success = await deleteWorkspaceRequest(workspaceId);

    if (!success) {
      // Restore workspace if API deletion failed.
      setWorkspaces(previousWorkspaces);

      setDeleteError("Unable to delete the workspace. Please try again.");
    }

    setDeletingId(null);

    return success;
  }

  return {
    workspaces,
    status,
    deletingId,
    deleteError,
    deleteWorkspace,
    clearDeleteError: () => setDeleteError(null),
  };
}