const steps = [
  {
    n: "01",
    title: "Pick your format",
    desc: "Full mock, subject-wise theory, or subject-wise coding — whatever you need right now.",
  },
  {
    n: "02",
    title: "Take the interview",
    desc: "Timed questions and a live code editor, run the way an actual interview would.",
  },
  {
    n: "03",
    title: "AI grades every answer",
    desc: "Correctness, communication, and code quality — scored the moment you submit.",
  },
  {
    n: "04",
    title: "Read your report",
    desc: "See exactly what held your score back and what to drill before the real thing.",
  },
];

export default function HowItWorks() {
  return (
    <section id="how-it-works" className="scroll-mt-20 border-b border-border/60 bg-background py-20">
      <div className="mx-auto max-w-7xl px-6">
        <div className="max-w-2xl">
          <span className="text-xs font-semibold uppercase tracking-widest text-primary">
            How it works
          </span>
          <h2 className="mt-3 text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            From setup to feedback in one sitting
          </h2>
          <p className="mt-3 text-muted-foreground">
            No scheduling, no waiting on a reviewer. Start whenever you&apos;re
            ready and get graded before you close the tab.
          </p>
        </div>

        <ol className="mt-12 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4">
          {steps.map((step, i) => (
            <li key={step.n} className="relative">
              <span className="font-mono text-sm font-semibold text-primary">{step.n}</span>
              <h3 className="mt-3 text-base font-semibold text-foreground">{step.title}</h3>
              <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">{step.desc}</p>
              {i < steps.length - 1 && (
                <div className="mt-6 hidden h-px w-full bg-border/60 lg:block" aria-hidden="true" />
              )}
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}