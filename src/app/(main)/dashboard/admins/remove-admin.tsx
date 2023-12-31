import Button from "@components/common/buttons/button/button";
import React from "react";
import removeAdmin from "./actions/remove-admin";

export default function RemoveAdmin({ id }: { id: string }) {
  const removeAdminWithId = removeAdmin.bind(null, id)
  return id ? (
    <form action={removeAdminWithId}>
      <Button type="submit" color="white">
        Remover administrador
      </Button>
    </form>
  ) : (
    <></>
  );
}
