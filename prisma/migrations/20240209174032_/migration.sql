/*
  Warnings:

  - You are about to drop the column `readyForInvitations` on the `Case` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Case" DROP COLUMN "readyForInvitations",
ADD COLUMN     "jurisdiction" TEXT,
ADD COLUMN     "readyForInvitation" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "review" TEXT;
