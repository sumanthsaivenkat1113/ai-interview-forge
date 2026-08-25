/*
  Warnings:

  - A unique constraint covering the columns `[userId,workspace]` on the table `Workspace` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Workspace_userId_workspace_key" ON "Workspace"("userId", "workspace");
