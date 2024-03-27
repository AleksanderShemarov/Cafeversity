-- CreateTable
CREATE TABLE "dishes_BY" (
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
    "imagePath" TEXT NOT NULL
);

