"use client";

import { Loader2, Send, ChevronLeft } from "lucide-react";
import { CodingQuestion } from "@/client/types/coding-interview/types";

interface HeaderProps {
    questions: CodingQuestion[];
    currentQuestionIndex: number;
    onQuestionChange: (index: number) => void;
    onBack: () => void;
    onSubmit: () => void;
    isSubmitting: boolean;
    isRunning: boolean;
}

export function Header({
    questions,
    currentQuestionIndex,
    onQuestionChange,
    onBack,
    onSubmit,
    isSubmitting,
    isRunning,
}: HeaderProps) {
    return (
        <header className="relative flex h-12 shrink-0 items-center justify-between border-b border-border bg-card px-4">
            {/* LEFT */}

            <div className="flex items-center gap-4">
                <button
                    onClick={onBack}
                    className="flex items-center gap-1 text-sm text-muted-foreground transition-colors hover:text-primary"
                >
                    <ChevronLeft className="h-4 w-4" />
                    Back
                </button>

                <div className="h-5 w-px bg-border" />

                <div className="flex items-center gap-2">
                    <div className="h-2 w-2 rounded-full bg-primary shadow-[0_0_10px_hsl(var(--primary)/0.6)]" />

                    <span className="text-sm font-semibold tracking-wide text-foreground">
                        Coding Interview
                    </span>
                </div>
            </div>

            {/* QUESTION NAVIGATION */}

            <div className="absolute left-1/2 flex -translate-x-1/2 items-center gap-1">
                {questions.map((question, index) => (
                    <button
                        key={question.id}
                        onClick={() => onQuestionChange(index)}
                        className={`h-7 min-w-7 rounded-md px-2 text-xs font-medium transition-all ${index === currentQuestionIndex
                                ? "bg-primary/15 text-primary shadow-[0_0_15px_hsl(var(--primary)/0.15)] ring-1 ring-primary/30"
                                : "text-muted-foreground hover:bg-muted hover:text-primary"
                            }`}
                    >
                        {question.qno}
                    </button>
                ))}
            </div>

            {/* SUBMIT */}

            <button
                onClick={onSubmit}
                disabled={isSubmitting || isRunning}
                className="flex items-center gap-2 rounded-md bg-primary px-4 py-1.5 text-xs font-semibold text-primary-foreground shadow-lg shadow-primary/20 transition-all hover:bg-primary/90 disabled:cursor-not-allowed disabled:opacity-50"
            >
                {isSubmitting ? (
                    <>
                        <Loader2 className="h-3.5 w-3.5 animate-spin" />
                        Submitting
                    </>
                ) : (
                    <>
                        <Send className="h-3.5 w-3.5" />
                        Submit
                    </>
                )}
            </button>
        </header>
    );
}