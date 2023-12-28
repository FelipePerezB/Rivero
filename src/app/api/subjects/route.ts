import { auth } from "@clerk/nextjs";
import { revalidateTag } from "next/cache";
import { NextResponse } from "next/server";
import prisma from "src/utils/prisma";

export async function GET(request: Request) {
  const subjects = await prisma.subject.findMany({
    include: {
      _count: { select: { Lesson: true } },
      Topics: true,
    },
  });

  return NextResponse.json({ subjects }, { status: 200 });
}

export async function POST(request: Request) {
  const res = await request.json();
  const { userId } = auth();
  if (!userId) throw new Error("Failed to fetch data");
  const { name } = res;

  const data = await prisma.subject.create({
    data: { name, color: "fffff" },
  });

  revalidateTag("subjects");

  return NextResponse.json({ data }, { status: 200 });
}
