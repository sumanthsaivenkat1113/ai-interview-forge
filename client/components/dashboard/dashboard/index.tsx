"use client";

import { UserButton } from "@clerk/nextjs";
import DashboardSidebar from "../Sidebar";
import InterviewSection from "../Main/InterviewSection";

interface DashboardProps {
  user: {
    id: number;
    clerkId: string;
    email: string;
    name: string;
    profileImageUrl: string | null;
    createdAt: Date;
    updatedAt: Date;
    lastLoginAt: Date | null;
  };
}

export default function Dashboard({ user }: DashboardProps) {
  const firstName = user.name.split(" ")[0];

  return (
    <div className="flex min-h-screen bg-background">
      <DashboardSidebar />

      <main className="flex-1 overflow-y-auto">
        <div className="mx-auto max-w-7xl space-y-6 p-8">
          <section className="flex items-center justify-between border-b pb-8">
            <div className="space-y-2">
              <h1 className="text-4xl font-semibold tracking-tight">
                Welcome back, {firstName}
              </h1>

              <p className="text-muted-foreground">
                Continue preparing for your next interview.
              </p>
            </div>

            <UserButton>
              <UserButton.MenuItems>
                <UserButton.Action label="manageAccount" />
                <UserButton.Action label="signOut" />
              </UserButton.MenuItems>
            </UserButton>
          </section>

          <InterviewSection />
        </div>
      </main>
    </div>
  );
}