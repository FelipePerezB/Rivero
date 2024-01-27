"use client";
import update from "@components/admin/update-btn/update";
import React, { FormEvent, ReactNode, useRef, useState } from "react";

export default function ClientForm({
  names,
  endpoint,
  callback,
  children,
}: {
  names: string[];
  endpoint?: string;
  children: ReactNode;
  callback?: (value: unknown)=>unknown
}) {
  const formRef = useRef(null);
  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();
    if (!formRef.current) return;
    const formData = new FormData(formRef.current);
    const data = {};
    names.forEach((name) =>
      Object.assign(data, { ...data, ...{ [name]: formData.get(name) } })
    );
    const values = data;
    endpoint && update(endpoint, values);
    callback && callback(data)
  };
  return (
    <form ref={formRef} onSubmit={handleSubmit} className="flex flex-col gap-3">
      {children}
    </form>
  );
}
