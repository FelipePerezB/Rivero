import { currentUser } from "@clerk/nextjs";
import { revalidateTag } from "next/cache";
import { NextRequest, NextResponse } from "next/server";
import generateRandomId from "src/app/(main)/subjects/utils/generateRandomId";
import prisma from "src/utils/prisma";
import { IdLenght } from "src/models/document.model";

export async function POST(request: Request) {
  const res = await request.json();
  const user = await currentUser();
  const userId = user?.id ?? res?.userId;
  if (!userId) throw new Error("Failed to fetch data");
  const { name, content, type } = res ?? {};
  const topicId = Number(res?.topicId);
  const subjectId = Number(res?.subjectId);
  const subtopicId = Number(res?.subtopicId);
  const newId = generateRandomId(IdLenght.lg);

  const newFile = await prisma.file.create({
    data: {
      content: content ?? "",
      name,
      externalId: newId,
      Author: {
        connect: {
          externalId: userId,
        },
      },
    },
  });

  if (!newFile)
    NextResponse.json({ msg: "Error creating the file" }, { status: 500 });

  const data = await prisma.lesson.create({
    data: {
      type,
      fileId: newFile?.id,
      subtopicId,
      subjectId,
      topicId,
    },
  });

  if (data?.subjectId) {
    revalidateTag("subjects/" + data.subjectId);
  }
  if (data?.topicId) {
    revalidateTag("topics/" + data.topicId);
  }
  revalidateTag("lessons/" + data.topicId);

  return NextResponse.json({ data }, { status: 200 });
}

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const subject = searchParams.get("subject");
  const subtopic = searchParams.get("subtopic");
  const data = await prisma.lesson.findMany({
    where: {
      subjectId: subject ? Number(subject) : undefined,
      subtopicId: Number(subtopic),
    },
    include: { File: true },
  });
  return NextResponse.json({ data }, { status: 200 });
}
