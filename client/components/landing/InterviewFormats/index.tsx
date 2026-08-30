import { BookOpen, CheckCircle2, Code2, Layers } from "lucide-react";

const formats = [
  {
    icon: Layers,
    badge: "Full Mock Interview",
    tag: "border-primary/20 bg-primary/10 text-primary",
    iconWrap: "border-primary/20 bg-primary/10 text-primary",
    ring: "hover:border-primary/40",
    description:
      "Theory questions and a coding challenge, back to back. The full rehearsal for when you have a real onsite loop coming up.",
    bullets: [
      "Communication and technical scoring",
      "One end-to-end readiness report",
      "Mirrors a real onsite loop",
    ],
    bestFor: "A complete rehearsal before the real interview",
  },
  {
    icon: BookOpen,
    badge: "Subject-Wise Theory",
    tag: "border-amber-500/20 bg-amber-500/10 text-amber-500",
    iconWrap: "border-amber-500/20 bg-amber-500/10 text-amber-500",
    ring: "hover:border-amber-500/40",
    description:
      "Drill a single subject — System Design, DBMS, OS, Networks — with rapid questions and clear feedback on what a strong answer covers.",
    bullets: [
      "Choose any subject to focus on",
      "Model-answer style feedback",
      "Repeat until it's second nature",
    ],
    bestFor: "Closing gaps in a specific subject",
  },
  {
    icon: Code2,
    badge: "Subject-Wise Coding",
    tag: "border-emerald-500/20 bg-emerald-500/10 text-emerald-500",
    iconWrap: "border-emerald-500/20 bg-emerald-500/10 text-emerald-500",
    ring: "hover:border-emerald-500/40",
    description:
      "Solve problems in a live editor while the AI plays interviewer, asking the same follow-ups a real engineer would.",
    bullets: [
      "Real code execution against test cases",
      "Follow-up questions on your approach",
      "Time and space complexity checks",
    ],
    bestFor: "Sharpening problem-solving under pressure",
  },
];

export default function InterviewFormats() {
  return (
    <section id="formats" className="scroll-mt-20 border-b border-border/60 bg-background py-20">
      <div className="mx-auto max-w-7xl px-6">
        <div className="max-w-2xl">
          <span className="text-xs font-semibold uppercase tracking-widest text-primary">
            Interview formats
          </span>
          <h2 className="mt-3 text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            Three ways to practice, one AI evaluator
          </h2>
          <p className="mt-3 text-muted-foreground">
            Every format is graded by the same evaluator, so your scores stay
            comparable no matter which one you run.
          </p>
        </div>

        <div className="mt-12 grid grid-cols-1 gap-6 lg:grid-cols-3">
          {formats.map((format) => {
            const Icon = format.icon;
            return (
              <div
                key={format.badge}
                className={`flex flex-col rounded-2xl border border-border bg-card p-6 transition-colors ${format.ring}`}
              >
                <div className={`inline-flex h-10 w-10 items-center justify-center rounded-lg border ${format.iconWrap}`}>
                  <Icon className="h-5 w-5" />
                </div>

                <span className={`mt-4 inline-flex w-fit items-center rounded-full border px-2.5 py-1 text-xs font-semibold ${format.tag}`}>
                  {format.badge}
                </span>

                <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                  {format.description}
                </p>

                <ul className="mt-5 space-y-2.5">
                  {format.bullets.map((bullet) => (
                    <li key={bullet} className="flex items-start gap-2 text-sm text-foreground">
                      <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-muted-foreground" />
                      {bullet}
                    </li>
                  ))}
                </ul>

                <div className="mt-6 border-t border-border/60 pt-4 text-xs text-muted-foreground">
                  Best for: {format.bestFor}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}