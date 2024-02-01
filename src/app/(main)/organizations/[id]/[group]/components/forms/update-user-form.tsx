import React from "react";
import DeleteBtn from "@components/admin/delete-btn/delete-btn";
import TextInput from "@components/form/text-input";
import ClientForm from "@components/form/client-form";
import Button from "@components/common/buttons/button/button";

export default function UpdateUserForm({
  email,
  lastname,
  name,
}: {
  email?: string;
  lastname?: string;
  name?: string;
}) {
  return (
    <ClientForm names={["name", "lastname"]} endpoint={`users/email/${email}`}>
      <TextInput attrs={{ readOnly: true }} value={email} name="email" />
      <TextInput value={name} name="name" />
      <TextInput value={lastname} name="lastname" />
      <div className="flex gap-3">
        <Button type="submit">Actualizar</Button>
        <DeleteBtn endpoint={`users/email/${email}`} size="md" />
      </div>
    </ClientForm>
  );
}
