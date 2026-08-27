"use client";

import { TONE_COLORS } from "@/client/utils/results";
import type { Tone } from "@/client/types/results";

export function StatCard({
    label,
    value,
    tone,
}: {
    label: string;
    value: string | number;
    tone?: Tone;
}) {
    return (
        <div className="rounded-xl border border-border bg-card px-4 py-4">
            <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">{label}</p>
            <p
                className={`mt-1.5 text-lg font-semibold tabular-nums ${tone ? TONE_COLORS[tone].fg : "text-foreground"
                    }`}
            >
                {value}
            </p>
        </div>
    );
}
