"use client";

import Button from "@components/common/buttons/button/button";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import api from "src/utils/api";

export default function AddScoreForm({
  fileId,
  id,
}: {
  id: string;
  fileId: string;
}) {
  console.log({id, fileId})
  const router = useRouter();
  const addScore = async () => {
    const min = 500;
    const max = 1000;
    const score = Math.floor(Math.random() * (max - min + 1)) + min;;
    toast.promise(
      api("scores", {
        body: JSON.stringify({
          userId: Number(id),
          fileId,
          score,
          alternatives: "a,c,b,e,c,a,c,a,c,d,a,a,d,c,a,a",
        }),
        method: "POST",
      }),
      {
        error: "Error al agregar puntaje",
        loading: "Agregando puntaje...",
        success: "¡Puntaje agregado correctamente!",
      }
    );
    router.back();
  };
  return (
    <>
      <Button onClick={addScore}>Añadir puntaje</Button>
    </>
  );
}
