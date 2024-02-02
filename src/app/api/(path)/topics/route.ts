import { auth } from "@clerk/nextjs";
import { revalidateTag } from "next/cache";
import { NextRequest, NextResponse } from "next/server";
import prisma from "src/utils/prisma";
import adminProtect from "../../utils/adminProtect";

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const subject = Number(searchParams.get("subject")) as number | undefined;
  const data = await prisma.topic.findMany({ where: { subjectId: subject } });

  return NextResponse.json(
    { data },
    {
      status: 200,
    }
  );
}

export async function POST(request: Request) {
  const resolved = await adminProtect();
  if (!resolved) return NextResponse.json({ data: {} }, { status: 403 });
  const res = await request.json();
  const { name, subjectId } = res;
  const data = await prisma.topic.create({
    data: { name, subjectId },
  });

  if (data.id) {
    revalidateTag(`topics/${data?.id}`);
    revalidateTag(`subjects/${data?.subjectId}`);
    revalidateTag("subjects");
    revalidateTag("topics");
  }

  return NextResponse.json({ data }, { status: 200 });
}
