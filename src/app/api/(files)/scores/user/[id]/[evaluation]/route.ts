import { auth, currentUser } from "@clerk/nextjs";
import { NextResponse } from "next/server";
import prisma from "src/utils/prisma";

export async function GET(
  request: Request,
  { params: { id, evaluation } }: { params: { id: string; evaluation: string } }
) {
  const data = await prisma.score.findMany({
    where: {
      lesson: { File: { externalId: evaluation } },
      User: { id: Number(id) },
    },
  });

  console.log(data);

  return NextResponse.json({ data: data.at(-1) }, { status: 200 });
}
