"use client";

export default function InterviewSessionPreview() {
  return (
    <div className="relative">
      {/* ambient glow, scoped to the panel only */}
      <div className="absolute -inset-6 -z-10 rounded-[2rem] bg-primary/10 blur-3xl" aria-hidden="true" />

      <div className="preview-enter overflow-hidden rounded-2xl border border-border bg-card shadow-2xl shadow-black/40">
        {/* window chrome */}
        <div className="flex items-center justify-between border-b border-border px-4 py-3">
          <div className="flex items-center gap-2">
            <span className="h-2.5 w-2.5 rounded-full bg-rose-500/70" />
            <span className="h-2.5 w-2.5 rounded-full bg-amber-500/70" />
            <span className="h-2.5 w-2.5 rounded-full bg-emerald-500/70" />
            <span className="ml-2 font-mono text-[11px] text-muted-foreground">
              mock-session_247.log
            </span>
          </div>
          <span className="flex items-center gap-1.5 rounded-full border border-emerald-500/20 bg-emerald-500/10 px-2 py-1 text-[10px] font-semibold text-emerald-500">
            <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-emerald-500" />
            LIVE
          </span>
        </div>

        <div className="space-y-4 p-5">
          {/* THEORY QUESTION */}
          <div className="space-y-2">
            <div className="flex items-start gap-2">
              <span className="mt-0.5 shrink-0 rounded border border-amber-500/20 bg-amber-500/10 px-1.5 py-0.5 text-[10px] font-semibold text-amber-500">
                THEORY
              </span>
              <p className="text-sm text-foreground">
                Explain the difference between optimistic and pessimistic locking.
              </p>
            </div>
            <div className="rounded-lg bg-muted px-3 py-2 font-mono text-xs leading-relaxed text-muted-foreground">
              Optimistic locking checks for conflicts at write time using a
              version number; pessimistic locking blocks other transactions
              upfront by holding a lock
              <span className="caret text-foreground">|</span>
            </div>
            <div className="flex items-center justify-between text-xs">
              <span className="text-muted-foreground">Communication &amp; correctness</span>
              <span className="rounded-full border border-emerald-500/20 bg-emerald-500/10 px-2 py-0.5 font-semibold text-emerald-500">
                8.5 / 10
              </span>
            </div>
          </div>

          <div className="border-t border-border/60" />

          {/* CODING QUESTION */}
          <div className="space-y-2">
            <div className="flex items-start gap-2">
              <span className="mt-0.5 shrink-0 rounded border border-primary/20 bg-primary/10 px-1.5 py-0.5 text-[10px] font-semibold text-primary">
                CODING
              </span>
              <p className="text-sm text-foreground">Reverse a linked list in O(1) space.</p>
            </div>
            <pre className="overflow-x-auto rounded-lg bg-muted px-3 py-2 font-mono text-[11px] leading-relaxed text-foreground">
{`function reverse(head) {
  let prev = null;
  while (head) {
    const next = head.next;
    head.next = prev;
    prev = head;
    head = next;
  }
  return prev;
}`}
            </pre>
            <div className="flex items-center justify-between text-xs">
              <span className="text-muted-foreground">Test cases</span>
              <span className="rounded-full border border-amber-500/20 bg-amber-500/10 px-2 py-0.5 font-semibold text-amber-500">
                4 / 5 passed
              </span>
            </div>
          </div>

          <div className="border-t border-border/60" />

          {/* OVERALL SCORE */}
          <div className="space-y-1.5">
            <div className="flex items-center justify-between text-xs">
              <span className="text-muted-foreground">Overall readiness</span>
              <span className="font-semibold text-foreground">82%</span>
            </div>
            <div className="h-1.5 w-full overflow-hidden rounded-full bg-muted">
              <div className="score-fill h-full rounded-full bg-primary" />
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes blink-caret {
          50% {
            opacity: 0;
          }
        }
        .caret {
          animation: blink-caret 1s step-end infinite;
        }

        @keyframes fill-score {
          from {
            width: 0%;
          }
          to {
            width: 82%;
          }
        }
        .score-fill {
          width: 82%;
          animation: fill-score 1.2s ease-out 0.3s both;
        }

        @keyframes enter {
          from {
            opacity: 0;
            transform: translateY(12px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .preview-enter {
          animation: enter 0.6s ease-out both;
        }

        @media (prefers-reduced-motion: reduce) {
          .caret,
          .score-fill,
          .preview-enter {
            animation: none;
          }
          .score-fill {
            width: 82%;
          }
        }
      `}</style>
    </div>
  );
}