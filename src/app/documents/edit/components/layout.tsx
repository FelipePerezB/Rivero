import React, { ReactNode } from "react";
// import { NoteWithComponent } from "src/app/subjects/edit/models/component";
import Navar from "src/app/(main)/subjects/components/layout/tool-bar/tool-bar";
import { Toaster } from "react-hot-toast";
import { NoteWithComponent } from "../models/component";

export default function EditDocumentLayout({
  isLocalFile,
  settings,
  children,
  setSettings,
}: {
  isLocalFile: boolean,
  settings?: NoteWithComponent["file"];
  setSettings: React.Dispatch<React.SetStateAction<NoteWithComponent["file"]>>;
  children: ReactNode;
}) {
  return (
    <div className="min-h-screen flex flex-col h-max bg-body text-black">
      {/* <div className="flex flex-col bg-body text-black max-w-2xl mx-auto  w-full h-full print:max-w-none"> */}
      <Navar
      isLocalFile={isLocalFile}
        setSettings={
          setSettings as React.Dispatch<
            React.SetStateAction<NoteWithComponent["file"]>
          >
        }
        settings={settings}
        name={settings?.name as string}
      />
      {children}
    </div>
  );
}
