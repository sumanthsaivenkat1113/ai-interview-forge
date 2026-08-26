import { ArrowRight, Flag } from 'lucide-react';

interface InterviewControlsProps {
  isSpeaking: boolean;
  isRecording: boolean;
  isTranscribing: boolean;
  hasAnswer: boolean;
  isLastQuestion: boolean;
  onNext: () => void;
}

export default function InterviewControls({
  isSpeaking,
  isRecording,
  isTranscribing,
  hasAnswer,
  isLastQuestion,
  onNext,
}: InterviewControlsProps) {
  const getLabel = () => {
    if (isSpeaking) return 'Listening to question…';
    if (isRecording) return 'Recording…';
    if (isTranscribing) return 'Processing your answer…';
    if (!hasAnswer) return 'Waiting for your answer';
    return isLastQuestion ? 'Finish interview' : 'Next question';
  };

  const isDisabled = isSpeaking || isRecording || isTranscribing || !hasAnswer;
  const Icon = isLastQuestion ? Flag : ArrowRight;

  return (
    <div className="flex justify-end border-t border-border pt-6">
      <button
        type="button"
        onClick={onNext}
        disabled={isDisabled}
        aria-disabled={isDisabled}
        aria-label={getLabel()}
        className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground transition hover:bg-primary/90 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary disabled:cursor-not-allowed disabled:opacity-30 sm:w-auto"
      >
        {getLabel()}
        {!isDisabled && <Icon className="h-4 w-4" strokeWidth={2.25} />}
      </button>
    </div>
  );
}