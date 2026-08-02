"use client";

import { Briefcase } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/client/components/ui/select";
import { INTERVIEW_TYPES } from "../lib/constants";

interface InterviewTypeFieldProps {
  value: string;
  onChange: (value: "coding" | "theory") => void;
}

export default function InterviewTypeField({ value, onChange }: InterviewTypeFieldProps) {
  return (
    <div className="rounded-xl border border-border/50 bg-card/30 p-4">
      <div className="mb-3 flex items-center gap-3">
        <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
          <Briefcase size={18} className="text-primary" />
        </div>
        <div>
          <h3 className="text-sm font-medium text-foreground">Interview Type</h3>
          <p className="text-xs text-muted-foreground">Select the type of interview</p>
        </div>
      </div>

      <Select
        value={value}
        onValueChange={(next) => onChange(next as "coding" | "theory")}
      >
        <SelectTrigger className="h-10 border-border/50 bg-background/50 text-sm">
          <SelectValue placeholder="Select interview type" />
        </SelectTrigger>
        <SelectContent>
          {INTERVIEW_TYPES.map((opt) => (
            <SelectItem key={opt.value} value={opt.value}>
              {opt.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      <div className="mt-3">
        <p className="mb-2 text-xs text-muted-foreground/70">Examples:</p>
        <div className="flex flex-wrap gap-2">
          {INTERVIEW_TYPES.map((opt) => {
            const isSelected = opt.value === value;
            return (
              <button
                key={opt.value}
                type="button"
                onClick={() => onChange(opt.value)}
                className={`rounded-full border px-3 py-1 text-xs transition-colors ${
                  isSelected
                    ? "border-primary bg-primary/10 text-primary"
                    : "border-border/50 bg-muted/30 text-muted-foreground hover:border-primary/50 hover:bg-primary/5 hover:text-foreground"
                }`}
              >
                {opt.label}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
