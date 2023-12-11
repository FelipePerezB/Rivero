/* eslint-disable react-hooks/exhaustive-deps */
"use client";
import React, { useEffect, useRef, useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import { NoteWithComponent } from "../models/component";
import Layout from "./layout";
import Toolbar from "./toolbar";
import { hydrateJSON } from "../utils/hydrateJSON";
import ScreenLayout from "src/app/(main)/subjects/components/layout/screen-layout";
import DynamicElement from "src/app/(main)/subjects/components/elements/files/dynamic-file";
import { Types } from "@prisma/client";
import { getDefaultFile } from "src/hooks/useGetFile";
import Alert from "@components/common/alert/alert";
import { removeIdFromObject } from "../utils/removeId";

const hydrate = (document: NoteWithComponent["file"], id: string) => {
  const copyDocument = JSON.parse(JSON.stringify(document));
  return {
    ...document,
    content: hydrateJSON(copyDocument.content),
    externalId: id,
  };
};

export default function EditWraper({
  id,
  document,
}: {
  id: string;
  document: NoteWithComponent["file"] | undefined;
}) {
  const [isLocalFile, setIsLocalFile] = useState(false);
  const [settings, setSettings] = useState<
    NoteWithComponent["file"] | undefined
  >(undefined);
  const divRef = useRef<HTMLDivElement>(null);
  const { name, externalId, content } = settings ?? {};
  const type = Types.DOCUMENT;

  useEffect(() => {
    if ("serviceWorker" in navigator) {
      console.log("AAA")
        navigator.serviceWorker
          .register("/service-worker.js")
          .then((registration) => {
            console.log("Service worker registered:", registration);
          })
          .catch((error) => {
            console.log("Service worker registration failed:", error);
          });
    }
  },[] );

  useEffect(() => {
    const storageDocument = JSON.parse(
      localStorage.getItem(`document-${id}`) ?? "{}"
    ) as NoteWithComponent["file"];
    if (document?.content) {
      if (
        JSON.stringify(storageDocument) !== JSON.stringify(document) &&
        storageDocument?.content?.id
      ) {
        setIsLocalFile(true);
        setSettings(hydrate(storageDocument, id));
        toast((t) => (
          <Alert
            name="Sobrescribir"
            message="Error al sincronizar"
            t={t}
            callback={() => {
              setIsLocalFile(false);
              return setSettings(hydrate(document, id));
            }}
          />
        ));
        return;
      } else return setSettings(hydrate(document, id));
    } else if (storageDocument.externalId) {
      setIsLocalFile(true);
      return setSettings(hydrate(storageDocument, id));
    } else return setSettings(getDefaultFile(id));
  }, [id]);

  useEffect(() => {
    if (!content?.id) return;
    localStorage.setItem(
      `document-${externalId}`,
      JSON.stringify({
        ...settings,
        content: removeIdFromObject(JSON.parse(JSON.stringify(content))),
      })
    );
  }, [settings]);

  return (
    <Layout
      isLocalFile={isLocalFile}
      settings={settings}
      setSettings={
        setSettings as React.Dispatch<
          React.SetStateAction<NoteWithComponent["file"]>
        >
      }
    >
      <div
        className="flex flex-1 flex-col gap-3 p-4  h-full w-full mx-auto max-w-5xl"
        ref={divRef}
      >
        {externalId && name && content && type && (
          <ScreenLayout>
            <DynamicElement
              attrs={{ ...content, name, type, editMode: true }}
              name={content.type}
            />
          </ScreenLayout>
        )}
      </div>
      {divRef.current && settings?.externalId && (
        <Toolbar
          divRef={divRef ?? undefined}
          setSettings={
            setSettings as React.Dispatch<
              React.SetStateAction<NoteWithComponent["file"]>
            >
          }
          settings={settings as NoteWithComponent["file"]}
        />
      )}
      <Toaster />
    </Layout>
  );
}
