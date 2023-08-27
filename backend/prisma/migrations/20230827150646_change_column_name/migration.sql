/*
  Warnings:

  - You are about to drop the column `artistSpotifyId` on the `Artist` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[spotifyId]` on the table `Artist` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `spotifyId` to the `Artist` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "Artist_artistSpotifyId_key";

-- AlterTable
ALTER TABLE "Artist" DROP COLUMN "artistSpotifyId",
ADD COLUMN     "spotifyId" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Artist_spotifyId_key" ON "Artist"("spotifyId");
