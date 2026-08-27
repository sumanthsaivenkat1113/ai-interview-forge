// ============================================================
// APPLICATION ERRORS
// ============================================================
//
// Thrown from services/repositories, mapped to HTTP status
// codes in controllers.
//

export class NotFoundError extends Error {
    constructor(message: string) {
        super(message);
        this.name = "NotFoundError";
    }
}

export class ValidationError extends Error {
    constructor(message: string) {
        super(message);
        this.name = "ValidationError";
    }
}

export class UpstreamServiceError extends Error {
    constructor(message: string, public readonly cause?: unknown) {
        super(message);
        this.name = "UpstreamServiceError";
    }
}
