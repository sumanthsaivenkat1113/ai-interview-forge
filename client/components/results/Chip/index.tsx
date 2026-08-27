"use client";

export function Chip({ label, value, mono }: { label: string; value: string; mono?: boolean }) {
    return (
        <div className="flex items-center gap-2 rounded-full border border-border bg-muted px-3 py-1.5">
            <span className="text-[11px] font-medium uppercase tracking-wide text-muted-foreground">
                {label}
            </span>
            <span className={`text-xs font-medium text-foreground ${mono ? "font-mono" : ""}`}>
                {value}
            </span>
        </div>
    );
}
