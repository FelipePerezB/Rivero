// "use client";
/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useRef, useState } from "react";
import Layout from "@components/create-components/edit-document/edit-document";
import GetComponent from "@components/create-components/edit-document/get-component";
import { hydrateJSON } from "src/utils/create-doc/hydrateJSON";
import Menu from "@components/create-components/edit-document/menu";
import useGetFile from "src/hooks/useGetFile";
// import { useRouter } from "next/router";
import { DocumentJSON } from "src/models/document.model";
import Document from "@components/create-components/components/documents/document";
import { Toaster } from "react-hot-toast";
import EditWraper from "../components/edit-wraper";
// import { Toaster } from "react-hot-toast";

export interface ComponentOptions {
  children?: Component[];
  [key: string]: unknown;
}

export interface Component {
  type: string;
  id?: string;
  options: ComponentOptions;
}
export default async function EditFilePage({
  params: { id },
}: {
  params: { id: string };
}) {
  const file = await useGetFile(id);

  return <>
  <EditWraper document={file} id={id} />;
  </>
}
