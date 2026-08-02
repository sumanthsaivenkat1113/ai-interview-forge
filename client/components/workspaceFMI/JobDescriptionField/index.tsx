"use client";

import { Textarea } from "@/client/components/ui/textarea";
import { FileText } from "lucide-react";

interface JobDescriptionFieldProps {
  value: string;
  onChange: (value: string) => void;
}

export default function JobDescriptionField({
  value,
  onChange,
}: JobDescriptionFieldProps) {
  return (
    <div className="rounded-xl border border-border/50 bg-card/30 p-4">
      <div className="mb-3 flex items-center gap-3">
        <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
          <FileText size={18} className="text-primary" />
        </div>
        <div>
          <h3 className="text-sm font-medium text-foreground">Job Description (JD)</h3>
          <p className="text-xs text-muted-foreground">Paste the job description text</p>
        </div>
      </div>

      <Textarea
        placeholder="Paste the job description here..."
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className=" resize-none border-border/50 bg-background/50 text-sm"
      />

      <p className="mt-2 text-right text-xs text-muted-foreground/70">
        {value.length} characters
      </p>
    </div>
  );
}
