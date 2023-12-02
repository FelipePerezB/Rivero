'use client'
import Button from "@components/common/buttons/button/button";
import React from "react";
import createAlert from "@components/admin/create-alert/create-alert";

export default function CreateGroupBtn({
  organizationId,
}: {
  organizationId: string;
}) {
  return (
    <Button
      onClick={() =>
        createAlert({ endpoint: "groups", values: { organizationId } })
      }
    >
      Crear grupo
    </Button>
  );
}
