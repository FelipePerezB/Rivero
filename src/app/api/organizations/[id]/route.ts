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
