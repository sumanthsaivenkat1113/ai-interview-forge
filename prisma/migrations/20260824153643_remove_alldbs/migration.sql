/*
  Warnings:

  - You are about to drop the `CodingAnswer` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `CodingEvaluation` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `CodingQuestion` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Interview` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `JobDescription` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `PerformanceResult` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Resume` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `ResumeExperience` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `ResumeOtherField` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `ResumeProject` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `ResumeSkill` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `TheoryAnswer` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `TheoryEvaluation` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `TheoryQuestion` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Workspace` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "CodingAnswer" DROP CONSTRAINT "CodingAnswer_codingQuestionId_fkey";

-- DropForeignKey
ALTER TABLE "CodingEvaluation" DROP CONSTRAINT "CodingEvaluation_codingQuestionId_fkey";

-- DropForeignKey
ALTER TABLE "CodingQuestion" DROP CONSTRAINT "CodingQuestion_interviewId_fkey";

-- DropForeignKey
ALTER TABLE "Interview" DROP CONSTRAINT "Interview_jobDescriptionId_fkey";

-- DropForeignKey
ALTER TABLE "Interview" DROP CONSTRAINT "Interview_resumeId_fkey";

-- DropForeignKey
ALTER TABLE "Interview" DROP CONSTRAINT "Interview_workspaceId_fkey";

-- DropForeignKey
ALTER TABLE "JobDescription" DROP CONSTRAINT "JobDescription_workspaceId_fkey";

-- DropForeignKey
ALTER TABLE "PerformanceResult" DROP CONSTRAINT "PerformanceResult_interviewId_fkey";

-- DropForeignKey
ALTER TABLE "Resume" DROP CONSTRAINT "Resume_workspaceId_fkey";

-- DropForeignKey
ALTER TABLE "ResumeExperience" DROP CONSTRAINT "ResumeExperience_resumeId_fkey";

-- DropForeignKey
ALTER TABLE "ResumeOtherField" DROP CONSTRAINT "ResumeOtherField_resumeId_fkey";

-- DropForeignKey
ALTER TABLE "ResumeProject" DROP CONSTRAINT "ResumeProject_resumeId_fkey";

-- DropForeignKey
ALTER TABLE "ResumeSkill" DROP CONSTRAINT "ResumeSkill_resumeId_fkey";

-- DropForeignKey
ALTER TABLE "TheoryAnswer" DROP CONSTRAINT "TheoryAnswer_theoryQuestionId_fkey";

-- DropForeignKey
ALTER TABLE "TheoryEvaluation" DROP CONSTRAINT "TheoryEvaluation_theoryQuestionId_fkey";

-- DropForeignKey
ALTER TABLE "TheoryQuestion" DROP CONSTRAINT "TheoryQuestion_interviewId_fkey";

-- DropForeignKey
ALTER TABLE "Workspace" DROP CONSTRAINT "Workspace_userId_fkey";

-- DropTable
DROP TABLE "CodingAnswer";

-- DropTable
DROP TABLE "CodingEvaluation";

-- DropTable
DROP TABLE "CodingQuestion";

-- DropTable
DROP TABLE "Interview";

-- DropTable
DROP TABLE "JobDescription";

-- DropTable
DROP TABLE "PerformanceResult";

-- DropTable
DROP TABLE "Resume";

-- DropTable
DROP TABLE "ResumeExperience";

-- DropTable
DROP TABLE "ResumeOtherField";

-- DropTable
DROP TABLE "ResumeProject";

-- DropTable
DROP TABLE "ResumeSkill";

-- DropTable
DROP TABLE "TheoryAnswer";

-- DropTable
DROP TABLE "TheoryEvaluation";

-- DropTable
DROP TABLE "TheoryQuestion";

-- DropTable
DROP TABLE "Workspace";
