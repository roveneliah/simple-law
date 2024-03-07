/*
  Warnings:

  - You are about to drop the column `plaidUserId` on the `Lawyer` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Lawyer" DROP COLUMN "plaidUserId",
ADD COLUMN     "plaidVerificationId" TEXT;
