"use client";

export function Metric({ label, value }: { label: string; value: number | string }) {
    return (
        <div className="rounded-lg border border-border bg-muted p-3.5">
            <p className="text-xs leading-5 text-muted-foreground">{label}</p>
            <p className="mt-1 text-lg font-semibold text-foreground tabular-nums">
                {value}
                <span className="ml-1 text-xs font-normal text-muted-foreground">/10</span>
            </p>
        </div>
    );
}
