"use client";

import { RefObject, KeyboardEvent } from "react";

interface CodeAreaProps {
    code: string;
    onChange: (value: string) => void;
    onKeyDown: (e: KeyboardEvent<HTMLTextAreaElement>) => void;
    textareaRef: RefObject<HTMLTextAreaElement | null>;
}

export function CodeArea({
    code,
    onChange,
    onKeyDown,
    textareaRef,
}: CodeAreaProps) {
    const lineCount = code.split("\n").length;

    const lineNumbers = Array.from(
        { length: lineCount },
        (_, index) => index + 1
    );

    return (
        <div className="flex min-h-0 flex-1 overflow-hidden bg-background font-mono text-[13px]">
            {/* LINE NUMBERS */}

            <div className="w-12 shrink-0 select-none overflow-hidden border-r border-border py-4 text-right text-muted-foreground/60">
                {lineNumbers.map((number) => (
                    <div key={number} className="h-6 px-3 leading-6">
                        {number}
                    </div>
                ))}
            </div>

            {/* TEXTAREA */}

            <textarea
                ref={textareaRef}
                value={code}
                onChange={(e) => onChange(e.target.value)}
                onKeyDown={onKeyDown}
                spellCheck={false}
                className="h-full w-full resize-none bg-transparent px-4 py-4 leading-6 text-foreground outline-none placeholder:text-muted-foreground/50 caret-primary selection:bg-primary/20"
                placeholder="Write your solution here..."
            />
        </div>
    );
}