import Button from "@components/Button";
import Alert from "@components/alert/alert";
import { createMessages } from "@components/alert/alert-message";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useRouter } from "next/navigation";
import React from "react";
import toast from "react-hot-toast";
import api from "src/app/utils/api";

export default function CreateBtn({
  endpoint,
  name,
  tags,
  values,
  size = "sm",
}: {
  endpoint: string;
  name?: string;
  values: { [key: string]: unknown };
  tags: string[];
  size?: "md" | "sm";
}) {
  const router = useRouter();
  const create = () => {
    toast((t) => (
      <Alert
        name="Crear"
        message="¿Seguro que quieres crearlo?"
        t={t}
        callback={() => {
          console.log(endpoint);
          toast.promise(
            api(
              endpoint,
              { method: "POST", body: JSON.stringify({ ...values }) },
              tags
            ),
            createMessages
          );
        }}
      />
    ));
  };
  return (
    <Button
      onClick={() => {
        create();
        router.back();
      }}
      color={size === "sm" ? "transparent" : "blue"}
      size={size == "md" ? "sm" : "xs"}
    >
      Nuevo {name}
      <FontAwesomeIcon
        icon={faPlus}
        className={size === "sm" ? "h-2 w-2" : "h-3 w-3"}
      />
    </Button>
  );
}
