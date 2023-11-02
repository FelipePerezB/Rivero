"use client";
// import GetComponent from "@components/create-components/edit-document/get-component";
import React, { useEffect, useState } from "react";
import Title from "./title";
import DynamicElement from "./dynamic-file";

export default function Excercises({
  id,
  options: { children } = {
    children: [
      {
        options: { question: "Pregunta 1", alternatives: "Alternativa A" },
        type: "question",
      },
    ],
    separator: "",
  },
}: {
  id: string;
  options: {
    separator?: string;
    children: {
      options: any;
      type: string;
    }[];
  };
}) {
  const [answers, setAnswers] = useState<{ [number: number]: string }>({});
  const setAnswer = (ans: { [number: number]: string }) =>
    setAnswers({ ...answers, ...ans });

    useEffect(()=>{
      console.log(answers)
    }, [answers])

  return (
    <section data-component={id}>
      <Title options={{ size: "h2", text: "Práctica" }} />
      <div className="flex flex-col gap-[0.8em] pb-[0.6em]">
        {children?.map((child, i) => {
          return (
            <DynamicElement
              key={`child-${id}-${child.type}-${i}`}
              attrs={{ ...child, number: i + 1, setAnswer, check: true }}
              name={child.type}
            />
          );
        })}
      </div>
    </section>
  );
}
