"use client";

import { Loader2 } from "lucide-react";
import { useCodeEditor } from "@/client/hooks/mi-coding/useCodeEditor";
import { ErrorModal } from "@/client/components/ErrorModal";
import { Header } from "@/client/components/coding-interview/Header";
import { ProblemPanel } from "@/client/components/coding-interview/ProblemPanel";
import { EditorToolbar } from "@/client/components/coding-interview/EditorToolbar";
import { CodeArea } from "@/client/components/coding-interview/CodeArea";
import { Console } from "@/client/components/coding-interview/Console";

export { compilers } from "@/client/constants/coding-interview/constants";

/* =========================================================
   COMPONENT
========================================================= */

export default function CodeEditor() {
    const {
        router,
        interviewError,
        questions,
        currentQuestionIndex,
        currentQuestion,
        language,
        code,
        textareaRef,
        output,
        stderr,
        meta,
        isRunning,
        isSubmitting,
        runError,
        submitError,
        loadingQuestions,
        dropdownOpen,
        setDropdownOpen,
        handleQuestionChange,
        handleLanguageChange,
        handleTabKey,
        handleCodeChange,
        runCode,
        submitInterview,
    } = useCodeEditor();

    /* =====================================================
       INTERVIEW ERROR (doesn't exist / already completed)
    ===================================================== */

    if (interviewError) {
        return (
            <ErrorModal
                message={interviewError.message}
                redirectPath={interviewError.redirectPath}
                redirectLabel={interviewError.redirectLabel}
            />
        );
    }

    /* =====================================================
       LOADING
    ===================================================== */

    if (loadingQuestions) {
        return (
            <div className="flex h-screen w-full items-center justify-center bg-background text-foreground">
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Loader2 className="h-4 w-4 animate-spin text-primary" />
                    Loading coding questions...
                </div>
            </div>
        );
    }

    /* =====================================================
       NO QUESTIONS
    ===================================================== */

    if (!questions.length) {
        return (
            <div className="flex h-screen w-full items-center justify-center bg-background text-foreground">
                <div className="text-center">
                    <p className="text-lg font-semibold">
                        No coding questions found
                    </p>

                    {submitError && (
                        <p className="mt-2 text-sm text-rose-500">
                            {submitError}
                        </p>
                    )}
                </div>
            </div>
        );
    }

    /* =====================================================
       RENDER
    ===================================================== */

    return (
        <div className="dark flex h-screen w-full flex-col overflow-hidden bg-background text-foreground">
            <Header
                questions={questions}
                currentQuestionIndex={currentQuestionIndex}
                onQuestionChange={handleQuestionChange}
                onBack={() => router.back()}
                onSubmit={submitInterview}
                isSubmitting={isSubmitting}
                isRunning={isRunning}
            />

            <main className="flex min-h-0 flex-1 gap-2 bg-background p-2">
                <ProblemPanel currentQuestion={currentQuestion} />

                <section className="flex min-w-0 flex-1 flex-col overflow-hidden rounded-xl border border-border bg-card shadow-2xl shadow-black/20">
                    <EditorToolbar
                        language={language}
                        dropdownOpen={dropdownOpen}
                        setDropdownOpen={setDropdownOpen}
                        onLanguageChange={handleLanguageChange}
                        onRun={runCode}
                        isRunning={isRunning}
                        isSubmitting={isSubmitting}
                    />

                    <CodeArea
                        code={code}
                        onChange={handleCodeChange}
                        onKeyDown={handleTabKey}
                        textareaRef={textareaRef}
                    />

                    <Console
                        runError={runError}
                        submitError={submitError}
                        isRunning={isRunning}
                        output={output}
                        stderr={stderr}
                        meta={meta}
                    />
                </section>
            </main>
        </div>
    );
}