import { currentUser } from "@clerk/nextjs";
import { Role } from "@prisma/client";
import { NextResponse } from "next/server";
import organizationProtect from "src/app/api/utils/organizationProtect";
import routeProtect from "src/app/api/utils/routeProtect";
import prisma from "src/utils/prisma";

export default async function findManyScores({
  subject,
  user,
  organization,
  evaluation,
  group,
}: {
  user?: string | number;
  subject?: string | number;
  organization?: string | number;
  evaluation?: string;
  group?: string | number;
}) {
  const { externalId } = user
    ? (await prisma.user.findUnique({
        where: { id: Number(user) },
        select: { externalId: true },
      })) ?? {}
    : { externalId: "" };
  const userData = await currentUser();
  const role = userData?.publicMetadata?.role;
  if (!userData?.id) return [];
  const resolved =
    (role && role !== Role.STUDENT) || externalId === userData?.id;
  if (!resolved) return [];

  const organizationIdQuery = organization
    ? { organizationId: Number(organization) }
    : {};
  const subjectIdQuery = subject ? { subjectId: Number(subject) } : {};
  const userQuery = user ? { id: Number(user) } : {};
  const groupIdQuery = group ? { groupId: Number(group) } : {};
  const evaluationQuery = evaluation
    ? { File: { externalId: evaluation } }
    : {};

  return await prisma.score.findMany({
    where: {
      User: { ...userQuery, ...organizationIdQuery, ...groupIdQuery },
      lesson: { ...subjectIdQuery, ...evaluationQuery },
    },
    select: {
      lessonId: true,
      userId: true,
      id: true,
      score: true,
      updateAt: true,
      User: { select: { Group: { select: { id: true } } } },
    },
  });
}
