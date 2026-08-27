"use client";

import { ScoreCard } from "@/client/components/results/ScoreCard";
import { StatCard } from "@/client/components/results/StatCard";
import type { WorkspaceData } from "@/client/types/results";

export function OverviewSection({
    theoryScore,
    theoryPerformanceLevel,
    theoryRecommendation,
    codingScore,
    codingClassification,
    correctCount,
    totalCodingQuestions,
    workspaceData,
    theoryTotalQuestions,
    testsPassed,
    testsFailed,
}: {
    theoryScore: number;
    theoryPerformanceLevel: string;
    theoryRecommendation: string;
    codingScore: number;
    codingClassification: string;
    correctCount: number;
    totalCodingQuestions: number;
    workspaceData: WorkspaceData | null;
    theoryTotalQuestions: number;
    testsPassed: number;
    testsFailed: number;
}) {
    return (
        <section id="overview" className="scroll-mt-28">
            <div className="grid gap-4 md:grid-cols-2">
                <ScoreCard
                    label="Theory score"
                    score={theoryScore}
                    max={100}
                    status={theoryPerformanceLevel}
                    description={theoryRecommendation}
                />
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
                    label="Theory questions"
                    value={workspaceData?.QnA.length ?? theoryTotalQuestions}
                />
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
