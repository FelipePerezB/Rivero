"use client";

import Button from "@components/common/buttons/button/button";
import Section from "@components/containers/section";
import React, { FormEvent, useRef, useState } from "react";
import { readImage } from "./actions/r";
import api from "src/utils/api";
import { atob } from "buffer";
import toast from "react-hot-toast";

export default function UserScore({
  params: { evaluation, group, organization, subject },
}: {
  params: { [key: string]: string };
}) {
  const formRef = useRef(null);
  const [answers, setAnswers] = useState("");

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();
    if (!formRef.current) return;
    const formData = new FormData(formRef.current);
    const img = formData.get("image") as File;
    if (img) {
      console.log(img);
      const reader = new FileReader();
      reader.onload = (event) => {
        if (event.target && typeof event.target.result === "string") {
          const imgElement = new Image();
          imgElement.src = event.target.result;

          imgElement.onload = () => {
            const canvas = document.createElement("canvas");
            const context = canvas.getContext("2d");

            if (context) {
              canvas.width = imgElement.width;
              canvas.height = imgElement.height;
              context.drawImage(
                imgElement,
                0,
                0,
                imgElement.width,
                imgElement.height
              );

              // Convierte la imagen a formato PNG
              const base64String = canvas.toDataURL("image/png").split(",")[1];
              console.log(base64String);
              toast.promise(
                api("scores/omr", {
                  method: "POST",
                  cache: "no-store",
                  body: JSON.stringify({ image: base64String }),
                }).then(({ data }) => setAnswers(JSON.stringify(data))),
                { error: "Error", loading: "Subiendo...", success: "A" }
              );
              // Ahora base64String contiene la representación de la imagen en formato PNG
            }
          };
        }
      };

      // reader.onload = async (event) => {
      //   // console.time()
      //   if (event.target && typeof event.target.result === "string") {
      //     console.log(event.target.result);
      //     const base64String = event.target.result.split(",")[1];
      //     console.log(base64String);

      //     // Aquí puedes hacer lo que quieras con la cadena base64, como enviarla a un servidor, mostrarla en una imagen, etc.
      //   }
      // };
      reader.readAsDataURL(img);
    }
  };

  return (
    <>
      <Section>
        <form
          ref={formRef}
          onSubmit={handleSubmit}
          encType="multipart/form-data"
        >
          <p>
            Sube un archivo:
            <input type="file" name="image" accept="png" />
            <input type="submit" value="Enviar datos" />
          </p>
        </form>
      </Section>
      <Section>
        <p>{answers}</p>
      </Section>
    </>
  );
}
