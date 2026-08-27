"use client";

export function ComplexityRow({
    label,
    expected,
    candidate,
}: {
    label: string;
    expected: string;
    candidate: string;
}) {
    return (
        <div className="rounded-lg border border-border bg-muted p-3.5">
            <p className="text-xs text-muted-foreground">{label}</p>
            <div className="mt-2 flex items-center justify-between gap-2">
                <div>
                    <p className="text-[10px] uppercase tracking-wide text-muted-foreground">Expected</p>
                    <p className="font-mono text-sm font-medium text-foreground">{expected || "—"}</p>
                </div>
                <div className="text-right">
                    <p className="text-[10px] uppercase tracking-wide text-muted-foreground">Candidate</p>
                    <p className="font-mono text-sm font-medium text-foreground">{candidate || "—"}</p>
                </div>
            </div>
        </div>
    );
}
