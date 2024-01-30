import { Invitation } from "@prisma/client";
import { NextResponse } from "next/server";
import prisma from "src/utils/prisma";

export async function DELETE(
  request: Request,
  { params: { id } }: { params: { [key: string]: string } }
) {
  const data = await prisma.invitation.delete({
    where: { id: Number(id) },
  });
  return NextResponse.json({ data }, { status: 200 });
}

export async function PATCH(
  request: Request,
  { params }: { params: { id: string } }
) {
  const res = (await request.json()) as Partial<Invitation>;
  const updateData = Object.fromEntries(
    Object.entries(res).map(([key, value]) => [key, { set: value }])
  );

  const id = Number(params.id);
  const data = await prisma.invitation.update({
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
