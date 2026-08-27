"use client";

import { TONE_COLORS } from "@/client/utils/results";
import type { Tone } from "@/client/types/results";

export function Badge({ tone, children }: { tone: Tone; children: React.ReactNode }) {
    const colors = TONE_COLORS[tone];
    return (
        <span
            className={`shrink-0 rounded-full border px-2.5 py-1 text-xs font-medium ${colors.bg} ${colors.border} ${colors.fg}`}
        >
            {children}
        </span>
    );
}
