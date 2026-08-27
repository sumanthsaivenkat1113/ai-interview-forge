import {
    getQuestionAnswersResults,
} from "@/server/modules/question-answers-result/questionAnswersResults.repository";

export async function getQuestionAnswersService(id: string) {
    const workspace = await getQuestionAnswersResults(id);

    if (!workspace) {
        throw new Error("Workspace not found");
    }

    const QnA = workspace.questions.map((q) => ({
        qno: q.qno,
        question: q.question,
        answer: q.answers[0]?.answer ?? "",
    }));

    const codingQnA = workspace.codingQuestions.map((q) => ({
        qno: q.qno,
        problem_statement: q.problem_statement,
        examples: q.examples,
        answer: q.codingAnswers[0]?.answer ?? "",
    }));

    return {
        workspace: workspace.workspace,
        target_role: workspace.target_role,
        QnA,
        codingQnA,
    };
}