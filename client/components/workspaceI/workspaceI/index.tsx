"use client";

import DashboardSidebar from "../Sidebar";
import WorkspaceHeader from "../WorkspaceHeader";
import WorkspaceStepper from "../WorkspaceStepper";
import WorkspaceForm from "../WorkspaceForm";

export default function WorkspaceI() {
  return (
    <div className="flex min-h-screen bg-background">
      <DashboardSidebar />

      <main className="flex-1 overflow-y-auto">
        <div className="mx-auto max-w-4xl space-y-6 p-6 pt-8">
          <WorkspaceHeader />
          <WorkspaceStepper currentStep={1} />
          <WorkspaceForm
            onSuccess={(workspaceId) => {
              // TODO: route to step 3 (AI Interview) once the backend
              // returns the created workspace id
              // router.push(`/dashboard/ai-interview/${workspaceId}`)
            }}
          />
        </div>
      </main>
    </div>
  );
}
