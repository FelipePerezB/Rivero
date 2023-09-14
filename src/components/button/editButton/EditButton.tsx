import { SizeProp } from "@fortawesome/fontawesome-svg-core";
import { faPen } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import styles from "./EditButton.module.css";
import { useState } from "react";
import Modal from "@components/modals/modal/Modal";
import Form from "@components/forms/simpleForm/SimpleForm";
import { ButtonAttrs, StandartInputAttrs } from "src/models/StandartInputAttr";
import { FetchResult } from "@apollo/client";
import toast, { Toaster } from "react-hot-toast";
import capFirst from "src/utils/capFirst";

export default function EditButton({
  size = "1x",
  editMode,
  onUpdate,
  onRemove,
  onCreate,
  value,
  label,
  childLabel,
}: {
  onUpdate: (name: string) => Promise<FetchResult>;
  onRemove?: () => Promise<FetchResult>;
  onCreate?: (name: string) => Promise<FetchResult>;
  label: string;
  value?: string;
  size?: SizeProp;
  editMode: boolean;
  childLabel?: string;
}) {
  const [modalState, setModalState] = useState(false);
  const title = `Editar ${label}`;
  const update = async ({ name }: { name: string }) => {
    if (!onUpdate) return;
    toast.promise(onUpdate(name), {
      loading: `Actualizando ${label}...`,
      error: `No se ha podido actualizar el ${label}`,
      success: `¡${capFirst(label)} actualizado correctamente a "${name}"!`,
    });
    setModalState(false);
  };

  const remove = async () => {
    if (!onRemove) return;
    toast.promise(onRemove(), {
      loading: `Eliminando ${label}...`,
      error: `No se ha podido eliminar el ${label}`,
      success: `¡${capFirst(label)} eliminado correctamente!`,
    });
    setModalState(false);
  };

  const create = async ({ name }: { name: string }) => {
    console.log(name);
    if (!onCreate || !childLabel || !name) return;
    toast.promise(
      onCreate(name).then(({ errors }) => {
        console.log(errors);
      }),
      {
        loading: `Creando ${childLabel}...`,
        error: `No se ha podido crear el ${childLabel} "${name}"`,
        success: `¡${capFirst(childLabel)} "${name}" creado correctamente!`,
      }
    );

    setModalState(false);
  };

  type formPageType = {
    title: string;
    inputs: StandartInputAttrs[];
    buttons: ButtonAttrs[];
  };

  const data = [] as formPageType[];
  const firstPage = {
    title: "Modificar",
    inputs: [{ name: "Nombre", dataKey: "name", value }],
    buttons: [
      {
        children: "Modificar",
        style: "small-active",
        onClick: update,
      },
    ] as ButtonAttrs[],
  } as formPageType;

  onRemove &&
    firstPage.buttons.push({
      children: "Eliminar",
      style: "small",
      onClick: remove,
    });

  data.push(firstPage);
  onCreate &&
    childLabel &&
    data.push({
      title: `Añadir ${childLabel}`,
      inputs: [{ name: `${childLabel}`, dataKey: "name" }],
      buttons: [
        { children: "Añadir", style: "small-active", onClick: create },
      ] as ButtonAttrs[],
    });

  return (
    <>
      <FontAwesomeIcon
        onClick={(event) => {
          event.preventDefault();
          setModalState(true);
        }}
        size={size}
        style={editMode ? { display: "block" } : { display: "none" }}
        className={styles["edit-icon"]}
        icon={faPen}
      />
      <Modal {...{ modalState, setModalState, title }}>
        <Form {...{ data }} />
      </Modal>
    </>
  );
}
