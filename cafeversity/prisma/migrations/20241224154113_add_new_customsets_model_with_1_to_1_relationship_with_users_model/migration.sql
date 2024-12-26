-- CreateTable
CREATE TABLE "CustomSets" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "spicy" BOOLEAN NOT NULL DEFAULT false,
    "vegetarian" BOOLEAN NOT NULL DEFAULT false,
    "vegan" BOOLEAN NOT NULL DEFAULT false,
    "minCalory" INTEGER NOT NULL DEFAULT 1800,
    "maxCalory" INTEGER NOT NULL DEFAULT 2500,
    "language" TEXT NOT NULL DEFAULT 'Беларуская',
    "pageTheme" TEXT NOT NULL DEFAULT 'light',
    "brandColor" TEXT NOT NULL DEFAULT 'lime',
    "fontFamily" TEXT NOT NULL DEFAULT 'Consolas, monospace',
    "fontSize" TEXT NOT NULL DEFAULT '10px',
    "fontVolume" TEXT NOT NULL DEFAULT 'fontWeight: normal, fontStyle: italic',
    "userId" INTEGER NOT NULL,
    CONSTRAINT "CustomSets_userId_fkey" FOREIGN KEY ("userId") REFERENCES "Users" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateIndex
CREATE UNIQUE INDEX "CustomSets_userId_key" ON "CustomSets"("userId");
