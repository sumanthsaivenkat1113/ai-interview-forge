"use client";

import { Input } from "@/client/components/ui/input";
import type { LucideIcon } from "lucide-react";

interface TextFieldProps {
  id: string;
  icon: LucideIcon;
  label: string;
  description?: string;
  placeholder?: string;
  value: string;
  onChange: (value: string) => void;
  suggestions?: string[];
}

export default function TextField({
  id,
  icon: Icon,
  label,
  description,
  placeholder,
  value,
  onChange,
  suggestions,
}: TextFieldProps) {
  return (
    <div className="rounded-xl border border-border/50 bg-card/30 p-4">
      <div className="mb-3 flex items-center gap-3">
        <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
          <Icon size={18} className="text-primary" />
        </div>
        <div>
          <h3 className="text-sm font-medium text-foreground">{label}</h3>
          {description && (
            <p className="text-xs text-muted-foreground">{description}</p>
          )}
        </div>
      </div>

      <Input
        id={id}
        placeholder={placeholder}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="h-10 border-border/50 bg-background/50 text-sm"
      />

      {suggestions && suggestions.length > 0 && (
        <div className="mt-3">
          <p className="mb-2 text-xs text-muted-foreground/70">Examples:</p>
          <div className="flex flex-wrap gap-2">
            {suggestions.map((suggestion) => (
              <button
                key={suggestion}
                type="button"
                onClick={() => onChange(suggestion)}
                className="rounded-full border border-border/50 bg-muted/30 px-3 py-1 text-xs text-muted-foreground transition-colors hover:border-primary/50 hover:bg-primary/5 hover:text-foreground"
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
