"use client";
/* eslint-disable react-hooks/exhaustive-deps */
import React, { ReactNode, useEffect, useRef, useState } from "react";
import DynamicElement from "../dynamic-file";
import Paragraph from "../paragraph";

export type QuestionType = {
  separator?: string,
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
  AlternativeElement?: React.FC<{ alternative: string }>;
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
  separator = ",",
  id,
  number = 1,
  onSuccess,
  setCheck,
  AlternativeElement,
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
  const [isCorrect, setIsCorrect] = useState<boolean>();
  const alternativesArray = alternatives.includes(";")
    ? alternatives.split(';')
    : alternatives.split(separator);

  return (
    <div data-component={id} className="w-full">
      <article className="p-[0.5em] break-inside-avoid">
        <div className="flex gap-[0.4em]">
          {number}.- <Paragraph options={{ text: question, indent: false }} />
        </div>
        <div className="w-full flex flex-col-reverse sm:flex-row  justify-center gap-[0.8em] items-center">
          <fieldset className="w-full flex flex-col gap-[0.6em] print:gap-0.5 px-[1em] pt-[0.65em] print:pt-2.5">
            {alternativesArray?.map((alternative, i) => {
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
                      expectedAns?.toLowerCase().trim()
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
                    className="cursor-pointer absolute h-full w-full opacity-0 peer"
                    type="radio"
                    value={letter[i]}
                    name={"alternative" + id}
                  />
                  {/* peer-checked:outline-blue-500 */}
                  <div
                    className={`flex gap-[0.2em] min-w-[20em] text-[0.8em] print:text-[1em] p-[0.32em] w-full outline outline-gray-200 outline-[0.05em] rounded  peer-checked:outline-[0.14em] print:outline-none bg-white peer-hover:bg-slate-50 
                  ${!check && "peer-checked:outline-blue-500"}
                  ${check && isCorrect && "peer-checked:outline-green-500"}
                  ${check && !isCorrect && "peer-checked:outline-red-500"}
                  print:peer-checked:outline-none
                  `}
                  >
                    <span>{`${letter[i]}) `}</span>

                    {/* <span>{alternative.trim()}</span> */}

                    {AlternativeElement ? (
                      <AlternativeElement alternative={alternative} />
                    ) : (
                      <span>{alternative.trim()}</span>
                    )}
                  </div>
                </label>
              );
            })}
          </fieldset>
          {children?.toString() && (
            <div className="mx-[2.5em]">
              {children?.map((child, i) => (
                <DynamicElement
                  key={`question-${number}-${child.type}-${i}`}
                  attrs={child}
                  name={child.type}
                />
              ))}
            </div>
          )}
        </div>
      </article>
    </div>
  );
}
