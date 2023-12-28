"use client";
import Button from "@components/common/buttons/button/button";
import { File, Privacity, Types } from "@prisma/client";
import React from "react";
import toast, { Toaster } from "react-hot-toast";
import api from "src/utils/api";
import generateRandomId from "src/utils/generateRandomId";
import { IdLenght } from "src/models/document.model";

const getDefaultContent = () => {
  return {
    type: "practice",
    id: generateRandomId(IdLenght.sm),
    options: {
      maxTime: "180",
      children: [
        {
          type: "question",
          id: generateRandomId(IdLenght.sm),
          options: {
            question:
              "¿Cuál de las siguientes alternativas corresponde a la solución de la pregunta 1",
            alternatives:
              "La alternativa 1, La alternativa 2, La alternativa 3, La alternativa 4",
            expectedAns: "A",
          },
        },
      ],
    },
  };
};

export default function CreateBtn({
  subject,
  token,
}: {
  subject: string;
  token: string;
}) {
  const createPractice = () => {
    toast.promise(
      api("lessons", {
        body: JSON.stringify({
          type: Types.PRACTICE,
          subjectId: subject,
          File: {
            title: "Práctica",
            content: JSON.stringify(getDefaultContent()),
          },
        }),
        method: "POST",
        headers: { Authorization: `Bearer ${token}` },
      }),
      {
        error: "Error al crear nueva práctica",
        loading: "Creando práctica...",
        success: "¡Práctica creada correctamente!",
      }
    );
  };
  return (
    <>
      <Button onClick={createPractice}>Crear práctica</Button>
      <Toaster />
    </>
  );
}
