/*
  Warnings:

  - You are about to drop the column `caloriesRange` on the `Users` table. All the data in the column will be lost.
  - You are about to drop the column `choiceColor` on the `Users` table. All the data in the column will be lost.
  - You are about to drop the column `fonFamily` on the `Users` table. All the data in the column will be lost.
  - You are about to drop the column `fontSize` on the `Users` table. All the data in the column will be lost.
  - You are about to drop the column `fontWeight` on the `Users` table. All the data in the column will be lost.
  - You are about to drop the column `interfaceColor` on the `Users` table. All the data in the column will be lost.
  - You are about to drop the column `isSpicy` on the `Users` table. All the data in the column will be lost.
  - You are about to drop the column `isVegan` on the `Users` table. All the data in the column will be lost.
  - You are about to drop the column `isVegetarian` on the `Users` table. All the data in the column will be lost.
  - You are about to drop the column `language` on the `Users` table. All the data in the column will be lost.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Users" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "firstName" TEXT NOT NULL,
    "lastName" TEXT NOT NULL,
    "nickName" TEXT,
    "userPhoto" TEXT,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "sessionId" TEXT,
    "resetToken" TEXT,
    "resetTokenExpiry" DATETIME
);
INSERT INTO "new_Users" ("email", "firstName", "id", "lastName", "nickName", "password", "resetToken", "resetTokenExpiry", "sessionId", "userPhoto") SELECT "email", "firstName", "id", "lastName", "nickName", "password", "resetToken", "resetTokenExpiry", "sessionId", "userPhoto" FROM "Users";
DROP TABLE "Users";
ALTER TABLE "new_Users" RENAME TO "Users";
CREATE UNIQUE INDEX "Users_nickName_key" ON "Users"("nickName");
CREATE UNIQUE INDEX "Users_email_key" ON "Users"("email");
CREATE UNIQUE INDEX "Users_sessionId_key" ON "Users"("sessionId");
CREATE UNIQUE INDEX "Users_resetToken_key" ON "Users"("resetToken");
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
