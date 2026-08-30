"use client";

import { AlertTriangle } from "lucide-react";

// ---------------------------------------------------------------------------
// Loading / error / empty states for the dashboard
// ---------------------------------------------------------------------------

export function LoadingGrid() {
  return (
    <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3">
      {Array.from({ length: 6 }).map((_, index) => (
        <div
          key={index}
          className="h-52 animate-pulse rounded-xl border border-border bg-card"
        />
      ))}
    </div>
  );
}

export function LoadFailedState() {
  return (
    <div className="rounded-xl border border-rose-500/20 bg-rose-500/5 p-5">
      <div className="flex gap-3">
        <div className="text-rose-500">
          <AlertTriangle className="h-5 w-5" />
        </div>

        <div>
          <h3 className="font-medium text-foreground">
            Unable to load workspaces
          </h3>

          <p className="mt-1 text-sm text-muted-foreground">
            Something went wrong while loading your workspaces. Please
            refresh the page and try again.
          </p>
        </div>
      </div>
    </div>
  );
}

export function DeleteErrorBanner({
  message,
  onDismiss,
}: {
  message: string;
  onDismiss: () => void;
}) {
  return (
    <div className="mb-6 flex items-center justify-between gap-4 rounded-xl border border-rose-500/20 bg-rose-500/5 p-4">
      <p className="text-sm text-rose-500">{message}</p>

      <button
        type="button"
        onClick={onDismiss}
        className="text-xs font-medium text-muted-foreground hover:text-foreground"
      >
        Dismiss
      </button>
    </div>
  );
}

export function EmptyWorkspacesState() {
  return (
    <div className="rounded-2xl border border-dashed border-border bg-card px-6 py-20 text-center">
      <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-xl bg-muted text-muted-foreground">
        <svg
          viewBox="0 0 24 24"
          className="h-6 w-6"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.8"
        >
          <rect x="3" y="4" width="18" height="16" rx="2" />
          <path d="M7 8h10" />
          <path d="M7 12h6" />
        </svg>
      </div>

      <h2 className="mt-5 text-lg font-semibold text-foreground">
        No workspaces yet
      </h2>

      <p className="mx-auto mt-2 max-w-sm text-sm leading-6 text-muted-foreground">
        Start a mock interview to create your first workspace and track your
        interview progress.
      </p>
    </div>
  );
}