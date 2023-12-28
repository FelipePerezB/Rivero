import { NextRequest, NextResponse } from "next/server";
import prisma from "src/utils/prisma";

export async function GET(
  request: NextRequest,
  { params: { id: topicId } }: { params: { [key: string]: string } }
) {
   
  const data = await prisma.subtopic.findMany({
    where: { topicId: Number(topicId) },
    include: {
      Lesson: {
        include: {
          File: {
            select: { name: true, externalId: true, id: true, privacity: true },
          },
        },
      },
    },
  });
  return NextResponse.json({ data }, { status: 200 });
}
