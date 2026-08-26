"use client";

import { CodingQuestion, ExampleItem } from "@/client/types/coding-interview/types";

interface ProblemPanelProps {
    currentQuestion: CodingQuestion;
}

export function ProblemPanel({ currentQuestion }: ProblemPanelProps) {
    const examples = Array.isArray(currentQuestion.examples)
        ? (currentQuestion.examples as ExampleItem[])
        : [];

    return (
        <section className="flex w-[40%] min-w-[320px] flex-col overflow-hidden rounded-xl border border-border bg-card shadow-2xl shadow-black/20">
            {/* PROBLEM HEADER */}

            <div className="flex h-11 shrink-0 items-center border-b border-border bg-card px-4">
                <span className="text-sm font-semibold text-foreground">
                    Problem
                </span>
            </div>

            {/* PROBLEM CONTENT */}

            <div className="flex-1 overflow-y-auto px-5 py-6">
                {/* QUESTION NUMBER */}

                <div className="mb-3 flex items-center gap-2">
                    <span className="rounded-md bg-primary/10 px-2 py-1 text-[11px] font-medium text-primary ring-1 ring-primary/20">
                        Question {currentQuestion.qno}
                    </span>
                </div>

                {/* TITLE */}

                <h1 className="text-xl font-semibold leading-8 text-foreground">
                    {currentQuestion.qno}. {currentQuestion.problem_statement}
                </h1>

                {/* DESCRIPTION */}

                <div className="mt-6">
                    <p className="whitespace-pre-wrap text-sm leading-7 text-muted-foreground">
                        {currentQuestion.problem_statement}
                    </p>
                </div>

                {/* EXAMPLES */}

                {examples.length > 0 && (
                    <div className="mt-8">
                        <h2 className="mb-4 text-sm font-semibold text-foreground">
                            Examples
                        </h2>

                        <div className="space-y-5">
                            {examples.map((example, index) => (
                                <div key={index}>
                                    <p className="mb-2 text-xs font-medium text-muted-foreground">
                                        Example {index + 1}
                                    </p>

                                    <div className="rounded-lg border border-border bg-background p-4 font-mono text-xs leading-6 shadow-inner">
                                        {/* INPUT */}

                                        <div>
                                            <span className="text-muted-foreground/70">
                                                Input
                                            </span>

                                            <div className="mt-1 break-words text-foreground">
                                                {example.Input}
                                            </div>
                                        </div>

                                        {/* OUTPUT */}

                                        <div className="mt-4">
                                            <span className="text-muted-foreground/70">
                                                Output
                                            </span>

                                            <div className="mt-1 break-words text-emerald-500">
                                                {example.Output}
                                            </div>
                                        </div>
                                    </div>

                                    {/* EXPLANATION */}

                                    {example.Explanation && (
                                        <p className="mt-2 text-xs leading-5 text-muted-foreground/70">
                                            {example.Explanation}
                                        </p>
                                    )}
                                </div>
                            ))}
                        </div>
                    </div>
                )}
            </div>
        </section>
    );
}