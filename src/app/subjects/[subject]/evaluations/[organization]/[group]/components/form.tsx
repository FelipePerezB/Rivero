"use client";

import Button from "@components/Button";
import { useRouter } from "next/navigation";
import { useState } from "react";
import toast from "react-hot-toast";
import OptionsInput from "@components/inputs/OptionsInput/OptionsInput";
import api from "src/app/utils/api";

export default function Form({
  fileId,
  users,
  token,
}: {
  fileId: string;
  users: { id: string | number; email: string }[];
  token: string;
}) {
  const [user, setUser] = useState("");
  const usersNames = users.map(({ email }) => email);
  const router = useRouter();
  const addScore = async () => {
    const min = 500;
    const max = 1000;
    const score = Math.floor(Math.random() * (max - min + 1)) + min;
    if (!user || !token) return;
    toast.promise(
      api("scores", {
        body: JSON.stringify({
          userId: users.find(({ email }) => email === user)?.id,
          fileId,
          score,
          alternatives: "a,c,b,e,c,a,c,a,c,d,a,a,d,c,a,a",
        }),
        method: "POST",
        headers: { Authorization: `Bearer ${token}` },
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
      <OptionsInput
        options={usersNames}
        name="Estudiante"
        dataKey="user"
        onChange={({ user }) => setUser(user)}
      />
      <Button onClick={addScore}>Añadir puntaje</Button>
    </>
  );
}
