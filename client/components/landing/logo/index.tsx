import { Sparkles } from "lucide-react";

export default function Logo() {
  return (
    <a
      href="/"
      className="group flex items-center gap-3 transition-opacity hover:opacity-90"
    >
      <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary text-primary-foreground shadow-lg shadow-primary/20 transition-transform duration-300 group-hover:scale-105">
        <Sparkles className="h-5 w-5" />
      </div>

      <div className="flex flex-col leading-none">
        <span className="bg-gradient-to-r from-primary via-violet-400 to-cyan-400 bg-clip-text text-lg font-bold tracking-tight text-transparent">
          AI InterviewForge
        </span>
        <span className="text-xs text-muted-foreground">
          Practice • Prepare • Perform
        </span>
      </div>
    </a>
  );
}