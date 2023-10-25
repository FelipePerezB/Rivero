"use client";
import React, { useState } from "react";
import ModifyForm from "./modify-form";
import StandardInput from "@components/inputs/StandardInput/StandardInput";
import OptionsInput from "src/app/components/edit-wraper/components/inputs/options";
import { Privacity } from "@prisma/client";
import CreateBtn from "src/app/components/admin/create-btn/create-btn";

export default function Form({
  searchParams,
}: {
  searchParams: { [key: string]: string };
}) {
  const [values, setValues] = useState({});

  const settings = {
    topic: {
      children: {
        name: "subtopico",
        endpoint: "subtopics",
        initialData: {
          topicId: Number(searchParams?.id),
        },
      },
      endpoint: `topics/${searchParams?.id}`,
    },
    subtopic: {
      endpoint: `subtopics/${searchParams?.id}`,
      children: {
        endpoint: "notes",
        name: "documento",
        initialData: {
          subtopicId: Number(searchParams?.id),
        },
      },
    },
    note: {
      endpoint: `notes/${searchParams?.id}`,
    },
  };

  const type = searchParams?.type as "topic" | "subtopic";
  const endpoint = settings[type]?.endpoint;
  const children = settings[type]?.children;

  return (
    <>
      <OptionsInput
        name="Privacidad"
        dataKey="privacity"
        value={searchParams?.privacity}
        onChange={({ privacity }) => {}}
        options={Object.keys(Privacity)}
      />
      <StandardInput
        value={searchParams?.name}
        name="Nombre"
        onBlur={(data) => setValues({ ...values, name: data })}
      />
      {children && (
        <CreateBtn
          endpoint={children?.endpoint}
          name={children?.name}
          values={{ ...children?.initialData, ...values }}
          // tags={["subtopics", `topics${searchParams?.id}`]}
        />
      )}

      <ModifyForm endpoint={endpoint} values={values} />
    </>
  );
}
