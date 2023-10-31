-- CreateEnum
CREATE TYPE "Status" AS ENUM ('PENDING', 'REVOKED', 'ACCEPTED');

-- CreateTable
CREATE TABLE "Invitation" (
    "id" INTEGER NOT NULL,
    "email" TEXT NOT NULL,
    "role" "Role" NOT NULL DEFAULT 'STUDENT',
    "organizationId" INTEGER NOT NULL,
    "status" "Status" NOT NULL DEFAULT 'PENDING',

    CONSTRAINT "Invitation_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_GroupToInvitation" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_GroupToInvitation_AB_unique" ON "_GroupToInvitation"("A", "B");

-- CreateIndex
CREATE INDEX "_GroupToInvitation_B_index" ON "_GroupToInvitation"("B");

-- AddForeignKey
ALTER TABLE "Invitation" ADD CONSTRAINT "Invitation_organizationId_fkey" FOREIGN KEY ("organizationId") REFERENCES "Organization"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_GroupToInvitation" ADD CONSTRAINT "_GroupToInvitation_A_fkey" FOREIGN KEY ("A") REFERENCES "Group"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_GroupToInvitation" ADD CONSTRAINT "_GroupToInvitation_B_fkey" FOREIGN KEY ("B") REFERENCES "Invitation"("id") ON DELETE CASCADE ON UPDATE CASCADE;
