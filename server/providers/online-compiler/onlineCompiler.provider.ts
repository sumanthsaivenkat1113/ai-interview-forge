import {
    onlineCompilerClient,
    type OnlineCompilerParams,
} from "@/providers/online-compiler/onlineCompiler.client";

export async function callOnlineCompilerJSON({
    code,
    compiler,
}: OnlineCompilerParams) {
    return onlineCompilerClient({ code, compiler });
}