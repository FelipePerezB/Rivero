import { NextRequest, NextResponse } from "next/server";
import api from "src/utils/api";

const transformationTable = {
  0: 100,
  1: 173,
  2: 199,
  3: 222,
  4: 243,
  5: 264,
  6: 283,
  7: 300,
  8: 316,
  9: 330,
  10: 346,
  11: 362,
  12: 378,
  13: 392,
  14: 403,
  15: 413,
  16: 424,
  17: 436,
  18: 450,
  19: 465,
  20: 478,
  21: 489,
  22: 498,
  23: 505,
  24: 513,
  25: 523,
  26: 535,
  27: 549,
  28: 563,
  29: 575,
  30: 585,
  31: 593,
  32: 599,
  33: 607,
  34: 616,
  35: 628,
  36: 642,
  37: 657,
  38: 669,
  39: 680,
  40: 688,
  41: 696,
  42: 705,
  43: 717,
  44: 731,
  45: 746,
  46: 761,
  47: 773,
  48: 785,
  49: 797,
  50: 811,
  51: 827,
  52: 844,
  53: 862,
  54: 879,
  55: 897,
  56: 917,
  57: 939,
  58: 963,
  59: 990,
  60: 1000
} as {[n: number]: number};

export async function POST(request: NextRequest) {
  const req = await request.json();
  const evaluationId = req?.evaluationId;
  const answers = req?.answers;
  console.log(answers)
  if (!evaluationId)
    return NextResponse.json(
      { data: "Evaluation ID is required" },
      { status: 400 }
    );
  if (!answers)
    return NextResponse.json({ data: "Answers are required" }, { status: 400 });


  const { data: {answers:expectedAnswers, id} } = await api(`lessons/evaluations/questions/${evaluationId}`, {}, [
    `files/${evaluationId}`,
  ]) as {data: {answers: string[], id: number}};


  let correctAlternatives = 0;
  expectedAnswers.forEach((answer, i) => {
    console.log(answers[i], answer);
    if (answers[i]?.toUpperCase() === answer?.toUpperCase())
      correctAlternatives += 1;
  });

  console.log(expectedAnswers);
  return NextResponse.json({ score: transformationTable[correctAlternatives] }, { status: 200 });
}
