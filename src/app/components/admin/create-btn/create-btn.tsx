import Button from "@components/Button";
import Alert from "@components/alert/alert";
import { createMessages } from "@components/alert/alert-message";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useRouter } from "next/navigation";
import React from "react";
import toast from "react-hot-toast";
import api from "src/app/utils/api";
import create from "./create";

export default function CreateBtn({
  endpoint,
  name,
  values,
  size = "sm",
}: {
  endpoint: string;
  name?: string;
  values: { [key: string]: unknown };
  size?: "md" | "sm";
}) {
  const router = useRouter();

  return (
    <Button
      onClick={() => {
        create(endpoint, values);
        router.back();
      }}
      color={size === "sm" ? "transparent" : "blue"}
      size={size == "md" ? "sm" : "xs"}
    >
      Crear {name}
      {!!(size === "sm") && (
        <FontAwesomeIcon
          icon={faPlus}
          className={size === "sm" ? "h-2 w-2" : "h-3 w-3"}
        />
      )}
    </Button>
  );
}
