/*
  Warnings:

  - A unique constraint covering the columns `[slug]` on the table `Fragrance` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Fragrance_slug_key" ON "Fragrance"("slug");
