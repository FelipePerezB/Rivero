"use client";

import Button from "@components/common/buttons/button/button";
import Section from "@components/containers/section";
import React, { FormEvent, useRef, useState } from "react";
import { readImage } from "./actions/r";
import api from "src/utils/api";
import { atob } from "buffer";

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

      reader.onload = async (event) => {
        // console.time()
        if (event.target && typeof event.target.result === "string") {
          console.log(event.target.result);
          const base64String = event.target.result.split(",")[1];
          console.log(base64String);
          const { data } = await api("scores/omr", {
            method: "POST",
            body: JSON.stringify({ image: base64String }),
          });

          setAnswers(JSON.stringify(data));
          // Aquí puedes hacer lo que quieras con la cadena base64, como enviarla a un servidor, mostrarla en una imagen, etc.
        }
      };
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
            <input type="file" name="image" accept=".png" />
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
