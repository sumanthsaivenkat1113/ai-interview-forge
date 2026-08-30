"use client";

import { useRouter } from "next/navigation";
import { Loader2, Trash2 } from "lucide-react";
import { TRACK_META } from "@/client/metadata/my-interviews";
import type { ClassifiedWorkspace } from "@/client/types/my-interviews";

// ---------------------------------------------------------------------------
// Workspace card
// ---------------------------------------------------------------------------

export function WorkspaceCard({
  workspace,
  onDelete,
  isDeleting,
}: {
  workspace: ClassifiedWorkspace;
  onDelete: (workspace: ClassifiedWorkspace) => void;
  isDeleting: boolean;
}) {
  const router = useRouter();
  const meta = TRACK_META[workspace.kind];

  function handleNavigate() {
    if (!isDeleting) {
      router.push(meta.route(workspace.id));
    }
  }

  function handleDelete(event: React.MouseEvent<HTMLButtonElement>) {
    event.stopPropagation();
    event.preventDefault();

    onDelete(workspace);
  }

  return (
    <article
      onClick={handleNavigate}
      className={`group relative cursor-pointer overflow-hidden rounded-xl border border-border bg-card p-5 shadow-sm transition-all duration-200 ${meta.borderClass} hover:-translate-y-0.5 hover:shadow-lg`}
    >
      {/* Top section */}
      <div className="mb-5 flex items-start justify-between gap-4">
        <span
          className={`rounded-md border px-2 py-1 font-mono text-[10px] font-semibold tracking-widest ${meta.badgeClass}`}
        >
          {meta.label}
        </span>

        <div className="flex items-center gap-1">
          <span className="text-xs text-muted-foreground">
            {new Date(workspace.updatedAt).toLocaleDateString()}
          </span>

          <button
            type="button"
            onClick={handleDelete}
            disabled={isDeleting}
            aria-label={`Delete ${workspace.workspace}`}
            className="ml-2 inline-flex h-8 w-8 items-center justify-center rounded-md text-muted-foreground transition hover:bg-rose-500/10 hover:text-rose-500 disabled:cursor-not-allowed disabled:opacity-50"
          >
            {isDeleting ? (
              <Loader2 className="h-4 w-4 animate-spin" />
            ) : (
              <Trash2 className="h-4 w-4" />
            )}
          </button>
        </div>
      </div>

      {/* Workspace information */}
      <div>
        <h3 className="truncate text-base font-semibold text-foreground transition group-hover:text-primary">
          {workspace.workspace}
        </h3>

        <div className="mt-3 flex flex-wrap items-center gap-x-2 gap-y-2 text-sm text-muted-foreground">
          <span>{workspace.target_company}</span>

          <span className="text-muted-foreground/40">•</span>

          <span>{workspace.target_role}</span>

          <span className="text-muted-foreground/40">•</span>

          <span>
            {workspace.years_of_experience === 0
              ? "Fresher"
              : `${workspace.years_of_experience} yr exp`}
          </span>
        </div>

        {workspace.subject && (
          <div className="mt-4 border-t border-border pt-4">
            <span className="inline-flex items-center rounded-md bg-muted px-2.5 py-1 text-xs font-medium text-foreground">
              {workspace.subject}
            </span>
          </div>
        )}
      </div>

      {/* Footer */}
      <div className="mt-5 flex items-center justify-between border-t border-border pt-4">
        <span className="text-xs text-muted-foreground">
          View interview results
        </span>

        <span className="inline-flex items-center gap-1 text-xs font-medium text-primary opacity-0 transition group-hover:opacity-100">
          Open
          <span>→</span>
        </span>
      </div>
    </article>
  );
}