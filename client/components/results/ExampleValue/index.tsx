"use client";

export function ExampleValue({ label, value }: { label: string; value: string }) {
    return (
        <div>
            <p className="text-[10px] font-medium uppercase tracking-wide text-muted-foreground">{label}</p>
            <p className="mt-1 break-words font-mono text-xs leading-5 text-foreground/90">{value}</p>
        </div>
    );
}
