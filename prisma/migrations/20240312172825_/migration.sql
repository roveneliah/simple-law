/*
  Warnings:

  - Made the column `userId` on table `Agreement` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE "Agreement" DROP CONSTRAINT "Agreement_userId_fkey";

-- AlterTable
ALTER TABLE "Agreement" ALTER COLUMN "userId" SET NOT NULL;

-- AddForeignKey
ALTER TABLE "Agreement" ADD CONSTRAINT "Agreement_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
