"use client";
import Button from "@components/common/buttons/button/button";
import StandardInput from "@components/form/StandardInput/StandardInput";
import { Privacity, Types } from "@prisma/client";
import { useRouter } from "next/navigation";
import { useState } from "react";
import toast from "react-hot-toast";
import CreateBtn from "@components/admin/create-btn/create-btn";
import api from "src/utils/api";

export default function Form({
  subject,
  token,
}: {
  subject: string;
  token?: string | null;
}) {
  const router = useRouter();
  const [title, setTitle] = useState("");
  // const createEvaluation = async () => {
  //   if (!title || !token) return;
  //   toast.promise(
  //     api("notes", {
  //       body: JSON.stringify({
  //         type: Types.EVALUATION,
  //         subjectId: subject,
  //         File: {
  //           title,
  //           content: JSON.stringify({}),
  //         },
  //       }),
  //       method: "POST",
  //       headers: { Authorization: `Bearer ${token}` },
  //     }),
  //     {
  //       error: "Error al crear nueva evaluación",
  //       loading: "Creando evaluación...",
  //       success: "¡Evaluación creada correctamente!",
  //     }
  //   );
  //   router.back();
  // };
  return (
    <>
      <StandardInput name="Título" onBlur={setTitle} dataKey="title" />
      <CreateBtn
        size={"md"}
        endpoint="notes"
        // tags={["notes"]}
        values={{
          File: { title },
          subjectId: Number(subject),
          type: Types.EVALUATION,
        }}
        name=""
      />
      {/* <Button onClick={createEvaluation}>Crear</Button> */}
    </>
  );
}
