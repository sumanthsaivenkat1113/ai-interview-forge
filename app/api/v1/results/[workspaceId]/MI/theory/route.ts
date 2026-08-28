import { NextRequest, NextResponse } from "next/server";
import { evaluateInterviewController, getInterviewEvaluationController } from
    "@/server/modules/interview-evaluation/interview-evaluation/interviewEvaluation.controller";

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


        return NextResponse.json({
            success: true,
            results: {
                theoryEvaluationId: theoryEvaluationId,
                theory: theoryResults,
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


        if (!theoryEvaluationId) {
            return NextResponse.json(
                {
                    success: false,
                    message: "theoryEvaluationId is are required",
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
        return NextResponse.json(
            {
                success: true,
                results: {
                    theory: theoryResults,
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