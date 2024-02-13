/*
  Warnings:

  - A unique constraint covering the columns `[question]` on the table `Inquiry` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Inquiry_question_key" ON "Inquiry"("question");
