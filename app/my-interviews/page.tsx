import { auth } from '@clerk/nextjs/server'
import DashboardSidebar from "@/client/components/workspaceFMI/Sidebar";
import WorkspaceDashboard from "@/client/components/my-interviews/WorkspaceDashboard";
export default async function Page() {
  await auth.protect()
  return (
    <div className="flex min-h-screen bg-background">
      <DashboardSidebar />
      <div className="flex-1 overflow-x-hidden">
        <WorkspaceDashboard />
      </div>
    </div>
  );
}