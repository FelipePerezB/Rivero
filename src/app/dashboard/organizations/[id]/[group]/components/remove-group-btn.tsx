"use client";
// import Button from "@components/common/buttons/button/button";
import React from "react";
import removeGroup from "../../../actions/remove-group";
import Button from "@components/common/buttons/button/button";
import { useFormStatus } from "react-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import Loading from "@components/common/loading-spinner/loadding-spinner";

const RemoveButton = () => {
  const { pending } = useFormStatus();
  return (
    <Button type="submit" color="white">
      Eliminar del grupo
      {pending ? (
        <Loading />
      ) : (
        <FontAwesomeIcon className="h-3 w-3" icon={faXmark} />
      )}
    </Button>
  );
};
export default function RemoveGroupBtn({
  email,
  group,
}: {
  email: string;
  group: string;
}) {
  const removeGroupWithMetadata = removeGroup.bind(null, { email, group });
  return (
    <form action={removeGroupWithMetadata}>
      <RemoveButton />
    </form>
  );
}
