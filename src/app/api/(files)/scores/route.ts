import { revalidateTag } from "next/cache";
import { NextRequest, NextResponse } from "next/server";
import prisma from "src/utils/prisma";

export async function POST(request: Request) {
  const res = await request.json();
  const { fileId, score, alternatives, userId } = res ?? {};

  const lesson = await prisma.lesson.findFirst({
    where: {
      File: { externalId: fileId },
    },
    include: { File: true, Score: true },
  });

  if (!lesson?.id)
    return NextResponse.json({ msg: "Invalid file_id" }, { status: 400 });

  const duplicatedId = lesson?.Score?.find(
    ({ userId: scoreUser }) => scoreUser === userId
  )?.id;

  const data = duplicatedId
    ? await prisma.score.update({
        where: { id: duplicatedId },
        data: {
          score,
          alternatives,
        },
        include: { User: true, lesson: { include: { File: true } } },
      })
    : await prisma.score.create({
        data: {
          userId: userId,
          lessonId: lesson.id,
          score,
          alternatives,
        },
        include: { User: true, lesson: { include: { File: true } } },
      });
  if (data?.id) {
    revalidateTag(`scores/organizations/${data.User.organizationId}`);
    revalidateTag(
      `scores/evaluation/${data.lesson.File.externalId}/organizations/${data.User.organizationId}`
    );
    revalidateTag(
      `scores/subject/${data.lesson.subjectId}/organizations/${data.User.organizationId}`
    );
    revalidateTag(
      `scores/subject/${data.lesson.subjectId}/groups/${data.User.groupId}`
    );
    revalidateTag(`scores/groups/${data.User.groupId}`);
    // revalidateTag(`scores/user/${data.User.externalId}`);
  }
  return NextResponse.json({ data }, { status: 200 });
}
export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const group = searchParams.get("group");
  const subject = searchParams.get("subject");
  const evaluation = searchParams.get("evaluation");
  const userQuery = group
    ? {
        User: { groupId: Number(group) },
      }
    : {};
  const fileQuery = evaluation
    ? { File: { externalId: { equals: String(evaluation) } } }
    : {};
  const subjectQuery = subject ? { subjectId: Number(subject) } : {};
  const scores = await prisma.score.findMany({
    where: {
      lesson: {
        ...fileQuery,
        ...subjectQuery,
      },
      ...userQuery,
    },
    include: { User: { select: { Group: { select: { id: true } } } } },
  });
  const scoresByGroup = [] as {
    groupId: number;
    scores: { value: number; time: string }[];
  }[];
  scores.forEach(({ score, updateAt, User: { Group } }) => {
    const time = updateAt?.toISOString().substring(0, 10) as string;
    const newScore = {
      value: score,
      time,
    };
    // Group?.forEach(({ id }) => {
    //   const group = scoresByGroup?.find(({ groupId }) => groupId === id);
    //   if (!group) {
    //     scoresByGroup.push({
    //       groupId: id,
    //       scores: [newScore],
    //     });
    //     return;
    //   }
    //   group?.scores.push(newScore);
    // });
  });

  const data = {};
  scoresByGroup.forEach(({ groupId, scores }) => {
    const newScores = [] as { value: number; time: string }[];
    scores.forEach((score) => {
      const duplicatedScores = scores.filter(
        ({ time: timeFilter }) => timeFilter === score.time
      );
      if (duplicatedScores.length === 1) {
        newScores.push({ time: score.time, value: score.value });
        return;
      }
      const isInNewScores =
        newScores.findIndex(({ time }) => time === score.time) !== -1;
      if (!isInNewScores) {
        newScores.push({
          value:
            duplicatedScores.map(({ value }) => value).reduce((a, b) => a + b) /
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
