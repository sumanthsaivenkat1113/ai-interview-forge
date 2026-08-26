import { useEffect, useRef, useState } from 'react';

export function useInterviewTTS() {
    const [isSpeaking, setIsSpeaking] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const audioRef = useRef<HTMLAudioElement | null>(null);
    const requestIdRef = useRef(0);

    async function speak(text: string) {
        if (!text) return;

        // Bump the request id so any in-flight / late-resolving speak() calls
        // from a previous question can detect they've been superseded.
        const requestId = ++requestIdRef.current;

        try {
            setError(null);
            setIsSpeaking(true);

            if (audioRef.current) {
                // Detach handlers BEFORE tearing down, otherwise setting
                // src = '' fires a stale onerror on the OLD audio element,
                // which then calls setIsSpeaking(false) and stomps the
                // state we just set above for the NEW question.
                audioRef.current.onended = null;
                audioRef.current.onerror = null;
                audioRef.current.pause();
                audioRef.current.src = '';
            }

            const response = await fetch('/api/v1/tts', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    text,
                    voice: 'en-US-JennyNeural',
                }),
            });

            if (!response.ok) {
                const data = await response
                    .json()
                    .catch(() => null);

                throw new Error(
                    data?.error || 'Failed to generate speech'
                );
            }

            const blob = await response.blob();

            // If a newer speak() call has started since we began fetching,
            // bail out — don't play stale audio or touch shared state.
            if (requestId !== requestIdRef.current) {
                return;
            }

            const url = URL.createObjectURL(blob);
            const audio = new Audio(url);

            audioRef.current = audio;

            audio.onended = () => {
                URL.revokeObjectURL(url);
                if (requestId === requestIdRef.current) {
                    setIsSpeaking(false);
                }
            };

            audio.onerror = () => {
                URL.revokeObjectURL(url);
                if (requestId === requestIdRef.current) {
                    setIsSpeaking(false);
                    setError('Failed to play audio');
                }
            };

            await audio.play();
        } catch (err) {
            console.error('TTS error:', err);

            if (requestId === requestIdRef.current) {
                setIsSpeaking(false);
                setError(
                    err instanceof Error
                        ? err.message
                        : 'Failed to generate speech'
                );
            }
        }
    }

    function stopSpeaking() {
        // Invalidate any in-flight speak() so it can't resurrect isSpeaking
        // after this call.
        requestIdRef.current++;

        if (audioRef.current) {
            audioRef.current.onended = null;
            audioRef.current.onerror = null;
            audioRef.current.pause();
            audioRef.current.currentTime = 0;
        }

        setIsSpeaking(false);
    }

    useEffect(() => {
        return () => {
            requestIdRef.current++;
            if (audioRef.current) {
                audioRef.current.onended = null;
                audioRef.current.onerror = null;
                audioRef.current.pause();
                audioRef.current.src = '';
            }
        };
    }, []);

    return {
        speak,
        stopSpeaking,
        isSpeaking,
        error,
    };
}