"use client";

import StartInterviewButton from "../StartInterviewButton";

export default function CtaSection() {
  return (
    <section className="bg-background py-20">
      <div className="mx-auto max-w-4xl px-6">
        <div className="rounded-3xl border border-border bg-card px-8 py-14 text-center">
          <h2 className="text-2xl font-bold tracking-tight text-foreground sm:text-3xl">
            Your next interview shouldn&apos;t be the first time you&apos;re tested.
          </h2>
          <p className="mx-auto mt-3 max-w-xl text-muted-foreground">
            Run a full mock interview today and see exactly where you stand —
            theory, coding, or both.
          </p>
          <div className="mt-8 flex justify-center">
            <StartInterviewButton label="Start your first mock interview" />
          </div>
        </div>
      </div>
    </section>
  );
}