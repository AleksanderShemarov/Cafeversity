-- CreateTable
CREATE TABLE "people_and_food" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "article_title" TEXT NOT NULL,
    "article_text" TEXT NOT NULL DEFAULT 'This article is the only test. It consists of a title, a text and 3 image files: one is a main, and others are optional.',
    "imagePaths" TEXT NOT NULL DEFAULT '/no_image1.jpg;/no_image1.jpg;/no_image1.jpg'
);
