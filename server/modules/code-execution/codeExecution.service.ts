import { callOnlineCompilerJSON } from
    "@/server/providers/online-compiler/onlineCompiler.provider";
import type { OnlineCompilerParams } from
    "@/server/providers/online-compiler/onlineCompiler.client";


export const CodeExecutionService = {

    async codeExecute(data: OnlineCompilerParams) {
        return await callOnlineCompilerJSON(data)
    }

}