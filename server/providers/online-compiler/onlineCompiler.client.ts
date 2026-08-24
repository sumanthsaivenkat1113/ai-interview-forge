import { envOnlineCompiler } from "@/config/onlineCompiler.env";

export interface OnlineCompilerParams {
    code: string;
    compiler: string;
}

export async function onlineCompilerClient({
    code,
    compiler,
}: OnlineCompilerParams) {
    try {
        const response = await fetch(
            envOnlineCompiler.ONLINE_COMPILER_ENDPOINT,
            {
                method: "POST",
                headers: {
                    Authorization: envOnlineCompiler.ONLINE_COMPILER_API_KEY,
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    compiler,
                    code,
                }),
            }
        );

        if (!response.ok) {
            throw new Error(
                `Online Compiler API failed: ${response.status} ${response.statusText}`
            );
        }

        return response;
    } catch (error) {
        console.error("[onlineCompiler] Failed to execute:", error);
        throw error;
    }
}