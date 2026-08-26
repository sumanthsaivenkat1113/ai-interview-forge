"use client";

import { ExecutionMeta } from "@/client/types/coding-interview/types";

interface ConsoleProps {
    runError: string | null;
    submitError: string | null;
    isRunning: boolean;
    output: string | null;
    stderr: string;
    meta: ExecutionMeta | null;
}

export function Console({
    runError,
    submitError,
    isRunning,
    output,
    stderr,
    meta,
}: ConsoleProps) {
    return (
        <div className="h-48 shrink-0 border-t border-border bg-background">
            {/* CONSOLE HEADER */}

            <div className="flex h-10 items-center justify-between border-b border-border bg-card px-4">
                <div className="flex items-center gap-2">
                    <span className="h-1.5 w-1.5 rounded-full bg-primary shadow-[0_0_8px_hsl(var(--primary)/0.7)]" />

                    <span className="text-xs font-medium text-muted-foreground">
                        Console
                    </span>
                </div>

                {/* EXECUTION META */}

                {meta && (
                    <div className="flex items-center gap-3 text-[11px] text-muted-foreground/70">
                        <span
                            className={
                                meta.status === "success"
                                    ? "text-emerald-500"
                                    : "text-rose-500"
                            }
                        >
                            {meta.status}
                        </span>

                        <span>{meta.time}s</span>

                        <span>{meta.memory} KB</span>
                    </div>
                )}
            </div>

            {/* CONSOLE OUTPUT */}

            <div className="h-[calc(100%-40px)] overflow-y-auto px-4 py-3 font-mono text-xs">
                {/* RUN ERROR */}

                {runError && (
                    <div className="whitespace-pre-wrap break-words text-rose-500">
                        {runError}
                    </div>
                )}

                {/* SUBMIT ERROR */}

                {submitError && (
                    <div className="whitespace-pre-wrap break-words text-rose-500">
                        {submitError}
                    </div>
                )}

                {/* RUNNING */}

                {!runError && !submitError && isRunning && (
                    <div className="text-muted-foreground">
                        <span className="text-primary">$</span> Running...
                    </div>
                )}

                {/* INITIAL */}

                {!runError && !submitError && !isRunning && output === null && (
                    <div className="text-muted-foreground/60">
                        <span className="text-primary">$</span> Run your code
                        to see the output.
                    </div>
                )}

                {/* OUTPUT */}

                {!runError && !submitError && !isRunning && output !== null && (
                    <div>
                        <div className="whitespace-pre-wrap break-words text-foreground/90">
                            <span className="text-primary">$</span>{" "}
                            {output || "(no output)"}
                        </div>

                        {/* STDERR */}

                        {stderr && (
                            <div className="mt-3 whitespace-pre-wrap break-words text-rose-500">
                                {stderr}
                            </div>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
}