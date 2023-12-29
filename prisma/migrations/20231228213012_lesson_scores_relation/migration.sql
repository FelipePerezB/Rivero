/*
  Warnings:

  - Added the required column `lessonId` to the `Score` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Score" ADD COLUMN     "lessonId" INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE "Score" ADD CONSTRAINT "Score_lessonId_fkey" FOREIGN KEY ("lessonId") REFERENCES "Lesson"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
