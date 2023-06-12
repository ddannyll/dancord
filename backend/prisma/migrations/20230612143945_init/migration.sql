/*
  Warnings:

  - You are about to drop the `_servers` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "_servers";
PRAGMA foreign_keys=on;

-- CreateTable
CREATE TABLE "_JoinedServers" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL,
    CONSTRAINT "_JoinedServers_A_fkey" FOREIGN KEY ("A") REFERENCES "Server" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "_JoinedServers_B_fkey" FOREIGN KEY ("B") REFERENCES "User" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateIndex
CREATE UNIQUE INDEX "_JoinedServers_AB_unique" ON "_JoinedServers"("A", "B");

-- CreateIndex
CREATE INDEX "_JoinedServers_B_index" ON "_JoinedServers"("B");
