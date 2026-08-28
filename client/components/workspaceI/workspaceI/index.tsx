"use client";
import { useRouter } from "next/navigation";
import DashboardSidebar from "../Sidebar";
import WorkspaceHeader from "../WorkspaceHeader";
import WorkspaceStepper from "../WorkspaceStepper";
import WorkspaceForm from "../WorkspaceForm";

export default function WorkspaceI() {
  const router = useRouter();
  return (
    <div className="flex min-h-screen bg-background">
      <DashboardSidebar />

      <main className="flex-1 overflow-y-auto">
        <div className="mx-auto max-w-7xl space-y-6 p-6 pt-8">
          <WorkspaceHeader />
          <WorkspaceStepper currentStep={0} />
          <WorkspaceForm
            onSuccess={(workspaceId, interviewType) => {
              (interviewType === 'theory') ?
                router.push(`/mock-interview/${workspaceId}`) :
                router.push(`/coding/${workspaceId}/mi`)
            }}
          />
        </div>
      </main>
    </div>
  );
}
