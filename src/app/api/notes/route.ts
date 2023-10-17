import { auth } from "@clerk/nextjs";
import { Privacity, Types } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";
import generateRandomId from "src/app/documents/utils/generateRandomId";
import prisma from "src/app/utils/prisma";
import { IdLenght } from "src/models/document.model";

export async function POST(request: Request) {
  const res = await request.json();
  const { userId } = auth();
  if (!userId) throw new Error("Failed to fetch data");
  const {
    type,
    File: { content, title },
  } = res;
  const topicId = Number(res?.topicId);
  const subjectId = Number(res?.subjectId);
  const subtopicId = Number(res?.subtopicId);

  const data = await prisma.note.create({
    data: {
      type,
      subtopicId,
      subjectId,
      topicId,
      File: {
        create: {
          content,
          privacity: Privacity.PRIVATE,
          title,
          externalId: generateRandomId(IdLenght.lg),
          Author: {
            connect: {
              externalId: userId,
            },
          },
        },
      },
    },
  });

  return NextResponse.json({ data }, { status: 200 });
}

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const subject = Number(searchParams.get("subject")) as number | undefined;
  const type = searchParams.get("type") as Types | undefined;

  const data = await prisma.note.findMany({
    where: { subjectId: subject, type },
    include: { File: true },
  });
  return NextResponse.json({ data }, { status: 200 });
}
