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

  return (
    <>
      <StandardInput name="Título" onBlur={setTitle} dataKey="title" />
      <CreateBtn
        size={"md"}
        endpoint="lessons"
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
