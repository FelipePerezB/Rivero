import React from "react";
import { NoteWithComponent } from "src/app/documents/edit/models/component";

export default function EditableTitle({
  settings,
  setSettings,
}: {
  settings: NoteWithComponent["file"];
  setSettings: React.Dispatch<React.SetStateAction<NoteWithComponent["file"]>>;
}) {
  return (
    <div
      contentEditable
      dangerouslySetInnerHTML={{ __html: `${settings?.name}` }}
      onBlur={({ target }) =>
        setSettings({ ...settings, name: target.innerText })
      }
      className="text-lg font-bold"
    ></div>
  );
}
