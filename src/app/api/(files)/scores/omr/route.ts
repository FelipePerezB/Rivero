import { NextRequest, NextResponse } from "next/server";
import getToken from "./services/get-token";
import getTemplate from "./services/get-template";
import check from "./services/check";
import recognizeResults from "./services/recognizeResults";
import api from "src/utils/api";
import prisma from "src/utils/prisma";

const recognize: any = async (
  access_token: string,
  omzFile: string,
  image: string,
  i: number = 0
) => {
  // const checkId = await check(access_token, omzFile, image);
  // console.log(checkId);
  await new Promise((resolve) => setTimeout(resolve, 4 * 1000));
  const results = await recognizeResults(
    access_token,
    "c0278a4a-47fd-46a0-8e77-35e6ab085acd"
  );
  // const results = await recognizeResults(access_token, checkId);

  if (results?.responseStatusCode === "NoAnyResultData" && i < 5) {
    await new Promise((resolve) => setTimeout(resolve, 4 * 1000));
    return recognize(access_token, omzFile, image, i + 1);
  } else {
    return results;
  }
};

function base64ToJson(base64String: string) {
  const json = Buffer.from(base64String, "base64").toString();
  return JSON.parse(json);
}

export async function POST(request: NextRequest) {
  const req = await request.json();
  const img = req?.image;
  const evaluationId = req?.evaluationId;
  const lessonId = req?.lessonId;
  const userId = req?.userId;
  console.log(img);
  if (!img)
    return NextResponse.json({ data: "Image is required" }, { status: 400 });
  if (!evaluationId)
    return NextResponse.json(
      { data: "Evaluation ID is required" },
      { status: 400 }
    );
  if (!userId || lessonId)
    return NextResponse.json({ data: "data required" }, { status: 400 });
  const { data: token } = await getToken();
  console.log(token);
  const { access_token } = token ?? ({} as { access_token: string });

  const { data: template } = await getTemplate(
    access_token,
    "5cf9a467-37bb-44a9-829d-46a3616d2ebd"
  );
  const omzFile = template?.results.find((file: { type?: string }) => {
    console.log(file?.type);
    return file?.type === "Omr";
  })?.data;

  const res = await recognize(access_token, omzFile, img);

  if (res?.responseStatusCode !== "Ok" || !res?.results || !res?.results.length)
    return NextResponse.json({ data: res }, { status: 400 });
  const base64Data = res?.results[0]?.data as string;
  const JSONData: DataStructure = base64ToJson(base64Data);
  const answers = JSONData?.RecognitionResults?.filter(
    ({ ElementName, Value }) => ElementName.startsWith("Answers")
  ).map(({ ElementName, Value }) => Value);
  const { score } = await api("scores/check", {
    body: JSON.stringify({
      evaluationId,
      answers,
    }),
    method: "POST",
  });
  if (!score) return NextResponse.json({ data: "error" }, { status: 500 });
  await api("scores", {
    method: "POST",
    body: JSON.stringify({
      fileId: evaluationId,
      score,
      alternatives: answers.join(),
      userId,
    }),
  });
  console.log(answers);
  return NextResponse.json({ data: base64ToJson(base64Data) }, { status: 200 });
}

type RecognitionResult = {
  ElementName: string;
  Value: string;
};

type RecognitionResultsArray = RecognitionResult[];

type DataStructure = {
  RecognitionResults: RecognitionResultsArray;
};
