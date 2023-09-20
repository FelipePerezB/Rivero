/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";

export default function Question({
  id,
  number = 1,
  options: {
    question = "¿?",
    alternatives = "a,b,c",
    setCheck,
    check,
    expectedAns,
  },
}: {
  id: string;
  number?: number;
  options: {
    addAnswer: (answer: { number: number; alternative: string }) => void;
    setCheck: (bool: boolean) => boolean;
    expectedAns: string;
    check: boolean;
    question: string;
    alternatives: string;
  };
}) {
  const [answer, setAnswer] = useState();
  const [classname, setClassname] = useState("");

  useEffect(() => {
    if (!check) return;
    const name = answer === expectedAns ? "correct-ans" : "incorrect-ans";
    setClassname(name);
    setCheck(false);
  }, [check]);
  console.log(id)
  return (
    <div data-component={id} >
      <article>
        <p>
          {number}.- {question}
        </p>
        <li>
          <ol className="text-[0.8em] flex flex-col gap-[0.4em] px-[1em] pt-[0.2em]">
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
                  className="relative"
                  onClick={() => {
                    setClassname("");
                    setAnswer(letter[i]);
                  }}
                  key={alternative + i}
                >
                  <input
                    className="cursor-pointer absolute h-full w-full opacity-0 peer"
                    type="radio"
                    name={"alternative" + id}
                  />
                  <label
                    className="inline-block p-1.5 w-full outline outline-gray-200 outline-[0.1em] rounded peer-checked:outline-blue-500 peer-checked:outline-[0.12em]"
                  >
                    <span>{`${letter[i]}) `}</span>
                    <span>{alternative}</span>
                  </label>
                </li>
              );
            })}
          </ol>
          {/* {children?.length && (
          )} */}
        </li>
      </article>
    </div>
  );
}
