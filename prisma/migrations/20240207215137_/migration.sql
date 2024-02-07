/*
  Warnings:

  - You are about to drop the column `title` on the `Document` table. All the data in the column will be lost.
  - You are about to drop the column `updatedAt` on the `Document` table. All the data in the column will be lost.
  - Added the required column `fileName` to the `Document` table without a default value. This is not possible if the table is not empty.
  - Added the required column `fileType` to the `Document` table without a default value. This is not possible if the table is not empty.
  - Added the required column `userId` to the `Document` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Document" DROP COLUMN "title",
DROP COLUMN "updatedAt",
ADD COLUMN     "fileName" TEXT NOT NULL,
ADD COLUMN     "fileType" TEXT NOT NULL,
ADD COLUMN     "userId" TEXT NOT NULL;
