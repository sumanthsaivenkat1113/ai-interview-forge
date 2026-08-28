import { NextRequest, NextResponse } from "next/server";
import { evaluateCodingController, getCodingEvaluationController } from
    "@/server/modules/interview-evaluation/coding-evaluation/coding-evaluation/codingEvaluation.controller";


export async function POST(
    req: NextRequest,
    { params }: { params: Promise<{ workspaceId: string }> }
) {
    try {

        // ############################################################
        // #     CODING EVALUATION SECTION                            #
        // ############################################################
        const codingEvaluationRes = await evaluateCodingController(req, params);
        if (!codingEvaluationRes) {
            return NextResponse.json(
                { success: false, message: "workspaceId is not valid required" },
                { status: 400 }
            );
        }

        const codingEvaluation = await codingEvaluationRes.json();
        if (!codingEvaluation.success) {
            return NextResponse.json(codingEvaluation, { status: 400 });
        }

        const codingEvaluationId = codingEvaluation.evaluationId;
        console.log(`[codingEvaluationId] => ${codingEvaluationId}`);


        // ############################################################
        // #     CODING RESULTS SECTION                               #
        // ############################################################
        const codingResultsRes = await getCodingEvaluationController(
            req,
            Promise.resolve({ evaluationId: codingEvaluationId })
        );
        console.log(`[codingResultsRes] => ${codingResultsRes}`)
        console.log()
        const codingResults = await codingResultsRes.json();
        console.log(`[codingResults] => ${codingResults}`)

        return NextResponse.json({
            success: true,
            results: {
                codingEvaluationId: codingEvaluationId,
                coding: codingResults
            }
        });
    } catch (error: any) {
        console.error("something went wrong", error);
        return NextResponse.json(
            { success: false, message: error.message },
            { status: 500 }
        );
    }
}




// ############################################################
// #     GET — FETCH EXISTING RESULTS                         #
// ############################################################
export async function GET(req: NextRequest) {
    try {

        const { searchParams } = req.nextUrl;
        const codingEvaluationId = searchParams.get("codingEvaluationId");


        if (!codingEvaluationId) {
            return NextResponse.json(
                {
                    success: false,
                    message: "codingEvaluationId are required",
                },
                { status: 400 }
            );
        }


        // ############################################################
        // #     CODING RESULTS SECTION                               #
        // ############################################################
        const codingResultsRes = await getCodingEvaluationController(
            req,
            Promise.resolve({ evaluationId: codingEvaluationId })
        );
        const codingResults = await codingResultsRes.json();


        return NextResponse.json(
            {
                success: true,
                results: {
                    coding: codingResults,
                },
            },
            { status: 200 }
        );
    } catch (error: any) {
        console.error("something went wrong", error);
        return NextResponse.json(
            { success: false, message: error.message },
            { status: 500 }
        );
    }
}