/* eslint-disable react-hooks/exhaustive-deps */
"use client";
import React, { useEffect, useState } from "react";
import Title from "./title";
import DynamicElement from "./dynamic-file";
import Button from "@components/common/buttons/button/button";
import toast from "react-hot-toast";
import Alert from "@components/common/alert/alert";
import api from "src/utils/api";
import getProgress from "src/services/cache/getProgress";

type metadataType = {
  subtopicId?: number;
  topicId?: number;
  subjectId?: number;
};

const setProgress = async (id: string, metadata?: metadataType) => {
  const { subtopicId, topicId, subjectId } = metadata ?? {};
  if (!subtopicId || !topicId || !subjectId) return;
  const lessonProgress = await getProgress(subjectId);
  lessonProgress[topicId] = lessonProgress[topicId] ?? {};
  const topicProgress = lessonProgress[topicId];
  if (topicProgress[subtopicId]?.includes(id)) return;

  topicProgress[subtopicId] = topicProgress[subtopicId]
    ? [...topicProgress[subtopicId], id]
    : [id];

  const { data: res } = (await api(`users/cache/progress/${subjectId}`, {
    cache: "no-store",
    method: "POST",
    body: JSON.stringify({
      content: lessonProgress,
    }),
  })) as {
    data: string;
  };

};

export default function Excercises({
  metadata,
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
  metadata?: metadataType;
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
  const [answers, setAnswers] = useState<{ [number: number]: string }>({});
  const [answer, setAnswer] = useState<{ [number: number]: string }>({});

  useEffect(() => {
    setAnswers({ ...answers, ...answer });
  }, [answer]);
  const [check, setCheck] = useState(false);

  return (
    <section className="h-full pt-[0.6em]" data-component={id}>
      <Title options={{ size: "h2", text: "PRÁCTICA" }} />
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
                  setProgress(documentId, metadata);
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
