-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_people_and_food" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "article_title" TEXT NOT NULL DEFAULT 'Плануем...',
    "article_text" TEXT NOT NULL DEFAULT 'У хуткім часе будуць даданыя новыя асобы. Мы працуем над гэтым.',
    "article_image_path" TEXT NOT NULL DEFAULT '/Gordon_Ramsay_cooking.jpg',
    "mainImagePath" TEXT NOT NULL DEFAULT '/no_image1.jpg',
    "mainTitle" TEXT NOT NULL DEFAULT 'Загаловак артыкула',
    "shortTitle" TEXT NOT NULL DEFAULT 'Кароткі запіс',
    "personalImagePath" TEXT DEFAULT '/no_image1.jpg',
    "personalName" TEXT DEFAULT 'John',
    "personalSurname" TEXT DEFAULT 'Doe',
    "birthDay" TEXT DEFAULT 'May 18th 1995',
    "birthTown" TEXT DEFAULT 'New York',
    "birthCountry" TEXT DEFAULT 'United States',
    "birthdayDate" TEXT DEFAULT '18.05.1995',
    "personalStatus" TEXT DEFAULT 'World Wild Web Personal Example, Real Person (possibly)',
    "imagePaths" TEXT NOT NULL DEFAULT '/no_image1.jpg;/no_image1.jpg;/no_image1.jpg',
    "mainText" TEXT NOT NULL DEFAULT 'This text is temporary! Lorem ipsum, dolor sit amet consectetur adipisicing elit. Nam non enim sint ducimus, dolores molestias reprehenderit? Atque facere autem, ipsa aliquam rerum, voluptatum nemo laudantium quisquam at molestias est sapiente.',
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);
INSERT INTO "new_people_and_food" ("article_text", "article_title", "id", "imagePaths", "mainText") SELECT "article_text", "article_title", "id", "imagePaths", "mainText" FROM "people_and_food";
DROP TABLE "people_and_food";
ALTER TABLE "new_people_and_food" RENAME TO "people_and_food";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
