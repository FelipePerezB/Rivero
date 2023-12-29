import { auth } from "@clerk/nextjs";
import { revalidateTag } from "next/cache";
import { NextResponse } from "next/server";
import prisma from "src/utils/prisma";

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
    include: { Lesson: true },
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
  if (data.externalId) revalidateTag(`files/${id}`);
  const subtopicId = data?.Lesson?.subtopicId;
  const subjectId = data?.Lesson?.subjectId;
  const topicId = data?.Lesson?.topicId;

  if (subjectId) revalidateTag(`lessons/${subjectId}`);
  if (subtopicId) revalidateTag(`lessons/${subtopicId}`);
  if (topicId) revalidateTag(`files/${topicId}`);
   
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
    include: { Lesson: true },
  });
  if (data?.id) {
    revalidateTag(`files/${data?.id}`);
  }
  const subtopicId = data?.Lesson?.subtopicId;
  if (subtopicId) revalidateTag(`lessons/${subtopicId}`);

  return NextResponse.json({ data }, { status: 200 });
}

export async function DELETE(
  request: Request,
  { params: { id } }: { params: { id: string } }
) {
  const data = await prisma.file.delete({
    include: { Lesson: true },
    where: {
      externalId: id,
    },
  });

  const topicId = data?.Lesson?.topicId;

  if (topicId) revalidateTag(`files/${topicId}`);

  return NextResponse.json(
    { data },
    {
      status: 200,
    }
  );
}
