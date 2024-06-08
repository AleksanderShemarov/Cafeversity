/*
  Warnings:

  - A unique constraint covering the columns `[resetToken]` on the table `Users` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "Users" ADD COLUMN "resetToken" TEXT;
ALTER TABLE "Users" ADD COLUMN "resetTokenExpiry" DATETIME;

-- CreateIndex
CREATE UNIQUE INDEX "Users_resetToken_key" ON "Users"("resetToken");
