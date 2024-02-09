import ClientModal from "@components/modal/client-modal";
import React from "react";
import TextInput from "../../elements/inputs/text";
import Form from "src/app/documents/edit/components/form";
import {
  Component,
  LessonWithComponent,
} from "src/app/documents/edit/models/component";
import toast from "react-hot-toast";
import Alert from "@components/common/alert/alert";
import api from "src/utils/api";
import { deleteMessages } from "@components/common/alert/alert-message";
import specifics from "src/app/documents/edit/utils/schemas/specifics";

export default function SettingsModal({
  modalState,
  settings,
  setSettings,
  setModalState,
}: {
  settings?: LessonWithComponent["file"];
  setSettings: React.Dispatch<
    React.SetStateAction<LessonWithComponent["file"]>
  >;
  modalState: boolean;
  setModalState: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  if (!settings?.content) return <></>;
  const updateContent = (component: Component) => {
    setSettings({ ...settings, content: component });
    setModalState(false);
  };
  const { content } = settings;


  let types;
  try {
    types = specifics[content?.type as "document"]?.at(0)?.options?.types;
    
  } catch (error) {
    
  }

  console.log(types)

  return modalState ? (
    <ClientModal
      setState={setModalState}
      state={modalState}
      title="Editar archivo"
    >
      <Form
        onDelete={() => {
          toast((t) => (
            <Alert
              t={t}
              callback={() => {
                toast.promise(
                  api(`files/${settings?.externalId}`, { method: "DELETE" }),
                  deleteMessages
                );
              }}
              color="red"
              message="¿Seguro que quieres eliminar el archivo?"
              name="Eliminar"
            />
          ));
        }}
        types={['section']}
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
