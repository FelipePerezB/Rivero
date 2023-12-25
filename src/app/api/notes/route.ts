import { auth } from "@clerk/nextjs";
import { Privacity, Types } from "@prisma/client";
import { revalidateTag } from "next/cache";
import { NextRequest, NextResponse } from "next/server";
import generateRandomId from "src/app/(main)/subjects/utils/generateRandomId";
import getFile from "src/utils/getFile";
import prisma from "src/utils/prisma";
import { IdLenght } from "src/models/document.model";

export async function POST(request: Request) {
  const res = await request.json();
  const { userId } = auth();
  if (!userId) throw new Error("Failed to fetch data");
  const { type, name, content } = res ?? {};
  const topicId = Number(res?.topicId);
  const subjectId = Number(res?.subjectId);
  const subtopicId = Number(res?.subtopicId);

  const newId = generateRandomId(IdLenght.lg);
  const noteType = type ?? Types.DOCUMENT;

  const data = await prisma.note.create({
    data: {
      type: noteType,
      subtopicId,
      subjectId,
      topicId,
      File: {
        create: {
          content:
            content ??
            JSON.stringify({
              type: String(noteType).toLowerCase(),
              id: generateRandomId(IdLenght.sm),
              options: {
                children: [
                  {
                    id: generateRandomId(IdLenght.sm),
                    type: "page",
                    options: {},
                  },
                ],
              },
            }),
          name: name,
          externalId: newId,
          Author: {
            connect: {
              externalId: userId,
            },
          },
        },
      },
    },
  });

  if (data?.type === Types.EVALUATION && data?.subjectId) {
    revalidateTag("evaluations/" + data.subjectId);
  }

  if (data?.subjectId) {
    revalidateTag("subjects/" + data.subjectId);
  }
  if (data?.topicId) {
    revalidateTag("topics/" + data.topicId);
  }
  if (data?.subtopicId) {
    revalidateTag("subtopics/" + data.subtopicId);
  }
  revalidateTag("notes/" + data.topicId);

  return NextResponse.json({ data }, { status: 200 });
}

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const subject = searchParams.get("subject");
  const subtopic = searchParams.get("subtopic");
  const type = searchParams.get("type") as Types | undefined;
  const data = await prisma.note.findMany({
    where: { subjectId: subject ? Number(subject) : undefined , type, subtopicId: Number(subtopic) },
    include: { File: true },
  });
  return NextResponse.json({ data }, { status: 200 });
}
