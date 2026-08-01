import InterviewCard from "../InterviewCard";
import {
  MessagesSquare,
  BookOpenText,
} from "lucide-react";

export default function InterviewSection() {
  return (
    <section className="space-y-8">
      <div className="flex items-end justify-between">
        <div>
          <p className="text-sm font-medium text-primary">
            Interview Preparation
          </p>

          <h2 className="mt-2 text-3xl font-semibold tracking-tight">
            What would you like to practice today?
          </h2>

          <p className="mt-2 max-w-2xl text-muted-foreground">
            Choose a practice mode and get personalized AI feedback to
            improve your interview performance.
          </p>
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <InterviewCard
          title="Full Mock Interview"
          badge="Interview + Coding"
          duration="45–60 mins"
          description="Experience a realistic interview with technical questions, coding rounds, and detailed AI-powered feedback."
          icon={MessagesSquare}
          iconColor="bg-violet-500/15 text-violet-600 dark:bg-violet-500/20 dark:text-violet-400"
        />

        <InterviewCard
          title="Subject-wise Practice"
          badge="Interview Only"
          duration="Flexible"
          description="Practice specific subjects like React, DSA, JavaScript, SQL, and System Design at your own pace."
          icon={BookOpenText}
          iconColor="bg-emerald-500/15 text-emerald-600 dark:bg-emerald-500/20 dark:text-emerald-400"
        />
      </div>
    </section>
  );
}