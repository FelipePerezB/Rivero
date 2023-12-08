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

export default function AddAdminBtn() {
  const clickHandler = () => {
    toast((t) => (
      <div className="flex flex-col gap-2">
        <StandardInput
          placeholder="juan@email.com"
          onBlur={async (email) => {
            if (!email) return;
            const { data: user } = (await api(`users/email/${email}`)) as {
              data: User;
            };
            toast((t) => (
              <Alert
                name="Añadir"
                message="¿Seguro que quieres añadirlo?"
                t={t}
                callback={async () => {
                  await clerkClient.users.updateUserMetadata(user.externalId, {
                    publicMetadata: { role: Role.ADMIN },
                  });
                }}
              />
            ));

            console.log(email);
            toast.dismiss(t?.id);
          }}
          name="Nombre"
          dataKey="name"
        />
      </div>
    ));
  };
  return (
    <TableBtn onClick={clickHandler}>
      <span>Añadir</span>
      <FontAwesomeIcon className="h-3 w-3" icon={faPlus} />
    </TableBtn>
  );
}
