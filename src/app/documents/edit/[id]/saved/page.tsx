"use client";
import React, { useEffect, useState } from "react";
import EditWraper from "../../components/edit-wraper";

export default function SavedDocument({
  searchParams,
  params: { id },
}: {
  searchParams: { [key: string]: string };
  params: { id: string };
}) {
  const [file, setFile] = useState();
  useEffect(() => {
    setFile(JSON.parse(localStorage.getItem(`document-${id}`) ?? "{}"));
  }, []);
  return file ? <EditWraper document={file} id={id} /> : <></>;
}
