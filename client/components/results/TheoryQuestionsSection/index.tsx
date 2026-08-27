"use client";

import { SectionHeading } from "@/client/components/results/SectionHeading";
import { Badge } from "@/client/components/results/Badge";
import { Metric } from "@/client/components/results/Metric";
import { EmptyState } from "@/client/components/results/EmptyState";
import { ChevronIcon } from "@/client/components/results/ChevronIcon";
import { toneForRatio } from "@/client/utils/results";
import type { TheoryQuestionEvaluation, WorkspaceData } from "@/client/types/results";

export function TheoryQuestionsSection({
    workspaceData,
    theoryQuestionMap,
}: {
    workspaceData: WorkspaceData;
    theoryQuestionMap: Map<number, TheoryQuestionEvaluation>;
}) {
    return (
        <section id="theory-questions" className="mt-14 scroll-mt-28">
            <SectionHeading
                title="Theory questions"
                description="Question-by-question scoring, gaps, and reference answers."
            />

            <div className="mt-5 space-y-3">
                {workspaceData.QnA.length === 0 ? (
                    <EmptyState text="No theory questions available." />
                ) : (
                    workspaceData.QnA.map((item) => {
                        const evalData = theoryQuestionMap.get(item.qno);
                        const questionScore = evalData
                            ? parseFloat(evalData.questionScore) || 0
                            : null;
                        const tone =
                            questionScore !== null ? toneForRatio(questionScore, 10) : "accent";

                        return (
                            <details
                                key={item.qno}
                                className="group overflow-hidden rounded-xl border border-border bg-card transition-colors open:border-primary/30"
                            >
                                <summary className="flex cursor-pointer list-none items-center gap-4 px-5 py-4 hover:bg-muted/20">
                                    <span className="flex h-7 min-w-7 items-center justify-center rounded-md bg-muted text-xs font-semibold text-muted-foreground">
                                        {String(item.qno).padStart(2, "0")}
                                    </span>
                                    <span className="flex-1 text-sm font-medium text-foreground">
                                        {item.question}
                                    </span>
                                    {questionScore !== null && (
                                        <Badge tone={tone}>{evalData!.questionScore}/10</Badge>
                                    )}
                                    <span className="text-muted-foreground transition-transform group-open:rotate-180">
                                        <ChevronIcon />
                                    </span>
                                </summary>

                                <div className="border-t border-border px-5 pb-5 pt-4">
                                    {evalData ? (
                                        <>
                                            <div className="grid grid-cols-2 gap-3 md:grid-cols-4">
                                                <Metric label="Accuracy" value={evalData.accuracy} />
                                                <Metric label="Depth" value={evalData.depth} />
                                                <Metric label="Clarity" value={evalData.clarity} />
                                                <Metric label="Relevance" value={evalData.relevance} />
                                            </div>

                                            {evalData.missingConcepts.length > 0 && (
                                                <div className="mt-4 rounded-lg border border-amber-500/20 bg-amber-500/10 p-4">
                                                    <p className="text-xs font-medium uppercase tracking-wide text-amber-400">
                                                        Missing concepts
                                                    </p>
                                                    <ul className="mt-2 space-y-1.5">
                                                        {evalData.missingConcepts.map((concept) => (
                                                            <li
                                                                key={concept.id}
                                                                className="text-sm leading-6 text-amber-300/90"
                                                            >
                                                                {concept.concept}
                                                            </li>
                                                        ))}
                                                    </ul>
                                                </div>
                                            )}
                                        </>
                                    ) : (
                                        <p className="text-xs text-muted-foreground">
                                            No evaluation data was recorded for this question.
                                        </p>
                                    )}

                                    <p className="mt-4 text-xs font-medium uppercase tracking-wide text-muted-foreground">
                                        Reference answer
                                    </p>
                                    <div className="mt-2 border-l-2 border-primary/30 pl-4 text-sm leading-7 text-muted-foreground">
                                        {item.answer}
                                    </div>
                                </div>
                            </details>
                        );
                    })
                )}
            </div>
        </section>
    );
}
