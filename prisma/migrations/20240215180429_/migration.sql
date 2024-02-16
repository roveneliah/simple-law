/*
  Warnings:

  - The values [contractDrafting,contractReview] on the enum `ServiceType` will be removed. If these variants are still used in the database, this will fail.
  - You are about to drop the `Offer` table. If the table is not empty, all the data it contains will be lost.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "ServiceType_new" AS ENUM ('quick', 'advisory', 'attorney', 'review');
ALTER TABLE "Service" ALTER COLUMN "type" TYPE "ServiceType_new" USING ("type"::text::"ServiceType_new");
ALTER TYPE "ServiceType" RENAME TO "ServiceType_old";
ALTER TYPE "ServiceType_new" RENAME TO "ServiceType";
DROP TYPE "ServiceType_old";
COMMIT;

-- DropForeignKey
ALTER TABLE "Offer" DROP CONSTRAINT "Offer_caseId_fkey";

-- DropForeignKey
ALTER TABLE "Offer" DROP CONSTRAINT "Offer_lawyerId_fkey";

-- AlterTable
ALTER TABLE "Service" ADD COLUMN     "invitationId" TEXT;

-- DropTable
DROP TABLE "Offer";

-- AddForeignKey
ALTER TABLE "Service" ADD CONSTRAINT "Service_invitationId_fkey" FOREIGN KEY ("invitationId") REFERENCES "Invitation"("id") ON DELETE SET NULL ON UPDATE CASCADE;
