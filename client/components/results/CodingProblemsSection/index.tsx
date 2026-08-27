"use client";

import { SectionHeading } from "@/client/components/results/SectionHeading";
import { EmptyState } from "@/client/components/results/EmptyState";
import { ExampleValue } from "@/client/components/results/ExampleValue";
import type { WorkspaceData } from "@/client/types/results";

export function CodingProblemsSection({ workspaceData }: { workspaceData: WorkspaceData }) {
    return (
        <section id="coding-problems" className="mt-14 scroll-mt-28">
            <SectionHeading
                title="Coding problems"
                description="Problem statements, examples, and reference solutions."
            />

            <div className="mt-5 space-y-4">
                {workspaceData.codingQnA.length === 0 ? (
                    <EmptyState text="No coding questions available." />
                ) : (
                    workspaceData.codingQnA.map((item) => (
                        <article
                            key={item.qno}
                            className="overflow-hidden rounded-xl border border-border bg-card"
                        >
                            <div className="flex items-start gap-3 border-b border-border bg-muted/30 px-5 py-4">
                                <span className="flex h-7 min-w-7 items-center justify-center rounded-md bg-muted text-xs font-semibold text-muted-foreground">
                                    {String(item.qno).padStart(2, "0")}
                                </span>
                                <h3 className="text-sm font-medium leading-6 text-foreground">
                                    {item.problem_statement}
                                </h3>
                            </div>

                            <div className="grid gap-5 p-5 lg:grid-cols-[0.8fr_1.2fr]">
                                <div>
                                    <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
                                        Examples
                                    </p>
                                    <div className="mt-2.5 space-y-2.5">
                                        {item.examples.map((example, index) => (
                                            <div
                                                key={index}
                                                className="rounded-lg border border-border bg-muted p-3.5"
                                            >
                                                <ExampleValue label="Input" value={example.Input} />
                                                <div className="my-2.5 h-px bg-border" />
                                                <ExampleValue label="Output" value={example.Output} />
                                            </div>
                                        ))}
                                    </div>
                                </div>

                                <div>
                                    <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
                                        Reference solution
                                    </p>
                                    <pre className="mt-2.5 max-h-[480px] overflow-auto rounded-lg border border-border bg-muted/60 p-4 text-[13px] leading-6 text-foreground/90">
                                        <code className="font-mono whitespace-pre-wrap break-words">{item.answer}</code>
                                    </pre>
                                </div>
                            </div>
                        </article>
                    ))
                )}
            </div>
        </section>
    );
}
