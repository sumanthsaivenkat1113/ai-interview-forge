import dotenv from "dotenv";
import { z } from "zod";

dotenv.config();

const envSchema = z.object({
  ONLINE_COMPILER_ENDPOINT: z.string().min(1, "ONLINE_COMPILER_ENDPOINT is required"),
  ONLINE_COMPILER_API_KEY: z.string().min(1, "ONLINE_COMPILER_API_KEY is required"),
  NODE_ENV: z.enum(["development", "production", "test"]).default("development"),
});

const parsed = envSchema.safeParse(process.env);

if (!parsed.success) {
  console.error("❌ Invalid environment variables:", parsed.error.flatten().fieldErrors);
  throw new Error("Invalid environment variables");
}

export const envOnlineCompiler = parsed.data;