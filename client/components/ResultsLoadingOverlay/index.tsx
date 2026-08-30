"use client";

import { Check, Loader2, Sparkles } from "lucide-react";
import { cn } from "@/client/utils/workspace";

export type LoadingStepStatus = "pending" | "active" | "complete";

export interface LoadingStep {
  label: string;
  status: LoadingStepStatus;
}

interface ResultsLoadingOverlayProps {
  steps: LoadingStep[];
}

export default function ResultsLoadingOverlay({
  steps,
}: ResultsLoadingOverlayProps) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-background/80 backdrop-blur-sm">
      <div className="w-full max-w-md rounded-2xl border border-border/50 bg-card p-8 shadow-2xl shadow-black/20">
        {/* Header */}
        <div className="mb-6 flex flex-col items-center text-center">
          <div className="relative mb-4 flex h-14 w-14 items-center justify-center">
            {/* Pulsing rings */}
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-primary/20" />
            <span className="absolute inline-flex h-10 w-10 animate-pulse rounded-full bg-primary/10" />
            <div className="relative flex h-10 w-10 items-center justify-center rounded-full bg-primary/10">
              <Sparkles size={18} className="text-primary" />
            </div>
          </div>

          <h2 className="text-base font-semibold text-foreground">
            generating interview Results 
          </h2>
          <p className="mt-1.5 text-sm text-muted-foreground">
            This usually takes less than a minute. Please don&apos;t close
            this tab.
          </p>
        </div>

        {/* Steps */}
        <div className="space-y-1">
          {steps.map((step, i) => (
            <div
              key={i}
              className={cn(
                "flex items-center gap-3 rounded-lg px-3 py-2.5 transition-colors",
                step.status === "active" && "bg-muted/60"
              )}
            >
              {/* Status icon */}
              <div
                className={cn(
                  "flex h-6 w-6 shrink-0 items-center justify-center rounded-full border transition-colors",
                  step.status === "complete" &&
                    "border-transparent bg-[#10B981]/15",
                  step.status === "active" &&
                    "border-transparent bg-primary/15",
                  step.status === "pending" &&
                    "border-border/70 bg-transparent"
                )}
              >
                {step.status === "complete" && (
                  <Check size={13} className="text-[#10B981]" strokeWidth={3} />
                )}
                {step.status === "active" && (
                  <Loader2
                    size={13}
                    className="animate-spin text-primary"
                  />
                )}
              </div>

              {/* Label */}
              <span
                className={cn(
                  "text-sm transition-colors",
                  step.status === "complete" && "text-foreground",
                  step.status === "active" &&
                    "font-medium text-foreground",
                  step.status === "pending" && "text-muted-foreground/70"
                )}
              >
                {step.label}
              </span>
            </div>
          ))}
        </div>

        {/* Progress bar */}
        <div className="mt-6 h-1 w-full overflow-hidden rounded-full bg-muted">
          <div
            className="h-full rounded-full bg-primary transition-all duration-500 ease-out"
            style={{
              width: `${
                (steps.filter((s) => s.status === "complete").length /
                  steps.length) *
                100
              }%`,
            }}
          />
        </div>
      </div>
    </div>
  );
}