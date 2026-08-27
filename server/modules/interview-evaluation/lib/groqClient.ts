import Groq from "groq-sdk";

// ============================================================
// GROQ CLIENT
// ============================================================
//
// Next.js loads env vars from .env automatically (no dotenv
// needed) for both the server runtime and API routes.
//

export const groq = new Groq({
    apiKey: process.env.GROQ_API_KEY,
});
