"use client";
/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import DynamicElement from "./dynamic-file";

export type QuestionType = {
  id: string;
  number?: number;
  onSuccess?: (question: string) => void;
  onMistake?: (question: string) => void;
  options: {
    expectedAns: string;
    check?: boolean;
    question: string;
    alternatives: string;
    children: {
      options: any;
      type: string;
    }[];
  };
};

export default function Question({
  id,
  number = 1,
  onSuccess,
  onMistake,
  options: {
    question = "¿?",
    alternatives = "a,b,c",
    check,
    expectedAns,
    children,
  },
}: QuestionType) {
  const [answer, setAnswer] = useState();
  const [classname, setClassname] = useState("");

  useEffect(() => {
    if (!check) return;
    const name = answer === expectedAns ? "correct-ans" : "incorrect-ans";
    setClassname(name);
  }, [check]);
  return (
    <div data-component={id}>
      <article className="p-[0.5em] print:p-0 text-[0.8em]">
        <p>
          {number}.- {question}
        </p>
        {children?.toString() && (
          <div className="text-xs my-2.5">
            {children?.map((child, i) => (
              <DynamicElement
                key={`question-${number}-${child.type}-${i}`}
                attrs={child}
                name={child.type}
              />
            ))}
          </div>
        )}
        <ol className="flex flex-col gap-[0.5em] print:gap-0 px-[1em] pt-[0.2em]">
          {alternatives.split(",").map((alternative, i) => {
            const letter = {
              0: "A",
              1: "B",
              2: "C",
              3: "D",
              4: "E",
            } as any;
            return (
              <li
                className="relative marker:hidden"
                onClick={() => {
                  if (
                    letter[i].toLowerCase().trim() ===
                    expectedAns.toLowerCase().trim()
                  ) {
                    onSuccess && onSuccess(alternative);
                  } else {
                    onMistake && onMistake(alternative);
                  }
                }}
                key={alternative + i}
              >
                <input
                  className="cursor-pointer absolute h-full w-full opacity-0 peer"
                  type="radio"
                  name={"alternative" + id}
                />
                <label className="inline-block p-1.5 print:p-1 w-full outline outline-gray-200 outline-[0.1em] rounded peer-checked:outline-blue-500 peer-checked:outline-[0.14em] print:outline-none">
                  <span>{`${letter[i]}) `}</span>
                  <span>{alternative}</span>
                </label>
              </li>
            );
          })}
        </ol>
      </article>
    </div>
  );
}
