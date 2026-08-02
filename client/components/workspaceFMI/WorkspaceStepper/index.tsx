"use client";

import { cn } from "@/lib/utils";
import { STEPS } from "../lib/constants";

interface WorkspaceStepperProps {
  currentStep: number;
}

export default function WorkspaceStepper({ currentStep }: WorkspaceStepperProps) {
  return (
    <div className="rounded-xl border border-border/50 bg-card/50 px-6 py-5">
      <ol className="flex items-start">
        {STEPS.map((step, idx) => {
          const isActive = step.id === currentStep;
          const isDone = step.id < currentStep;

          return (
            <li key={step.id} className="flex flex-1 items-start last:flex-none">
              <div className="flex flex-col items-center">
                <span
                  className={cn(
                    "flex h-9 w-9 items-center justify-center rounded-full text-sm font-semibold transition-all",
                    isActive
                      ? "bg-primary text-primary-foreground shadow-lg shadow-primary/25"
                      : isDone
                        ? "bg-primary/20 text-primary"
                        : "bg-muted text-muted-foreground"
                  )}
                >
                  {step.id}
                </span>
                <div className="mt-2.5 text-center">
                  <p
                    className={cn(
                      "text-sm font-medium",
                      isActive ? "text-foreground" : "text-muted-foreground"
                    )}
                  >
                    {step.title}
                  </p>
                  <p className="mt-0.5 text-xs text-muted-foreground/70">
                    {step.subtitle}
                  </p>
                </div>
              </div>
              {idx < STEPS.length - 1 && (
                <div className="mx-4 mt-4 h-px flex-1 border-t-2 border-dashed border-border/60" />
              )}
            </li>
          );
        })}
      </ol>
    </div>
  );
}
