import { auth } from "@clerk/nextjs";
import { revalidateTag } from "next/cache";
import { NextResponse } from "next/server";
import prisma from "src/app/utils/prisma";

export async function POST(
  request: Request,
  { params }: { params: { id: string } }
) {
  const res = await request.json();
  const { userId } = auth();
  if (!userId) throw new Error("Failed to fetch data");
  const id = params.id;
  const { content, privacity, name } = res;

  const data = await prisma.file.upsert({
    where: { externalId: id },
    create: {
      content,
      privacity,
      name,
      externalId: id,
      Author: {
        connect: {
          externalId: userId,
        },
      },
    },
    update: {
      content,
      name,
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

export async function PATCH(
  request: Request,
  { params }: { params: { id: string } }
) {
  const res = (await request.json()) as Partial<File>;
  const updateData = Object.fromEntries(
    Object.entries(res).map(([key, value]) => [key, { set: value }])
  );

  const id = Number(params.id);
  const data = await prisma.file.update({
    where: {
      id,
    },
    data: updateData,
    include: { Note: true },
  });
  if (data?.Note?.subjectId && data?.Note?.type === "EVALUATION") {
    revalidateTag("evaluations/" + data.Note.subjectId);
  }

  return NextResponse.json({ data }, { status: 200 });
}

export async function DELETE(
  request: Request,
  { params }: { params: { id: string } }
) {
  const id = Number(params.id);
  const data = await prisma.file.delete({
    where: {
      id,
    },
  });

  return NextResponse.json(
    { data },
    {
      status: 200,
    }
  );
}
