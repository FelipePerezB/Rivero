"use client";
import { useRouter } from "next/navigation";
import React from "react";
import update from "./update";
import Button from "../../common/buttons/button/button";

export default function UpdateBtn({
  name,
  endpoint,
  values,
}: {
  values: { [key: string]: unknown };
  name?: string;
  endpoint: string;
}) {
  const router = useRouter();
  return (
    <Button
      onClick={() => {
        update(endpoint, values);
        router.back();
      }}
    >
      Guardar
    </Button>
  );
}
