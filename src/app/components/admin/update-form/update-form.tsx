"use client";
import { Privacity } from "@prisma/client";
import React, { ReactNode, useState } from "react";
import UpdateBtn from "../update-btn/update-btn";
import StandardInput from "@components/inputs/StandardInput/StandardInput";

export default function UpdateForm({
  id,
  name,
  privacity,
  endpoint,
  secondaryBtn,
}: {
  id: string;
  name?: string;
  privacity?: Privacity;
  endpoint: string;
  secondaryBtn?: ReactNode;
}) {
  const [values, setValues] = useState({});
  const addValues = (data: { [key: string]: unknown }) =>
    setValues({ ...values, ...data });

  return (
    <>
      {/* <OptionsInput options={Object.values(Privacity)} onChange={addValues} name="Privacidad" value={privacity} /> */}
      <StandardInput
        dataKey="name"
        onChange={addValues}
        name="Nombre"
        value={name}
      />
      <div className="flex gap-3">
        <UpdateBtn endpoint={endpoint} values={values} />
        {secondaryBtn}
      </div>
    </>
  );
}
