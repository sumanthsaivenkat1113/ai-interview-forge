"use client";

import { Input } from "@/client/components/ui/input";
import { BookOpen } from "lucide-react";
import { CODING_SUBJECTS, THEORY_SUBJECTS } from "../lib/constants";

interface SubjectFieldProps {
  interviewType: "coding" | "theory" | "";
  value: string;
  onChange: (value: string) => void;
}

export default function SubjectField({ interviewType, value, onChange }: SubjectFieldProps) {
  const suggestions =
    interviewType === "coding"
      ? CODING_SUBJECTS
      : interviewType === "theory"
        ? THEORY_SUBJECTS
        : [];

  const placeholder =
    interviewType === "coding"
      ? "Enter a coding subject (e.g. DSA, Java, Python)"
      : interviewType === "theory"
        ? "Enter a theory subject (e.g. HR, Behavioural, Java)"
        : "Select interview type first";

  return (
    <div className="rounded-xl border border-border/50 bg-card/30 p-4">
      <div className="mb-3 flex items-center gap-3">
        <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
          <BookOpen size={18} className="text-primary" />
        </div>
        <div>
          <h3 className="text-sm font-medium text-foreground">Subject</h3>
          <p className="text-xs text-muted-foreground">
            {interviewType
              ? `Enter a subject for your ${interviewType} interview`
              : "Select an interview type first"}
          </p>
        </div>
      </div>

      <Input
        id="subject"
        placeholder={placeholder}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        disabled={!interviewType}
        className="h-10 border-border/50 bg-background/50 text-sm"
      />

      {suggestions.length > 0 && (
        <div className="mt-3">
          <p className="mb-2 text-xs text-muted-foreground/70">Examples:</p>
          <div className="flex flex-wrap gap-2">
            {suggestions.map((suggestion) => (
              <button
                key={suggestion}
                type="button"
                onClick={() => onChange(suggestion)}
                className={`rounded-full border px-3 py-1 text-xs transition-colors ${
                  value === suggestion
                    ? "border-primary bg-primary/10 text-primary"
                    : "border-border/50 bg-muted/30 text-muted-foreground hover:border-primary/50 hover:bg-primary/5 hover:text-foreground"
                }`}
              >
                {suggestion}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
