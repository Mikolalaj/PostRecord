/*
  Warnings:

  - You are about to drop the column `trackNumber` on the `Track` table. All the data in the column will be lost.
  - Added the required column `number` to the `Track` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Track" DROP COLUMN "trackNumber",
ADD COLUMN     "number" INTEGER NOT NULL;
