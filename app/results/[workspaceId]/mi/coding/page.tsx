"use client";

import { useEffect, useMemo, useState } from "react";
import { useParams } from "next/navigation";

import type {
    EvaluationResults,
    WorkspaceData,
    WorkspaceResponse,
} from "@/client/types/results";

import { NAV_SECTIONS } from "@/client/utils/results";

import { TopBar } from "@/client/components/results/TopBar";
import { SectionNav } from "@/client/components/results/SectionNav";
import { OverviewSection } from "@/client/components/mi/coding/results/OverviewSection";
import { CodingEvaluationSection } from "@/client/components/results/CodingEvaluationSection";
import { CodingProblemsSection } from "@/client/components/results/CodingProblemsSection";

import { useAuth } from '@clerk/nextjs'
import { useRouter } from 'next/navigation';

/* =========================================================
   Page
========================================================= */

export default function ResultsPage() {
    const params = useParams();

    const workspaceId = params.workspaceId as string;

    const [results, setResults] = useState<EvaluationResults | null>(null);
    const [workspaceData, setWorkspaceData] =
        useState<WorkspaceData | null>(null);

    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const [activeSection, setActiveSection] =
        useState<string>("overview");

    const router = useRouter();
    const { isLoaded, isSignedIn } = useAuth();


    // Route Protection
    useEffect(() => {
        // If Clerk has loaded and user is not signed in, redirect them
        if (isLoaded && !isSignedIn) {
            router.push('/');
        }
    }, [isLoaded, isSignedIn, router]);


    /* =====================================================
       Fetch APIs
    ===================================================== */

    useEffect(() => {
        if (!workspaceId) {
            setError("Workspace ID is missing.");
            setLoading(false);
            return;
        }

        const getData = async () => {
            try {
                setLoading(true);
                setError(null);





                /* ---------------------------------------------
                   2. CODING EVALUATION ID
                --------------------------------------------- */

                const codingEvaluationResponse = await fetch(
                    "/api/v1/coding-evaluation/lookup",
                    {
                        method: "POST",
                        headers: {
                            "Content-Type": "application/json",
                        },
                        body: JSON.stringify({
                            workspaceId,
                        }),
                    }
                );

                if (!codingEvaluationResponse.ok) {
                    throw new Error(
                        "Failed to look up the coding evaluation ID."
                    );
                }

                const codingEvaluationResult =
                    await codingEvaluationResponse.json();

                console.log("CODING RESPONSE:", codingEvaluationResult);

                const fetchedCodingEvaluationId =
                    codingEvaluationResult.data.id;

                console.log("CODING ID:", fetchedCodingEvaluationId);
                console.log("CODING ID TYPE:", typeof fetchedCodingEvaluationId);


                if (!fetchedCodingEvaluationId) {
                    throw new Error(
                        "Coding evaluation ID is missing."
                    );
                }



                /* ---------------------------------------------
                   3. EXISTING EVALUATION RESULTS API
                   DO NOT REMOVE
                --------------------------------------------- */

                const resultsResponse = await fetch(
                    `/api/v1/results/${encodeURIComponent(
                        workspaceId
                    )}/MI/coding` +
                    `?codingEvaluationId=${encodeURIComponent(
                        fetchedCodingEvaluationId
                    )}`
                );

                /* ---------------------------------------------
                   4. WORKSPACE API
                --------------------------------------------- */

                const workspaceResponse = await fetch(
                    `/api/v1/questions-answers/${encodeURIComponent(
                        workspaceId
                    )}`
                );

                /* ---------------------------------------------
                   VALIDATE RESPONSES
                --------------------------------------------- */

                if (!resultsResponse.ok) {
                    throw new Error(
                        "Failed to get the evaluation results."
                    );
                }

                if (!workspaceResponse.ok) {
                    throw new Error(
                        "Failed to get the workspace."
                    );
                }

                /* ---------------------------------------------
                   PARSE RESPONSES
                --------------------------------------------- */

                const resultsData: EvaluationResults =
                    await resultsResponse.json();

                const workspaceResult: WorkspaceResponse =
                    await workspaceResponse.json();

                if (
                    !workspaceResult.success ||
                    !workspaceResult.data
                ) {
                    throw new Error(
                        workspaceResult.message ||
                        "Workspace data was not found."
                    );
                }

                /* ---------------------------------------------
                   UPDATE STATE
                --------------------------------------------- */

                setResults(resultsData);
                setWorkspaceData(workspaceResult.data);
            } catch (error: unknown) {
                console.error(
                    "Failed to load results/workspace:",
                    error
                );

                if (error instanceof Error) {
                    setError(error.message);
                } else {
                    setError("Something went wrong.");
                }
            } finally {
                setLoading(false);
            }
        };

        getData();
    }, [workspaceId]);

    /* =====================================================
       Scroll-spy for section nav
    ===================================================== */

    useEffect(() => {
        if (!results?.results || !workspaceData) return;

        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        setActiveSection(entry.target.id);
                    }
                });
            },
            {
                rootMargin: "-112px 0px -70% 0px",
                threshold: 0,
            }
        );

        NAV_SECTIONS.forEach(({ id: sectionId }) => {
            const el = document.getElementById(sectionId);

            if (el) {
                observer.observe(el);
            }
        });

        return () => observer.disconnect();
    }, [results, workspaceData]);

    /* =====================================================
       Merge theory question scores with workspace Q&A text
    ===================================================== */



    /* =====================================================
       Loading
    ===================================================== */

    if (loading) {
        return (
            <main className="flex min-h-screen items-center justify-center bg-background">
                <div className="flex flex-col items-center gap-3">
                    <div className="h-6 w-6 animate-spin rounded-full border-2 border-border border-t-primary" />

                    <p className="text-sm text-muted-foreground">
                        Loading your results…
                    </p>
                </div>
            </main>
        );
    }

    /* =====================================================
       Error
    ===================================================== */

    if (error) {
        return (
            <main className="flex min-h-screen items-center justify-center bg-background px-6">
                <div className="w-full max-w-md rounded-xl border border-border bg-card p-8 text-center shadow-sm">
                    <div className="mx-auto flex h-10 w-10 items-center justify-center rounded-full border border-rose-500/20 bg-rose-500/10 text-rose-400">
                        !
                    </div>

                    <h1 className="mt-5 text-base font-semibold text-foreground">
                        Couldn&apos;t load these results
                    </h1>

                    <p className="mt-2 text-sm leading-6 text-muted-foreground">
                        {error}
                    </p>
                </div>
            </main>
        );
    }

    /* =====================================================
       No data
    ===================================================== */

    if (!results?.results) {
        return (
            <main className="flex min-h-screen items-center justify-center bg-background text-muted-foreground">
                No evaluation results found.
            </main>
        );
    }

    /* =====================================================
       Extract data
    ===================================================== */

    const coding = results.results.coding.data;


    const codingScore = Math.round(
        coding.overallScore || 0
    );

    const testsPassed = coding.questions.reduce(
        (total, q) => total + q.testsPassed,
        0
    );

    const testsFailed = coding.questions.reduce(
        (total, q) => total + q.testsFailed,
        0
    );

    const correctCount = coding.questions.filter(
        (q) => q.isCorrect
    ).length;

    /* =====================================================
       Render
    ===================================================== */

    return (
        <main className="min-h-screen bg-background text-foreground">
            <TopBar
                title={
                    workspaceData?.workspace || "workspace"
                }
                role={
                    workspaceData?.target_role ||
                    coding.targetRole
                }
                language={coding.language}
            />

            <SectionNav
                activeSection={activeSection}
            />

            <div className="mx-auto max-w-6xl px-5 py-10 sm:px-8">
                <OverviewSection

                    codingScore={codingScore}
                    codingClassification={
                        coding.classification
                    }
                    correctCount={correctCount}
                    totalCodingQuestions={
                        coding.questions.length
                    }
                    workspaceData={workspaceData}

                    testsPassed={testsPassed}
                    testsFailed={testsFailed}
                />

                <CodingEvaluationSection
                    coding={coding}
                />

                {workspaceData && (
                    <CodingProblemsSection
                        workspaceData={workspaceData}
                    />
                )}
            </div>
        </main>
    );
}