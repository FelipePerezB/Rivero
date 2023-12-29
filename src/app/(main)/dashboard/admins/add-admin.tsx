"use client";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import addAdmin from "./actions/add-admin";
import { useFormStatus } from "react-dom";
import Loading from "@components/common/loading-spinner/loadding-spinner";
import { SendBtn } from "../organizations/[id]/[group]/components/forms/Invite";
import StandardInput from "@components/form/StandardInput/StandardInput";
const LoadingBtn = () => {
  const { pending, data } = useFormStatus();
  // if(data)
  return (
    <button title="Añadir">
      {pending ? <Loading /> : <FontAwesomeIcon icon={faPlus} />}
    </button>
  );
};

export default function AddAdminBtn() {
  return (
    <form action={addAdmin} className="flex gap-3 flex-col">
      <StandardInput
        placeholder="juan@gmail.com"
        name="email"
      />
      <SendBtn/>
      {/* <LoadingBtn /> */}
    </form>
  );
}
