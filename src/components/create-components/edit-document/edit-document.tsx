import React, { ReactNode, useState } from "react";
import Sidevar from "src/layout/Sidevar";
import { DocumentJSON } from "src/models/document.model";
import { Privacity } from "@prisma/client";
import { Component } from "src/app/documents/edit/models/component";

export type configAttrs = {
  title: string;
  id: string;
  privacity: Privacity;
  content: Component;
};


export default function EditDocumentLayout({
  settings,
  children,
  document,
  setSettings,
}: {
  settings: DocumentJSON;
  setSettings: React.Dispatch<React.SetStateAction<DocumentJSON>>;
  document?: Component;
  children: ReactNode;
}) {
  const [modalState, setModalState] = useState(false);
  const [visibility, setVisibility] = useState(false);
  return (
    <div className="p-4 pt-16 max-w-2xl mx-auto print:max-w-none print:p-0">
      <Navar {...{ setModalState, setVisibility, settings, setSettings }} />
      {children}
      <div>

      </div>
      <Sidevar {...{ setVisibility, visibility }} />
    </div>
  );
}
