import { Subject } from "@prisma/client";
import { revalidateTag } from "next/cache";
import { NextResponse } from "next/server";
import adminProtect from "src/app/api/utils/adminProtect";
import prisma from "src/utils/prisma";

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  const id = Number(params.id);
  const data = await prisma.subject.findUnique({
    where: { id },
  });

  return NextResponse.json({ data }, { status: 200 });
}

export async function PATCH(
  request: Request,
  { params }: { params: { id: string } }
) {
  const resolved = await adminProtect();
  if (!resolved) return NextResponse.json({ data: {} }, { status: 403 });
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
    revalidateTag(`subjects`);
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
  const resolved = await adminProtect();
  if (!resolved) return NextResponse.json({ data: {} }, { status: 403 });
  const id = Number(params.id);
  const data = await prisma.subject.delete({ where: { id } });

  if (data.id) {
    revalidateTag(`subjects/${data.id}`);
    revalidateTag(`subjects`);
  }
  return NextResponse.json({ data }, { status: 200 });
}
