import { Mic } from 'lucide-react';

interface InterviewStartProps {
  questionCount: number;
  onStart: () => void;
}

export default function InterviewStart({ questionCount, onStart }: InterviewStartProps) {
  return (
    <main className="flex min-h-screen items-center justify-center bg-background px-6">
      <div className="w-full max-w-lg text-center">
        <div className="mx-auto flex h-24 w-24 items-center justify-center rounded-full border border-border bg-card">
          <div className="flex h-16 w-16 items-center justify-center rounded-full bg-primary text-primary-foreground shadow-[0_10px_30px_rgba(124,134,242,0.35)]">
            <Mic className="h-6 w-6" strokeWidth={2} />
          </div>
        </div>

        {/* Note: this eyebrow is decorative branding, not a status signal —
            kept on primary rather than rose/amber so the semantic status
            colors stay reserved for actual recording/transcribing states. */}
        <p
          className="mt-8 text-[11px] font-semibold uppercase tracking-[0.2em] text-primary"
          style={{ fontFamily: 'var(--font-jbmono)' }}
        >
          Session ready · {questionCount} questions
        </p>

        <h1
          className="mt-3 text-4xl font-medium leading-[1.15] text-foreground"
          style={{ fontFamily: 'var(--font-fraunces)' }}
        >
          Your interviewer is <span className="italic text-primary">ready</span> when you are.
        </h1>

        <p className="mx-auto mt-4 max-w-md text-sm leading-6 text-muted-foreground">
          You&rsquo;ll be asked {questionCount} questions aloud. Listen to each one fully, then
          answer using your microphone — you can edit the transcript before moving on.
        </p>

        <button
          type="button"
          onClick={onStart}
          aria-label="Start voice interview"
          className="mt-10 inline-flex items-center gap-2 rounded-xl bg-primary px-8 py-4 text-sm font-semibold text-primary-foreground shadow-[0_10px_30px_rgba(124,134,242,0.35)] transition hover:bg-primary/90 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
        >
          Start interview
        </button>

        <p className="mt-4 text-xs text-muted-foreground/70">Make sure your microphone is enabled.</p>
      </div>
    </main>
  );
}