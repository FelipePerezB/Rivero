"use client";
import Button from "@components/common/buttons/button/button";
import OptionsInput from "@components/form/OptionsInput/OptionsInput";
import StandardInput from "@components/form/StandardInput/StandardInput";
import React from "react";

export default function CreateForm() {
  return (
    <>
      <OptionsInput
        onChange={() => {}}
        name="Tipo"
        options={["Tópico", "Subtópico", "Documento"]}
      />
      <StandardInput name="Nombre" onChange={() => {}} key={"name"} />
      <Button>Crear</Button>
    </>
  );
}
