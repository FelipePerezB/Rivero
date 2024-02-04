import { NextRequest, NextResponse } from "next/server";
import getToken from "./services/get-token";
import getTemplate from "./services/get-template";
import check from "./services/check";
import recognizeResults from "./services/recognizeResults";

const recognize: any = async (
  access_token: string,
  omzFile: string,
  image: string,
  i: number = 0
) => {
  const checkId = await check(access_token, omzFile, image);
  console.log(checkId)

  // Esperar 4 segundos usando setTimeout
  await new Promise(resolve => setTimeout(resolve, 4 * 1000));
  
  const results = await recognizeResults(access_token, checkId);
  console.log(results)

  if (results?.responseStatusCode === "NoAnyResultData" && i < 5) {
    await new Promise(resolve => setTimeout(resolve, 4 * 1000));
    return recognize(access_token, omzFile, image,i + 1);
  } else {
    return results;
  }


  // if (results?.responseStatusCode === "NoAnyResultData" && i < 5) {
  //   await new Promise(resolve => setTimeout(resolve, 4 * 1000));
  //   return recognize(access_token, omzFile, i + 1);
  // } else {
  //   return results;
  // }
};

function base64ToJson(base64String: string) {
  const json = Buffer.from(base64String, "base64").toString();
  return JSON.parse(json);
}


export async function POST(request: NextRequest) {
  const req = await request.json();
  const img = req?.image
  console.log(img);
  if(!img) return  NextResponse.json({ data: img }, { status: 400 })
  const { data: token } = await getToken();
console.log(token)
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
  console.log(res)
  if(res?.responseStatusCode !== "Ok" || !res?.results || !res?.results.length)  return NextResponse.json({ data: res }, { status: 400 })
  console.log(res)
  const base64Data= res?.results[0]?.data as string
  return NextResponse.json({ data: base64ToJson(base64Data) }, { status: 200 });
}

