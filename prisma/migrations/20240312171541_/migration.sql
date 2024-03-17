-- AlterTable
ALTER TABLE "Agreement" ADD COLUMN     "userId" TEXT;

-- AlterTable
ALTER TABLE "Lawyer" ADD COLUMN     "lastVerifiedAt" TIMESTAMP(3),
ADD COLUMN     "plaidVerified" BOOLEAN NOT NULL DEFAULT false;

-- AddForeignKey
ALTER TABLE "Agreement" ADD CONSTRAINT "Agreement_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;
