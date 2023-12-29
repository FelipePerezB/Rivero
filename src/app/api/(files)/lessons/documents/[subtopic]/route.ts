import { NextRequest, NextResponse } from "next/server";
import prisma from "src/utils/prisma";

export async function GET(request: NextRequest, {params: {subtopic}}: {params: {[key: string]: string}}) {
  const data = await prisma.lesson.findMany({
    where: {
      type: "DOCUMENT",
      subtopicId: Number(subtopic),
    },
    include: { File: true },
  });
  return NextResponse.json({ data }, { status: 200 });
}
