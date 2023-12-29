import Button, { ButtonAttrs } from "@components/common/buttons/button/button";
import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import TextInput from "@components/form/text-input";
import api from "src/utils/api";

const action = async (
  {
    endpoint,
    values,
  }: { endpoint: string; values?: { [key: string]: unknown } },
  formData: FormData
) => {
  "use server";
  const name = formData.get("name");
  values = { ...values, name };
  await api(endpoint, {
    method: "POST",
    body: JSON.stringify({ ...values }),
  });
};

export default function CreateBtnWithName({
  color,
  label,
  endpoint,
  values = {},
}: {
  color?: ButtonAttrs["color"];
  label?: string;
  endpoint: string;
  values?: { [key: string]: unknown };
}) {
  const createAction = action.bind(null, { endpoint, values });
  return (
    <form action={createAction} className="flex flex-col gap-3">
      <TextInput name={"name"} label={label} />
      <Button color={color} type="submit">
        Crear <FontAwesomeIcon className="h-2.5 w-2.5" icon={faPlus} />
      </Button>
    </form>
  );
}
