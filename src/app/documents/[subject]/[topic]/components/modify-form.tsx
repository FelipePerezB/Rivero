"use client";
import React, { useState } from "react";
import DeleteBtn from "src/app/components/admin/delete-btn/delete-btn";
import UpdateBtn from "src/app/components/admin/update-btn/update-btn";

export default function ModifyForm({
  values,
  endpoint,
}: {
  endpoint: string;
  values: { [key: string]: string };
}) {
  return (
    <>

      <div className="flex gap-3">
        <UpdateBtn
          values={values}
          endpoint={endpoint}
          name={values?.name}
          tags={[endpoint]}
        />
        <DeleteBtn
          endpoint={endpoint}
          name={values?.name}
          size="md"
          tags={[endpoint]}
        />
      </div>
      {/* <Button size="lg" color="black">Crear}</Button> */}
    </>
  );
}
