/*
  Warnings:

  - You are about to drop the column `jurisdiction` on the `Case` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Case" DROP COLUMN "jurisdiction",
ADD COLUMN     "analysisId" TEXT;

-- CreateTable
CREATE TABLE "CaseAnalysis" (
    "id" TEXT NOT NULL,
    "caseId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "freeOptions" TEXT,
    "oddsOfSuccess" TEXT,
    "strategy" TEXT,
    "costEstimate" TEXT,

    CONSTRAINT "CaseAnalysis_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "CaseAnalysis_caseId_key" ON "CaseAnalysis"("caseId");

-- AddForeignKey
ALTER TABLE "CaseAnalysis" ADD CONSTRAINT "CaseAnalysis_caseId_fkey" FOREIGN KEY ("caseId") REFERENCES "Case"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
