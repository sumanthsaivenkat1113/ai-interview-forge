'use client';

import { useAuth } from '@clerk/nextjs'

import { useEffect, useRef, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { AlertTriangle, RefreshCw } from 'lucide-react';


import { useInterviewTTS } from '@/client/hooks/useInterviewTTS';
import { useInterviewSTT } from '@/client/hooks/useInterviewSTT';
import { fraunces, inter, jetbrainsMono } from '@/client/fonts/theory-interview';

import InterviewStart from '@/client/components/theory-interview/InterviewStart';
import InterviewHeader from '@/client/components/theory-interview/InterviewHeader';
import Interviewer from '@/client/components/theory-interview/Interviewer';
import AnswerRecorder from '@/client/components/theory-interview/AnswerRecorder';
import InterviewControls from '@/client/components/theory-interview/InterviewControls';

interface Question {
    id: string;
    qno: number;
    question: string;
    workspaceId: string;
}

interface InterviewAnswer {
    qno: number;
    questionId: string;
    question: string;
    answer: string;
}

// Loads the font variables once and applies the `dark` class so the
// bg-background / text-foreground / etc. tokens resolve to the values in
// theme.css. Drop the `dark` class here if your app already applies it
// higher up the tree (e.g. on <html>).
function Shell({ children }: { children: React.ReactNode }) {
    return (
        <div
            className={`dark ${fraunces.variable} ${inter.variable} ${jetbrainsMono.variable} min-h-screen bg-background`}
            style={{ fontFamily: 'var(--font-inter)' }}
        >
            {children}
        </div>
    );
}

export default function ViewInterviewQuestions() {
    const params = useParams();
    const router = useRouter();
    const workspaceId = params.workspaceId as string;

    const { isLoaded, isSignedIn } = useAuth();

    const [questions, setQuestions] = useState<Question[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [interviewStarted, setInterviewStarted] = useState(false);
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [currentAnswer, setCurrentAnswer] = useState('');
    const [answers, setAnswers] = useState<InterviewAnswer[]>([]);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const hasInitialized = useRef(false);

    // Route Protection
    useEffect(() => {
        // If Clerk has loaded and user is not signed in, redirect them
        if (isLoaded && !isSignedIn) {
            router.push('/');
        }
    }, [isLoaded, isSignedIn, router]);

    // TTS
    const { speak, isSpeaking, error: ttsError } = useInterviewTTS();

    // STT
    const {
        isRecording,
        isTranscribing,
        error: sttError,
        startRecording,
        stopRecording,
    } = useInterviewSTT({
        onTranscript: (text) => {
            setCurrentAnswer(text);
            saveAnswer(questions[currentQuestionIndex], text);
        },
    });

    const currentQuestion = questions[currentQuestionIndex];

    // Fetch Questions
    useEffect(() => {
        if (!workspaceId || hasInitialized.current) return;
        hasInitialized.current = true;

        async function fetchQuestions() {
            try {
                setLoading(true);
                const response = await fetch(`/api/v1/interview/workspace/${workspaceId}`);
                const data = await response.json();

                if (!response.ok) {
                    throw new Error(data.error || 'Failed to fetch questions');
                }

                const unique = Array.from(
                    new Map((data.data as Question[]).map((question) => [question.id, question])).values()
                ).sort((a, b) => a.qno - b.qno);

                setQuestions(unique);
            } catch (err) {
                console.error(err);
                setError(err instanceof Error ? err.message : 'Something went wrong');
            } finally {
                setLoading(false);
            }
        }

        fetchQuestions();
    }, [workspaceId]);

    // Error handling
    useEffect(() => {
        if (ttsError) setError(ttsError);
    }, [ttsError]);

    useEffect(() => {
        if (sttError) setError(sttError);
    }, [sttError]);

    // Start Interview
    function startInterview() {
        if (!questions.length) return;
        setInterviewStarted(true);
        setCurrentQuestionIndex(0);
        setCurrentAnswer('');
        setAnswers([]);
        setTimeout(() => speak(questions[0].question), 400);
    }

    // Speak next question
    useEffect(() => {
        if (!interviewStarted || !currentQuestion) return;
        if (currentQuestionIndex === 0) return;
        setCurrentAnswer('');
        speak(currentQuestion.question);
    }, [currentQuestionIndex, interviewStarted]);

    // Save answer
    function saveAnswer(question: Question, answer: string) {
        if (!question || !answer.trim()) return;

        setAnswers((previous) => {
            const index = previous.findIndex((item) => item.questionId === question.id);
            const newAnswer = {
                qno: question.qno,
                questionId: question.id,
                question: question.question,
                answer,
            };

            if (index !== -1) {
                const updated = [...previous];
                updated[index] = newAnswer;
                return updated;
            }
            return [...previous, newAnswer];
        });
    }

    // Answer change
    function handleAnswerChange(value: string) {
        setCurrentAnswer(value);
        if (currentQuestion) {
            saveAnswer(currentQuestion, value);
        }
    }

    // Next
    function nextQuestion() {
        if (!currentQuestion) return;
        saveAnswer(currentQuestion, currentAnswer);

        if (currentQuestionIndex < questions.length - 1) {
            setCurrentQuestionIndex((previous) => previous + 1);
        } else {
            finishInterview();
        }
    }

    // Finish
    async function finishInterview() {
        const finalAnswers = (() => {
            if (!currentQuestion) return answers;
            const index = answers.findIndex((item) => item.questionId === currentQuestion.id);
            const latest = {
                qno: currentQuestion.qno,
                questionId: currentQuestion.id,
                question: currentQuestion.question,
                answer: currentAnswer,
            };

            if (index === -1) {
                return currentAnswer.trim() ? [...answers, latest] : answers;
            }
            const updated = [...answers];
            updated[index] = latest;
            return updated;
        })();

        setIsSubmitting(true);
        setError(null);

        try {
            const response = await fetch(`/api/v1/answer`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(
                    finalAnswers.map(({ qno, questionId, answer }) => ({
                        qno,
                        questionId,
                        answer,
                    }))
                ),
            });

            if (!response.ok) {
                const body = await response.text().catch(() => '');
                console.error('Failed to save answers:', response.status, body);
                setError('Could not save your interview. Please try again.');
                return;
            }

            const data = await response.json();
            console.log('Interview completed:', data);
            router.push(`/workspace10/interview/${workspaceId}/coding`);
        } catch (err) {
            console.error('Error saving answers:', err);
            setError('Could not save your interview. Please try again.');
        } finally {
            setIsSubmitting(false);
        }
    }

    // Loading
    if (loading) {
        return (
            <Shell>
                <main className="flex min-h-screen items-center justify-center px-6">
                    <div className="text-center">
                        <div className="mx-auto mb-6 h-12 w-12 rounded-full border-[3px] border-border border-t-primary motion-safe:animate-spin" />
                        <h2 className="text-lg font-medium text-foreground" style={{ fontFamily: 'var(--font-fraunces)' }}>
                            Preparing your interview
                        </h2>
                        <p className="mt-2 text-sm text-muted-foreground">Setting up your interviewer…</p>
                    </div>
                </main>
            </Shell>
        );
    }

    // Error
    if (error && !questions.length) {
        return (
            <Shell>
                <main className="flex min-h-screen items-center justify-center px-6">
                    <div className="w-full max-w-sm text-center">
                        <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-rose-500/10 text-rose-500">
                            <AlertTriangle className="h-5 w-5" strokeWidth={2} />
                        </div>
                        <h2
                            className="mt-5 text-lg font-medium text-foreground"
                            style={{ fontFamily: 'var(--font-fraunces)' }}
                        >
                            Something went wrong
                        </h2>
                        <p className="mt-2 text-sm leading-6 text-muted-foreground">{error}</p>
                        <button
                            onClick={() => window.location.reload()}
                            className="mt-6 inline-flex items-center gap-2 rounded-xl bg-primary px-5 py-3 text-sm font-semibold text-primary-foreground transition hover:bg-primary/90"
                        >
                            <RefreshCw className="h-4 w-4" strokeWidth={2} />
                            Try again
                        </button>
                    </div>
                </main>
            </Shell>
        );
    }

    // Start
    if (!interviewStarted) {
        return (
            <Shell>
                <InterviewStart questionCount={questions.length} onStart={startInterview} />
            </Shell>
        );
    }

    // Interview
    return (
        <Shell>
            <main className="min-h-screen px-6 pb-10">
                <div className="mx-auto flex min-h-screen max-w-3xl flex-col">
                    <InterviewHeader current={currentQuestionIndex + 1} total={questions.length} />

                    {error && (
                        <div className="mt-6 flex items-start gap-2.5 rounded-xl border border-rose-500/20 bg-rose-500/10 px-4 py-3 text-sm text-rose-500">
                            <AlertTriangle className="mt-0.5 h-4 w-4 flex-shrink-0" strokeWidth={2} />
                            <span>{error}</span>
                        </div>
                    )}

                    <div className="flex flex-1 flex-col items-center justify-center py-10">
                        <Interviewer isSpeaking={isSpeaking} isRecording={isRecording} isTranscribing={isTranscribing} />

                        <AnswerRecorder
                            isSpeaking={isSpeaking}
                            isRecording={isRecording}
                            isTranscribing={isTranscribing}
                            answer={currentAnswer}
                            onStartRecording={startRecording}
                            onStopRecording={stopRecording}
                            onAnswerChange={handleAnswerChange}
                        />
                    </div>

                    <InterviewControls
                        isSpeaking={isSpeaking}
                        isRecording={isRecording}
                        isTranscribing={isTranscribing}
                        hasAnswer={Boolean(currentAnswer.trim())}
                        isLastQuestion={currentQuestionIndex === questions.length - 1}
                        onNext={nextQuestion}
                    />

                    {isSubmitting && (
                        <div className="mt-4 text-center text-sm text-muted-foreground">Saving your interview…</div>
                    )}
                </div>
            </main>
        </Shell>
    );
}