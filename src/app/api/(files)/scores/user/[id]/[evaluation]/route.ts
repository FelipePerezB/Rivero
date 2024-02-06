import { auth, currentUser } from "@clerk/nextjs";
import { Role } from "@prisma/client";
import { NextResponse } from "next/server";
import prisma from "src/utils/prisma";

export async function GET(
  request: Request,
  { params: { id, evaluation } }: { params: { id: string; evaluation: string } }
) {
  const user = await currentUser();
  const { externalId } = id
    ? (await prisma.user.findUnique({
        where: { id: Number(id) },
        select: { externalId: true },
      })) ?? {}
    : { externalId: "" };
  const role = user?.publicMetadata?.role;
  if (!user?.id) NextResponse.json({ data: {} }, { status: 401 });
  const resolved = (role && role !== Role.STUDENT) || externalId === user?.id;
  if (!resolved) NextResponse.json({ data: {} }, { status: 401 });

  const data = await prisma.score.findFirst({
    where: {
      lesson: { File: { externalId: evaluation } },
      User: { id: Number(id) },
    },
  });

  console.log(data);

  return NextResponse.json({ data }, { status: 200 });
}
