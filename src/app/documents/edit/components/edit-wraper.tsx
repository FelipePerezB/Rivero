"use client";
/* eslint-disable react-hooks/exhaustive-deps */
import React, { ReactNode, useEffect, useRef, useState } from "react";
import Layout from "@components/create-components/edit-document/edit-document";
import GetComponent from "@components/create-components/edit-document/get-component";
import { hydrateJSON } from "src/utils/create-doc/hydrateJSON";
import Menu from "@components/create-components/edit-document/menu";
import useGetFile from "src/hooks/useGetFile";
// import { useRouter } from "next/router";
import { DocumentJSON } from "src/models/document.model";
import Document from "@components/create-components/components/documents/document";
import { Toaster } from "react-hot-toast";
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
export default function EditWraper({
  id,
  document,
}: {
  id: string;
  document: any;
}) {

  const [settings, setSettings] = useState<DocumentJSON>(document);
  const divRef = useRef<HTMLDivElement>(null);
  const resize = () => {
    const $container = divRef.current;
    if (!$container) return;
    const pixels = 13;
    const width = 450;
    const containerWidth = $container.clientWidth;
    const fontSize = (pixels / width) * Number(containerWidth);
    $container.style.fontSize = fontSize + "px";
  };

  useEffect(() => {
    setSettings({
      ...settings,
      file: {
        ...settings.file,
        content: hydrateJSON(document.file.content),
        externalId: id,
      },
    });
    resize();
    window.onresize = resize;
  }, [id]);

  console.log(document);

  return (
    <Layout
      document={settings.file.content}
      settings={settings}
      setSettings={setSettings}
    >
      <div
        ref={divRef}
        className="absolute top-0 left-0 pt-[70px] w-[calc(100vw-32px)] max-w-xl translate-x-[calc(50vw-50%)]"
      >
        <div className="print:text-[calc(100vw*(13/450))]">
          {!!settings?.file.externalId && (
            <Document
              {...({
                ...settings.file.content,
                title: settings?.file?.title,
              } as any)}
            />
          )}
        </div>
      </div>
      {divRef.current && (
        <Menu
          divRef={divRef || undefined}
          {...{
            settings,
            documentComponent: settings.file.content,
            setSettings,
          }}
        />
      )}
      <Toaster />
    </Layout>
  );
}
