-- CreateTable
CREATE TABLE "MealTypes" (
    "ID" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "Name" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "dishes_meals" (
    "dishID" INTEGER NOT NULL,
    "mealID" INTEGER NOT NULL,

    PRIMARY KEY ("dishID", "mealID"),
    CONSTRAINT "dishes_meals_dishID_fkey" FOREIGN KEY ("dishID") REFERENCES "dishes_BY" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "dishes_meals_mealID_fkey" FOREIGN KEY ("mealID") REFERENCES "MealTypes" ("ID") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "DishTypes" (
    "ID" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "Name" TEXT NOT NULL
);

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
    "dishTypeId" INTEGER NOT NULL DEFAULT 0,
    CONSTRAINT "dishes_BY_dishTypeId_fkey" FOREIGN KEY ("dishTypeId") REFERENCES "DishTypes" ("ID") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_dishes_BY" ("amino_acids", "carbohydrates", "cost", "fats", "food_name", "food_portion", "id", "imagePath", "includes", "protein", "spicy", "vegan", "vegetarian") SELECT "amino_acids", "carbohydrates", "cost", "fats", "food_name", "food_portion", "id", "imagePath", "includes", "protein", "spicy", "vegan", "vegetarian" FROM "dishes_BY";
DROP TABLE "dishes_BY";
ALTER TABLE "new_dishes_BY" RENAME TO "dishes_BY";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;

-- CreateIndex
CREATE UNIQUE INDEX "MealTypes_Name_key" ON "MealTypes"("Name");

-- CreateIndex
CREATE UNIQUE INDEX "DishTypes_Name_key" ON "DishTypes"("Name");
