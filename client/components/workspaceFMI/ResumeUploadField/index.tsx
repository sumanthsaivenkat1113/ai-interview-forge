"use client";

import { useCallback, useRef, useState } from "react";
import { cn } from "@/lib/utils";
import { CheckCircle2, FileText, Trash2, UploadCloud } from "lucide-react";
import { ACCEPTED_RESUME_TYPES, MAX_RESUME_SIZE_MB } from "../lib/constants";

interface ResumeUploadFieldProps {
  file: File | null;
  onFileChange: (file: File | null) => void;
  error: string | null;
  onError: (message: string | null) => void;
}

export default function ResumeUploadField({
  file,
  onFileChange,
  error,
  onError,
}: ResumeUploadFieldProps) {
  const [isDragging, setIsDragging] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const validateAndSet = useCallback(
    (candidate: File | null) => {
      if (!candidate) return;
      if (!ACCEPTED_RESUME_TYPES.includes(candidate.type)) {
        onError("Please upload a PDF or DOCX file.");
        return;
      }
      if (candidate.size > MAX_RESUME_SIZE_MB * 1024 * 1024) {
        onError(`File must be under ${MAX_RESUME_SIZE_MB}MB.`);
        return;
      }
      onError(null);
      onFileChange(candidate);
    },
    [onError, onFileChange]
  );

  const handleRemove = () => {
    onFileChange(null);
    onError(null);
    if (inputRef.current) inputRef.current.value = "";
  };

  return (
    <div className="rounded-xl border border-border/50 bg-card/30 p-4">
      <div className="mb-3 flex items-center gap-3">
        <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
          <FileText size={18} className="text-primary" />
        </div>
        <div>
          <h3 className="text-sm font-medium text-foreground">Resume</h3>
          <p className="text-xs text-muted-foreground">Upload your latest resume</p>
        </div>
      </div>

      <p className="mb-3 text-xs text-muted-foreground/70">PDF, DOCX</p>

      <input
        ref={inputRef}
        type="file"
        accept=".pdf,.docx"
        className="hidden"
        onChange={(e) => validateAndSet(e.target.files?.[0] ?? null)}
      />

      {file ? (
        <div className="flex items-center justify-between rounded-lg border border-border/50 bg-muted/20 px-3 py-2.5">
          <div className="flex min-w-0 items-center gap-2.5">
            <FileText size={15} className="shrink-0 text-muted-foreground" />
            <span className="truncate text-sm text-muted-foreground">{file.name}</span>
          </div>
          <div className="flex shrink-0 items-center gap-2">
            <CheckCircle2 size={16} className="text-emerald-500" />
            <button
              type="button"
              onClick={handleRemove}
              aria-label="Remove file"
              className="text-muted-foreground transition-colors hover:text-destructive"
            >
              <Trash2 size={15} />
            </button>
          </div>
        </div>
      ) : (
        <button
          type="button"
          onClick={() => inputRef.current?.click()}
          onDragOver={(e) => {
            e.preventDefault();
            setIsDragging(true);
          }}
          onDragLeave={() => setIsDragging(false)}
          onDrop={(e) => {
            e.preventDefault();
            setIsDragging(false);
            validateAndSet(e.dataTransfer.files?.[0] ?? null);
          }}
          className={cn(
            "flex w-full flex-col items-center justify-center gap-2 rounded-lg border-2 border-dashed py-6 text-sm transition-all",
            isDragging
              ? "border-primary bg-primary/5 text-foreground"
              : "border-border/50 text-muted-foreground hover:border-primary/50 hover:bg-muted/20"
          )}
        >
          <UploadCloud size={20} className="text-muted-foreground/60" />
          <span className="font-medium">Click to upload</span>
          <span className="text-xs text-muted-foreground/60">or drag and drop</span>
        </button>
      )}

      {error && <p className="mt-2 text-xs text-destructive">{error}</p>}
    </div>
  );
}
