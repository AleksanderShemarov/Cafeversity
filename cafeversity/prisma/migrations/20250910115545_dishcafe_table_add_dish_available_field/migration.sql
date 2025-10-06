-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_dishes_cafes" (
    "dishID" INTEGER NOT NULL,
    "cafeID" INTEGER NOT NULL,
    "dishAvailable" BOOLEAN NOT NULL DEFAULT true,

    PRIMARY KEY ("dishID", "cafeID"),
    CONSTRAINT "dishes_cafes_dishID_fkey" FOREIGN KEY ("dishID") REFERENCES "dishes_BY" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "dishes_cafes_cafeID_fkey" FOREIGN KEY ("cafeID") REFERENCES "Cafes" ("ID") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_dishes_cafes" ("cafeID", "dishID") SELECT "cafeID", "dishID" FROM "dishes_cafes";
DROP TABLE "dishes_cafes";
ALTER TABLE "new_dishes_cafes" RENAME TO "dishes_cafes";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
