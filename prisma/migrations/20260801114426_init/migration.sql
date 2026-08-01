-- CreateEnum
CREATE TYPE "InterviewType" AS ENUM ('FULL_MOCK', 'CODING', 'THEORY');

-- CreateEnum
CREATE TYPE "InterviewStatus" AS ENUM ('IN_PROGRESS', 'COMPLETED', 'ABANDONED');

-- CreateTable
CREATE TABLE "User" (
    "id" SERIAL NOT NULL,
    "clerkId" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "profileImageUrl" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "lastLoginAt" TIMESTAMP(3),

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Workspace" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "userId" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Workspace_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Resume" (
    "id" SERIAL NOT NULL,
    "rawText" TEXT,
    "workspaceId" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Resume_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ResumeSkill" (
    "id" SERIAL NOT NULL,
    "skill" TEXT NOT NULL,
    "resumeId" INTEGER NOT NULL,

    CONSTRAINT "ResumeSkill_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ResumeExperience" (
    "id" SERIAL NOT NULL,
    "experience" TEXT NOT NULL,
    "resumeId" INTEGER NOT NULL,

    CONSTRAINT "ResumeExperience_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ResumeProject" (
    "id" SERIAL NOT NULL,
    "project" TEXT NOT NULL,
    "resumeId" INTEGER NOT NULL,

    CONSTRAINT "ResumeProject_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ResumeOtherField" (
    "id" SERIAL NOT NULL,
    "fieldName" TEXT NOT NULL,
    "fieldValue" TEXT,
    "resumeId" INTEGER NOT NULL,

    CONSTRAINT "ResumeOtherField_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "JobDescription" (
    "id" SERIAL NOT NULL,
    "description" TEXT NOT NULL,
    "workspaceId" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "JobDescription_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Interview" (
    "id" SERIAL NOT NULL,
    "interviewType" "InterviewType" NOT NULL,
    "status" "InterviewStatus" NOT NULL DEFAULT 'IN_PROGRESS',
    "subject" TEXT,
    "targetCompany" TEXT,
    "targetRole" TEXT,
    "yearsOfExperience" INTEGER,
    "startedAt" TIMESTAMP(3),
    "completedAt" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "workspaceId" INTEGER NOT NULL,
    "resumeId" INTEGER,
    "jobDescriptionId" INTEGER,

    CONSTRAINT "Interview_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "TheoryQuestion" (
    "id" SERIAL NOT NULL,
    "questionNo" INTEGER NOT NULL,
    "question" TEXT NOT NULL,
    "difficulty" TEXT,
    "topic" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "interviewId" INTEGER NOT NULL,

    CONSTRAINT "TheoryQuestion_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "TheoryAnswer" (
    "id" SERIAL NOT NULL,
    "answer" TEXT,
    "answeredAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "theoryQuestionId" INTEGER NOT NULL,

    CONSTRAINT "TheoryAnswer_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "TheoryEvaluation" (
    "id" SERIAL NOT NULL,
    "accuracyScore" INTEGER,
    "communicationScore" INTEGER,
    "problemSolvingScore" INTEGER,
    "overallScore" INTEGER,
    "maxScore" INTEGER NOT NULL DEFAULT 10,
    "strengths" TEXT,
    "improvements" TEXT,
    "feedback" TEXT,
    "evaluatedBy" TEXT NOT NULL DEFAULT 'AI',
    "evaluatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "theoryQuestionId" INTEGER NOT NULL,

    CONSTRAINT "TheoryEvaluation_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "CodingQuestion" (
    "id" SERIAL NOT NULL,
    "questionNo" INTEGER NOT NULL,
    "title" TEXT,
    "problemStatement" TEXT NOT NULL,
    "difficulty" TEXT,
    "examples" JSONB,
    "constraints" TEXT,
    "explanation" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "interviewId" INTEGER NOT NULL,

    CONSTRAINT "CodingQuestion_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "CodingAnswer" (
    "id" SERIAL NOT NULL,
    "language" TEXT,
    "solution" TEXT,
    "answeredAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "codingQuestionId" INTEGER NOT NULL,

    CONSTRAINT "CodingAnswer_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "CodingEvaluation" (
    "id" SERIAL NOT NULL,
    "correctnessScore" INTEGER,
    "efficiencyScore" INTEGER,
    "codeQualityScore" INTEGER,
    "problemSolvingScore" INTEGER,
    "overallScore" INTEGER,
    "maxScore" INTEGER NOT NULL DEFAULT 100,
    "strengths" TEXT,
    "improvements" TEXT,
    "feedback" TEXT,
    "evaluatedBy" TEXT NOT NULL DEFAULT 'AI',
    "evaluatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "codingQuestionId" INTEGER NOT NULL,

    CONSTRAINT "CodingEvaluation_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "PerformanceResult" (
    "id" SERIAL NOT NULL,
    "theoryAverageScore" DECIMAL(5,2),
    "codingAverageScore" DECIMAL(5,2),
    "communicationAverageScore" DECIMAL(5,2),
    "problemSolvingAverageScore" DECIMAL(5,2),
    "overallScore" DECIMAL(5,2),
    "strengths" TEXT,
    "areasToImprove" TEXT,
    "overallFeedback" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "interviewId" INTEGER NOT NULL,

    CONSTRAINT "PerformanceResult_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_clerkId_key" ON "User"("clerkId");

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE INDEX "Workspace_userId_idx" ON "Workspace"("userId");

-- CreateIndex
CREATE INDEX "Resume_workspaceId_idx" ON "Resume"("workspaceId");

-- CreateIndex
CREATE INDEX "ResumeSkill_resumeId_idx" ON "ResumeSkill"("resumeId");

-- CreateIndex
CREATE INDEX "ResumeExperience_resumeId_idx" ON "ResumeExperience"("resumeId");

-- CreateIndex
CREATE INDEX "ResumeProject_resumeId_idx" ON "ResumeProject"("resumeId");

-- CreateIndex
CREATE INDEX "ResumeOtherField_resumeId_idx" ON "ResumeOtherField"("resumeId");

-- CreateIndex
CREATE INDEX "JobDescription_workspaceId_idx" ON "JobDescription"("workspaceId");

-- CreateIndex
CREATE INDEX "Interview_workspaceId_idx" ON "Interview"("workspaceId");

-- CreateIndex
CREATE INDEX "Interview_resumeId_idx" ON "Interview"("resumeId");

-- CreateIndex
CREATE INDEX "Interview_jobDescriptionId_idx" ON "Interview"("jobDescriptionId");

-- CreateIndex
CREATE INDEX "TheoryQuestion_interviewId_idx" ON "TheoryQuestion"("interviewId");

-- CreateIndex
CREATE INDEX "TheoryAnswer_theoryQuestionId_idx" ON "TheoryAnswer"("theoryQuestionId");

-- CreateIndex
CREATE UNIQUE INDEX "TheoryEvaluation_theoryQuestionId_key" ON "TheoryEvaluation"("theoryQuestionId");

-- CreateIndex
CREATE INDEX "CodingQuestion_interviewId_idx" ON "CodingQuestion"("interviewId");

-- CreateIndex
CREATE INDEX "CodingAnswer_codingQuestionId_idx" ON "CodingAnswer"("codingQuestionId");

-- CreateIndex
CREATE UNIQUE INDEX "CodingEvaluation_codingQuestionId_key" ON "CodingEvaluation"("codingQuestionId");

-- CreateIndex
CREATE UNIQUE INDEX "PerformanceResult_interviewId_key" ON "PerformanceResult"("interviewId");

-- AddForeignKey
ALTER TABLE "Workspace" ADD CONSTRAINT "Workspace_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Resume" ADD CONSTRAINT "Resume_workspaceId_fkey" FOREIGN KEY ("workspaceId") REFERENCES "Workspace"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ResumeSkill" ADD CONSTRAINT "ResumeSkill_resumeId_fkey" FOREIGN KEY ("resumeId") REFERENCES "Resume"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ResumeExperience" ADD CONSTRAINT "ResumeExperience_resumeId_fkey" FOREIGN KEY ("resumeId") REFERENCES "Resume"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ResumeProject" ADD CONSTRAINT "ResumeProject_resumeId_fkey" FOREIGN KEY ("resumeId") REFERENCES "Resume"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ResumeOtherField" ADD CONSTRAINT "ResumeOtherField_resumeId_fkey" FOREIGN KEY ("resumeId") REFERENCES "Resume"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "JobDescription" ADD CONSTRAINT "JobDescription_workspaceId_fkey" FOREIGN KEY ("workspaceId") REFERENCES "Workspace"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Interview" ADD CONSTRAINT "Interview_workspaceId_fkey" FOREIGN KEY ("workspaceId") REFERENCES "Workspace"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Interview" ADD CONSTRAINT "Interview_resumeId_fkey" FOREIGN KEY ("resumeId") REFERENCES "Resume"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Interview" ADD CONSTRAINT "Interview_jobDescriptionId_fkey" FOREIGN KEY ("jobDescriptionId") REFERENCES "JobDescription"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TheoryQuestion" ADD CONSTRAINT "TheoryQuestion_interviewId_fkey" FOREIGN KEY ("interviewId") REFERENCES "Interview"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TheoryAnswer" ADD CONSTRAINT "TheoryAnswer_theoryQuestionId_fkey" FOREIGN KEY ("theoryQuestionId") REFERENCES "TheoryQuestion"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TheoryEvaluation" ADD CONSTRAINT "TheoryEvaluation_theoryQuestionId_fkey" FOREIGN KEY ("theoryQuestionId") REFERENCES "TheoryQuestion"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CodingQuestion" ADD CONSTRAINT "CodingQuestion_interviewId_fkey" FOREIGN KEY ("interviewId") REFERENCES "Interview"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CodingAnswer" ADD CONSTRAINT "CodingAnswer_codingQuestionId_fkey" FOREIGN KEY ("codingQuestionId") REFERENCES "CodingQuestion"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CodingEvaluation" ADD CONSTRAINT "CodingEvaluation_codingQuestionId_fkey" FOREIGN KEY ("codingQuestionId") REFERENCES "CodingQuestion"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PerformanceResult" ADD CONSTRAINT "PerformanceResult_interviewId_fkey" FOREIGN KEY ("interviewId") REFERENCES "Interview"("id") ON DELETE CASCADE ON UPDATE CASCADE;
