"use client";

import { Clock } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/client/components/ui/select";
import { EXPERIENCE_OPTIONS, EXPERIENCE_CHIP_LABELS } from "../lib/constants";

interface ExperienceFieldProps {
  value: string;
  onChange: (value: string) => void;
}

export default function ExperienceField({ value, onChange }: ExperienceFieldProps) {
  const selectedLabel = EXPERIENCE_OPTIONS.find((opt) => opt.value === value)?.label;

  return (
    <div className="rounded-xl border border-border/50 bg-card/30 p-4">
      <div className="mb-3 flex items-center gap-3">
        <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
          <Clock size={18} className="text-primary" />
        </div>
        <div>
          <h3 className="text-sm font-medium text-foreground">Experience</h3>
          <p className="text-xs text-muted-foreground">Enter your total experience</p>
        </div>
      </div>

      <Select value={value} onValueChange={onChange}>
        <SelectTrigger className="h-10 border-border/50 bg-background/50 text-sm">
          <SelectValue placeholder="Select experience" />
        </SelectTrigger>
        <SelectContent>
          {EXPERIENCE_OPTIONS.map((opt) => (
            <SelectItem key={opt.value} value={opt.value}>
              {opt.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      <div className="mt-3">
        <p className="mb-2 text-xs text-muted-foreground/70">Examples:</p>
        <div className="flex flex-wrap gap-2">
          {EXPERIENCE_CHIP_LABELS.map((label) => {
            const optionValue = EXPERIENCE_OPTIONS.find((opt) => opt.label === label)?.value;
            const isSelected = selectedLabel === label;
            return (
              <button
                key={label}
                type="button"
                onClick={() => optionValue && onChange(optionValue)}
                className={`rounded-full border px-3 py-1 text-xs transition-colors ${
                  isSelected
                    ? "border-primary bg-primary/10 text-primary"
                    : "border-border/50 bg-muted/30 text-muted-foreground hover:border-primary/50 hover:bg-primary/5 hover:text-foreground"
                }`}
              >
                {label}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
