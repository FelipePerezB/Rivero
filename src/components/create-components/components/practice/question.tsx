import Link from "next/link";
import React from "react";
import { IdLenght } from "src/models/document.model";
import generateRandomId from "src/utils/generateRandomId";

export default function Question({
  // setIndex,
  index,
  nextId,
  bonus,
  currentId,
  // secretNumbers,
  options: { question, alternatives, expectedAns } = {
    question: "¿Cual de los siguientes es el resultado de la pregunta?",
    alternatives:
      "La respuesta A ,La respuesta B,La respuesta C,La respuesta D",
    expectedAns: "La respuesta A",
  },
}: {
  bonus: number,
  currentId: string;
  nextId: string;
  // setIndex: React.Dispatch<React.SetStateAction<number>>;
  index: number;
  id: string;
  options: {
    expectedAns: string;
    question: string;
    alternatives: string;
  };
}) {
  return (
    <article className="flex flex-col gap-2.5">
      <span>{index + 1}.- {question}</span>
      <ol className="text-sm flex flex-col gap-2.5 px-2.5">
        {alternatives.split(",").map((alternative, i) => {
          const letter = {
            0: "A",
            1: "B",
            2: "C",
            3: "D",
            4: "E",
          } as any;
          const isCorrect = alternative === expectedAns;
          const newBonus = isCorrect ? bonus + 30 : bonus - 15
          const href = `?${
            isCorrect ? `n=${nextId}` : `n=${generateRandomId(IdLenght.sm)}`
          }&c=${currentId}&bonus=${newBonus}`;
          return (
            <li
              className={`cursor-pointer w-full outline outline-gray-200 outline-[0.1em] rounded hover:bg-gray-100 transition-all duration-300 active:duration-400 ${
                isCorrect
                  ? "active:outline-green-500 outline-2 active:shadow active:shadow-green-500"
                  : "active:outline-red-500 outline-2 active:shadow active:shadow-red-500"
              }`}
              key={alternative + i}
            >
              <Link className="inline-block w-full h-full p-2" href={href}>
                <span>{`${letter[i]}) `}</span>
                <span>{alternative}</span>
              </Link>
            </li>
          );
        })}
      </ol>
    </article>
  );
}
