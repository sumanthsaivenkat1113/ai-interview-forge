"use client";

import { AlertTriangle, Loader2 } from "lucide-react";
import type { ClassifiedWorkspace } from "@/client/types/my-interviews";

// ---------------------------------------------------------------------------
// Delete confirmation modal
// ---------------------------------------------------------------------------

export function DeleteWorkspaceModal({
  workspace,
  isDeleting,
  onClose,
  onConfirm,
}: {
  workspace: ClassifiedWorkspace | null;
  isDeleting: boolean;
  onClose: () => void;
  onConfirm: () => Promise<void>;
}) {
  if (!workspace) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-background/80 px-4 backdrop-blur-sm"
      role="dialog"
      aria-modal="true"
      aria-labelledby="delete-workspace-title"
    >
      <div className="w-full max-w-md rounded-2xl border border-border bg-card p-6 shadow-2xl">
        <div className="flex items-start gap-4">
          <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-rose-500/10 text-rose-500">
            <AlertTriangle className="h-5 w-5" />
          </div>

          <div>
            <h2
              id="delete-workspace-title"
              className="text-lg font-semibold text-foreground"
            >
              Delete workspace?
            </h2>

            <p className="mt-2 text-sm leading-6 text-muted-foreground">
              You are about to permanently delete{" "}
              <span className="font-medium text-foreground">
                {workspace.workspace}
              </span>
              . This action cannot be undone.
            </p>
          </div>
        </div>

        <div className="mt-6 flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">
          <button
            type="button"
            onClick={onClose}
            disabled={isDeleting}
            className="rounded-lg border border-border bg-muted px-4 py-2.5 text-sm font-medium text-foreground transition hover:bg-muted/70 disabled:cursor-not-allowed disabled:opacity-50"
          >
            Cancel
          </button>

          <button
            type="button"
            onClick={onConfirm}
            disabled={isDeleting}
            className="inline-flex items-center justify-center gap-2 rounded-lg bg-rose-500 px-4 py-2.5 text-sm font-medium text-white transition hover:bg-rose-500/90 disabled:cursor-not-allowed disabled:opacity-70"
          >
            {isDeleting ? (
              <>
                <Loader2 className="h-4 w-4 animate-spin" />
                Deleting...
              </>
            ) : (
              "Delete workspace"
            )}
          </button>
        </div>
      </div>
    </div>
  );
}