"use client";

import {
    useState,
    useRef,
    useEffect,
    KeyboardEvent,
} from "react";
import { useParams, useRouter } from "next/navigation";
import { compilers, DEFAULT_SNIPPETS, CompilerLabel } from "@/client/constants/coding-interview/constants";
import {
    CodingQuestion,
    ExecutionResult,
    CodingAnswer,
    ExecutionMeta,
} from "@/client/types/coding-interview/types";

/* =========================================================
   TYPES
========================================================= */

type InterviewError = {
    message: string;
    redirectPath: string;
    redirectLabel: string;
};

/* =========================================================
   HOOK — encapsulates every piece of state, every effect,
   and every handler used by the CodeEditor page.
========================================================= */

export function useCodeEditor() {
    const params = useParams();
    const router = useRouter();


    /*
     * Workspace ID from:
     *
     * /workspace/interview/[id]
     */

    const workspaceId = params.workspaceId as string;

    /* =====================================================
       INTERVIEW GUARD STATE
    ===================================================== */

    const [interviewError, setInterviewError] =
        useState<InterviewError | null>(null);

    /* =====================================================
       QUESTION STATE
    ===================================================== */

    const [questions, setQuestions] = useState<CodingQuestion[]>([]);

    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);

    /*
     * Stores code for every question.
     *
     * {
     *   "question-id-1": "python code...",
     *   "question-id-2": "python code..."
     * }
     */

    const [answers, setAnswers] = useState<Record<string, string>>({});

    /* =====================================================
       EDITOR STATE
    ===================================================== */

    const [language, setLanguage] = useState<CompilerLabel>("Python");

    const [code, setCode] = useState(DEFAULT_SNIPPETS.Python);

    const textareaRef = useRef<HTMLTextAreaElement>(null);

    /* =====================================================
       EXECUTION STATE
    ===================================================== */

    const [output, setOutput] = useState<string | null>(null);

    const [stderr, setStderr] = useState("");

    const [meta, setMeta] = useState<ExecutionMeta | null>(null);

    const [isRunning, setIsRunning] = useState(false);

    /* =====================================================
       SUBMIT STATE
    ===================================================== */

    const [isSubmitting, setIsSubmitting] = useState(false);

    const [runError, setRunError] = useState<string | null>(null);

    const [submitError, setSubmitError] = useState<string | null>(null);

    /* =====================================================
       UI STATE
    ===================================================== */

    const [loadingQuestions, setLoadingQuestions] = useState(true);

    const [dropdownOpen, setDropdownOpen] = useState(false);

    /* =====================================================
       CURRENT QUESTION
    ===================================================== */

    const currentQuestion = questions[currentQuestionIndex];

    /* =====================================================
       CHECK CODING INTERVIEW EXISTS / COMPLETED
    ===================================================== */

    useEffect(() => {
        async function checkCodingInterview() {
            try {
                const response = await fetch(
                    "/api/v1/check/coding",
                    {
                        method: "POST",
                        headers: {
                            "Content-Type": "application/json",
                        },
                        body: JSON.stringify({
                            workspaceId,
                        }),
                    }
                );

                if (!response.ok) {
                    throw new Error(
                        "Failed to check coding interview."
                    );
                }

                const result = await response.json();

                const {
                    exists,
                    completed,
                } = result.data;

                if (!exists) {
                    setInterviewError({
                        message:
                            "The interview does not exist in the system.",
                        redirectPath: "/home",
                        redirectLabel: "Go to Homepage",
                    });

                    return;
                }

                if (completed) {
                    setInterviewError({
                        message:
                            "The interview is already completed.",
                        redirectPath: "/home",
                        redirectLabel: "Go to Homepage",
                    });

                    return;
                }
            } catch (error) {
                console.error(error);

                setInterviewError({
                    message:
                        "Unable to check the interview status.",
                    redirectPath: "/home",
                    redirectLabel: "Go to Homepage",
                });
            }
        }

        if (workspaceId) {
            checkCodingInterview();
        }
    }, [workspaceId]);

    /* =====================================================
       FETCH CODING QUESTIONS
    ===================================================== */

    useEffect(() => {
        if (!workspaceId) return;

        async function fetchCodingQuestions() {
            try {
                setLoadingQuestions(true);
                setSubmitError(null);

                const response = await fetch(
                    `/api/v1/interview/workspace/coding/${workspaceId}`,
                    { method: "GET" }
                );


                const json = await response.json();

                if (!response.ok || !json.success) {
                    throw new Error(
                        json.message ||
                        json.error ||
                        "Failed to load coding questions"
                    );
                }

                setQuestions(json.data);
            } catch (error: any) {
                console.error(
                    "Failed to fetch coding questions:",
                    error
                );

                setSubmitError(
                    error.message ||
                    "Failed to load coding questions"
                );
            } finally {
                setLoadingQuestions(false);
            }
        }

        fetchCodingQuestions();
    }, [workspaceId]);

    console.log(questions)

    /* =====================================================
       CHANGE QUESTION
    ===================================================== */

    function handleQuestionChange(index: number) {
        const nextQuestion = questions[index];

        if (!nextQuestion) return;

        /*
         * Save current question's code.
         */

        if (currentQuestion) {
            setAnswers((prev) => ({
                ...prev,
                [currentQuestion.id]: code,
            }));
        }

        /*
         * Change question.
         */

        setCurrentQuestionIndex(index);

        /*
         * Restore previous code if it exists.
         */

        const previousAnswer = answers[nextQuestion.id];

        setCode(previousAnswer ?? DEFAULT_SNIPPETS[language]);

        /*
         * Clear execution output.
         */

        setOutput(null);
        setStderr("");
        setMeta(null);
        setRunError(null);
        setSubmitError(null);
    }

    /* =====================================================
       CHANGE LANGUAGE
    ===================================================== */

    function handleLanguageChange(label: CompilerLabel) {
        setLanguage(label);

        setCode(DEFAULT_SNIPPETS[label]);

        setDropdownOpen(false);

        setOutput(null);
        setStderr("");
        setMeta(null);
        setRunError(null);
    }

    /* =====================================================
       TAB KEY
    ===================================================== */

    function handleTabKey(e: KeyboardEvent<HTMLTextAreaElement>) {
        if (e.key !== "Tab") return;

        e.preventDefault();

        const textarea = textareaRef.current;

        if (!textarea) return;

        const { selectionStart, selectionEnd } = textarea;

        const next =
            code.slice(0, selectionStart) +
            "    " +
            code.slice(selectionEnd);

        setCode(next);

        requestAnimationFrame(() => {
            textarea.selectionStart = textarea.selectionEnd =
                selectionStart + 4;
        });
    }

    /* =====================================================
       CODE CHANGE (textarea onChange)
    ===================================================== */

    function handleCodeChange(value: string) {
        setCode(value);

        /*
         * Keep answer state updated.
         */

        if (currentQuestion) {
            setAnswers((prev) => ({
                ...prev,
                [currentQuestion.id]: value,
            }));
        }
    }

    /* =====================================================
       RUN CODE
    ===================================================== */

    async function runCode() {
        if (!currentQuestion) return;

        setIsRunning(true);

        setRunError(null);
        setOutput(null);
        setStderr("");
        setMeta(null);

        try {
            const response = await fetch(
                "/api/v1/codeExecution",
                {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({
                        code,
                        compiler: compilers[language],
                    }),
                }
            );

            const json = await response.json();

            if (!response.ok || !json.success) {
                setRunError(
                    json.error ||
                    json.message ||
                    "Code execution failed"
                );

                return;
            }

            const result: ExecutionResult = json.data.result;

            setOutput(result.output ?? "");

            setStderr(result.error ?? "");

            setMeta({
                status: result.status,
                time: result.time,
                memory: result.memory,
            });

            /*
             * Save current answer.
             */

            setAnswers((prev) => ({
                ...prev,
                [currentQuestion.id]: code,
            }));
        } catch (error) {
            console.error("[CodeEditor] run failed:", error);

            setRunError(
                "Could not reach the execution service. Try again."
            );
        } finally {
            setIsRunning(false);
        }
    }

    /* =====================================================
       SUBMIT INTERVIEW
    ===================================================== */

    async function submitInterview() {
        if (!questions.length) {
            setSubmitError("No coding questions found.");

            return;
        }

        /*
         * Save current question before submitting.
         */

        const finalAnswers = {
            ...answers,
            [currentQuestion.id]: code,
        };

        /*
         * Check unanswered questions.
         */

        const missingQuestion = questions.find(
            (question) => !finalAnswers[question.id]?.trim()
        );

        if (missingQuestion) {
            setSubmitError(
                `Please answer Question ${missingQuestion.qno} before submitting.`
            );

            return;
        }

        setIsSubmitting(true);
        setSubmitError(null);

        try {
            /*
             * Build API payload.
             */

            const payload: CodingAnswer[] = questions.map(
                (question) => ({
                    answer: finalAnswers[question.id].trim(),
                    codingQuestionId: question.id,
                })
            );

            console.log("Submitting coding answers:", payload);

            const response = await fetch(
                "/api/v1/codingAnswer",
                {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify(payload),
                }
            );

            const json = await response.json();

            if (!response.ok || !json.success) {
                throw new Error(
                    json.message ||
                    json.error ||
                    "Failed to submit coding answers"
                );
            }


            /* =====================================================
               FMI INTERVIEW EVALUATION
            ===================================================== */



            // [post] : Evaluate MI-Coding 
            const evaluateFmiResponse = await fetch(`/api/v1/results/${workspaceId}/MI/coding`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
            })

            if (!evaluateFmiResponse.ok) {
                console.error('failed to post the Evaluation');
                return;
            }

            /*
             * Interview completed.
             */

            router.push(`/results/${workspaceId}/mi/coding`);
        } catch (error: any) {
            console.error("Submit interview error:", error);

            setSubmitError(
                error.message || "Failed to submit interview."
            );
        } finally {
            setIsSubmitting(false);
        }
    }

    return {
        router,

        // interview guard state
        interviewError,

        // question state
        questions,
        currentQuestionIndex,
        currentQuestion,
        answers,

        // editor state
        language,
        code,
        textareaRef,

        // execution state
        output,
        stderr,
        meta,
        isRunning,

        // submit state
        isSubmitting,
        runError,
        submitError,

        // ui state
        loadingQuestions,
        dropdownOpen,
        setDropdownOpen,

        // handlers
        handleQuestionChange,
        handleLanguageChange,
        handleTabKey,
        handleCodeChange,
        runCode,
        submitInterview,
    };
}