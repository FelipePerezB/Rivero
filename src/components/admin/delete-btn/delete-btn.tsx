"use client";
import Alert from "@components/common/alert/alert";
import { deleteMessages } from "@components/common/alert/alert-message";
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useRouter } from "next/navigation";
import React from "react";
import toast from "react-hot-toast";
import api from "src/utils/api";
import Button from "../../common/buttons/button/button";

export default function DeleteBtn({
  name,
  endpoint,
  tags,
  size = "sm",
}: {
  size?: "sm" | "md" | "lg";
  name?: string;
  endpoint: string;
  tags?: string[];
}) {
  const isSm = size === "sm";
  // const router = useRouter();

  const deleteHandler = () => {
    toast((t) => (
      <Alert
        color="red"
        name="Eliminar"
        t={t}
        message={`¿Estas seguro de querer ${
          name ? `eliminar "${name}"` : "eliminarlo"
        }?`}
        callback={() => {
          toast.promise(
            api(endpoint, { method: "DELETE" }, tags),
            deleteMessages
          );
        }}
      />
    ));
  };


  return (
    <Button
      onClick={deleteHandler}
      color={isSm ? `transparent` : "red"}
      size={isSm ? "xs" : "sm"}
      title="Eliminar"
      key={"delete-btn"}
    >
      {isSm ? (
        <FontAwesomeIcon
          className={`h-3.5 w-3.5 ${isSm && "hover:text-red-500"}`}
          icon={faXmark}
        />
      ) : (
        "Eliminar"
      )}
    </Button>
  );
}
