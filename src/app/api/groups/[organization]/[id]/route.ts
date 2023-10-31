import { currentUser } from "@clerk/nextjs";
import { Group, Role } from "@prisma/client";
import { revalidateTag } from "next/cache";
import { redirect } from "next/navigation";
import { NextRequest, NextResponse } from "next/server";
import prisma from "src/app/utils/prisma";

export async function PATCH(
  request: Request,
  { params }: { params: { id: string } }
) {
  const res = (await request.json()) as Partial<Group>;
  const updateData = Object.fromEntries(
    Object.entries(res).map(([key, value]) => [key, { set: value }])
  );

  const id = Number(params.id);
  const data = await prisma.group.update({
    where: {
      id,
    },
    data: updateData,
  });

  return NextResponse.json(
    { data },
    {
      status: 200,
    }
  );
}

export async function GET(
  request: NextRequest,
  { params }: { params: { organization: string; id: string } }
) {
  const data = await prisma.group.findUnique({
    where: {
      id: Number(params?.id),
    },
    include: {
      Users: true,
    },
  });
  return NextResponse.json({ data }, { status: 200 });
}

export async function POST(
  request: Request,
  { params: { organization } }: { params: { organization: string } }
) {
  const res = await request.json();
  const { name } = res;
  const data = await prisma.group.create({
    data: { name, organizationId: Number(organization) },
  });
  return NextResponse.json({ data }, { status: 200 });
}

export async function DELETE(
  request: Request,
  { params }: { params: { id: string } }
) {
  const id = Number(params.id);
  const data = await prisma.group.delete({
    where: {
      id,
    },
  });

  if (data.organizationId) {
    revalidateTag(`groups/${data.organizationId}`);
  }

  return NextResponse.json(
    { data },
    {
      status: 200,
    }
  );
}
