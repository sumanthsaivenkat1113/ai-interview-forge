"use client";

import { useMemo, useState } from "react";
import { Input } from "@/client/components/ui/input";
import { Label } from "@/client/components/ui/label";
import { Button } from "@/client/components/ui/button";
import {
  ArrowRight,
  Building2,
  FileText,
  ListChecks,
  Loader2,
  UserRound,
} from "lucide-react";

import TextField from "../TextField";
import ResumeUploadField from "../ResumeUploadField";
import ExperienceField from "../ExperienceField";
import {
  ROLE_SUGGESTIONS,
  TARGET_COMPANIES_SUGGESTIONS,
} from "../lib/constants";
import type { WorkspaceFormState } from "../lib/types";

import WorkspaceLoadingOverlay, {
  type LoadingStep,
} from "@/client/components/WorkspaceLoadingOverlay";

type WorkspaceDetails = {
  id: string;
  workspace: string;
  target_company: string;
  target_role: string;
  years_of_experience: number;
};

type WorkspaceResponse = {
  success: boolean;
  data?: WorkspaceDetails;
  error?: string;
};

type ResumeDetails = {
  id: string;
  fileName: string;
  text: string;
  pages: number;
  skills: string;
  project: string;
  experience: string;
  otherFields: string;
  workspaceId: string;
  createdAt: string;
  updatedAt: string;
};

type ResumeResponse = {
  success: boolean;
  data?: ResumeDetails;
  error?: string;
};

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
  resumeFile: null,
  jobDescription: "",
  targetCompany: "",
  targetRole: "",
  yearsOfExperience: "",
};

interface WorkspaceFormProps {
  onSuccess?: (
    workspaceId: string,
    yearsOfExperience: number
  ) => void;
}

