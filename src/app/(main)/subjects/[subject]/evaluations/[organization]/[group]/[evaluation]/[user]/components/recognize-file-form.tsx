"use client";
import { FormEvent, ReactNode, useRef } from "react";
import toast from "react-hot-toast";
import api from "src/utils/api";

export default function RecognizeFileForm({
  children,
  evaluationId,
  userId,
}: {
  children: ReactNode;
  evaluationId: string;
  userId: string;
}) {
  const formRef = useRef(null);
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

              const base64String = canvas.toDataURL("image/png").split(",")[1];

              console.log(base64String);
              toast.promise(
                api("scores/omr", {
                  method: "POST",
                  body: JSON.stringify({
                    image: base64String,
                    evaluationId,
                    userId,
                  }),
                }),
                {
                  error: "Error, suba otra foto",
                  loading: "Publicando...",
                  success: "¡Publicado correctamente!",
                }
              );
            }
          };
        }
      };
      reader.readAsDataURL(img);
    }
  };
  return (
    <form
      ref={formRef}
      onSubmit={handleSubmit}
      encType="multipart/form-data"
      className="flex flex-col gap-sm"
    >
      {children}
    </form>
  );
}
