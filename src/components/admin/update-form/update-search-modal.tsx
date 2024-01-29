import SearchModal from "@components/modal/search-modal";
import React, { ReactNode } from "react";
import UpdateForm from "./update-form";
import { Privacity } from "@prisma/client";
import Button, { ButtonAttrs } from "@components/common/buttons/button/button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPen } from "@fortawesome/free-solid-svg-icons";
import capFirst from "src/utils/capFirst";

export default function UpdateSearchModal({
  color,
  label,
  children,
  searchParams,
  endpoint,
  secondaryBtn,
  data,
}: {
  label: string,
  data: {
    name: string,
    privacity?: Privacity,
    id: string | number,
    [key: string]: unknown
  },
  color?: ButtonAttrs['color']
  children?: ReactNode;
  searchParams: { [key: string]: string };
  endpoint: string;
  secondaryBtn?: ReactNode;
}) {
  const modalId = `modify-${label}`;
  return (
    <>
      <Button color={color} href={`?modal=${modalId}`}>
        {capFirst(label)} <FontAwesomeIcon className="h-3 w-3" icon={faPen} />
      </Button>
      <SearchModal title={`Modificar ${label.toLowerCase()}`} searchParams={searchParams} id={modalId}>
        {children}
        <UpdateForm
          endpoint={endpoint}
          // id={String(data.id)}
          name={data?.name}
          privacity={data?.privacity}
          secondaryBtn={secondaryBtn}
        />
      </SearchModal>
    </>
  );
}
