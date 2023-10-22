import { auth } from "@clerk/nextjs";
import { Privacity, Types } from "@prisma/client";
import { revalidateTag } from "next/cache";
import { NextRequest, NextResponse } from "next/server";
import generateRandomId from "src/app/documents/utils/generateRandomId";
import getFile from "src/app/utils/getFile";
import prisma from "src/app/utils/prisma";
import { IdLenght } from "src/models/document.model";

export async function POST(request: Request) {
  const res = await request.json();
  const { userId } = auth();
  if (!userId) throw new Error("Failed to fetch data");
  const { type, File } = res ?? {};
  const topicId = Number(res?.topicId);
  const subjectId = Number(res?.subjectId);
  const subtopicId = Number(res?.subtopicId);

  const newId = generateRandomId(IdLenght.lg);
  const noteType = type ?? Types.DOCUMENT

  const data = await prisma.note.create({
    data: {
      type: noteType,
      subtopicId,
      subjectId,
      topicId,
      File: {
        create: {
          content:
            File?.content ??
            JSON.stringify({
              type: String(noteType).toLowerCase(),
              options: {
                children: [
                  {
                    type: "page",
                    options: {},
                  },
                ],
              },
            }),
          privacity: Privacity.PRIVATE,
          title: File?.title || "Nuevo documento",
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
  const subject = Number(searchParams.get("subject")) as number | undefined;
  const type = searchParams.get("type") as Types | undefined;
  console.log(type)

  const data = await prisma.note.findMany({
    where: { subjectId: subject, type },
    include: { File: true },
  });
  return NextResponse.json({ data }, { status: 200 });
}
