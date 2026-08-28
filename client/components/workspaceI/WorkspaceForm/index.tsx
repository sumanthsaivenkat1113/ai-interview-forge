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
import {
  ROLE_SUGGESTIONS,
  TARGET_COMPANIES_SUGGESTIONS,
  EXPERIENCE_VALUE_MAP,
} from "../lib/constants";
import type { WorkspaceFormState } from "../lib/types";

type UserResponse = {
  success?: boolean;
  data?: {
    id: number | string;
  };
  id?: number | string;
  error?: string;
};

const INITIAL_STATE: WorkspaceFormState = {
  workspaceName: "",
  interviewType: "",
  subject: "",
  targetCompany: "",
  targetRole: "",
  yearsOfExperience: "",
};

interface WorkspaceFormProps {
  onSuccess?: (
    workspaceId: string,
    interviewType: string,
  ) => void;
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
      form.interviewType.trim().length > 0 &&
      form.subject.trim().length > 0 &&
      form.targetCompany.trim().length > 0 &&
      form.targetRole.trim().length > 0 &&
      form.yearsOfExperience.trim().length > 0
    );
  }, [form]);

  const handleSubmit = async () => {
    if (!isFormValid || isSubmitting) return;
    setIsSubmitting(true);
    setSubmitError(null);

    try {
      /*
       * STEP 0
       * Get current logged-in user
       */
      const userResponse = await fetch("/api/v1/users/me", {
        method: "GET",
      });

      const userResult: UserResponse = await userResponse.json();

      if (!userResponse.ok) {
        throw new Error(
          userResult.error || "Failed to get current user."
        );
      }

      let userId = userResult.data?.id ?? userResult.id;

      if (userId === undefined || userId === null || userId === "") {
        throw new Error(
          "Could not determine the current user's ID."
        );
      }

      // CRITICAL FIX: Convert userId to number
      userId = Number(userId);

      // Validate that it's a valid number
      if (isNaN(userId)) {
        throw new Error(
          "Invalid user ID format. Expected a number."
        );
      }

      /*
       * STEP 1
       * Check workspace uniqueness
       */
      const isUniquePayload = {
        userId, // Now this will be a number
        workspace: form.workspaceName.trim(),
      };
      console.log("[WorkspaceForm] is-unique payload:", isUniquePayload);

      const isWorkspaceUniqueResponse = await fetch(
        "/api/v1/workspace/is-unique",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(isUniquePayload),
        }
      );

      const isWorkspaceUniqueResult =
        await isWorkspaceUniqueResponse.json();

      if (!isWorkspaceUniqueResponse.ok) {
        throw new Error(
          isWorkspaceUniqueResult.error ||
          "Failed to check workspace availability."
        );
      }

      if (!isWorkspaceUniqueResult.data) {
        throw new Error(
          `The workspace "${form.workspaceName.trim()}" already exists. Please choose a different name.`
        );
      }

      /*
        * STEP 2
        * Create workspace
        */
      // In WorkspaceForm, in STEP 2, add this check:

      const yearsOfExperienceNumber = EXPERIENCE_VALUE_MAP[form.yearsOfExperience];
      if (yearsOfExperienceNumber === undefined || yearsOfExperienceNumber === null) {
        throw new Error("Please select a valid experience range.");
      }

      // Additional check: ensure the value is a valid number
      if (typeof yearsOfExperienceNumber !== 'number' || isNaN(yearsOfExperienceNumber)) {
        throw new Error("Invalid experience value. Please select a valid experience range.");
      }

      // Log what we're sending
      console.log("[WorkspaceForm] form.yearsOfExperience:", form.yearsOfExperience);
      console.log("[WorkspaceForm] yearsOfExperienceNumber:", yearsOfExperienceNumber);

      const workspacePayload = {
        workspace: form.workspaceName.trim(),
        target_company: form.targetCompany.trim(),
        target_role: form.targetRole.trim(),
        years_of_experience: yearsOfExperienceNumber,
        subject: form.subject.trim(),
        userId: userId,
      };

      console.log("[WorkspaceForm] Full workspace payload:", JSON.stringify(workspacePayload, null, 2));
      console.log("[WorkspaceForm] userId type:", typeof userId, "value:", userId);

      const workspaceResponse = await fetch(
        "/api/v1/workspace/subject-wise",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(workspacePayload),
        }
      );

      const workspaceResult =
        await workspaceResponse.json();

      console.log("[WorkspaceForm] Workspace response:", workspaceResult);

      if (
        !workspaceResponse.ok ||
        !workspaceResult.success
      ) {
        throw new Error(
          workspaceResult.error ||
          "Failed to create workspace."
        );
      }

      if (!workspaceResult.data?.id) {
        throw new Error(
          "Workspace was created but no workspace ID was returned."
        );
      }

      const workspaceId = workspaceResult.data.id;

      /**
       * STEP 3 
       * Generate interview questions
       */

      const interviewEndpoint =
        form.interviewType === 'theory'
          ? "/api/v1/interview/workspace/subject-wise"
          : "/api/v1/interview/workspace/coding"

      const generateRes = await fetch(
        interviewEndpoint,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            workspaceId,
          }),
        }
      );

      if (!generateRes.ok) {
        throw new Error(
          `Failed to generate Interview questions (${generateRes.status}).`
        );
      }

      onSuccess?.(
        workspaceId,
        form.interviewType
      );
    } catch (err) {
      console.error("Error in handleSubmit:", err);
      setSubmitError(
        err instanceof Error
          ? err.message
          : "Something went wrong while saving. Please try again."
      );
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