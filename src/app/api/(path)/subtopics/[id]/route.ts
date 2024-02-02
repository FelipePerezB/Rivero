import { Topic } from "@prisma/client";
import { revalidateTag } from "next/cache";
import { NextRequest, NextResponse } from "next/server";
import adminProtect from "src/app/api/utils/adminProtect";
import prisma from "src/utils/prisma";

export async function PATCH(
  request: Request,
  { params }: { params: { id: string } }
) {
  const resolved = await adminProtect();
  if (!resolved) return NextResponse.json({ data: {} }, { status: 403 });
  const res = (await request.json()) as Partial<Topic>;
  const updateData = Object.fromEntries(
    Object.entries(res).map(([key, value]) => [key, { set: value }])
  );

  const id = Number(params.id);
  const data = await prisma.subtopic.update({
    where: {
      id,
    },
    data: { ...updateData },
  });

  if (data.id) {
    revalidateTag(`topics/${data.topicId}`);
    revalidateTag(`subtopics/${data.id}`);
  }

  return NextResponse.json(
    { data },
    {
      status: 200,
    }
  );
}

export async function GET(
  request: NextRequest,
  { params: { id } }: { params: { [key: string]: string } }
) {
  const data = await prisma.subtopic.findUnique({
    where: { id: Number(id) },
    include: {
      Lesson: {
        include: {
          File: { select: { name: true, externalId: true, id: true } },
        },
      },
    },
  });
  return NextResponse.json({ data }, { status: 200 });
}

export async function DELETE(
  request: Request,
  { params }: { params: { id: string } }
) {
  const resolved = await adminProtect();
  if (!resolved) return NextResponse.json({ data: {} }, { status: 403 });
  const id = Number(params.id);
  const data = await prisma.subtopic.delete({
    where: {
      id,
    },
  });

  if (data.topicId) {
    revalidateTag(`topics/${data.topicId}`);
    revalidateTag(`subtopics/${data.id}`);
  }

  return NextResponse.json({ data }, { status: 200 });
}
