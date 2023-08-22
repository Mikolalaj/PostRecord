-- AlterTable
ALTER TABLE "User" ADD COLUMN     "albumId" UUID;

-- AddForeignKey
ALTER TABLE "User" ADD CONSTRAINT "User_albumId_fkey" FOREIGN KEY ("albumId") REFERENCES "Album"("id") ON DELETE SET NULL ON UPDATE CASCADE;
