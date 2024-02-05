import { revalidateTag } from "next/cache";
import { NextRequest, NextResponse } from "next/server";
import prisma from "src/utils/prisma";

export async function POST(request: Request) {
  const res = await request.json();
  const { fileId, score, alternatives, userId } = res ?? {};
  const lesson = await prisma.lesson.findFirst({
    where: { File: { externalId: fileId } },
  });

  console.log(alternatives);

  const duplicatedScore = await prisma.score.findFirst({
    where: { userId: Number(userId), lesson: { File: { externalId: fileId } } },
  });
  console.log(duplicatedScore);

  if (!lesson?.id)
    return NextResponse.json({ msg: "Invalid file_id" }, { status: 400 });

  const data = duplicatedScore?.id
    ? await prisma.score.update({
        where: { id: duplicatedScore.id },
        data: {
          score,
          alternatives,
        },
        include: { User: true, lesson: { include: { File: true } } },
      })
    : await prisma.score.create({
        data: {
          userId: Number(userId),
          lessonId: Number(lesson.id),
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
    revalidateTag(`scores/user/${data.User.externalId}`);
  }
  return NextResponse.json({ data }, { status: 200 });
}
export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const group = searchParams.get("group");
  const subject = searchParams.get("subject");
  const evaluation = searchParams.get("evaluation");
  const user = searchParams.get("user");
  const userQuery = user
    ? {
        userId: Number(user),
      }
    : {};
  const groupQuery = group
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
      ...userQuery,
      ...groupQuery,
      lesson: {
        ...fileQuery,
        ...subjectQuery,
      },
    },
    include: { User: { select: { Group: { select: { id: true } } } } },
  });
  return NextResponse.json({ data: data }, { status: 200 });
}
