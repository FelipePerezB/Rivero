import { currentUser } from "@clerk/nextjs";
import { Role } from "@prisma/client";
import { NextResponse } from "next/server";
import organizationProtect from "src/app/api/utils/organizationProtect";
import routeProtect from "src/app/api/utils/routeProtect";
import prisma from "src/utils/prisma";

export default async function findManyScores({
  subject,
  organization,
  evaluation,
  group,
}: {
  subject?: string | number;
  organization?: string | number;
  evaluation?: string;
  group?: string | number;
}) {
  const resolved = await organizationProtect({ organization });
  if (!resolved) return [];

  const organizationIdQuery = organization
    ? { organizationId: Number(organization) }
    : {};
  const subjectIdQuery = subject ? { subjectId: Number(subject) } : {};
  const groupIdQuery = group ? { groupId: Number(group) } : {};
  const evaluationQuery = evaluation
    ? { File: { externalId: evaluation } }
    : {};

  return await prisma.score.findMany({
    where: {
      User: { ...organizationIdQuery, ...groupIdQuery },
      lesson: { ...subjectIdQuery, ...evaluationQuery },
    },
    select: {
      userId: true,
      id: true,
      score: true,
      updateAt: true,
      User: { select: { Group: { select: { id: true } } } },
    },
  });
}
