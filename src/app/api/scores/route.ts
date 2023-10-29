import { auth, currentUser } from "@clerk/nextjs";
import { Role } from "@prisma/client";
import { revalidateTag } from "next/cache";
import { NextRequest, NextResponse } from "next/server";
import prisma from "src/app/utils/prisma";

export async function POST(request: Request) {
  const res = await request.json();
  const { userId, fileId, score, alternatives } = res ?? {};
  const note = await prisma.note.findFirst({
    where: {
      File: { externalId: fileId },
    },
    include: { File: true },
  });

  const data = await prisma.score.create({
    data: {
      userId: Number(userId),
      noteId: note?.id,
      score,
      alternatives,
    },
    include: {User: true}
  });
  if(data.id) revalidateTag(`scores/organizations/${data.User.organizationId}`)
  return NextResponse.json({ data }, { status: 200 });
}
export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const group = searchParams.get("group");
  const user = await currentUser();
  const metadata = user?.publicMetadata;
  const scores = await prisma.group.findMany({
    orderBy: { createdAt: "asc" },
    where: {
      id: group ? Number(group) : undefined,
    },
    include: {
      Users: {
        include: {
          Score: true,
        },
      },
    },
  });

  const unFormatedData = scores.map(({ id, Users }) => ({
    groupId: String(id),
    scores: Users.flatMap(({ Score }) =>
      Score.map(({ score, createdAt }) => ({
        score,
        time: createdAt?.toISOString().substring(0, 10) as string,
      }))
    ),
  }));
  const data = {};
  unFormatedData.forEach(({ groupId, scores }) => {
    const newScores = [] as { value: number; time: string }[];
    scores.forEach((score) => {
      const duplicatedScores = scores.filter(
        ({ time: timeFilter }) => timeFilter === score.time
      );
      if (duplicatedScores.length === 1) {
        newScores.push({ time: score.time, value: score.score });
        return;
      }
      const isInNewScores =
        newScores.findIndex(({ time }) => time === score.time) !== -1;
      if (!isInNewScores) {
        newScores.push({
          value:
            duplicatedScores.map(({ score }) => score).reduce((a, b) => a + b) /
            duplicatedScores.length,
          time: score.time,
        });
      }
    });
    newScores.sort(
      (a, b) => new Date(a.time).getTime() - new Date(b.time).getTime()
    );
    Object.assign(data, { [groupId]: newScores });
  });
  return NextResponse.json({ data: data }, { status: 200 });
}
