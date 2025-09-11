-- CreateTable
CREATE TABLE "dishes_cafes" (
    "dishID" INTEGER NOT NULL,
    "cafeID" INTEGER NOT NULL,

    PRIMARY KEY ("dishID", "cafeID"),
    CONSTRAINT "dishes_cafes_dishID_fkey" FOREIGN KEY ("dishID") REFERENCES "dishes_BY" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "dishes_cafes_cafeID_fkey" FOREIGN KEY ("cafeID") REFERENCES "Cafes" ("ID") ON DELETE RESTRICT ON UPDATE CASCADE
);
