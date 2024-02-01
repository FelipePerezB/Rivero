import { currentUser } from "@clerk/nextjs";
import { Role } from "@prisma/client";
import { NextResponse } from "next/server";
import prisma from "src/utils/prisma";

export default async function findManyScores({
  subject,
  organization,
  group,
}: {
  subject?: string | number;
  organization?: string | number;
  group?: string | number;
}) {
  const organizationIdQuery = organization
    ? { organizationId: Number(organization) }
    : {};
  const subjectIdQuery = subject ? { subjectId: Number(subject) } : {};
  const groupIdQuery = group ? { groupId: Number(group) } : {};
  return await prisma.score.findMany({
    where: {
      User: { ...organizationIdQuery, ...groupIdQuery },
      lesson: { ...subjectIdQuery },
    },
    select: {
      id: true,
      score: true,
      updateAt: true,
      User: { select: { Group: { select: { id: true } } } },
    },
  });
}
