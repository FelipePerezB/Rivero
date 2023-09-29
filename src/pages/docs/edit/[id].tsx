/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useRef, useState } from "react";
import Layout, {
  configAttrs,
} from "@components/create-components/edit-document/edit-document";
import GetComponent from "@components/create-components/edit-document/get-component";
import { hydrateJSON } from "src/utils/create-doc/hydrate.JSON";
import Menu from "src/getDoc/components/Menu";
import lzsString from "lz-string";

const res = {
  subject: "matemática",
  topic: "álgebra",
  subtopic: "modelos lineales",
  document: {
    id: "qbxoYMthcK7XlTWyt6L8u7ZdXTEMHUXf",
    title: "sistema de ecuaciones",
    privacity: "private" as configAttrs["privacity"],
    content: {
      type: "document",
      options: {
        children: [
          {
            type: "page",
            options: {
              number: 1,
              children: [
                {
                  type: "title",
                  options: {
                    text: "Titulo 1",
                    size: "h1",
                  },
                },
              ],
            },
          },
          {
            type: "page",
            options: {
              number: 1,
              children: [
                {
                  type: "title",
                  options: {
                    text: "Sistema ecuaciones",
                    size: "h1",
                  },
                },
              ],
            },
          },
        ],
      },
    },
  },
};

export interface ComponentOptions {
  children?: Component[];
  [key: string]: unknown;
}

export interface Component {
  type: string;
  id?: string;
  options: ComponentOptions;
}
export default function EditDoc() {
  const [documentObj, setDocumentObj] = useState<Component>();
  const { content, privacity, title, id } = res.document;
  const [config, setConfig] = useState<configAttrs>({
    title,
    privacity,
    id,
    content,
  });
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
    if (!documentObj?.id) setDocumentObj(hydrateJSON(res.document.content));
    resize();
    window.onresize = resize;
  }, []);

  return (
    <Layout document={documentObj} config={config} setDocument={setDocumentObj}>
      <div ref={divRef} className="w-full">
        {!!documentObj?.id && (
          <GetComponent
            folder="documents"
            name={documentObj?.type}
            attrs={{ ...documentObj, title }}
          />
        )}
      </div>
      {divRef.current && (
        <Menu
          divRef={divRef || undefined}
          {...{
            documentComponent: documentObj,
            setDocument: setDocumentObj,
          }}
        />
      )}
    </Layout>
  );
}
