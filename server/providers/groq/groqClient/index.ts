import Groq from "groq-sdk";
import { env } from "@/server/config/env";

export const groqClient = new Groq({
  apiKey: env.GROQ_API_KEY,
});
