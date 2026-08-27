"use client";

import { SectionHeading } from "@/client/components/results/SectionHeading";
import { Badge } from "@/client/components/results/Badge";
import { Metric } from "@/client/components/results/Metric";
import { ComplexityRow } from "@/client/components/results/ComplexityRow";
import type { EvaluationResults } from "@/client/types/results";

export function CodingEvaluationSection({
    coding,
}: {
    coding: NonNullable<EvaluationResults["results"]>["coding"]["data"];
}) {
    return (
        <section id="coding" className="mt-14 scroll-mt-28">
            <SectionHeading
                title="Coding evaluation"
                description="Summary and per-question metrics from the coding assessment."
            />

            <div className="mt-5 rounded-xl border border-border bg-card p-5 sm:p-6">
                <p className="text-sm leading-7 text-muted-foreground">{coding.summary}</p>
            </div>

            <div className="mt-5 space-y-4">
                {coding.questions.map((question) => (
                    <article
                        key={question.id}
                        className="overflow-hidden rounded-xl border border-border bg-card"
                    >
                        <div className="flex items-start justify-between gap-4 border-b border-border px-5 py-4">
                            <div className="flex items-start gap-3">
                                <span className="flex h-7 min-w-7 items-center justify-center rounded-md bg-muted text-xs font-semibold text-muted-foreground">
                                    {String(question.qno).padStart(2, "0")}
                                </span>
                                <h3 className="text-sm font-medium text-foreground">
                                    Question {question.qno}
                                </h3>
                            </div>

                            <Badge tone={question.isCorrect ? "success" : "danger"}>
                                {question.isCorrect ? "Correct" : "Incorrect"}
                            </Badge>
                        </div>

                        <div className="p-5">
                            <div className="grid grid-cols-2 gap-3 md:grid-cols-4">
                                <Metric label="Problem solving" value={question.algorithmProblemSolving} />
                                <Metric label="Correctness" value={question.codeCorrectness} />
                                <Metric label="Code quality" value={question.codeQuality} />
                                <Metric label="Efficiency" value={question.efficiency} />
                            </div>

                            <div className="mt-4 grid gap-3 sm:grid-cols-2">
                                <ComplexityRow
                                    label="Time complexity"
                                    expected={question.expectedTimeComplexity}
                                    candidate={question.candidateTimeComplexity}
                                />
                                <ComplexityRow
                                    label="Space complexity"
                                    expected={question.expectedSpaceComplexity}
                                    candidate={question.candidateSpaceComplexity}
                                />
                            </div>

                            {question.improvements.length > 0 && (
                                <div className="mt-5 border-t border-border pt-4">
                                    <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
                                        Improvements
                                    </p>
                                    <ul className="mt-2 space-y-1.5">
                                        {question.improvements.map((improvement, index) => (
                                            <li
                                                key={index}
                                                className="flex gap-2.5 text-sm leading-6 text-muted-foreground"
                                            >
                                                <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-muted-foreground" />
                                                {improvement}
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            )}

                            {question.criticalIssues.length > 0 && (
                                <div className="mt-4 rounded-lg border border-rose-500/20 bg-rose-500/10 p-4">
                                    <p className="text-xs font-medium uppercase tracking-wide text-rose-400">
                                        Critical issues
                                    </p>
                                    <ul className="mt-2 space-y-1.5">
                                        {question.criticalIssues.map((issue, index) => (
                                            <li key={index} className="text-sm leading-6 text-rose-300/90">
                                                {issue}
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            )}
                        </div>
                    </article>
                ))}
            </div>
        </section>
    );
}
