-- CreateTable
CREATE TABLE "_CaseToService" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_CaseToService_AB_unique" ON "_CaseToService"("A", "B");

-- CreateIndex
CREATE INDEX "_CaseToService_B_index" ON "_CaseToService"("B");

-- AddForeignKey
ALTER TABLE "_CaseToService" ADD CONSTRAINT "_CaseToService_A_fkey" FOREIGN KEY ("A") REFERENCES "Case"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_CaseToService" ADD CONSTRAINT "_CaseToService_B_fkey" FOREIGN KEY ("B") REFERENCES "Service"("id") ON DELETE CASCADE ON UPDATE CASCADE;
