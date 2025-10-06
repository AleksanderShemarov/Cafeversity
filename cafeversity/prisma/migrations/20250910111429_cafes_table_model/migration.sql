-- CreateTable
CREATE TABLE "Cafes" (
    "ID" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "cafeName" TEXT NOT NULL,
    "openHours" TEXT NOT NULL,
    "city" TEXT NOT NULL,
    "street" TEXT NOT NULL,
    "country" TEXT NOT NULL,
    "phone" TEXT NOT NULL,
    "latitude" DECIMAL,
    "longitude" DECIMAL,
    "SRId" INTEGER NOT NULL DEFAULT 4326
);

-- CreateIndex
CREATE UNIQUE INDEX "Cafes_cafeName_key" ON "Cafes"("cafeName");
