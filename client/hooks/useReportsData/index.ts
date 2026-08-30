import { useEffect, useState } from "react";
import {
  fetchAllWorkspaces,
  fetchInterviewKind,
  fetchSubjectWiseWorkspaces,
  fetchWorkspaceAnalytics,
} from "@/client/api/reports";
import type { ClassifiedWorkspace, LoadStatus, Subject } from "@/client/types/reports";

export function useReportsData() {
  const [workspaces, setWorkspaces] = useState<ClassifiedWorkspace[]>([]);
  const [status, setStatus] = useState<LoadStatus>("loading");

  useEffect(() => {
    let cancelled = false;

    async function loadReports() {
      try {
        setStatus("loading");
        const [allWorkspaces, subjectWiseWorkspaces] = await Promise.all([
          fetchAllWorkspaces(),
          fetchSubjectWiseWorkspaces(),
        ]);
        if (cancelled) return;

        const subjectMap = new Map<string, Subject>();
        subjectWiseWorkspaces.forEach((w) => subjectMap.set(w.id, w.subjects));

        const subjectWorkspaces = allWorkspaces.filter((w) => subjectMap.has(w.id));
        const kindResults = await Promise.all(
          subjectWorkspaces.map(async (w) => ({
            workspaceId: w.id,
            kind: await fetchInterviewKind(w.id),
          }))
        );
        const kindMap = new Map<string, "coding" | "theory">();
        kindResults.forEach((r) => {
          if (r.kind) kindMap.set(r.workspaceId, r.kind);
        });

        const classified: ClassifiedWorkspace[] = allWorkspaces.map((w) => {
          const subject = subjectMap.get(w.id);
          return {
            ...w,
            kind: subject ? kindMap.get(w.id) ?? "theory" : "full",
            subject: subject?.subject,
          };
        });

        const withAnalytics = await Promise.all(
          classified.map(async (w) => ({
            ...w,
            analytics: (await fetchWorkspaceAnalytics(w.id, w.kind)) ?? undefined,
          }))
        );

        if (!cancelled) {
          setWorkspaces(withAnalytics);
          setStatus("ready");
        }
      } catch (error) {
        console.error("Failed to load report data", error);
        if (!cancelled) setStatus("error");
      }
    }

    void loadReports();
    return () => {
      cancelled = true;
    };
  }, []);

  return { workspaces, status };
}