"use client";
import Card from "@components/Card";
import React, { useState } from "react";
import Timer from "src/app/practice/timer";
import Question, { QuestionType } from "./question";

interface QuestionAttrs {
  options: QuestionType["options"];
  id: QuestionType["id"];
}

export default function Practice({
  title,
  options,
  id,
}: {
  title: string;
  type: string;
  options: {
    maxTime?: string;
    children: {
      type: string;
      id: string;
      options: { [key: string]: unknown };
    }[];
  };
  id: string;
}) {
  const [index, setIndex] = useState(0);
  const [bonus, setBonus] = useState(0);
  const isLastQuestion = index + 1 === options.children?.length
  const maxTime = isNaN(Number(options?.maxTime))
    ? undefined
    : Number(options?.maxTime);
    
  const question = options.children[index] as unknown as QuestionAttrs;

  return (
    <div
      data-component={id}
      className="mx-auto flex flex-col gap-3 justify-center items-center w-full p-2 max-w-lg"
    >
      <h1 className="text-2xl font-bold w-full text-left">{title}</h1>

      <Timer startTime={maxTime} bonus={bonus} />
      <Card key={question?.id} className="p-4">
        <Question
          onMistake={() => setBonus(bonus - 15)}
          onSuccess={() => {
            if(!isLastQuestion){
              setIndex(index + 1);
              setBonus(bonus + 30);
            } else {
              console.log("AAAAA")
            }
          }}
          number={index + 1}
          {...question}
        />
      </Card>
    </div>
  );
}
