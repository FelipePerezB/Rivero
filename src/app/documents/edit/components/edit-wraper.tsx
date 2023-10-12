/* eslint-disable react-hooks/exhaustive-deps */
"use client";
import React, { useEffect, useRef, useState } from "react";
import { hydrateJSON } from "src/utils/create-doc/hydrateJSON";
import Menu from "@components/create-components/edit-document/menu";
import Document from "@components/create-components/components/documents/document";
import { Toaster } from "react-hot-toast";
import { NoteWithComponent } from "../models/component";
import Layout from "../components/layout";
import Toolbar from "./toolbar";

export default function EditWraper({
  id,
  document,
}: {
  id: string;
  document: any;
}) {
  const [settings, setSettings] = useState<NoteWithComponent>(document);
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
  const {
    file: { title, externalId },
    type,
  } = settings ?? {};

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

  return (
    <Layout settings={settings} setSettings={setSettings}>
      <div
        ref={divRef}
        className="absolute top-0 left-0 pt-[70px] w-[calc(100vw-32px)] max-w-xl translate-x-[calc(50vw-50%)]"
      >
        <div className="print:text-[calc(100vw*(13/450))]">
          {externalId && title && type && (
            <Document title={title} id={externalId} type={type} />
          )}
        </div>
      </div>
      {divRef.current && (
        <Toolbar
          divRef={divRef ?? undefined}
          setSettings={setSettings} 
          settings={settings}
        />
      )}
      <Toaster />
    </Layout>
  );
}