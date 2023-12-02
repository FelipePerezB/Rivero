import { auth } from "@clerk/nextjs";
import { Topic } from "@prisma/client";
import { revalidateTag } from "next/cache";
import { NextRequest, NextResponse } from "next/server";
import prisma from "src/utils/prisma";

export async function PATCH(
  request: Request,
  { params }: { params: { id: string } }
) {
  const res = (await request.json()) as Partial<Topic>;
  const updateData = Object.fromEntries(
    Object.entries(res).map(([key, value]) => [key, { set: value }])
  );

  const id = Number(params.id);
  const data = await prisma.subtopic.update({
    where: {
      id,
    },
    data: updateData,
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
      Notes: {
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
  const id = Number(params.id);
  console.log(id)
  const data = await prisma.subtopic.delete({
    where: {
      id,
    },
  });

  if (data.topicId) {
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
