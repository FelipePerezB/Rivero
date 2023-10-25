"use client";
import Button from "@components/Button";
import Options from "@components/Options";
import OptionsInput from "@components/inputs/OptionsInput/OptionsInput";
import StandardInput from "@components/inputs/StandardInput/StandardInput";
import { Privacity } from "@prisma/client";
import React, { useState } from "react";
import UpdateBtn from "src/app/components/admin/update-btn/update-btn";
import UpdateForm from "src/app/components/admin/update-form/update-form";

type OptionsType = "Modificar" | "Documentos";

export default function ModifySubtopic({
  id,
  name,
  privacity,
}: {
  id: string;
  name?: string;
  privacity?: Privacity;
}) {
  const [values, setValues] = useState({});
  const [option, setOption] = useState<OptionsType>("Modificar");
  const addValues = (data: { [key: string]: unknown }) =>
    setValues({ ...values, ...data });

  return (
    <>
      <Options
        setOption={setOption}
        option={option}
        options={["Modificar", "Documentos"] as OptionsType[]}
      />
      {option === "Modificar" && (
        <UpdateForm
          endpoint={`subtopics/${id}`}
          id={id}
          name={name}
          privacity={privacity as Privacity | undefined}
        />
      )}
    </>
  );
}
