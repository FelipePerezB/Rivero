import { Privacity } from "@prisma/client";
import React, { ReactNode } from "react";
import StandardInput from "@components/form/StandardInput/StandardInput";
import RadioInput from "@components/form/radio-input";
import api from "src/utils/api";
import Button from "@components/common/buttons/button/button";

const action = async (endpoint: string, formData: FormData) => {
  "use server";
  const privacity = formData.get("privacity");
  const name = formData.get("name");
  const values = { name, privacity };
  const res = await api(endpoint, {
    method: "PATCH",
    body: JSON.stringify({ ...values }),
  });
  console.log(res);
};

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
  const updateAction = action.bind(null, endpoint);

  return (
    <form className="flex gap-3 flex-col" action={updateAction}>
      {!!privacity && (
        <RadioInput
          name="privacity"
          label="privacidad"
          value={privacity}
          options={Object.values(Privacity)}
        />
      )}
      <StandardInput dataKey="name" name="name" value={name} />
      <div className="flex gap-3">
        <Button type="submit">Guardar</Button>
        {secondaryBtn}
      </div>
    </form>
  );
}
