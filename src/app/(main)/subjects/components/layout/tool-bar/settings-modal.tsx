import ClientModal from "@components/modal/client-modal";
import React from "react";
import TextInput from "../../elements/inputs/text";
import Form from "src/app/documents/edit/components/form";
import {
  Component,
  NoteWithComponent,
} from "src/app/documents/edit/models/component";

export default function SettingsModal({
  modalState,
  settings,
  setSettings,
  setModalState,
}: {
  settings?: NoteWithComponent["file"];
  setSettings: React.Dispatch<React.SetStateAction<NoteWithComponent["file"]>>;
  modalState: boolean;
  setModalState: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  if (!settings?.content) return <></>;
  const updateContent = (component: Component) => {
    setSettings({ ...settings, content: component });
    setModalState(false);
  };
  const { content } = settings;

  return modalState ? (
    <ClientModal
      setState={setModalState}
      state={modalState}
      title="Editar archivo"
    >
      <Form
        id={content?.id}
        modalState={modalState}
        setModalState={setModalState}
        defaultValues={{ ...content?.options }}
        type={content?.type}
        onSave={updateContent}
      />
    </ClientModal>
  ) : (
    <></>
  );
}
