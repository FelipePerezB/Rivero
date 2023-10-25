/*
  Warnings:

  - You are about to drop the column `title` on the `File` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "File" DROP CONSTRAINT "File_noteId_fkey";

-- AlterTable
ALTER TABLE "File" DROP COLUMN "title",
ADD COLUMN     "name" TEXT NOT NULL DEFAULT 'Nuevo documento',
ALTER COLUMN "privacity" SET DEFAULT 'PRIVATE';

-- AlterTable
ALTER TABLE "Note" ALTER COLUMN "type" SET DEFAULT 'DOCUMENT';

-- AlterTable
ALTER TABLE "User" ALTER COLUMN "role" SET DEFAULT 'STUDENT';

-- AddForeignKey
ALTER TABLE "File" ADD CONSTRAINT "File_noteId_fkey" FOREIGN KEY ("noteId") REFERENCES "Note"("id") ON DELETE CASCADE ON UPDATE CASCADE;
