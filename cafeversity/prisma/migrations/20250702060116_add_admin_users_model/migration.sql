-- CreateTable
CREATE TABLE "AdminUsers" (
    "ID" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "Name" TEXT NOT NULL,
    "Surname" TEXT NOT NULL,
    "Email" TEXT NOT NULL,
    "EmailConfirmed" BOOLEAN NOT NULL,
    "Telephone" TEXT,
    "Role" TEXT NOT NULL,
    "Photo" TEXT NOT NULL,
    "Language" TEXT NOT NULL,
    "Theme" TEXT NOT NULL,
    "SessionId" TEXT,
    "Password" TEXT NOT NULL,
    "SecretWord" TEXT NOT NULL,
    "ResetToken" TEXT,
    "ResetTokenExpiry" DATETIME
);

-- CreateIndex
CREATE UNIQUE INDEX "AdminUsers_Email_key" ON "AdminUsers"("Email");

-- CreateIndex
CREATE UNIQUE INDEX "AdminUsers_SessionId_key" ON "AdminUsers"("SessionId");

-- CreateIndex
CREATE UNIQUE INDEX "AdminUsers_SecretWord_key" ON "AdminUsers"("SecretWord");

-- CreateIndex
CREATE UNIQUE INDEX "AdminUsers_ResetToken_key" ON "AdminUsers"("ResetToken");
