-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Orders" (
    "ID" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "orderNumber" INTEGER NOT NULL,
    "userID" INTEGER NOT NULL,
    "cafeID" INTEGER NOT NULL,
    "sentTime" DATETIME NOT NULL,
    "readyStatus" BOOLEAN NOT NULL DEFAULT false,
    "phone" TEXT NOT NULL,
    "comment" TEXT NOT NULL DEFAULT '',
    CONSTRAINT "Orders_userID_fkey" FOREIGN KEY ("userID") REFERENCES "Users" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Orders_cafeID_fkey" FOREIGN KEY ("cafeID") REFERENCES "Cafes" ("ID") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Orders" ("ID", "cafeID", "orderNumber", "phone", "readyStatus", "sentTime", "userID") SELECT "ID", "cafeID", "orderNumber", "phone", "readyStatus", "sentTime", "userID" FROM "Orders";
DROP TABLE "Orders";
ALTER TABLE "new_Orders" RENAME TO "Orders";
CREATE UNIQUE INDEX "Orders_orderNumber_key" ON "Orders"("orderNumber");
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
