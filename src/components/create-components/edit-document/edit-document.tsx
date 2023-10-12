import React, { ReactNode, useState } from "react";
// import Sidevar from "src/layout/Sidevar";
import { DocumentJSON } from "src/models/document.model";
import { Privacity } from "@prisma/client";
import { Component } from "src/app/documents/edit/models/component";
import ToolBar from "src/app/documents/components/layout/tool-bar/tool-bar";
import ClientSidebar from "src/app/components/sidebar/client-sidebar";

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
  const [state, setState] = useState(false);
  const [visibility, setVisibility] = useState(false);
  return (
    <div className="p-4 pt-16 max-w-2xl mx-auto print:max-w-none print:p-0">
      <ToolBar
        setSettings={setSettings}
        settings={settings}
        title={settings?.file?.title}
      />
      {children}
      <ClientSidebar state={state} setState={setState}>
        <p>AAAAAA</p>
      </ClientSidebar>
    </div>
  );
}
