"use client";
import Button from "@components/common/buttons/button/button";
import React, { FocusEventHandler } from "react";
import toast from "react-hot-toast";
import update from "@components/admin/update-btn/update";
import api from "src/utils/api";

export default function EditableLabel({
  endpoint,
  text,
  updateBodyKey = "name",
  className,
}: {
  endpoint: string;
  text: string;
  updateBodyKey?: string;
  className?: string;
}) {
  const onBlur = ({ target }: React.FocusEvent<HTMLDivElement, Element>) => {
    if (target.innerText === text || !target.innerHTML) return;
    update(endpoint, { [updateBodyKey]: target.innerText });
  };

  return (
    <div
      className={className}
      onBlur={onBlur}
      contentEditable
      dangerouslySetInnerHTML={{ __html: `${text}` }}
    ></div>
  );
}
