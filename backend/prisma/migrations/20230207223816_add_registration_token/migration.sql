/*
  Warnings:

  - You are about to drop the column `emailConfirmed` on the `User` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[registrationToken]` on the table `User` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "User" DROP COLUMN "emailConfirmed",
ADD COLUMN     "registrationToken" TEXT;

-- CreateIndex
CREATE UNIQUE INDEX "User_registrationToken_key" ON "User"("registrationToken");
