// "use client";
import Button from "@components/common/buttons/button/button";
import StandardInput from "@components/form/StandardInput/StandardInput";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import toast from "react-hot-toast";
import CreateBtn from "@components/admin/create-btn/create-btn";
import DeleteBtn from "@components/admin/delete-btn/delete-btn";
import UpdateBtn from "@components/admin/update-btn/update-btn";
// import StandardInput from "src/app/components/inputs/standard";
import api from "src/utils/api";

export default function UpdateUserForm({
  email,
  lastname,
  name,
}: {
  email?: string;
  lastname?: string;
  name?: string;
}) {
  // const [newLastname, setNewLastname] = useState(lastname);
  // const [newName, setNewName] = useState(name);
  return (
    <form className="flex flex-col gap-4">
      {/* <StandardInput attrs={{ readOnly: true }} value={email} name="Correo" />
      <StandardInput onBlur={setNewName} value={name} name="Nombre" />
      <StandardInput onBlur={setNewLastname} value={lastname} name="Apellido" />
      <div className="flex gap-3">
        <UpdateBtn
          endpoint={`users/email/${email}`}
          values={{ name: newName, lastname: newLastname }}
        />
        <DeleteBtn endpoint={`users/email/${email}`} size="md"/>
      </div> */}
    </form>
  );
}
