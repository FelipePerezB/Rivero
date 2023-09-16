import { faPen } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";
import Modal from "@components/modals/modal/Modal";
import Form from "@components/forms/simpleForm/SimpleForm";
import { StandartInputAttrs } from "src/models/StandartInputAttr";
import { FetchResult } from "@apollo/client";
import toast from "react-hot-toast";
import capFirst from "src/utils/capFirst";
import { useUser } from "@clerk/nextjs";
import { ButtonAttrs } from "@components/Button";
import CircleButton from "../circle-button/circle-button";

export default function EditButton({
  editMode,
  onUpdate,
  onRemove,
  onCreate,
  value,
  label,
  childLabel,
  isPublic = false,
}: {
  onUpdate: (name: string) => Promise<FetchResult>;
  onRemove?: () => Promise<FetchResult>;
  onCreate?: (name: string) => Promise<FetchResult>;
  label: string;
  value?: string;
  editMode: boolean;
  childLabel?: string;
  isPublic?: boolean;
}) {
  const { user } = useUser();
  const role = user?.publicMetadata.role as string | undefined;
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
      error: `No se ha logrado remover esta ${label}`,
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
        color: "blue",
        onClick: update,
      },
    ] as ButtonAttrs[],
  } as formPageType;

  onRemove &&
    firstPage.buttons.push({
      children: "Eliminar",
      color: "red",
      onClick: remove,
    });

  data.push(firstPage);
  onCreate &&
    childLabel &&
    data.push({
      title: `Añadir ${childLabel}`,
      inputs: [{ name: `${childLabel}`, dataKey: "name" }],
      buttons: [
        { children: "Añadir", color: "blue", onClick: create },
      ] as ButtonAttrs[],
    });

  return (
    <>
      {((role === "ADMIN" || isPublic) && editMode) && (
        <>
          <CircleButton
            onClick={(event) => {
              event.preventDefault();
              setModalState(true);
            }}
          >
            <FontAwesomeIcon
              style={editMode ? { display: "block" } : { display: "none" }}
              icon={faPen}
            />
          </CircleButton>
          <Modal {...{ modalState, setModalState, title }}>
            <Form {...{ data }} />
          </Modal>
        </>
      )}
    </>
  );
}
