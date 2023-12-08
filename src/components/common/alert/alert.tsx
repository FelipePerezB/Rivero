"use client";
import Button, { ButtonAttrs } from "@components/common/buttons/button/button";
import React from "react";
import toast, { Toast } from "react-hot-toast";

export default function Alert({
  t,
  message = "¿Seguro que quieres actualizar?",
  callback,
  color = "blue",
  name = "Guardar",
}: {
  t: Toast;
  color?: ButtonAttrs["color"];
  message?: string;
  callback?: () => void;
  name?: string;
}) {
  return (
    <span className="flex flex-col gap-2">
      {message}
      <div className="flex gap-3.5">
        <Button
          type="submit"
          color={color}
          onClick={() => {
            callback && callback();
            toast.dismiss(t.id);
          }}
        >
          {name}
        </Button>
        <Button
          color="white"
          onClick={() => {
            toast.dismiss(t.id);
          }}
        >
          Cerrar
        </Button>
      </div>
    </span>
  );
}
