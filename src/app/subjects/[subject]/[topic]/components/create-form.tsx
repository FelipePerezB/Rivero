"use client";
import Button from "@components/Button";
import OptionsInput from "@components/inputs/OptionsInput/OptionsInput";
import StandardInput from "@components/inputs/StandardInput/StandardInput";
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
