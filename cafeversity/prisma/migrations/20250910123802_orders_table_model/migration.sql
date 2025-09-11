-- CreateTable
CREATE TABLE "Orders" (
    "ID" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "orderNumber" INTEGER NOT NULL,
    "userID" INTEGER NOT NULL,
    "cafeID" INTEGER NOT NULL,
    "sentTime" DATETIME NOT NULL,
    "readyStatus" BOOLEAN NOT NULL DEFAULT false,
    "phone" TEXT NOT NULL,
    CONSTRAINT "Orders_userID_fkey" FOREIGN KEY ("userID") REFERENCES "Users" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Orders_cafeID_fkey" FOREIGN KEY ("cafeID") REFERENCES "Cafes" ("ID") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateIndex
CREATE UNIQUE INDEX "Orders_orderNumber_key" ON "Orders"("orderNumber");
