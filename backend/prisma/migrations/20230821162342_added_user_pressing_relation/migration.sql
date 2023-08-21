-- CreateTable
CREATE TABLE "_PressingToUser" (
    "A" UUID NOT NULL,
    "B" UUID NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_PressingToUser_AB_unique" ON "_PressingToUser"("A", "B");

-- CreateIndex
CREATE INDEX "_PressingToUser_B_index" ON "_PressingToUser"("B");

-- AddForeignKey
ALTER TABLE "_PressingToUser" ADD CONSTRAINT "_PressingToUser_A_fkey" FOREIGN KEY ("A") REFERENCES "Pressing"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_PressingToUser" ADD CONSTRAINT "_PressingToUser_B_fkey" FOREIGN KEY ("B") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
