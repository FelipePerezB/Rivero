"use client";
import Button from "@components/common/buttons/button/button";
import StandardInput from "@components/form/StandardInput/StandardInput";
import React, { useState } from "react";
import CreateBtn from "@components/admin/create-btn/create-btn";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import createAlert from "@components/admin/create-alert/create-alert";

export default function CreateOrgBtn() {
  const [values, setValues] = useState({});
  const setData = (data: { [key: string]: string }) =>
    setValues({ ...values, ...data });

  return (
    <>
      {/* <StandardInput
        dataKey={"name"}
        onChange={setData}
        name="Nombre de la organización"
      />
      <StandardInput
        dataKey={"email"}
        onChange={setData}
        name="Correo del director"
      /> */}
      {/* <CreateBtn endpoint="organizations" values={values} size="md" /> */}
      <Button onClick={()=>createAlert({endpoint: "organizations"})}>
        Crear
        <FontAwesomeIcon className="h-3 w-3" icon={faPlus}/>
      </Button>
    </>
  );
}
