"use client";

import { ScoreCard } from "@/client/components/results/ScoreCard";
import { StatCard } from "@/client/components/results/StatCard";
import type { WorkspaceData } from "@/client/types/results";

export function OverviewSection({
    theoryScore,
    theoryPerformanceLevel,
    theoryRecommendation,
    workspaceData,
    theoryTotalQuestions,

}: {
    theoryScore: number;
    theoryPerformanceLevel: string;
    theoryRecommendation: string;
    workspaceData: WorkspaceData | null;
    theoryTotalQuestions: number;

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

            </div>

            <div className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
                <StatCard
                    label="Theory questions"
                    value={workspaceData?.QnA.length ?? theoryTotalQuestions}
                />
            </div>
        </section>
    );
}
