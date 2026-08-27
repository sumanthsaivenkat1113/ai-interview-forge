import Groq from "groq-sdk";

if (!process.env.GROQ_API_KEY) {
  // Don't throw at import time (breaks build), just warn loudly.
  console.warn(
    "[groqClient] GROQ_API_KEY is not set. Coding evaluation LLM calls will fail."
  );
}

export const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY,
});

// Keep the model name configurable via env so you can swap it without a
// redeploy. Fill in the real Groq model id you're using.
export const GROQ_CODING_EVAL_MODEL =
  process.env.GROQ_CODING_EVAL_MODEL || "qwen/qwen3.6-27b";
