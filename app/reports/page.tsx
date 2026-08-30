"use client";

import { useMemo, useEffect } from "react";
import { Card, CardContent } from "@/client/components/ui/card";
import { Badge } from "@/client/components/ui/badge";
import { Button } from "@/client/components/ui/button";
import { Award, BarChart3, CheckCircle, Code, Users } from "lucide-react";

import { useAuth } from '@clerk/nextjs'
import { useRouter } from 'next/navigation';

import { useReportsData } from "@/client/hooks/useReportsData";
import { calculateAverage, getPerformanceLabel } from "@/client/utils/reports";
import {
  CodingPerformanceChart,
  CompletionRateChart,
  MetricCard,
  PerformanceByTypeChart,
  RecentInterviewsTable,
  ReportsSkeleton,
  ScoreDistributionChart,
  ScoreTrendChart,
} from "@/client/components/reports";

export default function ReportsPage() {
  const { workspaces, status } = useReportsData();

  const router = useRouter();
  const { isLoaded, isSignedIn } = useAuth();

  // Route Protection
  useEffect(() => {
    // If Clerk has loaded and user is not signed in, redirect them
    if (isLoaded && !isSignedIn) {
      router.push('/');
    }
  }, [isLoaded, isSignedIn, router]);

  const metrics = useMemo(() => {
    const interviewsWithResults = workspaces.filter((w) => w.analytics);
    const completed = interviewsWithResults.filter((w) => w.analytics?.completed);
    const scores = interviewsWithResults
      .map((w) => w.analytics?.score)
      .filter((s): s is number => typeof s === "number");
    const questionsAsked = interviewsWithResults.reduce(
      (total, w) => total + (w.analytics?.questionsAsked ?? 0),
      0
    );
    const codingProblems = interviewsWithResults.reduce(
      (total, w) => total + (w.analytics?.codingProblems ?? 0),
      0
    );
    const codingSolved = interviewsWithResults.reduce(
      (total, w) => total + (w.analytics?.codingSolved ?? 0),
      0
    );
    const codingRate = codingProblems > 0 ? Math.round((codingSolved / codingProblems) * 100) : 0;

    return {
      totalInterviews: workspaces.length,
      completedInterviews: completed.length,
      averageScore: calculateAverage(scores),
      questionsAsked,
      codingProblems,
      codingSolved,
      codingRate,
      scores,
    };
  }, [workspaces]);

  if (status === "loading") {
    return (
      <div className="min-h-screen bg-background p-6">
        <div className="mx-auto max-w-7xl">
          <ReportsSkeleton />
        </div>
      </div>
    );
  }

  if (status === "error") {
    return (
      <div className="flex min-h-screen items-center justify-center bg-background p-6">
        <Card className="max-w-md border-rose-500/20 bg-card">
          <CardContent className="p-6 space-y-4">
            <div>
              <h2 className="text-rose-500 text-lg font-semibold">Unable to load reports</h2>
              <p className="text-muted-foreground text-sm">Please refresh the page and try again.</p>
            </div>
            <Button onClick={() => window.location.reload()}>Refresh</Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  const performance = getPerformanceLabel(metrics.averageScore);
  const PerformanceIcon = performance.icon;

  return (
    <div className="min-h-screen bg-background p-6">
      <div className="mx-auto max-w-7xl space-y-6">
        {/* HEADER */}
        <div className="flex flex-col justify-between gap-4 md:flex-row md:items-start">
          <div>
            <div className="flex items-center gap-2">
              <Badge variant="outline" className="border-primary/20 bg-primary/10 text-primary">
                <BarChart3 className="mr-1 h-3 w-3" />
                Analytics
              </Badge>
            </div>
            <h1 className="mt-3 text-3xl font-bold tracking-tight text-foreground">Interview Reports</h1>
            <p className="mt-1 text-muted-foreground max-w-2xl">
              Track your interview performance, identify strengths, and understand where to focus your
              preparation next.
            </p>
          </div>
          <Card className="min-w-[200px] border-border bg-card">
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <div className={`rounded-full p-2.5 ${performance.bgClass} ${performance.className}`}>
                  <PerformanceIcon className="h-5 w-5" />
                </div>
                <div>
                  <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider">
                    Overall Rating
                  </p>
                  <p className="text-2xl font-bold text-foreground">{metrics.averageScore.toFixed(0)}%</p>
                  <p className={`text-xs font-semibold ${performance.className}`}>{performance.label}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* METRIC CARDS */}
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <MetricCard title="Total Interviews" value={metrics.totalInterviews} description="All interview workspaces" icon={Users} />
          <MetricCard
            title="Completed"
            value={metrics.completedInterviews}
            description={`${Math.round((metrics.completedInterviews / (metrics.totalInterviews || 1)) * 100)}% completion rate`}
            icon={CheckCircle}
            trend={metrics.completedInterviews > 0 ? "up" : "neutral"}
            trendValue={`${metrics.completedInterviews} total`}
            colorClass="text-emerald-500"
            bgClass="bg-emerald-500/10"
          />
          <MetricCard
            title="Average Score"
            value={`${metrics.averageScore.toFixed(0)}%`}
            description={`${metrics.scores.length} scored interviews`}
            icon={Award}
          />
          <MetricCard
            title="Coding Success"
            value={`${metrics.codingRate}%`}
            description={`${metrics.codingSolved}/${metrics.codingProblems} problems solved`}
            icon={Code}
            colorClass="text-emerald-500"
            bgClass="bg-emerald-500/10"
          />
        </div>

        {/* PERFORMANCE OVERVIEW */}
        <div className="grid gap-4 md:grid-cols-2">
          <ScoreDistributionChart scores={metrics.scores} />
          <PerformanceByTypeChart workspaces={workspaces} />
        </div>

        {/* TRENDS */}
        <div className="grid gap-4 md:grid-cols-2">
          <ScoreTrendChart workspaces={workspaces} />
          <CompletionRateChart workspaces={workspaces} />
        </div>

        {/* CODING PERFORMANCE */}
        <CodingPerformanceChart workspaces={workspaces} />

        {/* RECENT INTERVIEWS */}
        <RecentInterviewsTable workspaces={workspaces} />
      </div>
    </div>
  );
}