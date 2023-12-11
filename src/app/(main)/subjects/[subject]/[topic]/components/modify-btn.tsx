import { currentUser } from "@clerk/nextjs";
import Button from "@components/common/buttons/button/button";
import { faPen } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Role } from "@prisma/client";
import React from "react";

export default async function ModifyBtn({
  subject,
  topic,
}: {
  topic: string;
  subject: string;
}) {
  const user = await currentUser();
  const role = user?.publicMetadata?.role;
  return role === Role.ADMIN ? (
    <Button href={`/dashboard/subjects/${subject}/${topic}`}>
      Modificar <FontAwesomeIcon className="w-3 h-3" icon={faPen} />
    </Button>
  ) : (
    <></>
  );
}
