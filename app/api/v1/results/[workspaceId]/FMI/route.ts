import { NextRequest, NextResponse } from "next/server";
// theoty evalution
import { evaluateInterviewController } from
    "@/server/modules/interview-evaluation/interview-evaluation/interviewEvaluation.controller";
// coding evaluation
import { evaluateCodingController } from
    "@/server/modules/interview-evaluation/coding-evaluation/coding-evaluation/codingEvaluation.controller";
// theory results
import { getInterviewEvaluationController } from
    "@/server/modules/interview-evaluation/interview-evaluation/interviewEvaluation.controller";
// coding results
import { getCodingEvaluationController } from
    "@/server/modules/interview-evaluation/coding-evaluation/coding-evaluation/codingEvaluation.controller";

export async function POST(
    req: NextRequest,
    { params }: { params: Promise<{ workspaceId: string }> }
) {
    try {
        // ############################################################
        // #     THEORY EVALUATION SECTION                            #
        // ############################################################
        const theoryEvaluationRes = await evaluateInterviewController(req, params);
        if (!theoryEvaluationRes) {
            return NextResponse.json(
                { success: false, message: "workspaceId is not valid required" },
                { status: 400 }
            );
        }

        const theoryEvaluation = await theoryEvaluationRes.json();
        if (!theoryEvaluation.success) {
            return NextResponse.json(theoryEvaluation, { status: 400 });
        }

        const theoryEvaluationId = theoryEvaluation.data.id;
        console.log(`[theoryEvaluationId] => ${theoryEvaluationId}`);

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
        // #     THEORY RESULTS SECTION                               #
        // ############################################################
        const theoryResultsRes = await getInterviewEvaluationController(
            req,
            Promise.resolve({ evaluationId: theoryEvaluationId })
        );
        console.log(`[theoryResultsRes] => ${theoryEvaluationRes}`)
        console.log()
        const theoryResults = await theoryResultsRes.json();
        console.log(`[theoryResults] => ${theoryResults}`)

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
                theoryEvaluationId: theoryEvaluationId,
                codingEvaluationId: codingEvaluationId,
                theory: theoryResults,
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
        const theoryEvaluationId = searchParams.get("theoryEvaluationId");
        const codingEvaluationId = searchParams.get("codingEvaluationId");


        if (!theoryEvaluationId || !codingEvaluationId) {
            return NextResponse.json(
                {
                    success: false,
                    message: "theoryEvaluationId and codingEvaluationId are required",
                },
                { status: 400 }
            );
        }

        // ############################################################
        // #     THEORY RESULTS SECTION                               #
        // ############################################################
        const theoryResultsRes = await getInterviewEvaluationController(
            req,
            Promise.resolve({ evaluationId: theoryEvaluationId })
        );
        const theoryResults = await theoryResultsRes.json();

        // ############################################################
        // #     CODING RESULTS SECTION                               #
        // ############################################################
        const codingResultsRes = await getCodingEvaluationController(
            req,
            Promise.resolve({ evaluationId: codingEvaluationId })
        );
        const codingResults = await codingResultsRes.json();

        const success = theoryResults.success && codingResults.success;

        return NextResponse.json(
            {
                success,
                results: {
                    theory: theoryResults,
                    coding: codingResults,
                },
            },
            { status: success ? 200 : 400 }
        );
    } catch (error: any) {
        console.error("something went wrong", error);
        return NextResponse.json(
            { success: false, message: error.message },
            { status: 500 }
        );
    }
}