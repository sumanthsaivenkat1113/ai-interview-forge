import type { Tone } from "./types";

/* =========================================================
   Design tokens — semantic color system
   All colors map to CSS custom properties defined in globals.css
========================================================= */

export const TONE_COLORS: Record<
    Tone,
    { fg: string; bg: string; border: string; solid: string }
> = {
    success: {
        fg: "text-emerald-400",
        bg: "bg-emerald-500/10",
        border: "border-emerald-500/20",
        solid: "#10B981",
    },
    warning: {
        fg: "text-amber-400",
        bg: "bg-amber-500/10",
        border: "border-amber-500/20",
        solid: "#F59E0B",
    },
    danger: {
        fg: "text-rose-400",
        bg: "bg-rose-500/10",
        border: "border-rose-500/20",
        solid: "#F43F5E",
    },
    accent: {
        fg: "text-primary",
        bg: "bg-primary/10",
        border: "border-primary/20",
        solid: "var(--primary)",
    },
};

export function toneForRatio(value: number, max: number): Tone {
    const pct = max > 0 ? value / max : 0;
    if (pct >= 0.7) return "success";
    if (pct >= 0.45) return "warning";
    return "danger";
}

export const NAV_SECTIONS = [
    { id: "overview", label: "Overview" },
    { id: "theory", label: "Theory evaluation" },
    { id: "theory-questions", label: "Theory questions" },
    { id: "coding", label: "Coding evaluation" },
    { id: "coding-problems", label: "Coding problems" },
] as const;
