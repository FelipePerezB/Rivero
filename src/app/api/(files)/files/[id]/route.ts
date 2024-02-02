import { auth, currentUser } from "@clerk/nextjs";
import { Role } from "@prisma/client";
import { revalidateTag } from "next/cache";
import { NextResponse } from "next/server";
import prisma from "src/utils/prisma";

export async function POST(
  request: Request,
  { params }: { params: { id: string } }
) {
  const res = await request.json();
  const user = await currentUser();
  if (!user?.id)
    return NextResponse.json({ message: "user not found" }, { status: 400 });
  const role = user?.publicMetadata?.role as Role;
  if (role !== Role.ADMIN)
    return NextResponse.json(
      { message: "Only administrators have permission to update" },
      { status: 403 }
    );

  const { content, privacity, name } = res;
  const id = params.id;
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
          externalId: user.id,
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
