'use client'
import Button from "@components/common/buttons/button/button";
import React from "react";
import createAlert from "@components/admin/create-alert/create-alert";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";

export default function CreateGroupBtn({
  organizationId,
}: {
  organizationId: string;
}) {
  return (
    <Button
    color="transparent"
      onClick={() =>
        createAlert({ endpoint: "groups", values: { organizationId } })
      }
    >
      Crear grupo <FontAwesomeIcon icon={faPlus} className="h-3 w-3"/>
    </Button>
  );
}
