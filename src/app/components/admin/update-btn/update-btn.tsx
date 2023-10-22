"use client";
import Button from "@components/Button";
import Alert from "@components/alert/alert";
import { updateMessages } from "@components/alert/alert-message";
import { useRouter } from "next/navigation";
import React, { ReactNode } from "react";
import toast from "react-hot-toast";
import api from "src/app/utils/api";

export default function UpdateBtn({
  name,
  endpoint,
  values,
  tags,
}: {
  values: { [key: string]: string };
  name?: string;
  endpoint: string;
  tags?: string[];
}) {
  const router = useRouter();
  const save = () => {
    toast((t) => (
      <Alert
        t={t}
        callback={() => {
          toast.promise(
            api(
              endpoint,
              { method: "PATCH", body: JSON.stringify({ ...values }) },
              [endpoint]
            ),
            updateMessages
          );
        }}
      />
    ));
  };
  return (
    <Button
      onClick={() => {
        save();
        router.back()
      }}
    >
      Guardar
    </Button>
  );
}
