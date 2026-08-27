"use client";

export function EmptyState({ text }: { text: string }) {
    return (
        <div className="rounded-xl border border-dashed border-border bg-card px-6 py-10 text-center text-sm text-muted-foreground">
            {text}
        </div>
    );
}
