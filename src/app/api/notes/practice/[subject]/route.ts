import { auth } from "@clerk/nextjs";
import { Privacity, Types } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";
import generateRandomId from "src/app/subjects/utils/generateRandomId";
import prisma from "src/app/utils/prisma";

export async function GET(
  request: NextRequest,
  { params: { subject } }: { params: { subject: string } }
) {
  const data = await prisma.note.findFirst({
    where: {
      type: {
        equals: Types.PRACTICE,
      },
      subjectId: Number(subject),
    },
    include: {
      File: true,
    },
  });
  return NextResponse.json({ data }, { status: 200 });
}
