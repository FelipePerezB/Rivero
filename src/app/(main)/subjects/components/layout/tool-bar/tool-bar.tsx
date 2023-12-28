import { useUser } from "@clerk/nextjs";
import { faGear } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useState } from "react";
import ShareBtn from "./share-btn";
import { LessonWithComponent } from "src/app/documents/edit/models/component";
import SettingsModal from "./settings-modal";
import MenuBtn from "./menu-btn";
import SyncAlert from "./syncAlert";
import SyncBtn from "./sync-btn";
import EditableTitle from "./editable-title";
import Item from "./item";

export default function Navar({
  isLocalFile,
  settings,
  setSettings,
}: {
  isLocalFile: boolean;
  settings?: LessonWithComponent["file"];
  setSettings: React.Dispatch<React.SetStateAction<LessonWithComponent["file"]>>;
}) {
  const [modalState, setModalState] = useState(false);
  const { user } = useUser();

  console.log(settings)

  return (
    <div className="print:hidden z-40 sticky top-0 left-0">
      <nav className="w-full h-max border-b shadow-sm bg-white print:hidden">
        <ul className="flex items-center justify-between h-full px-6 py-1.5">
          <li className="flex flex-col">
            {settings && (
              <div className="flex gap-2 items-center">
                <EditableTitle setSettings={setSettings} settings={settings} />
                <SyncAlert isLocalFile={isLocalFile} />
              </div>
            )}
            <SyncBtn settings={settings} />
          </li>
          <li className="flex items-center gap-4 md:gap-8">
            <button
              onClick={() => {
                setModalState(true);
              }}
            >
              <Item title="Settings">
                <FontAwesomeIcon icon={faGear} className="h-4 w-4" />
              </Item>
            </button>
            <ShareBtn setSettings={setSettings} settings={settings} />
            <MenuBtn imageUrl={user?.imageUrl} />
          </li>
        </ul>
      </nav>
      <SettingsModal
        modalState={modalState}
        settings={settings}
        setSettings={setSettings}
        setModalState={setModalState}
      />
    </div>
  );
}
