'use client'
import Button, { ButtonAttrs } from "@components/common/buttons/button/button";
import React from "react";
import createAlert from "@components/admin/create-alert/create";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";

export default function CreateBtnWithName({
  color,
  label,
  endpoint,
  values,
}: {
  color?: ButtonAttrs['color']
  label?: string,
  endpoint: string;
  values?: { [key: string]: unknown };
}) {
  console.log(values)
  return (
    <Button color={color} onClick={() => createAlert(endpoint,values ?? {})}>
      Nuevo {label} <FontAwesomeIcon className="h-2.5 w-2.5" icon={faPlus} />
    </Button>
  );
}
