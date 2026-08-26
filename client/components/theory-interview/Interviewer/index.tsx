import AudioVisualizer from '@/client/components/theory-interview/AudioVisualizer';

interface InterviewerProps {
    isSpeaking: boolean;
    isRecording: boolean;
    isTranscribing: boolean;
}

type VisualState = 'speaking' | 'recording' | 'transcribing' | 'idle';

const STATUS: Record<VisualState, { label: string; hint: string; badge: string; dot: string }> = {
    speaking: {
        label: 'Interviewer speaking',
        hint: 'Listen to the full question before responding.',
        badge: 'border-primary/20 bg-primary/10 text-primary',
        dot: 'bg-primary',
    },
    recording: {
        label: 'Recording your response',
        hint: "Speak naturally — press stop when you're done.",
        badge: 'border-rose-500/20 bg-rose-500/10 text-rose-500',
        dot: 'bg-rose-500',
    },
    transcribing: {
        label: 'Transcribing',
        hint: 'Converting your response to text.',
        badge: 'border-amber-500/20 bg-amber-500/10 text-amber-500',
        dot: 'bg-amber-500',
    },
    idle: {
        label: 'Your turn',
        hint: 'Press the microphone to begin your response.',
        badge: 'border-border bg-muted text-muted-foreground',
        dot: 'bg-muted-foreground',
    },
};

function getState(isSpeaking: boolean, isRecording: boolean, isTranscribing: boolean): VisualState {
    if (isSpeaking) return 'speaking';
    if (isRecording) return 'recording';
    if (isTranscribing) return 'transcribing';
    return 'idle';
}

export default function Interviewer({ isSpeaking, isRecording, isTranscribing }: InterviewerProps) {
    const state = getState(isSpeaking, isRecording, isTranscribing);
    const status = STATUS[state];

    return (
        <div className="flex flex-col items-center">
            <AudioVisualizer isSpeaking={isSpeaking} isRecording={isRecording} isTranscribing={isTranscribing} />

            <div className="mt-8 flex flex-col items-center text-center">
                <span
                    className={`inline-flex items-center gap-2 rounded-full border px-3 py-1 text-[11px] font-medium uppercase tracking-[0.14em] ${status.badge}`}
                >
                    <span className={`h-1.5 w-1.5 rounded-full motion-safe:animate-pulse ${status.dot}`} />
                    {status.label}
                </span>

                <p className="mt-3 max-w-xs text-sm leading-6 text-muted-foreground">{status.hint}</p>

                {isTranscribing && (
                    <div className="mt-4 flex justify-center gap-1" aria-hidden="true">
                        {[0, 150, 300].map((delay) => (
                            <span
                                key={delay}
                                className="h-1.5 w-1.5 rounded-full bg-amber-500 motion-safe:animate-bounce"
                                style={{ animationDelay: `${delay}ms` }}
                            />
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}