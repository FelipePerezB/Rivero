"use client";
/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useRef, useState } from "react";
import DynamicElement from "./dynamic-file";
import Paragraph from "./paragraph";

export type QuestionType = {
  id: string;
  number?: number;
  onSuccess?: (question: string) => void;
  onMistake?: (question: string) => void;
  answer?: {
    [number: number]: string;
  };
  setAnswer?: React.Dispatch<
    React.SetStateAction<
      | {
          [number: number]: string;
        }
      | undefined
    >
  >;
  setCheck?: React.Dispatch<React.SetStateAction<boolean>>;
  check?: boolean;
  options: {
    expectedAns: string;
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
  setCheck,
  check,
  setAnswer,
  onMistake,
  options: { question, alternatives, expectedAns, children } = {
    alternatives: "Alternativa A",
    expectedAns: "A",
    question: "",
    children: [],
  },
}: QuestionType) {
  // const check = false
  const radioRef = useRef<HTMLInputElement>(null);
  const [isCorrect, setIsCorrect] = useState<boolean>();
  // useEffect(() => {
  // const answer = document.querySelector();
  // if (!check) return;

  // const name =
  //   answer === expectedAns ? "correct-ans" : "incorrect-ans";
  //
  // setClassname(name);
  // }, [className]);
  return (
    <div data-component={id} className="w-full">
      <article className="p-[0.5em] break-inside-avoid">
        <div className="flex gap-[0.4em]">
          {number}.- <Paragraph options={{ text: question, indent: false }} />
        </div>
        {children?.toString() && (
          <div className="my-2.5">
            {children?.map((child, i) => (
              <DynamicElement
                key={`question-${number}-${child.type}-${i}`}
                attrs={child}
                name={child.type}
              />
            ))}
          </div>
        )}
        <fieldset className="flex flex-col gap-[0.6em] print:gap-0.5 px-[1em] pt-[0.65em] print:pt-2.5">
          {alternatives?.split(",")?.map((alternative, i) => {
            const letter = {
              0: "A",
              1: "B",
              2: "C",
              3: "D",
              4: "E",
            } as any;
            return (
              <label
                className="relative marker:hidden"
                onClick={() => {
                  setAnswer && setAnswer({ [number]: letter[i] });
                  if (
                    letter[i].toLowerCase().trim() ===
                    expectedAns.toLowerCase().trim()
                  ) {
                    check && setIsCorrect(true);
                    onSuccess && onSuccess(alternative);
                  } else {
                    check && setIsCorrect(false);
                    onMistake && onMistake(alternative);
                  }
                  setCheck && setCheck(false);
                }}
                key={alternative + i}
              >
                <input
                  id={"question"}
                  // onCh
                  // ref={radioRef}
                  className="cursor-pointer absolute h-full w-full opacity-0 peer"
                  type="radio"
                  value={letter[i]}
                  name={"alternative" + id}
                />
                {/* peer-checked:outline-blue-500 */}
                <span
                  className={`text-[0.8em] print:text-[1em] inline-block p-[0.32em] w-full outline outline-gray-200 outline-[0.05em] rounded  peer-checked:outline-[0.14em] print:outline-none bg-white peer-hover:bg-slate-50 
                  ${!check && "peer-checked:outline-blue-500"}
                  ${check && isCorrect && "peer-checked:outline-green-500"}
                  ${check && !isCorrect && "peer-checked:outline-red-500"}
                  print:peer-checked:outline-none
                  `}
                >
                  <span>{`${letter[i]}) `}</span>
                  <span>{alternative}</span>
                </span>
              </label>
            );
          })}
        </fieldset>
      </article>
    </div>
  );
}
