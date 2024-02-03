import { NextRequest, NextResponse } from "next/server";
import prisma from "src/utils/prisma";

export async function GET(
  request: NextRequest,
  { params: { id: subjectId } }: { params: { [key: string]: string } }
) {
  const data = await prisma.topic.findMany({ where: { subjectId: Number(subjectId) } });

  return NextResponse.json({ data }, { status: 200 });
}
