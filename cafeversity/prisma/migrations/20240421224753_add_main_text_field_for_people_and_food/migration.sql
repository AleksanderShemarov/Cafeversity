-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_people_and_food" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "article_title" TEXT NOT NULL,
    "article_text" TEXT NOT NULL DEFAULT 'This article is the only test. It consists of a title, a text and 3 image files: one is a main, and others are optional.',
    "imagePaths" TEXT NOT NULL DEFAULT '/no_image1.jpg;/no_image1.jpg;/no_image1.jpg',
    "mainText" TEXT NOT NULL DEFAULT 'This text is temporary! Lorem ipsum, dolor sit amet consectetur adipisicing elit. Nam non enim sint ducimus, dolores molestias reprehenderit? Atque facere autem, ipsa aliquam rerum, voluptatum nemo laudantium quisquam at molestias est sapiente.'
);
INSERT INTO "new_people_and_food" ("article_text", "article_title", "id", "imagePaths") SELECT "article_text", "article_title", "id", "imagePaths" FROM "people_and_food";
DROP TABLE "people_and_food";
ALTER TABLE "new_people_and_food" RENAME TO "people_and_food";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
