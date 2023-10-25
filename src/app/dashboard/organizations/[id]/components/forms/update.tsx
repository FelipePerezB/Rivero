"use client";
import Button from "@components/Button";
import StandardInput from "@components/inputs/StandardInput/StandardInput";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import toast from "react-hot-toast";
import CreateBtn from "src/app/components/admin/create-btn/create-btn";
// import StandardInput from "src/app/components/inputs/standard";
import api from "src/app/utils/api";

export default function UpdateForm({
  organization,
}: {
  organization?: string;
}) {
  const [name, setName] = useState("");
  // const createGroup = () => {
  //   toast.promise(
  //     api(
  //       "groups/1",
  //       {
  //         headers: { Authorization: `Bearer ${token}` },
  //         method: "POST",
  //         body: JSON.stringify({ name }),
  //       },
  //       ["groups"]
  //     ),
  //     {
  //       error: "No se ha logrado crear el grupo",
  //       loading: "Creando grupo...",
  //       success: "¡Grupo creado correctamente",
  //     }
  //   );
  //   router.back();
  // };
  return (
    <form className="flex flex-col gap-4">
      <StandardInput
        attrs={{ placeholder: "4° Medio A..." }}
        onBlur={setName}
        name="Nombre"
      />
      <CreateBtn
        endpoint="groups"
        // tags={[`gruops/${organization}`, "groups"]}
        values={{ organizationId: organization, name }}
        size="md"
      />
      {/* <Button onClick={createGroup}>Guardar</Button> */}
    </form>
  );
}
