-- CreateTable
CREATE TABLE "InterviewEvaluation" (
    "id" UUID NOT NULL,
    "workspace" TEXT NOT NULL,
    "totalQuestions" INTEGER NOT NULL,
    "evaluatedQuestions" INTEGER NOT NULL,
    "overallScore" DECIMAL(5,2) NOT NULL,
    "performanceLevel" TEXT NOT NULL,
    "recommendation" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "InterviewEvaluation_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "CategoryScore" (
    "id" UUID NOT NULL,
    "evaluationId" UUID NOT NULL,
    "category" TEXT NOT NULL,
    "score" DECIMAL(5,2) NOT NULL,

    CONSTRAINT "CategoryScore_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "EvaluationStrength" (
    "id" UUID NOT NULL,
    "evaluationId" UUID NOT NULL,
    "description" TEXT NOT NULL,

    CONSTRAINT "EvaluationStrength_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "EvaluationImprovementArea" (
    "id" UUID NOT NULL,
    "evaluationId" UUID NOT NULL,
    "description" TEXT NOT NULL,

    CONSTRAINT "EvaluationImprovementArea_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "KnowledgeGap" (
    "id" UUID NOT NULL,
    "evaluationId" UUID NOT NULL,
    "description" TEXT NOT NULL,

    CONSTRAINT "KnowledgeGap_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "EvaluationTimeTaken" (
    "id" UUID NOT NULL,
    "evaluationId" UUID NOT NULL,
    "milliseconds" DECIMAL(12,2) NOT NULL,
    "seconds" DECIMAL(10,2) NOT NULL,

    CONSTRAINT "EvaluationTimeTaken_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ApiRequest" (
    "id" UUID NOT NULL,
    "evaluationId" UUID NOT NULL,
    "chunk" INTEGER NOT NULL,
    "questions" INTEGER NOT NULL,
    "timeTakenSeconds" DECIMAL(10,2) NOT NULL,

    CONSTRAINT "ApiRequest_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "QuestionEvaluation" (
    "id" UUID NOT NULL,
    "evaluationId" UUID NOT NULL,
    "qno" INTEGER NOT NULL,
    "accuracy" DECIMAL(5,2) NOT NULL,
    "depth" DECIMAL(5,2) NOT NULL,
    "clarity" DECIMAL(5,2) NOT NULL,
    "relevance" DECIMAL(5,2) NOT NULL,
    "questionScore" DECIMAL(5,2) NOT NULL,

    CONSTRAINT "QuestionEvaluation_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "QuestionMissingConcept" (
    "id" UUID NOT NULL,
    "questionEvaluationId" UUID NOT NULL,
    "concept" TEXT NOT NULL,

    CONSTRAINT "QuestionMissingConcept_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "coding_evaluations" (
    "id" TEXT NOT NULL,
    "workspaceId" TEXT NOT NULL,
    "workspace" TEXT NOT NULL,
    "targetRole" TEXT NOT NULL,
    "language" TEXT NOT NULL DEFAULT 'JavaScript',
    "overallScore" INTEGER NOT NULL,
    "classification" TEXT NOT NULL,
    "summary" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "coding_evaluations_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "coding_evaluation_questions" (
    "id" TEXT NOT NULL,
    "evaluationId" TEXT NOT NULL,
    "qno" INTEGER NOT NULL,
    "algorithmProblemSolving" INTEGER NOT NULL,
    "codeCorrectness" INTEGER NOT NULL,
    "timeComplexity" INTEGER NOT NULL,
    "spaceComplexity" INTEGER NOT NULL,
    "edgeCases" INTEGER NOT NULL,
    "testPerformance" INTEGER NOT NULL,
    "codeQuality" INTEGER NOT NULL,
    "efficiency" INTEGER NOT NULL,
    "expectedTimeComplexity" TEXT,
    "expectedSpaceComplexity" TEXT,
    "candidateTimeComplexity" TEXT,
    "candidateSpaceComplexity" TEXT,
    "isCorrect" BOOLEAN NOT NULL,
    "testsPassed" INTEGER NOT NULL,
    "testsFailed" INTEGER NOT NULL,
    "strengths" TEXT[],
    "improvements" TEXT[],
    "criticalIssues" TEXT[],
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "coding_evaluation_questions_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "InterviewEvaluation_workspace_key" ON "InterviewEvaluation"("workspace");

-- CreateIndex
CREATE INDEX "InterviewEvaluation_workspace_idx" ON "InterviewEvaluation"("workspace");

-- CreateIndex
CREATE INDEX "InterviewEvaluation_createdAt_idx" ON "InterviewEvaluation"("createdAt");

-- CreateIndex
CREATE INDEX "CategoryScore_evaluationId_idx" ON "CategoryScore"("evaluationId");

-- CreateIndex
CREATE UNIQUE INDEX "CategoryScore_evaluationId_category_key" ON "CategoryScore"("evaluationId", "category");

-- CreateIndex
CREATE INDEX "EvaluationStrength_evaluationId_idx" ON "EvaluationStrength"("evaluationId");

-- CreateIndex
CREATE INDEX "EvaluationImprovementArea_evaluationId_idx" ON "EvaluationImprovementArea"("evaluationId");

-- CreateIndex
CREATE INDEX "KnowledgeGap_evaluationId_idx" ON "KnowledgeGap"("evaluationId");

-- CreateIndex
CREATE UNIQUE INDEX "EvaluationTimeTaken_evaluationId_key" ON "EvaluationTimeTaken"("evaluationId");

-- CreateIndex
CREATE INDEX "ApiRequest_evaluationId_idx" ON "ApiRequest"("evaluationId");

-- CreateIndex
CREATE UNIQUE INDEX "ApiRequest_evaluationId_chunk_key" ON "ApiRequest"("evaluationId", "chunk");

-- CreateIndex
CREATE INDEX "QuestionEvaluation_evaluationId_idx" ON "QuestionEvaluation"("evaluationId");

-- CreateIndex
CREATE UNIQUE INDEX "QuestionEvaluation_evaluationId_qno_key" ON "QuestionEvaluation"("evaluationId", "qno");

-- CreateIndex
CREATE INDEX "QuestionMissingConcept_questionEvaluationId_idx" ON "QuestionMissingConcept"("questionEvaluationId");

-- CreateIndex
CREATE UNIQUE INDEX "coding_evaluations_workspaceId_key" ON "coding_evaluations"("workspaceId");

-- CreateIndex
CREATE UNIQUE INDEX "coding_evaluations_workspace_key" ON "coding_evaluations"("workspace");

-- CreateIndex
CREATE INDEX "coding_evaluations_workspaceId_idx" ON "coding_evaluations"("workspaceId");

-- CreateIndex
CREATE UNIQUE INDEX "coding_evaluation_questions_evaluationId_qno_key" ON "coding_evaluation_questions"("evaluationId", "qno");

-- AddForeignKey
ALTER TABLE "CategoryScore" ADD CONSTRAINT "CategoryScore_evaluationId_fkey" FOREIGN KEY ("evaluationId") REFERENCES "InterviewEvaluation"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "EvaluationStrength" ADD CONSTRAINT "EvaluationStrength_evaluationId_fkey" FOREIGN KEY ("evaluationId") REFERENCES "InterviewEvaluation"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "EvaluationImprovementArea" ADD CONSTRAINT "EvaluationImprovementArea_evaluationId_fkey" FOREIGN KEY ("evaluationId") REFERENCES "InterviewEvaluation"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "KnowledgeGap" ADD CONSTRAINT "KnowledgeGap_evaluationId_fkey" FOREIGN KEY ("evaluationId") REFERENCES "InterviewEvaluation"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "EvaluationTimeTaken" ADD CONSTRAINT "EvaluationTimeTaken_evaluationId_fkey" FOREIGN KEY ("evaluationId") REFERENCES "InterviewEvaluation"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ApiRequest" ADD CONSTRAINT "ApiRequest_evaluationId_fkey" FOREIGN KEY ("evaluationId") REFERENCES "InterviewEvaluation"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "QuestionEvaluation" ADD CONSTRAINT "QuestionEvaluation_evaluationId_fkey" FOREIGN KEY ("evaluationId") REFERENCES "InterviewEvaluation"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "QuestionMissingConcept" ADD CONSTRAINT "QuestionMissingConcept_questionEvaluationId_fkey" FOREIGN KEY ("questionEvaluationId") REFERENCES "QuestionEvaluation"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "coding_evaluation_questions" ADD CONSTRAINT "coding_evaluation_questions_evaluationId_fkey" FOREIGN KEY ("evaluationId") REFERENCES "coding_evaluations"("id") ON DELETE CASCADE ON UPDATE CASCADE;
