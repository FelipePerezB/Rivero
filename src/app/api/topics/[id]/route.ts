import { Topic } from "@prisma/client";
import { NextResponse } from "next/server";
import prisma from "src/app/utils/prisma";
import { revalidatePath, revalidateTag } from "next/cache";
import { auth } from "@clerk/nextjs";

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
          Notes: {
            select: {
              type: true,
              File: {
                select: {
                  externalId: true,
                },
              },
            },
            where: {
              type: "PRACTICE",
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
  const { userId } = auth();
  console.log(userId);
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
  }

  return NextResponse.json(
    { data },
    {
      status: 200,
    }
  );
}
