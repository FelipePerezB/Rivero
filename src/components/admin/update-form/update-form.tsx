import { Privacity } from "@prisma/client";
import React, { ReactNode } from "react";
import RadioInput from "@components/form/radio-input";
import Button from "@components/common/buttons/button/button";
import TextInput from "@components/form/text-input";
import ClientForm from "@components/form/client-form";

export default function UpdateForm({
  name,
  privacity,
  endpoint,
  secondaryBtn,
}: {
  name?: string;
  privacity?: Privacity;
  endpoint: string;
  secondaryBtn?: ReactNode;
}) {
  const names = []
  privacity && names.push("privacity")
  name && names.push("name")
  return (
    <ClientForm endpoint={endpoint} names={names}>
      {!!privacity && (
        <RadioInput
          options={Object.values(Privacity)}
          label="Privacidad"
          name="privacity"
          value={privacity}
        />
      )}
      <TextInput label="Nombre" name="name" value={name} />
      <div className="flex gap-3">
        <Button type="submit">Guardar</Button>
        {secondaryBtn}
      </div>
    </ClientForm>
  );
}
