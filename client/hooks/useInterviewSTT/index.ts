
import { useRef, useState } from 'react';

interface UseInterviewSTTProps {
    onTranscript?: (text: string) => void;
}

export function useInterviewSTT({
    onTranscript,
}: UseInterviewSTTProps = {}) {
    const [isRecording, setIsRecording] = useState(false);
    const [isTranscribing, setIsTranscribing] =
        useState(false);
    const [error, setError] = useState<string | null>(null);

    const mediaRecorderRef =
        useRef<MediaRecorder | null>(null);

    const chunksRef = useRef<Blob[]>([]);

    const streamRef =
        useRef<MediaStream | null>(null);

    async function startRecording() {
        if (isRecording || isTranscribing) return;

        try {
            setError(null);

            const stream =
                await navigator.mediaDevices.getUserMedia({
                    audio: true,
                });

            streamRef.current = stream;
            chunksRef.current = [];

            let mimeType = '';

            if (
                MediaRecorder.isTypeSupported(
                    'audio/webm;codecs=opus'
                )
            ) {
                mimeType = 'audio/webm;codecs=opus';
            } else if (
                MediaRecorder.isTypeSupported('audio/webm')
            ) {
                mimeType = 'audio/webm';
            } else if (
                MediaRecorder.isTypeSupported('audio/mp4')
            ) {
                mimeType = 'audio/mp4';
            }

            const recorder = mimeType
                ? new MediaRecorder(stream, { mimeType })
                : new MediaRecorder(stream);

            recorder.ondataavailable = (event) => {
                if (event.data.size > 0) {
                    chunksRef.current.push(event.data);
                }
            };

            recorder.onstop = async () => {
                stopStream();

                const finalMimeType =
                    recorder.mimeType || 'audio/webm';

                const blob = new Blob(
                    chunksRef.current,
                    {
                        type: finalMimeType,
                    }
                );

                await transcribe(blob, finalMimeType);
            };

            recorder.onerror = () => {
                stopStream();

                setIsRecording(false);
                setError('Recording failed.');
            };

            mediaRecorderRef.current = recorder;

            recorder.start();

            setIsRecording(true);
        } catch (err) {
            console.error('Microphone error:', err);

            setError(
                'Could not access microphone. Please allow microphone permission.'
            );
        }
    }

    function stopRecording() {
        const recorder =
            mediaRecorderRef.current;

        if (!recorder) return;

        if (recorder.state === 'recording') {
            recorder.stop();
        }

        setIsRecording(false);
    }

    async function transcribe(
        blob: Blob,
        mimeType: string
    ) {
        setIsTranscribing(true);
        setError(null);

        try {
            let extension = 'webm';

            if (mimeType.includes('mp4')) {
                extension = 'mp4';
            } else if (mimeType.includes('ogg')) {
                extension = 'ogg';
            }

            const formData = new FormData();

            formData.append(
                'file',
                blob,
                `answer.${extension}`
            );

            const response = await fetch(
                '/api/v1/stt',
                {
                    method: 'POST',
                    body: formData,
                }
            );

            const data = await response.json();

            if (!response.ok) {
                throw new Error(
                    data.error ||
                    'Failed to transcribe audio'
                );
            }

            if (!data.text) {
                setError(
                    'No speech detected. Please try again.'
                );

                return;
            }

            onTranscript?.(data.text);
        } catch (err) {
            console.error('STT error:', err);

            setError(
                err instanceof Error
                    ? err.message
                    : 'Failed to transcribe answer'
            );
        } finally {
            setIsTranscribing(false);
        }
    }

    function stopStream() {
        streamRef.current
            ?.getTracks()
            .forEach((track) => track.stop());

        streamRef.current = null;
    }

    return {
        isRecording,
        isTranscribing,
        error,
        startRecording,
        stopRecording,
    };
}
