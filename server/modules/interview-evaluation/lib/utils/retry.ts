import { DEFAULT_RETRY_DELAY_MS } from "../config";

// ============================================================
// GET RETRY DELAY FROM GROQ ERROR
// ============================================================
//
// Groq can return:
//
// "Please try again in 11.362499999s"
//
// We extract that value.
//

export function getRetryDelay(error: any): number {

    const message =
        error?.message || "";

    const match =
        message.match(
            /try again in ([\d.]+)s/i
        );

    if (match) {

        const seconds =
            Number(match[1]);

        if (
            Number.isFinite(seconds) &&
            seconds > 0
        ) {

            // Add 500ms buffer to avoid
            // retrying exactly at the boundary.
            return Math.ceil(
                seconds * 1000
            ) + 500;
        }
    }

    return DEFAULT_RETRY_DELAY_MS;
}


// ============================================================
// RETRYABLE ERROR CHECK
// ============================================================

export function isRetryableError(error: any): boolean {

    const status =
        error?.status ||
        error?.response?.status;

    // Rate limit
    if (status === 429) {
        return true;
    }

    // Temporary server errors
    if (
        status === 500 ||
        status === 502 ||
        status === 503 ||
        status === 504
    ) {
        return true;
    }

    return false;
}
