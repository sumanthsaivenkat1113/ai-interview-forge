import type {
  InterviewAnalytics,
  InterviewKind,
  KindResponse,
  SubjectWiseResponse,
  SubjectWiseWorkspace,
  Workspace,
  WorkspaceListResponse,
} from "@/client/types/reports";

// =============================================================================
// SAFE JSON & API HELPERS
// =============================================================================

export async function safeJson<T>(response: Response): Promise<T | null> {
  if (!response.ok) {
    console.warn(`Request failed: ${response.url} (${response.status})`);
    return null;
  }
  const text = await response.text();
  if (!text.trim()) return null;
  try {
    return JSON.parse(text) as T;
  } catch {
    console.warn(`Invalid JSON from ${response.url}`);
    return null;
  }
}

export async function fetchAllWorkspaces(): Promise<Workspace[]> {
  const limit = 50;
  const firstResponse = await fetch(`/api/v1/workspace?page=1&limit=${limit}`);
  const firstPage = await safeJson<WorkspaceListResponse>(firstResponse);
  if (!firstPage?.data) return [];

  const workspaces = [...firstPage.data];
  const totalPages = firstPage.meta?.totalPages ?? 1;
  if (totalPages <= 1) return workspaces;

  const remainingRequests = Array.from({ length: totalPages - 1 }, (_, index) =>
    fetch(`/api/v1/workspace?page=${index + 2}&limit=${limit}`)
  );
  const responses = await Promise.all(remainingRequests);
  const pages = await Promise.all(responses.map((r) => safeJson<WorkspaceListResponse>(r)));

  pages.forEach((page) => {
    if (page?.data) workspaces.push(...page.data);
  });
  return workspaces;
}

export async function fetchSubjectWiseWorkspaces(): Promise<SubjectWiseWorkspace[]> {
  const response = await fetch("/api/v1/workspace/subject-wise");
  const json = await safeJson<SubjectWiseResponse>(response);
  return json?.message ?? [];
}

export async function fetchInterviewKind(
  workspaceId: string
): Promise<"coding" | "theory" | null> {
  try {
    const response = await fetch("/api/v1/workspace/isTheoryOrCoding", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ workspaceId }),
    });
    const json = await safeJson<KindResponse>(response);
    return json?.data ?? null;
  } catch (error) {
    console.error(`Failed to classify workspace ${workspaceId}`, error);
    return null;
  }
}

export async function fetchWorkspaceAnalytics(
  workspaceId: string,
  kind: InterviewKind
): Promise<InterviewAnalytics | null> {
  try {
    let theoryEvaluationId: string | null = null;
    let codingEvaluationId: string | null = null;

    if (kind === "full" || kind === "theory") {
      const theoryEvalResponse = await fetch("/api/v1/theory-evaluation/lookup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ workspaceId }),
      });
      if (theoryEvalResponse.ok) {
        const data = await theoryEvalResponse.json();
        theoryEvaluationId = data.data;
      }
    }

    if (kind === "full" || kind === "coding") {
      const codingEvalResponse = await fetch("/api/v1/coding-evaluation/lookup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ workspaceId }),
      });
      if (codingEvalResponse.ok) {
        const data = await codingEvalResponse.json();
        codingEvaluationId = data.data.id;
      }
    }

    let resultsUrl = "";
    if (kind === "full") {
      if (!theoryEvaluationId || !codingEvaluationId) return null;
      resultsUrl = `/api/v1/results/${encodeURIComponent(
        workspaceId
      )}/FMI?theoryEvaluationId=${encodeURIComponent(
        theoryEvaluationId
      )}&codingEvaluationId=${encodeURIComponent(codingEvaluationId)}`;
    } else if (kind === "theory") {
      if (!theoryEvaluationId) return null;
      resultsUrl = `/api/v1/results/${encodeURIComponent(
        workspaceId
      )}/MI/theory?theoryEvaluationId=${encodeURIComponent(theoryEvaluationId)}`;
    } else if (kind === "coding") {
      if (!codingEvaluationId) return null;
      resultsUrl = `/api/v1/results/${encodeURIComponent(
        workspaceId
      )}/MI/coding?codingEvaluationId=${encodeURIComponent(codingEvaluationId)}`;
    } else {
      return null;
    }

    const resultsResponse = await fetch(resultsUrl);
    if (!resultsResponse.ok) return null;

    const data = await resultsResponse.json();
    let score = 0,
      questionsAsked = 0,
      questionsAnswered = 0,
      codingProblems = 0,
      codingSolved = 0;
    let completed = false;

    if (kind === "full") {
      const theoryData = data.results?.theory?.data;
      const codingData = data.results?.coding?.data;
      const hasTheory = theoryData && Object.keys(theoryData).length > 0;
      const hasCoding = codingData && Object.keys(codingData).length > 0;

      if (hasTheory) {
        const tScore = parseFloat(theoryData.overallScore) || 0;
        const tQuestions = theoryData.questions || [];
        score += tScore;
        questionsAsked += theoryData.totalQuestions || tQuestions.length || 0;
        questionsAnswered += tQuestions.filter(
          (q: any) => q.score !== undefined && q.score !== null && q.score !== ""
        ).length;
      }
      if (hasCoding) {
        const cScore = codingData.overallScore || 0;
        const cQuestions = codingData.questions || [];
        score += cScore;
        codingProblems = cQuestions.length || 0;
        codingSolved = cQuestions.filter((q: any) => q.isCorrect === true).length || 0;
        questionsAsked += codingProblems;
        questionsAnswered += codingSolved;
      }
      if (hasTheory && hasCoding) score = score / 2;
      completed = hasTheory || hasCoding;
    } else if (kind === "theory") {
      const theoryData = data.results?.theory?.data;
      if (theoryData && Object.keys(theoryData).length > 0) {
        score = parseFloat(theoryData.overallScore) || 0;
        const questions = theoryData.questions || [];
        questionsAsked = theoryData.totalQuestions || questions.length || 0;
        questionsAnswered = questions.filter(
          (q: any) => q.score !== undefined && q.score !== null && q.score !== ""
        ).length;
        completed = true;
      }
    } else if (kind === "coding") {
      const codingData = data.results?.coding?.data;
      if (codingData && Object.keys(codingData).length > 0) {
        score = codingData.overallScore || 0;
        const questions = codingData.questions || [];
        codingProblems = questions.length || 0;
        codingSolved = questions.filter((q: any) => q.isCorrect === true).length || 0;
        questionsAsked = codingProblems;
        questionsAnswered = codingSolved;
        completed = true;
      }
    }

    if (score > 0) completed = true;

    return {
      workspaceId,
      score: Math.round(score),
      questionsAsked,
      questionsAnswered,
      codingProblems,
      codingSolved,
      completed,
      completedAt: new Date().toISOString(),
    };
  } catch (error) {
    console.error(`Failed to load analytics for ${workspaceId}:`, error);
    return null;
  }
}