"use client";
import Button from "@components/Button";
import StandardInput from "@components/inputs/StandardInput/StandardInput";
import React, { useState } from "react";
import CreateBtn from "src/app/components/admin/create-btn/create-btn";

export default function CreateOrgForm() {
  const [values, setValues] = useState({});
  const setData = (data: { [key: string]: string }) =>
    setValues({ ...values, ...data });

  return (
    <>
      <StandardInput
        dataKey={"name"}
        onChange={setData}
        name="Nombre de la organización"
      />
      <StandardInput
        dataKey={"email"}
        onChange={setData}
        name="Correo del director"
      />
      <CreateBtn endpoint="organizations" values={values} size="md" />
    </>
  );
}
