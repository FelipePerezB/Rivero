/*
  Warnings:

  - You are about to drop the `_GroupToUser` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `msg` to the `Invitation` table without a default value. This is not possible if the table is not empty.
  - Added the required column `groupId` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "Messages" AS ENUM ('DUPLICATED', 'INVALID');

-- DropForeignKey
ALTER TABLE "_GroupToUser" DROP CONSTRAINT "_GroupToUser_A_fkey";

-- DropForeignKey
ALTER TABLE "_GroupToUser" DROP CONSTRAINT "_GroupToUser_B_fkey";

-- AlterTable
ALTER TABLE "Invitation" ADD COLUMN     "msg" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "groupId" INTEGER NOT NULL;

-- DropTable
DROP TABLE "_GroupToUser";

-- AddForeignKey
ALTER TABLE "User" ADD CONSTRAINT "User_groupId_fkey" FOREIGN KEY ("groupId") REFERENCES "Group"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
