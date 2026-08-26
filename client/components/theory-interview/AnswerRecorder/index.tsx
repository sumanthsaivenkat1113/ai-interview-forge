import { Mic, Square } from 'lucide-react';

interface AnswerRecorderProps {
  isSpeaking: boolean;
  isRecording: boolean;
  isTranscribing: boolean;
  answer: string;
  onStartRecording: () => void;
  onStopRecording: () => void;
  onAnswerChange: (value: string) => void;
}

export default function AnswerRecorder({
  isSpeaking,
  isRecording,
  isTranscribing,
  answer,
  onStartRecording,
  onStopRecording,
  onAnswerChange,
}: AnswerRecorderProps) {
  const isDisabled = isSpeaking || isTranscribing;

  return (
    <>
      <div className="mt-10">
        {!isRecording ? (
          <button
            type="button"
            onClick={onStartRecording}
            disabled={isDisabled}
            aria-label="Start recording your answer"
            className={`flex h-16 w-16 items-center justify-center rounded-full border transition ${
              isDisabled
                ? 'cursor-not-allowed border-border bg-muted text-muted-foreground'
                : 'border-border bg-card text-foreground hover:border-primary hover:bg-primary hover:text-primary-foreground'
            }`}
          >
            <Mic className="h-6 w-6" strokeWidth={2} />
          </button>
        ) : (
          <button
            type="button"
            onClick={onStopRecording}
            aria-label="Stop recording"
            className="flex h-16 w-16 items-center justify-center rounded-full bg-rose-500 text-white shadow-[0_8px_24px_rgba(244,63,94,0.35)] transition hover:bg-rose-600 motion-safe:animate-pulse"
          >
            <Square className="h-5 w-5" fill="currentColor" strokeWidth={0} />
          </button>
        )}
      </div>

      {answer && (
        <div className="mt-8 w-full max-w-2xl">
          <div className="rounded-2xl border border-border bg-card p-5">
            <div className="mb-3 flex items-center justify-between">
              <span
                className="text-[11px] font-medium uppercase tracking-[0.16em] text-muted-foreground"
                style={{ fontFamily: 'var(--font-jbmono)' }}
              >
                Transcript
              </span>
              <span className="inline-flex items-center gap-1.5 text-[11px] font-medium text-emerald-500">
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
                Transcribed
              </span>
            </div>

            <textarea
              value={answer}
              onChange={(event) => onAnswerChange(event.target.value)}
              rows={4}
              disabled={isRecording || isTranscribing}
              className="w-full resize-none rounded-xl border border-border bg-muted p-3 text-sm leading-6 text-foreground outline-none transition focus:border-primary focus:bg-card disabled:opacity-60"
              placeholder="Type or edit your answer here..."
            />
          </div>
        </div>
      )}
    </>
  );
}