import type {
  DeleteWorkspaceResponse,
  KindResponse,
  SubjectInfo,
  SubjectWiseResponse,
  SubjectWiseWorkspace,
  WorkspaceBase,
  WorkspaceListResponse,
} from "@/client/types/my-interviews";

// ---------------------------------------------------------------------------
// Data fetching helpers
// ---------------------------------------------------------------------------

/**
 * Safely parses a Response as JSON.
 * Returns null instead of throwing when the response is an error status,
 * has an empty body (e.g. a 204, a misconfigured route, or a redirect to
 * an HTML error page), or contains invalid JSON.
 */
export async function safeJson<T>(res: Response): Promise<T | null> {
  if (!res.ok) {
    console.warn(`Request to ${res.url} failed with status ${res.status}`);
    return null;
  }

  const text = await res.text();

  if (!text) return null;

  try {
    return JSON.parse(text) as T;
  } catch {
    console.warn(`Response from ${res.url} was not valid JSON`);
    return null;
  }
}

export async function fetchAllWorkspaces(): Promise<WorkspaceBase[]> {
  const firstRes = await fetch(`/api/v1/workspace?page=1&limit=50`);

  const first = await safeJson<WorkspaceListResponse>(firstRes);

  if (!first?.data) return [];

  let all = [...first.data];

  const totalPages = first.meta?.totalPages ?? 1;

  if (totalPages > 1) {
    const restResponses = await Promise.all(
      Array.from({ length: totalPages - 1 }, (_, index) =>
        fetch(`/api/v1/workspace?page=${index + 2}&limit=50`)
      )
    );

    const restJson = await Promise.all(
      restResponses.map((response) => safeJson<WorkspaceListResponse>(response))
    );

    restJson.forEach((page) => {
      if (page?.data) {
        all = all.concat(page.data);
      }
    });
  }

  return all;
}

export async function fetchSubjectWiseWorkspaces(): Promise<
  SubjectWiseWorkspace[]
> {
  const res = await fetch(`/api/v1/workspace/subject-wise`);

  const json = await safeJson<SubjectWiseResponse>(res);

  return json?.message ?? [];
}

export async function fetchInterviewKind(
  workspaceId: string
): Promise<"coding" | "theory" | null> {
  try {
    const res = await fetch(`/api/v1/workspace/isTheoryOrCoding`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        workspaceId,
      }),
    });

    const json = await safeJson<KindResponse>(res);

    return json?.data ?? null;
  } catch (error) {
    console.warn(`isTheoryOrCoding failed for ${workspaceId}`, error);

    return null;
  }
}

export async function deleteWorkspaceRequest(
  workspaceId: string
): Promise<boolean> {
  try {
    const res = await fetch(`/api/v1/workspace/${workspaceId}`, {
      method: "DELETE",
    });

    if (!res.ok) {
      console.error(`Failed to delete workspace ${workspaceId}: ${res.status}`);

      return false;
    }

    // Some DELETE endpoints may return 204 with no body.
    if (res.status === 204) {
      return true;
    }

    const json = await safeJson<DeleteWorkspaceResponse>(res);

    return json?.success ?? true;
  } catch (error) {
    console.error(`Failed to delete workspace ${workspaceId}`, error);

    return false;
  }
}

// Re-exported for consumers that only need the subject lookup shape.
export type { SubjectInfo };