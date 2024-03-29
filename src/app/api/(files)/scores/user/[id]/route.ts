import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";
import prisma from "src/utils/prisma";

export async function GET(
  request: Request,
  { params: { id } }: { params: { id: string } }
) {
  const { userId } = auth();
  if (userId !== id) NextResponse.json({ data: [] }, { status: 200 });
  const data = await prisma.score.findMany({
    orderBy: {
      createdAt: "asc",
    },
    where: {
      User: { externalId: id },
    },
    include: { lesson: { select: { File: { select: { externalId: true } } } } },
  });

  return NextResponse.json({ data }, { status: 200 });
}