export default function WorkspaceForm({
  onSuccess,
}: WorkspaceFormProps) {

  const STEP_LABELS = [
    "Setting up your workspace",
    "Uploading your resume",
    "Generating personalized interview questions",
  ];

  const [currentStep, setCurrentStep] = useState(0);

  const buildSteps = (active: number): LoadingStep[] =>
    STEP_LABELS.map((label, i) => ({
      label,
      status:
        i < active ? "complete" : i === active ? "active" : "pending",
    }));


  const [form, setForm] =
    useState<WorkspaceFormState>(INITIAL_STATE);

  const [resumeError, setResumeError] =
    useState<string | null>(null);

  const [submitError, setSubmitError] =
    useState<string | null>(null);

  const [isSubmitting, setIsSubmitting] = useState(false);



  const update = <K extends keyof WorkspaceFormState>(
    key: K,
    value: WorkspaceFormState[K]
  ) => {
    setForm((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  const isFormValid = useMemo(() => {
    return (
      form.workspaceName.trim().length > 0 &&
      form.resumeFile !== null &&
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

      const userId = userResult.data?.id ?? userResult.id;

      if (!userId) {
        throw new Error(
          "Could not determine the current user's ID."
        );
      }

      /*
       * STEP 1
       * Check workspace uniqueness
       */
      const isWorkspaceUniqueResponse = await fetch(
        "/api/v1/workspace/is-unique",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            userId: Number(userId),
            workspace: form.workspaceName.trim(),
          }),
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
      const workspaceResponse = await fetch(
        "/api/v1/workspace",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            userId: Number(userId),
            workspace: form.workspaceName.trim(),
            target_company: form.targetCompany.trim(),
            target_role: form.targetRole.trim(),
            years_of_experience: Number(
              form.yearsOfExperience
            ),
          }),
        }
      );

      const workspaceResult: WorkspaceResponse =
        await workspaceResponse.json();

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

      setCurrentStep(1);

      /*
       * STEP 3
       * Upload resume
       */
      if (!form.resumeFile) {
        throw new Error("Please select a resume PDF.");
      }

      const formData = new FormData();

      formData.append("workspaceId", workspaceId);
      formData.append("file", form.resumeFile);

      const resumeResponse = await fetch(
        "/api/v1/resume",
        {
          method: "POST",
          body: formData,
        }
      );

      const resumeResult: ResumeResponse =
        await resumeResponse.json();

      if (
        !resumeResponse.ok ||
        !resumeResult.success
      ) {
        throw new Error(
          resumeResult.error ||
          "Failed to upload resume."
        );
      }

      if (!resumeResult.data?.id) {
        throw new Error(
          "Resume was uploaded but no resume ID was returned."
        );
      }

      setCurrentStep(2);

      /*
       * STEP 4
       * Generate interview questions
       */
      const interviewEndpoint =
        Number(form.yearsOfExperience) > 0
          ? "/api/v1/interview/workspace/FMIE"
          : "/api/v1/interview/workspace";

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

      const generateText = await generateRes.text();

      let generateResult: {
        success?: boolean;
        error?: string;
      } = {};

      try {
        generateResult = generateText
          ? JSON.parse(generateText)
          : {};
      } catch {
        // Response wasn't JSON
      }

      if (
        !generateRes.ok ||
        generateResult.success === false
      ) {
        throw new Error(
          generateResult.error ||
          `Failed to generate Interview questions (${generateRes.status}).`
        );
      }

      setCurrentStep(3);

      /*
       * Everything succeeded
       */
      onSuccess?.(
        workspaceId,
        Number(form.yearsOfExperience)
      );
    } catch (err) {
      console.error("Workspace submission error:", err);

      setSubmitError(
        err instanceof Error
          ? err.message
          : "Something went wrong while saving. Please try again."
      );
    } finally {
      setIsSubmitting(false);
      setCurrentStep(0);
    }
  };

  return (
    <div className="space-y-5">
      {/* Workspace Setup Card */}
      <div className="rounded-xl border border-border/50 bg-card/50 p-6">
        <div className="mb-5 flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
            <ListChecks
              size={18}
              className="text-primary"
            />
          </div>

          <div>
            <h2 className="text-base font-semibold text-foreground">
              Workspace Setup
            </h2>

            <p className="text-sm text-muted-foreground">
              Create a workspace to organize your interview
              session.
            </p>
          </div>
        </div>

        <div className="space-y-2">
          <Label
            htmlFor="workspaceName"
            className="text-sm font-medium text-foreground"
          >
            Workspace Name
          </Label>

          <Input
            id="workspaceName"
            placeholder="e.g. SDE - Amazon"
            value={form.workspaceName}
            onChange={(e) =>
              update("workspaceName", e.target.value)
            }
            className="h-11 max-w-md border-border/50 bg-background/50 text-sm"
          />

          <p className="text-xs text-muted-foreground/70">
            Give your workspace a name that helps you
            identify this interview.
          </p>
        </div>
      </div>

      {/* Upload Details Card */}
      <div className="rounded-xl border border-border/50 bg-card/50 p-6">
        <div className="mb-5 flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
            <FileText
              size={18}
              className="text-primary"
            />
          </div>

          <div>
            <h2 className="text-base font-semibold text-foreground">
              Upload Your Details
            </h2>

            <p className="text-sm text-muted-foreground">
              Upload your information to help our AI
              interviewer personalize your interview.
            </p>
          </div>
        </div>

        {/* Resume */}
        <div className="grid grid-cols-1 gap-4 md:grid-cols-1">
          <ResumeUploadField
            file={form.resumeFile}
            onFileChange={(file) =>
              update("resumeFile", file)
            }
            error={resumeError}
            onError={setResumeError}
          />
        </div>

        {/* Target Details */}
        <div className="mt-4 grid grid-cols-1 gap-4 md:grid-cols-3">
          <TextField
            id="targetCompany"
            icon={Building2}
            label="Target Company"
            description="Enter the company you are applying to"
            placeholder="e.g. Amazon"
            value={form.targetCompany}
            onChange={(v) =>
              update("targetCompany", v)
            }
            suggestions={TARGET_COMPANIES_SUGGESTIONS}
          />

          <TextField
            id="targetRole"
            icon={UserRound}
            label="Role"
            description="Enter the role you are applying for"
            placeholder="e.g. Software Development Engineer"
            value={form.targetRole}
            onChange={(v) =>
              update("targetRole", v)
            }
            suggestions={ROLE_SUGGESTIONS}
          />

          <ExperienceField
            value={form.yearsOfExperience}
            onChange={(v) =>
              update("yearsOfExperience", v)
            }
          />
        </div>
      </div>

      {/* Footer */}
      <div className="flex items-center justify-end gap-3">
        {submitError && (
          <p className="text-sm text-destructive">
            {submitError}
          </p>
        )}

        <Button
          size="lg"
          className="gap-2 px-6"
          disabled={!isFormValid || isSubmitting}
          onClick={handleSubmit}
        >
          {isSubmitting ? (
            <>
              <Loader2
                size={16}
                className="animate-spin"
              />
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
      {isSubmitting && (
        <WorkspaceLoadingOverlay steps={buildSteps(currentStep)} />
      )}
    </div>
  );
}