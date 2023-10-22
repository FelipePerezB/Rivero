import { auth, currentUser } from "@clerk/nextjs";
import { Role } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";
import prisma from "src/app/utils/prisma";

export async function POST(request: Request) {
  const res = await request.json();
  const { userId, fileId, score, alternatives } = res ?? {};
  const note = await prisma.note.findFirst({
    where: {
      File: { externalId: fileId },
    },
    include: { File: true },
  });

  const data = await prisma.score.create({
    data: {
      userId,
      noteId: note?.id,
      score,
      alternatives,
    },
  });
  return NextResponse.json({ data }, { status: 200 });
}
export async function GET(request: Request) {
  const user = await currentUser();
  const metadata = user?.publicMetadata;
  const role = metadata?.role as Role;
  const organizationId = metadata?.organizationId;
  const groups = metadata?.groups as number[];
  const scores = await prisma.group.findMany({
    orderBy: { createdAt: "asc" },
    where:
      role !== "ADMIN"
        ? {
            id: { in: groups },
          }
        : undefined,

    include: {
      Users: {
        include: {
          Score: true,
        },
      },
    },
  });

  const unFormatedData = scores.map(({ id, Users }) => ({
    [String(id)]: Users.flatMap(({ Score }) =>
      Score.map(({ score, createdAt }) => ({
        score,
        time: createdAt?.toISOString().substring(0, 10),
      }))
    ),
  }));

  const data = unFormatedData.map((courseData) => {
    const courseName = Object.keys(courseData)[0];
    const scoresByTime = courseData[courseName].reduce(
      (
        accumulator: {
          scoreSum: number;
          count: number;
          time: string | undefined;
        }[],
        currentValue
      ) => {
        const existingItem = accumulator.find(
          (item) => item.time === currentValue.time
        );
        if (existingItem) {
          existingItem.scoreSum += currentValue.score;
          existingItem.count++;
        } else {
          accumulator.push({
            time: currentValue.time,
            scoreSum: currentValue.score,
            count: 1,
          });
        }
        return accumulator;
      },
      []
    );

    const averagedScores = scoresByTime.map((item) => ({
      time: item.time,
      value: item.scoreSum / item.count,
    }));

    return { [courseName]: averagedScores };
  });

  return NextResponse.json({ data: data[0] }, { status: 200 });
}
