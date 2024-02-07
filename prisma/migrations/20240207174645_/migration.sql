-- CreateTable
CREATE TABLE "LawyerVerificationRequest" (
    "id" TEXT NOT NULL,
    "barNumber" TEXT NOT NULL,
    "jurisdiction" TEXT NOT NULL,
    "lawyerId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "LawyerVerificationRequest_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "LawyerVerificationRequest" ADD CONSTRAINT "LawyerVerificationRequest_lawyerId_fkey" FOREIGN KEY ("lawyerId") REFERENCES "Lawyer"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
