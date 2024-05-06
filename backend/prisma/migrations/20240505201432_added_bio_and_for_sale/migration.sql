-- AlterTable
ALTER TABLE "PressingsForUser" ADD COLUMN     "isForSale" BOOLEAN NOT NULL DEFAULT false;

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "bio" TEXT;
