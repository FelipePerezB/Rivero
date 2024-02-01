import { auth, currentUser } from "@clerk/nextjs";
import { Lesson, Role } from "@prisma/client";
import { revalidateTag } from "next/cache";
import { NextResponse } from "next/server";
import prisma from "src/utils/prisma";

export async function GET(
  request: Request,
  { params: { id } }: { params: { id: string } }
) {
  const data = await prisma.lesson.findFirst({
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
  const user = await currentUser();
  if (!user?.id)
    return NextResponse.json({ message: "user not found" }, { status: 400 });
  const role = user?.publicMetadata?.role as Role;
  if (role !== Role.ADMIN)
    return NextResponse.json(
      { message: "Only admins have permission to update" },
      { status: 403 }
    );
  const res = (await request.json()) as Partial<Lesson>;
  const updateData = Object.fromEntries(
    Object.entries(res).map(([key, value]) => [key, { set: value }])
  );

  const id = Number(params.id);
  const data = await prisma.lesson.update({
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
  const user = await currentUser();
  if (!user?.id)
    return NextResponse.json({ message: "user not found" }, { status: 400 });
  const role = user?.publicMetadata?.role as Role;
  if (role !== Role.ADMIN)
    return NextResponse.json(
      { message: "Only admins have permission to update" },
      { status: 403 }
    );
  const id = Number(params.id);
  const data = await prisma.lesson.delete({
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
