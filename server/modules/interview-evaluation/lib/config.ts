import { GroqLLMModels } from "@/server/providers/groq/LLM/groq.models";

// ============================================================
// CONFIGURATION
// ============================================================

export const MODEL = GroqLLMModels.qwen_qwen3_6_27b;

// Number of questions sent to one LLM request
export const QUESTIONS_PER_REQUEST = 6;

// IMPORTANT:
// Because your current limit is 8,000 TPM,
// start with sequential requests.
//
// Once you reduce token usage sufficiently,
// you can experiment with 2.
export const MAX_CONCURRENT_REQUESTS = 1;

// Maximum retry attempts for 429
export const MAX_RETRIES = 2;

// Fallback retry delay if Groq doesn't provide
// "try again in Xs"
export const DEFAULT_RETRY_DELAY_MS = 0;

// IMPORTANT:
// Keep this relatively small because the response
// is intentionally compact.
export const MAX_COMPLETION_TOKENS = 1000;

// Delay between sequential batches
export const BATCH_DELAY_MS = 2000;
