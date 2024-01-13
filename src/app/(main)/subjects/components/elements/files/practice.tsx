"use client";
import React, { useEffect, useRef, useState } from "react";
// import Timer from "src/app/practice/timer";
import Question, { QuestionType } from "./question";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCheck,
  faHourglassEnd,
  faMarker,
  faXmark,
} from "@fortawesome/free-solid-svg-icons";
// import Button from "@components/buttons/button/button";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import Timer from "src/app/(main)/subjects/[subject]/practice/components/timer";
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
  const [check, setCheck] = useState(false);
  console.log(options)
   

  useEffect(() => {
    setCheck(false);
  }, [index]);

  const isLastQuestion = index + 1 === options?.children?.length;
  const maxTime = isNaN(Number(options?.maxTime))
    ? undefined
    : Number(options?.maxTime);
  const router = useRouter();

  const finishPractice = () => {
    router.push("/home");
    toast.success(`¡Felicidades! Llegaste hasta la pregunta N°${index + 1}.`, {
      duration: 5 * 1000,
    });
  };
  const question = options?.children[index] as unknown as QuestionAttrs;

  console.log(question, index)
  console.log(options)

  return (
    <div
      data-component={id}
      className="mx-auto flex flex-col gap-8 justify-center items-center w-full p-4 max-w-2xl h-full"
    >
      <div className="flex w-full gap-6 items-end ">
        <Timer
          onFinish={finishPractice}
          editMode={editMode}
          startTime={maxTime}
          bonus={bonus}
        />
        <Button
          color="white"
          size="sm"
          className="group"
          onClick={finishPractice}
        >
          Finalizar
          <FontAwesomeIcon
            className="h-3 w-3 group-hover:animate-pulse"
            icon={faHourglassEnd}
          />
        </Button>
      </div>
      <div className="flex flex-col gap-4 w-full">
        <Card className="p-0.5 sm:p-1.5 text-lg">
          <Question
            key={`practice-${id}-question-${index}`}
            check={check}
            onMistake={() => {
              setCheck(true);
              !editMode && setBonus(bonus - 15);
            }}
            onSuccess={() => {
              setCheck(true);
              if (!isLastQuestion) {
                setIndex(index + 1);
                !editMode && setBonus(bonus + 30);
              }
            }}
            number={index + 1}
            {...question}
          />
        </Card>
      </div>
    </div>
  );
}
