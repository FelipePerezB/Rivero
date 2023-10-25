import { auth } from "@clerk/nextjs";
import { revalidateTag } from "next/cache";
import { NextResponse } from "next/server";
import prisma from "src/app/utils/prisma";

export async function GET(request: Request) {
  const data = await prisma.topic.findMany({});

  return NextResponse.json(
    { data },
    {
      status: 200,
    }
  );
}

export async function POST(request: Request) {
  const res = await request.json();
  const { userId } = auth();
  if (!userId) throw new Error("Failed to fetch data");
  const { name, subjectId } = res;
  const data = await prisma.topic.create({
    data: { name, subjectId },
  });

  if (data.id) {
    revalidateTag(`topics/${data.id}`);
  }

  return NextResponse.json({ data }, { status: 200 });
}