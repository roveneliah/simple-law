-- AlterTable
ALTER TABLE "Lawyer" ADD COLUMN     "stripeCustomerId" TEXT;

-- CreateTable
CREATE TABLE "BarMembership" (
    "id" TEXT NOT NULL,
    "barNumber" TEXT NOT NULL,
    "state" TEXT NOT NULL,
    "lawyerId" TEXT NOT NULL,
    "verified" BOOLEAN NOT NULL DEFAULT false,
    "verifiedAt" TIMESTAMP(3),
    "verifiedBy" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "BarMembership_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "BarMembership_barNumber_key" ON "BarMembership"("barNumber");

-- AddForeignKey
ALTER TABLE "BarMembership" ADD CONSTRAINT "BarMembership_lawyerId_fkey" FOREIGN KEY ("lawyerId") REFERENCES "Lawyer"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
