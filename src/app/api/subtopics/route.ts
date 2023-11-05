import { auth } from "@clerk/nextjs";
import { revalidateTag } from "next/cache";
import { NextRequest, NextResponse } from "next/server";
import prisma from "src/app/utils/prisma";
import generateRandomId from "src/utils/generateRandomId";

export async function POST(request: Request) {
  const res = await request.json();
  const { userId } = auth();
  if (!userId) throw new Error("Failed to fetch data");
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
      Notes: {
        include: {
          File: { select: { name: true, externalId: true, id: true } },
        },
      },
    },
  });
  return NextResponse.json({ data }, { status: 200 });
}
