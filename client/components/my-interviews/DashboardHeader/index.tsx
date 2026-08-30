"use client";

// ---------------------------------------------------------------------------
// Dashboard header
// ---------------------------------------------------------------------------

export function DashboardHeader({
  totalWorkspaces,
  showCount,
}: {
  totalWorkspaces: number;
  showCount: boolean;
}) {
  return (
    <header className="mb-10 flex flex-col gap-5 border-b border-border pb-8 sm:flex-row sm:items-end sm:justify-between">
      <div>
        <div className="mb-3 inline-flex items-center rounded-full bg-primary/10 px-3 py-1 text-xs font-medium text-primary">
          Interview Workspace
        </div>

        <h1 className="text-3xl font-bold tracking-tight text-foreground">
          Your workspaces
        </h1>

        <p className="mt-2 max-w-xl text-sm leading-6 text-muted-foreground">
          Continue your interview preparation and review insights from
          previous sessions.
        </p>
      </div>

      {showCount && (
        <div className="rounded-xl border border-border bg-card px-4 py-3">
          <p className="text-xs text-muted-foreground">Total workspaces</p>

          <p className="mt-1 text-2xl font-semibold text-foreground">
            {totalWorkspaces}
          </p>
        </div>
      )}
    </header>
  );
}