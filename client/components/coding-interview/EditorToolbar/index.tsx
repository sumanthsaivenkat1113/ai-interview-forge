"use client";

import { Play, Loader2, ChevronDown } from "lucide-react";
import { compilers, CompilerLabel } from "@/client/constants/coding-interview/constants";

interface EditorToolbarProps {
    language: CompilerLabel;
    dropdownOpen: boolean;
    setDropdownOpen: (updater: (value: boolean) => boolean) => void;
    onLanguageChange: (label: CompilerLabel) => void;
    onRun: () => void;
    isRunning: boolean;
    isSubmitting: boolean;
}

export function EditorToolbar({
    language,
    dropdownOpen,
    setDropdownOpen,
    onLanguageChange,
    onRun,
    isRunning,
    isSubmitting,
}: EditorToolbarProps) {
    return (
        <div className="flex h-11 shrink-0 items-center justify-between border-b border-border bg-card px-3">
            {/* LANGUAGE */}

            <div className="relative">
                <button
                    onClick={() => setDropdownOpen((value) => !value)}
                    className="flex items-center gap-2 rounded-md border border-border bg-card px-2.5 py-1.5 text-xs text-muted-foreground transition-all hover:border-primary/30 hover:bg-primary/5 hover:text-foreground"
                >
                    {language}
                    <ChevronDown className="h-3.5 w-3.5 text-muted-foreground/60" />
                </button>

                {dropdownOpen && (
                    <div className="absolute left-0 top-full z-50 mt-1 w-36 overflow-hidden rounded-lg border border-border bg-card py-1 shadow-2xl shadow-black/50">
                        {(Object.keys(compilers) as CompilerLabel[]).map(
                            (label) => (
                                <button
                                    key={label}
                                    onClick={() => onLanguageChange(label)}
                                    className={`block w-full px-3 py-2 text-left text-xs transition-colors hover:bg-muted ${
                                        label === language
                                            ? "bg-primary/10 text-primary"
                                            : "text-muted-foreground"
                                    }`}
                                >
                                    {label}
                                </button>
                            )
                        )}
                    </div>
                )}
            </div>

            {/* RUN */}

            <button
                onClick={onRun}
                disabled={isRunning || isSubmitting}
                className="flex items-center gap-2 rounded-md border border-primary/20 bg-primary/10 px-3 py-1.5 text-xs font-medium text-primary transition-all hover:border-primary/30 hover:bg-primary/15 disabled:cursor-not-allowed disabled:opacity-50"
            >
                {isRunning ? (
                    <>
                        <Loader2 className="h-3.5 w-3.5 animate-spin" />
                        Running
                    </>
                ) : (
                    <>
                        <Play className="h-3.5 w-3.5" />
                        Run
                    </>
                )}
            </button>
        </div>
    );
}