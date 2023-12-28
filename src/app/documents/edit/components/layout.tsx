import React, { ReactNode } from "react";
// import { LessonWithComponent } from "src/app/subjects/edit/models/component";
import Navar from "src/app/(main)/subjects/components/layout/tool-bar/tool-bar";
import { Toaster } from "react-hot-toast";
import { LessonWithComponent } from "../models/component";

export default function EditDocumentLayout({
  isLocalFile,
  settings,
  children,
  setSettings,
}: {
  isLocalFile: boolean;
  settings?: LessonWithComponent["file"];
  setSettings: React.Dispatch<React.SetStateAction<LessonWithComponent["file"]>>;
  children: ReactNode;
}) {
  return (
    <div>
      <Navar
        isLocalFile={isLocalFile}
        setSettings={
          setSettings as React.Dispatch<
            React.SetStateAction<LessonWithComponent["file"]>
          >
        }
        settings={settings}
      />
      {children}
    </div>
  );
}
