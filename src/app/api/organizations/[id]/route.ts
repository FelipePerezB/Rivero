import { Organization } from "@prisma/client";
import { revalidateTag } from "next/cache";
import { NextResponse } from "next/server";
import prisma from "src/app/utils/prisma";

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  const id = Number(params.id);
  const data = await prisma.organization.findUnique({
    where: { id },
    include: {
      Groups: {
        include: {
          Users: true,
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
  const res = (await request.json()) as Partial<Organization>;
  const updateData = Object.fromEntries(
    Object.entries(res).map(([key, value]) => [key, { set: value }])
  );

  const id = Number(params.id);
  const data = await prisma.organization.update({
    where: {
      id,
    },
    data: updateData,
  });

  if (data.id) {
    revalidateTag(`organizations`);
  }

  return NextResponse.json(
    { data },
    {
      status: 200,
    }
  );
}