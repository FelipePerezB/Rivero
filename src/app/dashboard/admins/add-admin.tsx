"use client";
import { clerkClient } from "@clerk/nextjs";
import update from "@components/admin/update-btn/update";
import Alert from "@components/common/alert/alert";
import TableBtn from "@components/dashboard/table/table-btn/table-btn";
import StandardInput from "@components/form/StandardInput/StandardInput";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Role, User } from "@prisma/client";
import React from "react";
import toast from "react-hot-toast";
import api from "src/utils/api";
import { useFormStatus } from 'react-dom'
import addAdmin from "./actions/add-admin";

export default function AddAdminBtn() {
  const { pending } = useFormStatus()
  console.log(pending)
  // const clickHandler = () => {
  //   toast((t) => (
  //     <div className="flex flex-col gap-2">
  //       <StandardInput
  //         placeholder="juan@email.com"
  //         onBlur={async (email) => {
  //           if (!email) return;
  //           const { data: user } = (await api(`users/email/${email}`)) as {
  //             data: User;
  //           };
  //           console.log(user);
  //           toast((t) => (
  //             <form action={() => addAdmin(user.externalId)}>
  //               <Alert
  //                 name="Añadir"
  //                 message="¿Seguro que quieres añadirlo?"
  //                 t={t}
  //                 // callback={}
  //               />
  //             </form>
  //           ));

  //           console.log(email);
  //           toast.dismiss(t?.id);
  //         }}
  //         name="Nombre"
  //         dataKey="name"
  //       />
  //     </div>
  //   ));
  // };
  return (
    <form action={addAdmin} className="flex gap-3">
      <input name="email"/>
      <button>A</button>
      {/* <TableBtn  onClick={clickHandler}>
        <span>Añadir</span>
        <FontAwesomeIcon className="h-3 w-3" icon={faPlus} />
      </TableBtn> */}
    </form>
  );
}
