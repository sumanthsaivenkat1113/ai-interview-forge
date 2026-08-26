'use client';

import { useEffect, useState } from 'react';
import { Mic, Circle, PenLine } from 'lucide-react';

interface AudioVisualizerProps {
  isSpeaking: boolean;
  isRecording?: boolean;
  isTranscribing?: boolean;
}

type VisualState = 'speaking' | 'recording' | 'transcribing' | 'idle';

// Literal Tailwind classes per state — deliberately not built from a
// template string. Dynamic class names like `bg-${color}-500` get missed
// by Tailwind's JIT scanner, which is what broke the animation earlier.
const STATE_STYLES: Record<
  VisualState,
  { avatarBg: string; icon: string; wash: string; tick: string; unlitTick: string }
> = {
  speaking: {
    avatarBg: 'bg-primary',
    icon: 'text-primary-foreground',
    wash: 'bg-primary/10',
    tick: 'text-primary',
    unlitTick: 'text-border',
  },
  recording: {
    avatarBg: 'bg-rose-500',
    icon: 'text-white',
    wash: 'bg-rose-500/10',
    tick: 'text-rose-500',
    unlitTick: 'text-border',
  },
  transcribing: {
    avatarBg: 'bg-amber-500',
    icon: 'text-white',
    wash: 'bg-amber-500/10',
    tick: 'text-amber-500',
    unlitTick: 'text-border',
  },
  idle: {
    avatarBg: 'bg-muted',
    icon: 'text-muted-foreground',
    wash: '',
    tick: 'text-border',
    unlitTick: 'text-border',
  },
};

const TICK_COUNT = 48;
const BAR_HEIGHTS = ['h-3', 'h-6', 'h-9', 'h-5', 'h-7'];

function getState(isSpeaking: boolean, isRecording: boolean, isTranscribing: boolean): VisualState {
  if (isSpeaking) return 'speaking';
  if (isRecording) return 'recording';
  if (isTranscribing) return 'transcribing';
  return 'idle';
}

export default function AudioVisualizer({
  isSpeaking,
  isRecording = false,
  isTranscribing = false,
}: AudioVisualizerProps) {
  const state = getState(isSpeaking, isRecording, isTranscribing);
  const styles = STATE_STYLES[state];
  const isActive = state !== 'idle';

  const [litCount, setLitCount] = useState(0);

  useEffect(() => {
    if (!isActive) {
      setLitCount(0);
      return;
    }

    let raf: number;
    let start: number | null = null;
    const cycleMs = state === 'speaking' ? 1400 : 2200;

    function step(t: number) {
      if (start === null) start = t;
      const progress = ((t - start) % cycleMs) / cycleMs;
      setLitCount(Math.round(progress * TICK_COUNT));
      raf = requestAnimationFrame(step);
    }

    raf = requestAnimationFrame(step);
    return () => cancelAnimationFrame(raf);
  }, [isActive, state]);

  const Icon = isRecording ? Circle : isTranscribing ? PenLine : Mic;

  return (
    <div className="relative flex h-64 w-64 items-center justify-center">
      {isActive && styles.wash && (
        <div className={`motion-safe:animate-ping absolute h-64 w-64 rounded-full ${styles.wash}`} />
      )}

      {/* Dial ring — signature element. Ticks use currentColor so they can
          stay on plain Tailwind text-* classes instead of raw hex. */}
      <svg viewBox="0 0 240 240" className="absolute h-60 w-60 -rotate-90" aria-hidden="true">
        {Array.from({ length: TICK_COUNT }).map((_, i) => {
          const angle = (i / TICK_COUNT) * 360;
          const rad = (angle * Math.PI) / 180;
          const lit = isActive && i < litCount;
          const isMajor = i % 6 === 0;
          return (
            <line
              key={i}
              x1={120 + 100 * Math.cos(rad)}
              y1={120 + 100 * Math.sin(rad)}
              x2={120 + (isMajor ? 88 : 92) * Math.cos(rad)}
              y2={120 + (isMajor ? 88 : 92) * Math.sin(rad)}
              stroke="currentColor"
              strokeWidth={isMajor ? 2.5 : 1.5}
              strokeLinecap="round"
              className={`transition-colors duration-150 ${lit ? styles.tick : styles.unlitTick}`}
            />
          );
        })}
      </svg>

      {/* Speaking equalizer */}
      {isSpeaking && (
        <div className="absolute flex items-end gap-1.5" style={{ bottom: '38%' }}>
          {BAR_HEIGHTS.map((h, i) => (
            <div
              key={i}
              className={`w-1 rounded-full bg-primary motion-safe:animate-bounce ${h}`}
              style={{ animationDelay: `${i * 110}ms`, animationDuration: '0.9s' }}
            />
          ))}
        </div>
      )}

      {/* Center avatar */}
      <div
        className={`relative z-10 flex h-28 w-28 items-center justify-center rounded-full shadow-[0_8px_30px_rgba(0,0,0,0.45)] transition-transform duration-500 ${
          styles.avatarBg
        } ${isActive ? 'scale-105' : ''}`}
      >
        <Icon
          className={`h-9 w-9 ${styles.icon}`}
          strokeWidth={2}
          {...(isRecording ? { fill: 'currentColor' } : {})}
        />
      </div>
    </div>
  );
}