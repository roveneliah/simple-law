/*
  Warnings:

  - You are about to drop the column `message` on the `Agreement` table. All the data in the column will be lost.
  - You are about to drop the column `price` on the `Agreement` table. All the data in the column will be lost.
  - Added the required column `contractUrl` to the `Agreement` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Agreement" DROP COLUMN "message",
DROP COLUMN "price",
ADD COLUMN     "contractHash" TEXT,
ADD COLUMN     "contractUrl" TEXT NOT NULL;
