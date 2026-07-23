/*
  Warnings:

  - You are about to drop the column `category` on the `Story` table. All the data in the column will be lost.
  - Added the required column `storyCategoryId` to the `Story` table without a default value. This is not possible if the table is not empty.

*/
-- CreateTable
CREATE TABLE "StoryCategory" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "title" TEXT NOT NULL
);

-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Story" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "title" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "content" TEXT NOT NULL,
    "storyCategoryId" TEXT NOT NULL,
    "regionId" TEXT NOT NULL,
    CONSTRAINT "Story_storyCategoryId_fkey" FOREIGN KEY ("storyCategoryId") REFERENCES "StoryCategory" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Story_regionId_fkey" FOREIGN KEY ("regionId") REFERENCES "Region" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Story" ("content", "description", "id", "name", "regionId", "title") SELECT "content", "description", "id", "name", "regionId", "title" FROM "Story";
DROP TABLE "Story";
ALTER TABLE "new_Story" RENAME TO "Story";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
