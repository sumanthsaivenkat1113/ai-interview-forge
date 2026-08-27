"use client";

import { AlertCircle, Home, ArrowRight } from "lucide-react";
import { useRouter } from "next/navigation";

interface ErrorModalProps {
    message: string;
    redirectPath?: string;
    redirectLabel?: string;
    onClose?: () => void;
}

export function ErrorModal({
    message,
    redirectPath = "/home",
    redirectLabel,
    onClose,
}: ErrorModalProps) {
    const router = useRouter();

    const handleRedirect = () => {
        router.push(redirectPath);
    };

    const isHomeRoute = redirectPath === "/";

    const buttonLabel =
        redirectLabel ||
        (isHomeRoute ? "Go to Home" : "Continue");

    return (
        <div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 px-4 backdrop-blur-sm"
            role="dialog"
            aria-modal="true"
            aria-labelledby="error-modal-title"
        >
            <div className="w-full max-w-md rounded-2xl border border-border bg-card p-6 shadow-2xl">
                {/* Icon */}
                <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-full bg-destructive/10">
                    <AlertCircle className="h-6 w-6 text-destructive" />
                </div>

                {/* Content */}
                <h2
                    id="error-modal-title"
                    className="text-lg font-semibold text-foreground"
                >
                    Something went wrong
                </h2>

                <p className="mt-2 text-sm leading-6 text-muted-foreground">
                    {message}
                </p>

                {/* Actions */}
                <div className="mt-6 flex flex-col gap-3 sm:flex-row">
                    {onClose && (
                        <button
                            type="button"
                            onClick={onClose}
                            className="flex flex-1 items-center justify-center rounded-lg border border-border px-4 py-2.5 text-sm font-medium transition hover:bg-muted"
                        >
                            Close
                        </button>
                    )}

                    <button
                        type="button"
                        onClick={handleRedirect}
                        className="flex flex-1 items-center justify-center gap-2 rounded-lg bg-primary px-4 py-2.5 text-sm font-medium text-primary-foreground transition hover:opacity-90"
                    >
                        {isHomeRoute ? (
                            <Home className="h-4 w-4" />
                        ) : (
                            <ArrowRight className="h-4 w-4" />
                        )}

                        {buttonLabel}
                    </button>
                </div>
            </div>
        </div>
    );
}