"use client";

import { ArrowLeft, HelpCircle } from "lucide-react";
import { Button } from "@/client/components/ui/button";

export default function WorkspaceHeader() {
  return (
    <header className="flex items-center justify-between">
      <div className="flex items-center gap-4">
        <button
          type="button"
          aria-label="Go back"
          className="flex h-10 w-10 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:bg-muted/50 hover:text-foreground"
        >
          <ArrowLeft size={20} />
        </button>
        <div>
          <h1 className="text-xl font-semibold tracking-tight text-foreground">
            Create New Full Mock Interview
          </h1>
          <p className="mt-0.5 text-sm text-muted-foreground">
            Set up your workspace and upload details to get started
          </p>
        </div>
      </div>

      <Button
        variant="outline"
        size="sm"
        className="gap-2 border-border/50 bg-card/50 text-sm text-muted-foreground hover:bg-muted/50 hover:text-foreground"
      >
        <HelpCircle size={16} />
        How it works
      </Button>
    </header>
  );
}
