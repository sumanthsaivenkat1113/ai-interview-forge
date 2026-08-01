import DashboardSidebar from "../Sidebar";
import InterviewSection from "../Main/InterviewSection";

export default function Dashboard() {
  return (
    <div className="flex min-h-screen bg-background">
      <DashboardSidebar />

      <main className="flex-1 overflow-y-auto">
        <div className="mx-auto max-w-7xl space-y-6 p-8">
          <section className="space-y-2 border-b pb-8">
            <h1 className="text-4xl font-semibold tracking-tight">
              Welcome back
            </h1>

            <p className="text-muted-foreground">
              Continue preparing for your next interview.
            </p>
          </section>
          <InterviewSection />
        </div>
      </main>
    </div>
  );
}