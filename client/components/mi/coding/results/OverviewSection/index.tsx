"use client";

import { ScoreCard } from "@/client/components/results/ScoreCard";
import { StatCard } from "@/client/components/results/StatCard";
import type { WorkspaceData } from "@/client/types/results";

export function OverviewSection({

    codingScore,
    codingClassification,
    correctCount,
    totalCodingQuestions,
    workspaceData,

    testsPassed,
    testsFailed,
}: {
    codingScore: number;
    codingClassification: string;
    correctCount: number;
    totalCodingQuestions: number;
    workspaceData: WorkspaceData | null;
    testsPassed: number;
    testsFailed: number;
}) {
    return (
        <section id="overview" className="scroll-mt-28">
            <div className="grid gap-4 md:grid-cols-2">
                <ScoreCard
                    label="Coding score"
                    score={codingScore}
                    max={100}
                    status={codingClassification}
                    description={`${correctCount} of ${totalCodingQuestions} problems solved correctly`}
                />
            </div>

            <div className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
                <StatCard
                    label="Coding questions"
                    value={workspaceData?.codingQnA.length ?? totalCodingQuestions}
                />
                <StatCard label="Tests passed" value={testsPassed} tone="success" />
                <StatCard label="Tests failed" value={testsFailed} tone={testsFailed > 0 ? "danger" : undefined} />
            </div>
        </section>
    );
}
