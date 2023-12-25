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
  isLocalFile: boolean;
  settings?: NoteWithComponent["file"];
  setSettings: React.Dispatch<React.SetStateAction<NoteWithComponent["file"]>>;
  children: ReactNode;
}) {
  return (
    <div>
      <Navar
        isLocalFile={isLocalFile}
        setSettings={
          setSettings as React.Dispatch<
            React.SetStateAction<NoteWithComponent["file"]>
          >
        }
        settings={settings}
      />
      {children}
    </div>
  );
}
