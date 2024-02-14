/*
  Warnings:

  - You are about to drop the column `response` on the `Invitation` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Invitation" DROP COLUMN "response",
ADD COLUMN     "lawyerComment" TEXT,
ADD COLUMN     "ourAnalysis" TEXT,
ADD COLUMN     "usersFeedback" TEXT,
ALTER COLUMN "status" DROP NOT NULL;
