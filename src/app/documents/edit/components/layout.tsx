import React, { ReactNode } from "react";
// import { NoteWithComponent } from "src/app/subjects/edit/models/component";
import Navar from "src/app/subjects/components/layout/tool-bar/tool-bar";
import { Toaster } from "react-hot-toast";
import { NoteWithComponent } from "../models/component";

export default function EditDocumentLayout({
  settings,
  children,
  setSettings,
}: {
  settings: NoteWithComponent;
  setSettings: React.Dispatch<React.SetStateAction<NoteWithComponent>>;
  children: ReactNode;
}) {
  return (
    <div className="p-4 pt-16 max-w-2xl mx-auto print:max-w-none print:p-0">
      <Navar
        setSettings={setSettings}
        settings={settings}
        name={settings?.file.name as string}
      />
      {children}
    </div>
  );
}
