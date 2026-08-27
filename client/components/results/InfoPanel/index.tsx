"use client";

import { TONE_COLORS } from "@/client/utils/results";

export function InfoPanel({
    title,
    items,
    tone,
    emptyText,
}: {
    title: string;
    items: string[];
    tone: "success" | "warning";
    emptyText: string;
}) {
    const colors = TONE_COLORS[tone];

    return (
        <div className="rounded-xl border border-border bg-card p-5 sm:p-6">
            <h3 className="text-sm font-semibold text-foreground">{title}</h3>

            {items.length === 0 ? (
                <div className="mt-3 rounded-lg border border-border bg-muted p-4 text-sm text-muted-foreground">
                    {emptyText}
                </div>
            ) : (
                <div className="mt-3 space-y-2">
                    {items.map((item, index) => (
                        <div
                            key={index}
                            className={`rounded-lg border p-3.5 text-sm leading-6 ${colors.bg} ${colors.border} ${colors.fg}`}
                        >
                            {item}
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}
