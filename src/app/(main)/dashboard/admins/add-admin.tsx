import React from "react";
import addAdmin from "./actions/add-admin";
import { SendBtn } from "../../organizations/[id]/[group]/components/forms/Invite";
import StandardInput from "@components/form/StandardInput/StandardInput";

export default function AddAdminBtn() {
  return (
    <form action={addAdmin} className="flex gap-3 flex-col">
      <StandardInput
        placeholder="juan@gmail.com"
        name="email"
      />
      <SendBtn/>
    </form>
  );
}
