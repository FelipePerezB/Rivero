// "use client";
import Card from "@components/Card";
import React, { useState } from "react";
import Timer from "src/app/practice/timer";
import Question from "./question";

export default function Practice({
  type,
  searchParams,
  title,
  options,
  id,
}: {
  searchParams: {
    n?: string;
    c?: string;
    bonus?: string;
  };
  title: string;
  type: string;
  options: {
    children: {
      type: string;
      id: string;
      options: { [key: string]: unknown };
    }[];
  };
  id: string;
}) {
  const questions = [];
  const getQuestion = (index: number) => ({
    id: `${index}62526`,
    question:
      "¿Cual de los siguientes es el resultado de la pregunta? N°" + index,
    alternatives: "La respuesta A,La respuesta B,La respuesta C,La respuesta D",
    expectedAns: "La respuesta D",
  });
  for (let i = 0; i < 10; i++) {
    const question = getQuestion(i);
    questions.push(question);
  }

  let questionIndex;
  if (searchParams?.n) {
    const findedIndex = questions.findIndex(
      (question) => question.id === searchParams.n
    );
    questionIndex =
      findedIndex !== -1
        ? findedIndex
        : questions.findIndex((question) => question.id === searchParams.c);
  } else {
    questionIndex = 0;
  }

  const nextId = questions[questionIndex + 1].id;
  const currentId = questions[questionIndex].id;
  const bonus = Number(searchParams?.bonus) || 0;

  return (
    <div className="mx-auto flex flex-col gap-3 justify-center items-center w-full p-2 max-w-lg">
      <h1 className="text-2xl font-bold w-full text-left">
        Práctica de matemática
      </h1>

      <Timer bonus={bonus} />
      <Card>
        <Question
          options={questions[questionIndex]}
          id=""
          bonus={bonus}
          currentId={currentId}
          index={questionIndex}
          nextId={nextId}
        />
        {/* <GetComponent
          attrs={{
            options: questions[questionIndex],
            nextId,
            currentId,
            index: questionIndex,
            bonus,
          }}
          name={"question"}
          folder="practice"
        /> */}
      </Card>
    </div>
  );
}
