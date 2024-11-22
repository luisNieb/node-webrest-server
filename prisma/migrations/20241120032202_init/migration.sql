/*
  Warnings:

  - You are about to drop the column `campleteAt` on the `todo` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "todo" DROP COLUMN "campleteAt",
ADD COLUMN     "completedAt" TIMESTAMP;
