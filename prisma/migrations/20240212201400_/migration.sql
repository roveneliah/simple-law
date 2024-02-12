/*
  Warnings:

  - You are about to drop the `_CaseToService` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "_CaseToService" DROP CONSTRAINT "_CaseToService_A_fkey";

-- DropForeignKey
ALTER TABLE "_CaseToService" DROP CONSTRAINT "_CaseToService_B_fkey";

-- AlterTable
ALTER TABLE "Case" ADD COLUMN     "recommendedServiceIds" VARCHAR(255)[];

-- DropTable
DROP TABLE "_CaseToService";
