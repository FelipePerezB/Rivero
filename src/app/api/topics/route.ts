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
