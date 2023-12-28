import React from "react";
import { LessonWithComponent } from "src/app/documents/edit/models/component";

export default function EditableTitle({
  settings,
  setSettings,
}: {
  settings: LessonWithComponent["file"];
  setSettings: React.Dispatch<React.SetStateAction<LessonWithComponent["file"]>>;
}) {
  console.log(settings)
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
