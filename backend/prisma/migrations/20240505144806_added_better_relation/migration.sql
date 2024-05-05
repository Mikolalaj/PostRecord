/*
  Warnings:

  - You are about to drop the `_PressingToUser` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "_PressingToUser" DROP CONSTRAINT "_PressingToUser_A_fkey";

-- DropForeignKey
ALTER TABLE "_PressingToUser" DROP CONSTRAINT "_PressingToUser_B_fkey";

-- DropTable
DROP TABLE "_PressingToUser";

-- CreateTable
CREATE TABLE "PressingsForUser" (
    "userId" UUID NOT NULL,
    "pressingId" UUID NOT NULL,
    "addedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "PressingsForUser_pkey" PRIMARY KEY ("userId","pressingId")
);

-- AddForeignKey
ALTER TABLE "PressingsForUser" ADD CONSTRAINT "PressingsForUser_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PressingsForUser" ADD CONSTRAINT "PressingsForUser_pressingId_fkey" FOREIGN KEY ("pressingId") REFERENCES "Pressing"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
