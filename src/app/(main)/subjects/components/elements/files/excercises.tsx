/* eslint-disable react-hooks/exhaustive-deps */
"use client";
// import GetComponent from "@components/create-components/edit-document/get-component";
import React, { useEffect, useState } from "react";
import Title from "./title";
import DynamicElement from "./dynamic-file";
import Button from "@components/common/buttons/button/button";
import toast from "react-hot-toast";
import Alert from "@components/common/alert/alert";
import { useParams } from "next/navigation";

export default function Excercises({
  id,
  documentId,
  options: { children, isAnEvaluation } = {
    isAnEvaluation: false,
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
  documentId: string;
  options: {
    isAnEvaluation: boolean;
    separator?: string;
    children: {
      options: any;
      type: string;
    }[];
  };
}) {
  console.log(documentId);
  // const params = useParams<{ id: string}>()
  // const documentId = params?.id

  // Route -> /shop/[tag]/[item]
  // URL -> /shop/shoes/nike-air-max-97
  // `params` -> { tag: 'shoes', item: 'nike-air-max-97' }
  // console.log(params)
  const [answers, setAnswers] = useState<{ [number: number]: string }>({});
  const [answer, setAnswer] = useState<{ [number: number]: string }>({});

  useEffect(() => {
    setAnswers({ ...answers, ...answer });
  }, [answer]);
  const [check, setCheck] = useState(false);

  return (
    <section className="h-full pt-[0.6em]" data-component={id}>
      <Title options={{ size: "h2", text: "PRÁCTICA" }} />
      {/* <Title options={{ size: "h2", text: "Práctica" }} /> */}
      <div className="flex flex-col gap-[0.8em] pb-[0.6em]">
        {children?.map((child, i) => {
          return (
            <DynamicElement
              key={`child-${id}-${child.type}-${i}`}
              attrs={{
                ...child,
                number: i + 1,
                setAnswer,
                setCheck,
                check,
                answer,
              }}
              name={child.type}
            />
          );
        })}
      </div>
      <Button
        style={{
          fontSize: "0.75em",
          padding: "0.3em 0.8em",
        }}
        className=" print:hidden  "
        onClick={() => {
          !isAnEvaluation && setCheck(true);
          isAnEvaluation &&
            toast((t) => (
              <Alert
                t={t}
                message="¿Seguro que quieres corregir?"
                name="Corregir"
                callback={() => {
                  setCheck(true);
                }}
              />
            ));
        }}
      >
        Corregir
      </Button>
    </section>
  );
}
