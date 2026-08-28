"use client";

// import { NAV_SECTIONS } from "@/client/utils/results";
import { NAV_SECTIONS } from "@/client/utils/mi-coding-results/index";

export function SectionNav({ activeSection }: { activeSection: string }) {
    return (
        <nav className="sticky top-0 z-30 border-b border-border bg-card/90 backdrop-blur">
            <div className="mx-auto flex max-w-6xl gap-1 overflow-x-auto px-5 sm:px-8">
                {NAV_SECTIONS.map((section) => (
                    <a
                        key={section.id}
                        href={`#${section.id}`}
                        className={`whitespace-nowrap border-b-2 px-3 py-3 text-sm font-medium transition-colors ${activeSection === section.id
                                ? "border-primary text-primary"
                                : "border-transparent text-muted-foreground hover:text-foreground"
                            }`}
                    >
                        {section.label}
                    </a>
                ))}
            </div>
        </nav>
    );
}
