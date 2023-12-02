"use client";
import React, { useState } from "react";
// import Timer from "src/app/practice/timer";
import Question, { QuestionType } from "./question";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck, faMarker, faXmark } from "@fortawesome/free-solid-svg-icons";
// import Button from "@components/buttons/button/button";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import Timer from "src/app/subjects/[subject]/practice/components/timer";
import Button from "@components/common/buttons/button/button";
import Card from "@components/cards/Card";

interface QuestionAttrs {
  options: QuestionType["options"];
  id: QuestionType["id"];
}

export default function Practice({
  name,
  options,
  id,
  editMode,
}: {
  editMode?: boolean;
  name: string;
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
  const isLastQuestion = index + 1 === options.children?.length;
  const maxTime = isNaN(Number(options?.maxTime))
    ? undefined
    : Number(options?.maxTime);
  const router = useRouter();

  const finishPractice = () => {
    router.push("/home");
    toast.success(`¡Felicidades! Llegaste hasta la pregunta N°${index + 1}.`, {duration: 5 * 1000});
  };

  const question = options?.children[index] as unknown as QuestionAttrs;

  return (
    <div
      data-component={id}
      className="mx-auto flex flex-col gap-4 justify-center items-center w-full p-2 max-w-lg h-full"
    >
      {/* <h2 className=" text-3xl font-semibold w-full">Práctica</h2> */}
      <Timer onFinish={finishPractice} editMode={editMode} startTime={maxTime} bonus={bonus} />
      {/* <div className="text-md w-full"> */}
      <Card className="p-1">
        <Question
          onMistake={() => !editMode && setBonus(bonus - 15)}
          onSuccess={() => {
            if (!isLastQuestion) {
              setIndex(index + 1);
              !editMode && setBonus(bonus + 30);
            }
          }}
          number={index + 1}
          {...question}
        />
      </Card>
      <div className="w-full ">
        <Button onClick={finishPractice}>Finalizar</Button>
      </div>
    </div>
  );
}
