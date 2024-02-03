import { auth } from "@clerk/nextjs";
import { revalidateTag } from "next/cache";
import { NextRequest, NextResponse } from "next/server";
import prisma from "src/utils/prisma";
import adminProtect from "../../utils/adminProtect";

export async function POST(request: Request) {
  const resolved = await adminProtect();
  if (!resolved) return NextResponse.json({ data: {} }, { status: 403 });
  const res = await request.json();
  const { name, topicId } = res;
  const data = await prisma.subtopic.create({
    data: { name, topicId: Number(topicId) },
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
