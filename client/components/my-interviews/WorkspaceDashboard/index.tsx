"use client";

import { useMemo, useState } from "react";
import { DashboardHeader } from "@/client/components/my-interviews/DashboardHeader";
import {
  DeleteErrorBanner,
  EmptyWorkspacesState,
  LoadFailedState,
  LoadingGrid,
} from "@/client/components/my-interviews/Dashboard-states";
import { DeleteWorkspaceModal } from "@/client/components/my-interviews/DeleteWorkspaceModal";
import { TrackSection } from "@/client/components/my-interviews/TrackSection";
import { useClassifiedWorkspaces } from "@/client/components/my-interviews/useClassifiedWorkspaces";
import type { ClassifiedWorkspace } from "@/client/types/my-interviews";

// ---------------------------------------------------------------------------
// Root component
// ---------------------------------------------------------------------------

export default function WorkspaceDashboard() {
  const {
    workspaces,
    status,
    deletingId,
    deleteError,
    deleteWorkspace,
    clearDeleteError,
  } = useClassifiedWorkspaces();

  const [workspaceToDelete, setWorkspaceToDelete] =
    useState<ClassifiedWorkspace | null>(null);

  const grouped = useMemo(() => {
    return {
      full: workspaces.filter((workspace) => workspace.kind === "full"),
      coding: workspaces.filter((workspace) => workspace.kind === "coding"),
      theory: workspaces.filter((workspace) => workspace.kind === "theory"),
      unknown: workspaces.filter((workspace) => workspace.kind === "unknown"),
    };
  }, [workspaces]);

  const totalWorkspaces = workspaces.length;

  function openDeleteModal(workspace: ClassifiedWorkspace) {
    clearDeleteError();
    setWorkspaceToDelete(workspace);
  }

  function closeDeleteModal() {
    if (deletingId) return;

    setWorkspaceToDelete(null);
  }

  async function confirmDelete() {
    if (!workspaceToDelete) return;

    const success = await deleteWorkspace(workspaceToDelete.id);

    if (success) {
      setWorkspaceToDelete(null);
    }
  }

  return (
    <div className="min-h-screen bg-background text-foreground">
      <main className="mx-auto max-w-7xl px-6 py-10 sm:px-8 lg:px-10">
        <DashboardHeader
          totalWorkspaces={totalWorkspaces}
          showCount={status === "ready"}
        />

        {status === "loading" && <LoadingGrid />}

        {status === "error" && <LoadFailedState />}

        {status === "ready" && deleteError && (
          <DeleteErrorBanner
            message={deleteError}
            onDismiss={clearDeleteError}
          />
        )}

        {status === "ready" && workspaces.length === 0 && (
          <EmptyWorkspacesState />
        )}

        {status === "ready" && workspaces.length > 0 && (
          <>
            <TrackSection
              title="Full mock interviews"
              description="Complete interview sessions combining theory and coding."
              items={grouped.full}
              onDelete={openDeleteModal}
              deletingId={deletingId}
            />

            <TrackSection
              title="Coding interviews"
              description="Subject-focused technical coding rounds."
              items={grouped.coding}
              onDelete={openDeleteModal}
              deletingId={deletingId}
            />

            <TrackSection
              title="Theory interviews"
              description="Subject-focused conceptual interview rounds."
              items={grouped.theory}
              onDelete={openDeleteModal}
              deletingId={deletingId}
            />

            <TrackSection
              title="Unresolved workspaces"
              description="These workspaces could not be classified as coding or theory."
              items={grouped.unknown}
              onDelete={openDeleteModal}
              deletingId={deletingId}
            />
          </>
        )}
      </main>

      <DeleteWorkspaceModal
        workspace={workspaceToDelete}
        isDeleting={deletingId === workspaceToDelete?.id}
        onClose={closeDeleteModal}
        onConfirm={confirmDelete}
      />
    </div>
  );
}