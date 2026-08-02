"use client";

import { useMemo, useState } from "react";
import { Input } from "@/client/components/ui/input";
import { Label } from "@/client/components/ui/label";
import { Button } from "@/client/components/ui/button";
import { ArrowRight, Building2, ListChecks, Loader2, UserRound } from "lucide-react";
import TextField from "../TextField";
import InterviewTypeField from "../InterviewTypeField";
import SubjectField from "../SubjectField";
import ExperienceField from "../ExperienceField";
import { ROLE_SUGGESTIONS, TARGET_COMPANIES_SUGGESTIONS } from "../lib/constants";
import type { WorkspaceFormState } from "../lib/types";

const INITIAL_STATE: WorkspaceFormState = {
  workspaceName: "",
  interviewType: "",
  subject: "",
  targetCompany: "",
  targetRole: "",
  yearsOfExperience: "",
};

interface WorkspaceFormProps {
  onSuccess?: (workspaceId: string) => void;
}

export default function WorkspaceForm({ onSuccess }: WorkspaceFormProps) {
  const [form, setForm] = useState<WorkspaceFormState>(INITIAL_STATE);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const update = <K extends keyof WorkspaceFormState>(
    key: K,
    value: WorkspaceFormState[K]
  ) => setForm((prev) => ({ ...prev, [key]: value }));

  const isFormValid = useMemo(() => {
    return (
      form.workspaceName.trim().length > 0 &&
      form.interviewType !== "" &&
      form.subject.trim().length > 0 &&
      form.targetRole.trim().length > 0 &&
      form.yearsOfExperience.trim().length > 0
    );
  }, [form]);

  const handleSubmit = async () => {
    if (!isFormValid || isSubmitting) return;
    setIsSubmitting(true);
    setSubmitError(null);

    try {
      const payload = new FormData();
      payload.append("workspaceName", form.workspaceName.trim());
      payload.append("interviewType", form.interviewType);
      payload.append("subject", form.subject.trim());
      payload.append("targetCompany", form.targetCompany.trim());
      payload.append("targetRole", form.targetRole.trim());
      payload.append("yearsOfExperience", form.yearsOfExperience);

      const res = await fetch("/api/workspace", {
        method: "POST",
        body: payload,
      });

      if (!res.ok) throw new Error("Failed to save workspace");

      const data = await res.json().catch(() => null);
      onSuccess?.(data?.workspaceId ?? "");
    } catch (err) {
      console.error(err);
      setSubmitError("Something went wrong while saving. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="space-y-5">
      {/* Workspace Setup Card */}
      <div className="rounded-xl border border-border/50 bg-card/50 p-6">
        <div className="mb-5 flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
            <ListChecks size={18} className="text-primary" />
          </div>
          <div>
            <h2 className="text-base font-semibold text-foreground">Workspace Setup</h2>
            <p className="text-sm text-muted-foreground">
              Create a workspace to organize your interview session.
            </p>
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="workspaceName" className="text-sm font-medium text-foreground">
            Workspace Name
          </Label>
          <Input
            id="workspaceName"
            placeholder="e.g. SDE - Amazon"
            value={form.workspaceName}
            onChange={(e) => update("workspaceName", e.target.value)}
            className="h-11 max-w-md border-border/50 bg-background/50 text-sm"
          />
          <p className="text-xs text-muted-foreground/70">
            Give your workspace a name that helps you identify this interview.
          </p>
        </div>
      </div>

      {/* Interview Details Card */}
      <div className="rounded-xl border border-border/50 bg-card/50 p-6">
        <div className="mb-5 flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
            <ListChecks size={18} className="text-primary" />
          </div>
          <div>
            <h2 className="text-base font-semibold text-foreground">Interview Details</h2>
            <p className="text-sm text-muted-foreground">
              Select the interview type and subject to help our AI interviewer prepare.
            </p>
          </div>
        </div>

        {/* Interview Type + Subject */}
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          <InterviewTypeField
            value={form.interviewType}
            onChange={(v) => update("interviewType", v)}
          />
          <SubjectField
            interviewType={form.interviewType}
            value={form.subject}
            onChange={(v) => update("subject", v)}
          />
        </div>

        {/* Details Row: Target Company + Role + Experience */}
        <div className="mt-4 grid grid-cols-1 gap-4 md:grid-cols-3">
          <TextField
            id="targetCompany"
            icon={Building2}
            label="Target Company"
            description="Enter the company you are applying to"
            placeholder="e.g. Amazon"
            value={form.targetCompany}
            onChange={(v) => update("targetCompany", v)}
            suggestions={TARGET_COMPANIES_SUGGESTIONS}
          />
          <TextField
            id="targetRole"
            icon={UserRound}
            label="Role"
            description="Enter the role you are applying for"
            placeholder="e.g. Software Development Engineer"
            value={form.targetRole}
            onChange={(v) => update("targetRole", v)}
            suggestions={ROLE_SUGGESTIONS}
          />
          <ExperienceField
            value={form.yearsOfExperience}
            onChange={(v) => update("yearsOfExperience", v)}
          />
        </div>
      </div>

      {/* Footer */}
      <div className="flex items-center justify-end gap-3">
        {submitError && (
          <p className="text-sm text-destructive">{submitError}</p>
        )}
        <Button
          size="lg"
          className="gap-2 px-6"
          disabled={!isFormValid || isSubmitting}
          onClick={handleSubmit}
        >
          {isSubmitting ? (
            <>
              <Loader2 size={16} className="animate-spin" />
              Saving...
            </>
          ) : (
            <>
              Save &amp; Continue
              <ArrowRight size={16} />
            </>
          )}
        </Button>
      </div>
    </div>
  );
}
