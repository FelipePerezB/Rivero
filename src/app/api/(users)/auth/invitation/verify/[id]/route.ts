import { NextResponse } from "next/server";
import prisma from "src/utils/prisma";

export async function GET(
  request: Request,
  { params: { id } }: { params: { id: string } }
) {
  const data = await prisma.invitation.findUnique({
    where: { id: Number(id) },
  });
  if(data?.id){
    return NextResponse.json({ ok: true }, { status: 200 });

  }
}
