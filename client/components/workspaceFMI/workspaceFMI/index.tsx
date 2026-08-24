"use client";
import { useRouter } from "next/navigation";
import DashboardSidebar from "../Sidebar";
import WorkspaceHeader from "../WorkspaceHeader";
import WorkspaceStepper from "../WorkspaceStepper";
import WorkspaceForm from "../WorkspaceForm";

export default function WorkspaceFMI() {
  const router = useRouter();
  return (
    <div className="flex min-h-screen bg-background">
      <DashboardSidebar />

      <main className="flex-1 overflow-y-auto">
        <div className="mx-auto max-w-4xl space-y-6 p-6 pt-8">
          <WorkspaceHeader />
          <WorkspaceStepper currentStep={0} />
          <WorkspaceForm
            onSuccess={(workspaceId) => {
              // 

              // The workspace and resume have both
              // been successfully created.

              // If the user has experience,
              // go to the FMIE interview.
              if (
                Number(
                  // WorkspaceForm doesn't currently
                  // expose yearsOfExperience here.
                  // See note below.
                  0
                ) > 0
              ) {
                router.push(
                  `/workspace10/interview/FMIE/${workspaceId}`
                );
              } else {
                router.push(
                  `/workspace10/interview/${workspaceId}`
                );
              }


            }}
          />
        </div>
      </main>
    </div>
  );
}
