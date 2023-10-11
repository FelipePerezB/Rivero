import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";
import prisma from "src/app/utils/prisma";

export async function POST(
  request: Request,
  { params }: { params: { id: string } }
) {
  const res = await request.json();
  const { userId } = auth();
  console.log(res);
  if (!userId) throw new Error("Failed to fetch data");
  const id = params.id;
  const { content, privacity, title } = res;

  const data = await prisma.file.upsert({
    where: { externalId: id },
    create: {
      content,
      privacity,
      title,
      externalId: id,
      Author: {
        connect: {
          externalId: userId,
        },
      },
    },
    update: {
      content,
      title,
      privacity,
    },
  });

  return NextResponse.json({ data }, { status: 200 });
}

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  const id = params.id;
  const data = await prisma.file.findUnique({
    where: { externalId: id },
  });

  return NextResponse.json(
    { data },
    {
      status: 200,
    }
  );
}
