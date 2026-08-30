"use client";

import { Button } from "@/client/components/ui/button";
import InterviewSessionPreview from "../InterviewSessionPreview";
import StartInterviewButton from "../StartInterviewButton";

export default function Hero() {
  return (
    <section className="relative overflow-hidden border-b border-border/60 bg-background">
      {/* faint technical grid texture */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.05]"
        style={{
          backgroundImage:
            "linear-gradient(to right, #ffffff 1px, transparent 1px), linear-gradient(to bottom, #ffffff 1px, transparent 1px)",
          backgroundSize: "40px 40px",
        }}
        aria-hidden="true"
      />

      <div className="relative mx-auto max-w-7xl px-6 py-20 lg:py-28">
        <div className="grid gap-16 lg:grid-cols-[1.05fr_1fr] lg:items-center">
          <div>
            <span className="inline-flex items-center rounded-full border border-border bg-muted px-3 py-1 text-xs font-medium text-muted-foreground">
              Scoring theory and code, separately and together
            </span>

            <h1 className="mt-5 text-4xl font-bold tracking-tight text-foreground sm:text-5xl lg:text-[3.25rem] lg:leading-[1.1]">
              Walk into your next interview{" "}
              <span className="bg-gradient-to-r from-primary via-violet-400 to-cyan-400 bg-clip-text text-transparent">
                already having aced it
              </span>
              .
            </h1>

            <p className="mt-5 max-w-xl text-lg text-muted-foreground">
              AI InterviewForge runs full mock interviews — theory, coding, or
              both — grades every answer like a real interviewer would, and
              hands you a report on exactly what to fix before the real thing.
            </p>

            <div className="mt-8 flex flex-wrap items-center gap-4">
              <StartInterviewButton label="Start a mock interview" />
              <a href="#formats">
                <Button size="lg" variant="ghost" className="text-muted-foreground hover:text-foreground">
                  See interview formats
                </Button>
              </a>
            </div>

            <dl className="mt-12 grid max-w-md grid-cols-3 gap-6 border-t border-border/60 pt-8">
              <div>
                <dt className="text-2xl font-bold text-foreground">3</dt>
                <dd className="mt-1 text-xs text-muted-foreground">interview formats</dd>
              </div>
              <div>
                <dt className="text-2xl font-bold text-foreground">2</dt>
                <dd className="mt-1 text-xs text-muted-foreground">domains scored separately</dd>
              </div>
              <div>
                <dt className="text-2xl font-bold text-foreground">1</dt>
                <dd className="mt-1 text-xs text-muted-foreground">readiness report per session</dd>
              </div>
            </dl>
          </div>

          <InterviewSessionPreview />
        </div>
      </div>
    </section>
  );
}