import { Types } from "@prisma/client";
import { revalidateTag } from "next/cache";
import { NextRequest, NextResponse } from "next/server";
import prisma from "src/utils/prisma";

export async function GET(
  request: NextRequest,
  { params: { subject } }: { params: { subject: string } }
) {
  console.log(subject)

  const data = await prisma.lesson.findMany({
    where: { subjectId: Number(subject), type: Types.EVALUATION },
    select: {
      id: true,
      File: {
        select: {
          name: true,
          externalId: true,
          id: true,
          privacity: true
        },
      },
    },
  });

  console.log(data)
  return NextResponse.json({ data }, { status: 200 });
}
