/*
  Warnings:

  - Made the column `title` on table `Case` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "Case" ALTER COLUMN "status" DROP NOT NULL,
ALTER COLUMN "title" SET NOT NULL;
