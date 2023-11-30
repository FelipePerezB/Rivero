/* eslint-disable react-hooks/exhaustive-deps */
"use client";
import React, { useEffect, useRef, useState } from "react";
import { Toaster } from "react-hot-toast";
import { NoteWithComponent } from "../models/component";
import Layout from "./layout";
import Toolbar from "./toolbar";
import { hydrateJSON } from "../utils/hydrateJSON";
import ScreenLayout from "src/app/subjects/components/layout/screen-layout";
import DynamicElement from "src/app/subjects/components/elements/files/dynamic-file";
// import Document from "../../components/elements/files/document";
// import { hydrateJSON } from "../utils/hydrateJSON";
// import DynamicElement from "../../components/elements/files/dynamic-file";
// import ScreenLayout from "../../components/layout/screen-layout";

export default function EditWraper({
  id,
  document,
}: {
  id: string;
  document: any;
}) {
  const [settings, setSettings] = useState<NoteWithComponent>(document);
  const divRef = useRef<HTMLDivElement>(null);
  // const resize = () => {

  //   const $container = divRef.current;
  //   if (!$container) return;
  //   const pixels = 13;
  //   const width = 450;
  //   const containerWidth = $container.clientWidth;
  //   const fontSize = (pixels / width) * Number(containerWidth);
  //   $container.style.fontSize = fontSize + "px";
  // };
  const {
    file: { name, externalId, content },
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
    // resize();
    // window.onresize = resize;
  }, [id]);

  console.log(document)

  useEffect(() => {
    localStorage.setItem(`document-${externalId}`, JSON.stringify(settings));
  }, [settings]);

  return (
    <Layout settings={settings} setSettings={setSettings}>
      <div className="h-full w-full" ref={divRef}>
        {externalId && name && type && (
          <ScreenLayout>
            <DynamicElement
              attrs={{ ...content, name,type, editMode: true }}
              name={content.type}
            />
          </ScreenLayout>
        )}
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
