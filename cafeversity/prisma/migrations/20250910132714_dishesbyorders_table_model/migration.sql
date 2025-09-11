-- CreateTable
CREATE TABLE "dishes_orders" (
    "dishID" INTEGER NOT NULL,
    "orderID" INTEGER NOT NULL,

    PRIMARY KEY ("dishID", "orderID"),
    CONSTRAINT "dishes_orders_dishID_fkey" FOREIGN KEY ("dishID") REFERENCES "dishes_BY" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "dishes_orders_orderID_fkey" FOREIGN KEY ("orderID") REFERENCES "Orders" ("ID") ON DELETE RESTRICT ON UPDATE CASCADE
);
