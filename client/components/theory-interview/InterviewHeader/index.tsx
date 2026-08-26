interface InterviewHeaderProps {
  current: number;
  total: number;
}

export default function InterviewHeader({ current, total }: InterviewHeaderProps) {
  return (
    <div className="sticky top-0 z-20 -mx-6 border-b border-border bg-background/90 px-6 py-4 backdrop-blur">
      <div className="mx-auto flex max-w-3xl items-center justify-between">
        <div className="flex items-center gap-2.5">
          <span className="relative flex h-2 w-2" aria-hidden="true">
            <span className="absolute inline-flex h-full w-full motion-safe:animate-ping rounded-full bg-rose-500 opacity-60" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-rose-500" />
          </span>
          <span className="text-[11px] font-semibold uppercase tracking-[0.18em] text-foreground">
            Live interview
          </span>
        </div>

        <div
          className="rounded-md border border-border bg-card px-2.5 py-1 text-xs tabular-nums text-foreground"
          style={{ fontFamily: 'var(--font-jbmono)' }}
        >
          Q{String(current).padStart(2, '0')} / {String(total).padStart(2, '0')}
        </div>
      </div>

      <div
        className="mx-auto mt-4 flex max-w-3xl gap-1"
        role="progressbar"
        aria-valuenow={current}
        aria-valuemin={1}
        aria-valuemax={total}
      >
        {Array.from({ length: total }).map((_, i) => (
          <div
            key={i}
            className={`h-1 flex-1 rounded-full transition-colors duration-300 ${
              i < current ? 'bg-primary' : 'bg-muted'
            }`}
          />
        ))}
      </div>
    </div>
  );
}