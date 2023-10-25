import { Subject } from "@prisma/client";
import { revalidateTag } from "next/cache";
import { NextResponse } from "next/server";
import prisma from "src/app/utils/prisma";

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  const id = Number(params.id);
  const data = await prisma.subject.findUnique({
    where: { id },
    include: {
      Topics: true,
      Notes: {
        select: {
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
  const res = (await request.json()) as Partial<Subject>;
  const updateData = Object.fromEntries(
    Object.entries(res).map(([key, value]) => [key, { set: value }])
  );

  const id = Number(params.id);
  const data = await prisma.subject.update({
    where: {
      id,
    },
    data: updateData,
  });

  if (data.id) {
    revalidateTag(`subjects/${data.id}`);
  }

  return NextResponse.json(
    { data },
    {
      status: 200,
    }
  );
}
