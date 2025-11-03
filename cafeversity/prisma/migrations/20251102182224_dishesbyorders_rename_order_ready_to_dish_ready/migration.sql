/*
  Warnings:

  - You are about to drop the column `orderReady` on the `dishes_orders` table. All the data in the column will be lost.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_dishes_orders" (
    "dishID" INTEGER NOT NULL,
    "orderID" INTEGER NOT NULL,
    "dishReady" BOOLEAN NOT NULL DEFAULT false,

    PRIMARY KEY ("dishID", "orderID"),
    CONSTRAINT "dishes_orders_dishID_fkey" FOREIGN KEY ("dishID") REFERENCES "dishes_BY" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "dishes_orders_orderID_fkey" FOREIGN KEY ("orderID") REFERENCES "Orders" ("ID") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_dishes_orders" ("dishID", "orderID") SELECT "dishID", "orderID" FROM "dishes_orders";
DROP TABLE "dishes_orders";
ALTER TABLE "new_dishes_orders" RENAME TO "dishes_orders";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
