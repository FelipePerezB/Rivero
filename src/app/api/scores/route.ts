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
      userId,
      noteId: note?.id,
      score,
      alternatives,
    },
  });
  return NextResponse.json({ data }, { status: 200 });
}