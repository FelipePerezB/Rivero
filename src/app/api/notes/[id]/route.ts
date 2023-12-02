import { auth } from "@clerk/nextjs";
import { Note } from "@prisma/client";
import { revalidateTag } from "next/cache";
import { NextResponse } from "next/server";
import prisma from "src/utils/prisma";

export async function GET(
  request: Request,
  { params: { id } }: { params: { id: string } }
) {
  const data = await prisma.note.findMany({
    where: {
      File: {
        externalId: id,
      },
    },
    include: { File: true },
  });
  return NextResponse.json({ data }, { status: 200 });
}

export async function PATCH(
  request: Request,
  { params }: { params: { id: string } }
) {
  const { userId } = auth();
  const res = (await request.json()) as Partial<Note>;
  const updateData = Object.fromEntries(
    Object.entries(res).map(([key, value]) => [key, { set: value }])
  );

  const id = Number(params.id);
  const data = await prisma.note.update({
    where: {
      id,
    },
    data: updateData,
  });


  if (data.subtopicId) {
    revalidateTag(`subtopics/${data.subtopicId}`);
  }

  return NextResponse.json(
    { data },
    {
      status: 200,
    }
  );
}

export async function DELETE(
  request: Request,
  { params }: { params: { id: string } }
) {
  const id = Number(params.id);
  const data = await prisma.note.delete({
    where: {
      id,
    },
  });

  if (data.subtopicId) {
    revalidateTag(`subtopics/` + data.subtopicId);
  }

  return NextResponse.json(
    { data },
    {
      status: 200,
    }
  );
}
