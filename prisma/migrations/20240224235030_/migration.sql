/*
  Warnings:

  - You are about to drop the column `invitationDueBy` on the `Case` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Case" DROP COLUMN "invitationDueBy",
ADD COLUMN     "interviewDueBy" TIMESTAMP(3);
