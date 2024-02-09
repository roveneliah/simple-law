/*
  Warnings:

  - A unique constraint covering the columns `[caseId,lawyerId]` on the table `Invitation` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Invitation_caseId_lawyerId_key" ON "Invitation"("caseId", "lawyerId");
