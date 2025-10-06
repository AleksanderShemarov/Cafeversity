-- CreateTable
CREATE TABLE "users_dishes" (
    "userID" INTEGER NOT NULL,
    "dishID" INTEGER NOT NULL,

    PRIMARY KEY ("userID", "dishID"),
    CONSTRAINT "users_dishes_userID_fkey" FOREIGN KEY ("userID") REFERENCES "Users" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "users_dishes_dishID_fkey" FOREIGN KEY ("dishID") REFERENCES "dishes_BY" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
