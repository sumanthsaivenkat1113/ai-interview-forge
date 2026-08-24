"use client";

import { Badge } from "@/client/components/ui/badge";
import {
  ArrowRight,
  Bot,
  Clock3,
  Sparkles,
  LucideIcon,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { useRouter } from "next/navigation";

interface Props {
  title: string;
  badge: string;
  description: string;
  duration: string;
  icon: LucideIcon;
  iconColor: string;
  href: string;
}

export default function InterviewCard({
  title,
  badge,
  description,
  duration,
  icon: Icon,
  iconColor,
  href,
}: Props) {
  const router = useRouter();
  return (
    <button
      type="button"
      onClick={() => router.push(href)}
      className="
        group
        relative
        w-full
        overflow-hidden
        rounded-2xl
        border
        bg-card
        p-7
        text-left
        transition-all
        duration-300
        hover:-translate-y-1
        hover:border-primary/30
        hover:shadow-lg
        cursor-pointer
      "
    >
      {/* Accent line */}
      <div className="absolute left-0 top-0 h-full w-1 scale-y-0 rounded-l-2xl bg-primary transition-transform duration-300 group-hover:scale-y-100" />

      <div className="flex items-start justify-between">
        <div
          className={cn(
            "flex h-16 w-16 items-center justify-center rounded-2xl",
            iconColor
          )}
        >
          <Icon className="h-8 w-8" />
        </div>

        <div className="flex h-10 w-10 items-center justify-center rounded-full border bg-background transition-all duration-300 group-hover:border-primary group-hover:bg-primary group-hover:text-primary-foreground">
          <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-0.5" />
        </div>
      </div>

      <div className="mt-7">
        <h3 className="text-xl font-semibold tracking-tight">
          {title}
        </h3>

        <Badge
          variant="secondary"
          className="mt-3 rounded-md gap-1.5"
        >
          <Bot className="h-3 w-3" />
          {badge}
        </Badge>

        <p className="mt-5 leading-7 text-muted-foreground">
          {description}
        </p>
      </div>

      <div className="mt-8 flex items-center justify-between border-t pt-5 text-sm text-muted-foreground">
        <div className="flex items-center gap-5">
          <div className="flex items-center gap-2">
            <Clock3 className="h-4 w-4" />
            {duration}
          </div>

          <div className="flex items-center gap-2">
            <Sparkles className="h-4 w-4" />
            AI Feedback
          </div>
        </div>
      </div>
    </button>
  );
}