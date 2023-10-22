"use client";
import Button from "@components/Button";
import React, { FocusEventHandler } from "react";
import toast from "react-hot-toast";
import api from "src/app/utils/api";

export default function EditableLabel({
  endpoint,
  tags,
  text,
  updateBodyKey = "name",
  className,
  token,
}: {
  tags: string[]
  endpoint: string;
  text: string;
  updateBodyKey?: string;
  className?: string;
  token?: string | null;
}) {
  const onBlur = ({ target }: React.FocusEvent<HTMLDivElement, Element>) => {
    if (target.innerText === text || !target.innerHTML) return;
    toast((t) => (
      <span className="flex flex-col gap-2">
        ¿Seguro de querer cambiar el nombre de {text} a:{" "}?
        {`"${target.innerText}"`}
        <div className="flex gap-3.5">
          <Button
            onClick={() => {
              if (!token) return;
              toast.dismiss(t.id);
              toast.promise(
                api(endpoint, {
                  method: "PATCH",
                  headers: { Authorization: `Bearer ${token}` },
                  body: JSON.stringify({
                    [updateBodyKey]: target.innerText,
                  }),
                }, tags),
                {
                  error: "No se logró modificar el nombre",
                  loading: "Modificando nombre",
                  success: "¡Nombre modificado correctamente!",
                }
              );
              // updateName(target.innerText);
            }}
          >
            Cambiar nombre
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
    ));
  };

  return (
    <div
      className={className}
      onBlur={onBlur}
      contentEditable
      dangerouslySetInnerHTML={{ __html: `${text}` }}
    ></div>
  );
}
