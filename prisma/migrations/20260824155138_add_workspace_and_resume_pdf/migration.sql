-- DropEnum
DROP TYPE "InterviewStatus";

-- DropEnum
DROP TYPE "InterviewType";

-- CreateTable
CREATE TABLE "Workspace" (
    "id" TEXT NOT NULL,
    "workspace" TEXT NOT NULL,
    "target_company" TEXT NOT NULL,
    "target_role" TEXT NOT NULL,
    "years_of_experience" INTEGER NOT NULL,
    "userId" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Workspace_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ResumePdfDetails" (
    "id" TEXT NOT NULL,
    "fileName" TEXT NOT NULL,
    "text" TEXT NOT NULL,
    "pages" INTEGER NOT NULL,
    "skills" TEXT NOT NULL,
    "project" TEXT NOT NULL,
    "experience" TEXT NOT NULL,
    "otherFields" TEXT NOT NULL,
    "workspaceId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "ResumePdfDetails_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "ResumePdfDetails_workspaceId_key" ON "ResumePdfDetails"("workspaceId");

-- AddForeignKey
ALTER TABLE "Workspace" ADD CONSTRAINT "Workspace_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ResumePdfDetails" ADD CONSTRAINT "ResumePdfDetails_workspaceId_fkey" FOREIGN KEY ("workspaceId") REFERENCES "Workspace"("id") ON DELETE CASCADE ON UPDATE CASCADE;
