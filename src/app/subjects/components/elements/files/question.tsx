"use client";
/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import DynamicElement from "./dynamic-file";
import Paragraph from "./paragraph";
import GetCompressedText from "src/app/subjects/utils/lexical/get-compressed-text";
import decompressRichTextContent from "src/app/subjects/utils/lexical/decompressRichTextContent";
import compressJSON from "src/app/subjects/utils/lexical/compress-JSON";

export type QuestionType = {
  id: string;
  number?: number;
  onSuccess?: (question: string) => void;
  onMistake?: (question: string) => void;
  setAnswer?: (answer: { [number: number]: string }) => void;
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
  setAnswer,
  onMistake,
  options: { question, alternatives, check, expectedAns, children } = {
    alternatives: "Alternativa A",
    expectedAns: "A",
    question: "",
    children: [],
  },
}: QuestionType) {
  useEffect(() => {
    if (!check) return;
    // const name = answer === expectedAns ? "correct-ans" : "incorrect-ans";
    // setClassname(name);
  }, [check]);
  return (
    <div data-component={id} className="w-full">
      <article className="p-[0.5em] break-inside-avoid">
        <p className="flex gap-[0.4em]">
          {number}.- <Paragraph options={{ text: question, indent: false }} />
        </p>
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
        <ol className="flex flex-col gap-[0.6em] print:gap-1 px-[1em] pt-[0.65em] print:pt-[0.4em]">
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
                  setAnswer && setAnswer({ [number]: letter[i] });
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
                <label className="inline-block p-[0.32em] w-full outline outline-gray-200 outline-[0.05em] rounded peer-checked:outline-blue-500 peer-checked:outline-[0.14em] print:outline-none bg-white peer-hover:bg-slate-50">
                  <span className="text-[0.8em] print:text-[1em]">
                    <span>{`${letter[i]}) `}</span>
                    <span>{alternative}</span>
                  </span>
                </label>
              </li>
            );
          })}
        </ol>
      </article>
    </div>
  );
}
