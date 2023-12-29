import { Topic } from "@prisma/client";
import { NextResponse } from "next/server";
import prisma from "src/utils/prisma";
import { revalidateTag } from "next/cache";

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  const id = Number(params.id);
  const data = await prisma.topic.findUnique({
    where: { id },
    include: {
      Subject: {
        select: {
          id: true,
          name: true,
          Topics: { select: { id: true, name: true } },
          Lesson: {
            select: {
              type: true,
              File: {
                select: {
                  externalId: true,
                },
              },
            },
          },
        },
      },
      Subtopics: { select: { name: true, id: true } },
    },
  });

  return NextResponse.json({ data }, { status: 200 });
}
export async function PATCH(
  request: Request,
  { params }: { params: { id: string } }
) {
  const res = (await request.json()) as Partial<Topic>;
  const updateData = Object.fromEntries(
    Object.entries(res).map(([key, value]) => [key, { set: value }])
  );

  const id = Number(params.id);
  const data = await prisma.topic.update({
    where: {
      id,
    },
    data: updateData,
  });

  if (data.id) {
    revalidateTag(`topics/${data.id}`);
    revalidateTag(`subjects`);
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
  { params: { id } }: { params: { id: string } }
) {
  const data = await prisma.topic.delete({
    where: { id: Number(id) },
    include: { Subject: { select: { Topics: { select: { id: true } } } } },
  });
  if (data.subjectId) {
    revalidateTag(`subjects/${data.subjectId}`);
  }
  revalidateTag(`topics/${data?.id}`);

  return NextResponse.json(
    { data },
    {
      status: 200,
    }
  );
}