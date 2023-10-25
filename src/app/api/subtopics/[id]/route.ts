import { Topic } from "@prisma/client";
import { revalidateTag } from "next/cache";
import { NextResponse } from "next/server";
import prisma from "src/app/utils/prisma";

export async function PATCH(
  request: Request,
  { params }: { params: { id: string } }
) {
  console.log(request)
  const res = (await request.json()) as Partial<Topic>;
  const updateData = Object.fromEntries(
    Object.entries(res).map(([key, value]) => [key, { set: value }])
  );

  const id = Number(params.id);
  const data = await prisma.subtopic.update({
    where: {
      id,
    },
    data: updateData,
  });

  
  if(data.id){
    revalidateTag('subtopics')
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
  const id = Number(params.id);
  const data = await prisma.subtopic.delete({
    where: {
      id,
    },
  });
  
  if (data.topicId) {
    revalidateTag(`topics/${data.topicId}`);
  }

  return NextResponse.json(
    { data },
    {
      status: 200,
    }
  );
}

