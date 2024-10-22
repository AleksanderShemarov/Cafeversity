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
    "resetTokenExpiry" DATETIME,
    "isSpicy" BOOLEAN NOT NULL DEFAULT false,
    "isVegetarian" BOOLEAN NOT NULL DEFAULT false,
    "isVegan" BOOLEAN NOT NULL DEFAULT false,
    "caloriesRange" TEXT NOT NULL DEFAULT '1800 - 2500',
    "language" TEXT NOT NULL DEFAULT 'Belarusian',
    "interfaceColor" TEXT NOT NULL DEFAULT 'Light',
    "choiceColor" TEXT NOT NULL DEFAULT 'Lime',
    "fonFamily" TEXT NOT NULL DEFAULT 'Consolas',
    "fontSize" TEXT NOT NULL DEFAULT '20px',
    "fontWeight" TEXT NOT NULL DEFAULT 'Normal'
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
