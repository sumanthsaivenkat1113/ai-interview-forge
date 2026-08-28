"use client";

import { Chip } from "@/client/components/results/Chip";

export function TopBar({
    title,
    role,
    language,
}: {
    title: string;
    role: string;
    language: string | null;
}) {
    return (
        <div className="border-b border-border bg-card">
            <div className="mx-auto max-w-6xl px-5 py-5 sm:px-8">
                <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                    <div>
                        <div className="flex items-center gap-2 text-xs font-medium uppercase tracking-wide text-muted-foreground">
                            <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
                            Evaluation report
                        </div>
                        <h1 className="mt-1.5 text-2xl font-semibold tracking-tight text-foreground">
                            {title}
                        </h1>
                    </div>

                    <div className="flex flex-wrap items-center gap-2">
                        <Chip label="Role" value={role} />
                        {
                            language && <Chip label="Language" value={language} mono />
                        }
                    </div>
                </div>
            </div>
        </div>
    );
}
