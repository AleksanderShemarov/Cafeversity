/*
  Warnings:

  - A unique constraint covering the columns `[sessionId]` on the table `Users` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Users_sessionId_key" ON "Users"("sessionId");
