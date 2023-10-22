import { NextResponse } from "next/server";
import prisma from "src/app/utils/prisma";

export async function GET(request: Request) {
  const subjects = await prisma.subject.findMany({
    include: {
      Topics: true,
    },
  });

  return NextResponse.json(
    { subjects },
    {
      status: 200,
    }
  );
}
