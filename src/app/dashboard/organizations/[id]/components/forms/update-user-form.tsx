"use client";
import Button from "@components/Button";
import StandardInput from "@components/inputs/StandardInput/StandardInput";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import toast from "react-hot-toast";
import CreateBtn from "src/app/components/admin/create-btn/create-btn";
import UpdateBtn from "src/app/components/admin/update-btn/update-btn";
// import StandardInput from "src/app/components/inputs/standard";
import api from "src/app/utils/api";

export default function UpdateUserForm({
  email,
  lastname,
  name,
}: {
  email?: string;
  lastname?: string;
  name?: string;
}) {
  const [newLastname, setNewLastname] = useState(lastname);
  const [newName, setNewName] = useState(name);
  return (
    <form className="flex flex-col gap-4">
      <StandardInput attrs={{ readOnly: true }} value={email} name="Correo" />
      <StandardInput onBlur={setNewName} value={name} name="Nombre" />
      <StandardInput onBlur={setNewLastname} value={lastname} name="Apellido" />
      <UpdateBtn
        endpoint={`users/email/${email}`}
        values={{ name: newName, lastname: newLastname }}
      />
    </form>
  );
}
