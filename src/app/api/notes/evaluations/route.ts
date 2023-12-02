import { Types } from "@prisma/client";
import { revalidateTag } from "next/cache";
import { NextRequest, NextResponse } from "next/server";
import prisma from "src/utils/prisma";

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const subject = Number(searchParams.get("subject")) as number | undefined;

  const data = await prisma.note.findMany({
    where: { subjectId: subject, type: Types.EVALUATION },
    select: {
      id: true,
      File: {
        select: {
          name: true,
          externalId: true,
          id: true,
        },
      },
    },
  });
  return NextResponse.json({ data }, { status: 200 });
}
