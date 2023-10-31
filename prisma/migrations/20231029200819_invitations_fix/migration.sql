/*
  Warnings:

  - The primary key for the `Invitation` table will be changed. If it partially fails, the table could be left without primary key constraint.

*/
-- DropForeignKey
ALTER TABLE "_GroupToInvitation" DROP CONSTRAINT "_GroupToInvitation_B_fkey";

-- AlterTable
ALTER TABLE "Invitation" DROP CONSTRAINT "Invitation_pkey",
ALTER COLUMN "id" SET DATA TYPE TEXT,
ADD CONSTRAINT "Invitation_pkey" PRIMARY KEY ("id");

-- AlterTable
ALTER TABLE "_GroupToInvitation" ALTER COLUMN "B" SET DATA TYPE TEXT;

-- AddForeignKey
ALTER TABLE "_GroupToInvitation" ADD CONSTRAINT "_GroupToInvitation_B_fkey" FOREIGN KEY ("B") REFERENCES "Invitation"("id") ON DELETE CASCADE ON UPDATE CASCADE;
