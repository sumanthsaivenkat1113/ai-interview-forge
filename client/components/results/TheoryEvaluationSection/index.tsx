"use client";

import { SectionHeading } from "@/client/components/results/SectionHeading";
import { InfoPanel } from "@/client/components/results/InfoPanel";
import { TONE_COLORS, toneForRatio } from "@/client/utils/results";
import type { EvaluationResults } from "@/client/types/results";

export function TheoryEvaluationSection({
    theory,
}: {
    theory: NonNullable<EvaluationResults["results"]>["theory"]["data"];
}) {
    return (
        <section id="theory" className="mt-14 scroll-mt-28">
            <SectionHeading
                title="Theory evaluation"
                description="Performance across each evaluated theory category."
            />

            <div className="mt-5 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
                {theory.categoryScores.map((category) => {
                    const score = parseFloat(category.score) || 0;
                    const tone = toneForRatio(score, 10);
                    return (
                        <div
                            key={category.id}
                            className="rounded-xl border border-border bg-card p-5"
                        >
                            <p className="text-xs font-medium capitalize text-muted-foreground">
                                {category.category}
                            </p>
                            <div className="mt-3 flex items-baseline gap-1">
                                <span className="text-2xl font-semibold text-foreground tabular-nums">
                                    {category.score}
                                </span>
                                <span className="text-xs text-muted-foreground">/10</span>
                            </div>
                            <div className="mt-3 h-1.5 w-full overflow-hidden rounded-full bg-muted">
                                <div
                                    className="h-full rounded-full transition-all duration-500"
                                    style={{
                                        width: `${Math.min((score / 10) * 100, 100)}%`,
                                        backgroundColor: TONE_COLORS[tone].solid,
                                    }}
                                />
                            </div>
                        </div>
                    );
                })}
            </div>

            <div className="mt-6 grid gap-4 lg:grid-cols-2">
                <InfoPanel
                    title="Strengths"
                    items={theory.strengths.map((item) => item.description)}
                    tone="success"
                    emptyText="No strengths identified."
                />
                <InfoPanel
                    title="Improvement areas"
                    items={theory.improvementAreas.map((item) => item.description)}
                    tone="warning"
                    emptyText="No improvement areas identified."
                />
            </div>
        </section>
    );
}
