-- CreateTable
CREATE TABLE "PressingsWantlist" (
    "userId" UUID NOT NULL,
    "pressingId" UUID NOT NULL,
    "addedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "PressingsWantlist_pkey" PRIMARY KEY ("userId","pressingId")
);

-- AddForeignKey
ALTER TABLE "PressingsWantlist" ADD CONSTRAINT "PressingsWantlist_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PressingsWantlist" ADD CONSTRAINT "PressingsWantlist_pressingId_fkey" FOREIGN KEY ("pressingId") REFERENCES "Pressing"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
