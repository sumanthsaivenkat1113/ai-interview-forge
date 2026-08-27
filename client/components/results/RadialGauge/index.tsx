"use client";

import { TONE_COLORS } from "@/client/utils/results";
import type { Tone } from "@/client/types/results";

export function RadialGauge({
    value,
    max,
    tone,
    size = 84,
}: {
    value: number;
    max: number;
    tone: Tone;
    size?: number;
}) {
    const strokeWidth = 7;
    const radius = (size - strokeWidth) / 2;
    const circumference = 2 * Math.PI * radius;
    const pct = Math.min(Math.max(max > 0 ? value / max : 0, 0), 1);
    const offset = circumference * (1 - pct);
    const color = TONE_COLORS[tone].solid;

    return (
        <div
            className="relative flex shrink-0 items-center justify-center"
            style={{ width: size, height: size }}
        >
            <svg width={size} height={size} style={{ transform: "rotate(-90deg)" }}>
                <circle
                    cx={size / 2}
                    cy={size / 2}
                    r={radius}
                    fill="none"
                    stroke="var(--border)"
                    strokeWidth={strokeWidth}
                />
                <circle
                    cx={size / 2}
                    cy={size / 2}
                    r={radius}
                    fill="none"
                    stroke={color}
                    strokeWidth={strokeWidth}
                    strokeDasharray={circumference}
                    strokeDashoffset={offset}
                    strokeLinecap="round"
                    className="transition-all duration-700 ease-out"
                />
            </svg>
            <div className="absolute flex flex-col items-center">
                <span className="text-xl font-semibold text-foreground tabular-nums">{value}</span>
            </div>
        </div>
    );
}
