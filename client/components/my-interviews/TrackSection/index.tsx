"use client";

import { WorkspaceCard } from "@/client/components/my-interviews/WorkspaceCard";
import type { ClassifiedWorkspace } from "@/client/types/my-interviews";

// ---------------------------------------------------------------------------
// Track section
// ---------------------------------------------------------------------------

export function TrackSection({
  title,
  description,
  items,
  onDelete,
  deletingId,
}: {
  title: string;
  description: string;
  items: ClassifiedWorkspace[];
  onDelete: (workspace: ClassifiedWorkspace) => void;
  deletingId: string | null;
}) {
  if (items.length === 0) return null;

  return (
    <section className="mb-12">
      <div className="mb-5 flex items-end justify-between gap-4">
        <div>
          <h2 className="text-lg font-semibold text-foreground">{title}</h2>

          <p className="mt-1 text-sm text-muted-foreground">{description}</p>
        </div>

        <span className="rounded-full bg-muted px-2.5 py-1 text-xs font-medium text-muted-foreground">
          {items.length}
        </span>
      </div>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3">
        {items.map((workspace) => (
          <WorkspaceCard
            key={workspace.id}
            workspace={workspace}
            onDelete={onDelete}
            isDeleting={deletingId === workspace.id}
          />
        ))}
      </div>
    </section>
  );
}