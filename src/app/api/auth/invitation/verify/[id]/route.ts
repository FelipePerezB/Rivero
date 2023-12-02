import { NextResponse } from "next/server";
import prisma from "src/utils/prisma";

export async function GET(
  request: Request,
  { params: { id } }: { params: { id: string } }
) {
  const data = await prisma.invitation.findUnique({
    where: { id: id },
  });
  if(data?.id){
    console.log(data.id)
    return NextResponse.json({ ok: true }, { status: 200 });

  }
}
