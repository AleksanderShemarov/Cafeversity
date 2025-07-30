-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_AdminUsers" (
    "ID" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "Name" TEXT NOT NULL,
    "Surname" TEXT NOT NULL,
    "Email" TEXT NOT NULL,
    "EmailConfirmed" BOOLEAN NOT NULL DEFAULT false,
    "Telephone" TEXT,
    "Role" TEXT NOT NULL,
    "SentCode" TEXT,
    "Photo" TEXT NOT NULL DEFAULT '',
    "Language" TEXT NOT NULL,
    "Theme" TEXT NOT NULL DEFAULT 'light',
    "SessionId" TEXT,
    "Password" TEXT NOT NULL,
    "SecretWord" TEXT NOT NULL,
    "ResetToken" TEXT,
    "ResetTokenExpiry" DATETIME
);
INSERT INTO "new_AdminUsers" ("Email", "EmailConfirmed", "ID", "Language", "Name", "Password", "Photo", "ResetToken", "ResetTokenExpiry", "Role", "SecretWord", "SessionId", "Surname", "Telephone", "Theme") SELECT "Email", "EmailConfirmed", "ID", "Language", "Name", "Password", "Photo", "ResetToken", "ResetTokenExpiry", "Role", "SecretWord", "SessionId", "Surname", "Telephone", "Theme" FROM "AdminUsers";
DROP TABLE "AdminUsers";
ALTER TABLE "new_AdminUsers" RENAME TO "AdminUsers";
CREATE UNIQUE INDEX "AdminUsers_Email_key" ON "AdminUsers"("Email");
CREATE UNIQUE INDEX "AdminUsers_SessionId_key" ON "AdminUsers"("SessionId");
CREATE UNIQUE INDEX "AdminUsers_SecretWord_key" ON "AdminUsers"("SecretWord");
CREATE UNIQUE INDEX "AdminUsers_ResetToken_key" ON "AdminUsers"("ResetToken");
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
