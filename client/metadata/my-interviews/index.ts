import type { InterviewKind } from "@/client/types/my-interviews";

// ---------------------------------------------------------------------------
// Track metadata — label, badge/border styling, and destination route
// per classification.
// ---------------------------------------------------------------------------

export const TRACK_META: Record<
  InterviewKind,
  {
    label: string;
    badgeClass: string;
    borderClass: string;
    route: (id: string) => string;
  }
> = {
  full: {
    label: "FULL MOCK",
    badgeClass: "bg-primary/10 text-primary border-primary/20",
    borderClass: "hover:border-primary/40",
    route: (id) => `/results/${id}`,
  },

  coding: {
    label: "CODING",
    badgeClass: "bg-emerald-500/10 text-emerald-500 border-emerald-500/20",
    borderClass: "hover:border-emerald-500/40",
    route: (id) => `/results/${id}/mi/coding`,
  },

  theory: {
    label: "THEORY",
    badgeClass: "bg-amber-500/10 text-amber-500 border-amber-500/20",
    borderClass: "hover:border-amber-500/40",
    route: (id) => `/results/${id}/mi/theory`,
  },

  unknown: {
    label: "UNRESOLVED",
    badgeClass: "bg-rose-500/10 text-rose-500 border-rose-500/20",
    borderClass: "hover:border-rose-500/40",
    route: (id) => `/results/${id}/mi/coding`,
  },
};