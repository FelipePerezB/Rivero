import Button from "@components/Button";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";

export default function OpenCreateModal() {
  return (
    <Button href="?modal=create">
      Nuevo <FontAwesomeIcon className="w-3 h-3" icon={faPlus} />
    </Button>
  );
}
