-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Fragrance" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "slug" TEXT NOT NULL DEFAULT 'ok',
    "image" TEXT,
    "brandId" TEXT NOT NULL,
    "categoryId" TEXT NOT NULL,
    "description" TEXT,
    "price" REAL NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    CONSTRAINT "Fragrance_brandId_fkey" FOREIGN KEY ("brandId") REFERENCES "Brand" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Fragrance_categoryId_fkey" FOREIGN KEY ("categoryId") REFERENCES "Category" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Fragrance" ("brandId", "categoryId", "createdAt", "description", "id", "image", "name", "price", "updatedAt") SELECT "brandId", "categoryId", "createdAt", "description", "id", "image", "name", "price", "updatedAt" FROM "Fragrance";
DROP TABLE "Fragrance";
ALTER TABLE "new_Fragrance" RENAME TO "Fragrance";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
