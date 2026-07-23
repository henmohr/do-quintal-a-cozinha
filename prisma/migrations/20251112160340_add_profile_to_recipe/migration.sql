/*
  Warnings:

  - Added the required column `profile_id` to the `Recipe` table without a default value. This is not possible if the table is not empty.

  Migration Strategy:
  - Delete all existing recipes and related data (RecipeStep, RecipeMedia)
  - Recipes are mock data and will be re-created via API or seed

*/
-- Delete all RecipeStep entries (depends on Recipe via foreign key)
DELETE FROM RecipeStep;

-- Delete all RecipeMedia entries (junction table)
DELETE FROM RecipeMedia;

-- Delete all Recipe entries
DELETE FROM Recipe;

-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Recipe" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "preparation_time_in_minutes" INTEGER NOT NULL,
    "cooking_time_in_minutes" INTEGER NOT NULL,
    "number_of_servings" INTEGER NOT NULL,
    "difficulty" TEXT NOT NULL,
    "created_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" DATETIME NOT NULL,
    "ingredients" JSONB NOT NULL,
    "profile_id" TEXT NOT NULL,
    CONSTRAINT "Recipe_profile_id_fkey" FOREIGN KEY ("profile_id") REFERENCES "Profile" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new_Recipe" ("cooking_time_in_minutes", "created_at", "description", "difficulty", "id", "ingredients", "number_of_servings", "preparation_time_in_minutes", "title", "updated_at", "profile_id") SELECT "cooking_time_in_minutes", "created_at", "description", "difficulty", "id", "ingredients", "number_of_servings", "preparation_time_in_minutes", "title", "updated_at", "profile_id" FROM "Recipe";
DROP TABLE "Recipe";
ALTER TABLE "new_Recipe" RENAME TO "Recipe";
CREATE TABLE "new_RecipeMedia" (
    "recipeId" TEXT NOT NULL,
    "mediaId" TEXT NOT NULL,

    PRIMARY KEY ("recipeId", "mediaId"),
    CONSTRAINT "RecipeMedia_recipeId_fkey" FOREIGN KEY ("recipeId") REFERENCES "Recipe" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "RecipeMedia_mediaId_fkey" FOREIGN KEY ("mediaId") REFERENCES "Media" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new_RecipeMedia" ("mediaId", "recipeId") SELECT "mediaId", "recipeId" FROM "RecipeMedia";
DROP TABLE "RecipeMedia";
ALTER TABLE "new_RecipeMedia" RENAME TO "RecipeMedia";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
