"use client";

import { TONE_COLORS, toneForRatio } from "@/client/utils/results";
import { RadialGauge } from "@/client/components/results/RadialGauge";

export function ScoreCard({
    label,
    score,
    max,
    status,
    description,
}: {
    label: string;
    score: number;
    max: number;
    status: string;
    description: string;
}) {
    const tone = toneForRatio(score, max);
    const colors = TONE_COLORS[tone];

    return (
        <div className="flex items-center gap-5 rounded-xl border border-border bg-card p-6">
            <RadialGauge value={score} max={max} tone={tone} />
            <div className="min-w-0">
                <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
                    {label}
                </p>
                <div className={`mt-2 inline-flex rounded-full border px-2.5 py-1 text-xs font-medium ${colors.bg} ${colors.border} ${colors.fg}`}>
                    {status}
                </div>
                <p className="mt-2 text-sm leading-5 text-muted-foreground">{description}</p>
            </div>
        </div>
    );
}
