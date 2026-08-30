import { BarChart3, Clock, ShieldCheck, Zap } from "lucide-react";

const features = [
  {
    icon: Zap,
    title: "Feedback in seconds",
    desc: "No waiting on a mentor's calendar. Get a score and specific notes the moment you submit an answer.",
  },
  {
    icon: BarChart3,
    title: "A report that compounds",
    desc: "Every session feeds your performance dashboard, so your average score and coding success rate are always visible.",
  },
  {
    icon: Clock,
    title: "Practice on your clock",
    desc: "Mock interviews are open around the clock. Run one before breakfast or at midnight before the real thing.",
  },
  {
    icon: ShieldCheck,
    title: "Real interview conditions",
    desc: "Timed questions and a live code editor — no pausing to look things up, same as the actual room.",
  },
];

export default function Features() {
  return (
    <section className="border-b border-border/60 bg-background py-20">
      <div className="mx-auto max-w-7xl px-6">
        <div className="max-w-2xl">
          <span className="text-xs font-semibold uppercase tracking-widest text-primary">
            Why AI InterviewForge
          </span>
          <h2 className="mt-3 text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            Built like the interviews it's preparing you for
          </h2>
        </div>

        <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {features.map((feature) => {
            const Icon = feature.icon;
            return (
              <div key={feature.title} className="rounded-2xl border border-border bg-card p-6">
                <div className="inline-flex h-10 w-10 items-center justify-center rounded-lg border border-primary/20 bg-primary/10 text-primary">
                  <Icon className="h-5 w-5" />
                </div>
                <h3 className="mt-4 text-sm font-semibold text-foreground">{feature.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{feature.desc}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}