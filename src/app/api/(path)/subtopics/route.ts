import { auth } from "@clerk/nextjs";
import { revalidateTag } from "next/cache";
import { NextRequest, NextResponse } from "next/server";
import prisma from "src/utils/prisma";

export async function POST(request: Request) {
  const res = await request.json();
  console.log(res)
  const { name, topicId } = res;
  const data = await prisma.subtopic.create({
    data: { name, topicId },
  });

  if (data.id) {
    revalidateTag(`topics/${topicId}`);
    revalidateTag(`subtopics/${topicId}`);
  }

  return NextResponse.json({ data }, { status: 200 });
}

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const topic = Number(searchParams.get("topic")) as number | undefined;
  const data = await prisma.subtopic.findMany({
    where: { topicId: topic },
    include: {
      Lesson: {
        include: {
          File: { select: { name: true, externalId: true, id: true } },
        },
      },
    },
  });
  return NextResponse.json({ data }, { status: 200 });
}
