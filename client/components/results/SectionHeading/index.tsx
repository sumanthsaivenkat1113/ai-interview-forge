"use client";

export function SectionHeading({ title, description }: { title: string; description: string }) {
    return (
        <div>
            <h2 className="text-lg font-semibold tracking-tight text-foreground">{title}</h2>
            <p className="mt-1 text-sm text-muted-foreground">{description}</p>
        </div>
    );
}
