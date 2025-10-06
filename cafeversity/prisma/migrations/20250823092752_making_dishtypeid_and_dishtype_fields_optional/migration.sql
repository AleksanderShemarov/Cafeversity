-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_dishes_BY" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "food_name" TEXT NOT NULL,
    "includes" TEXT NOT NULL,
    "spicy" BOOLEAN NOT NULL,
    "vegetarian" BOOLEAN NOT NULL,
    "vegan" BOOLEAN NOT NULL,
    "protein" DECIMAL DEFAULT 0.00,
    "fats" DECIMAL DEFAULT 0.00,
    "carbohydrates" DECIMAL DEFAULT 0.00,
    "amino_acids" TEXT DEFAULT 'Гістыдын, Ізалейцын, Лейцын',
    "food_portion" DECIMAL DEFAULT 0.00,
    "cost" DECIMAL DEFAULT 0.00,
    "imagePath" TEXT NOT NULL,
    "dishTypeId" INTEGER,
    CONSTRAINT "dishes_BY_dishTypeId_fkey" FOREIGN KEY ("dishTypeId") REFERENCES "DishTypes" ("ID") ON DELETE SET NULL ON UPDATE CASCADE
);
INSERT INTO "new_dishes_BY" ("amino_acids", "carbohydrates", "cost", "dishTypeId", "fats", "food_name", "food_portion", "id", "imagePath", "includes", "protein", "spicy", "vegan", "vegetarian") SELECT "amino_acids", "carbohydrates", "cost", "dishTypeId", "fats", "food_name", "food_portion", "id", "imagePath", "includes", "protein", "spicy", "vegan", "vegetarian" FROM "dishes_BY";
DROP TABLE "dishes_BY";
ALTER TABLE "new_dishes_BY" RENAME TO "dishes_BY";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
