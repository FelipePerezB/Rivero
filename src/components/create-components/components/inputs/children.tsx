import Button from "@components/Button";
import OptionsInput from "@components/inputs/OptionsInput/OptionsInput";
import { componentsNames } from "src/getDoc/utils/getComponent";
import Modal from "@components/modals/modal/Modal";
import { ReactNode, SetStateAction, useEffect, useMemo, useState } from "react";
import { onDeleteProps } from "src/utils/create-doc/onDelete";
import { onEditProps } from "src/utils/create-doc/onEdit";
import { Component } from "src/pages/docs/edit/[id]";
import GetComponent from "@components/create-components/edit-document/get-component";
import getInputs from "src/utils/create-doc/getInputs";
import generateRandomId from "src/utils/generateRandomId";
import CircleButton from "@components/button/circle-button/circle-button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClose, faPen } from "@fortawesome/free-solid-svg-icons";
import Buttons from "@components/button/buttons/Buttons";
import ComponentModal from "@components/create-components/edit-document/modal";
import Preview from "@components/create-components/edit-document/preview";

const ChildrenPreview = ({
  childrenArray,
  document,
  onDelete,
  onEdit,
  setCurrentChildren,
}: {
  onDelete: (props: onDeleteProps) => void;
  onEdit: (props: onEditProps) => void;
  document: Component;
  childrenArray: Component[];
  setCurrentChildren: React.Dispatch<SetStateAction<Component[]>>;
}) => {
  const [modalState, setModalState] = useState(false);
  const [component, setComponent] = useState<Component>();
  return (
    <section className="flex basis-4 flex-col gap-2 py-2">
      {childrenArray?.map(({ type, id, options }) => (
        <article
          key={`modal-item-${id}`}
          className=" w-full border-2 rounded-sm flex justify-between items-center"
        >
            <div className="flex">
              <GetComponent
                folder="documents"
                attrs={{ options, type, id }}
                name={type}
              />
            </div>
          <div className="flex gap-2 border-l-2 py-0.5 px-1.5">
            <CircleButton
              onClick={() => {
                setModalState(true);
                setComponent({ type, options, id });
              }}
            >
              <FontAwesomeIcon icon={faPen} />
            </CircleButton>
            <CircleButton
              onClick={() =>
                setCurrentChildren((children) =>
                  children.filter((child) => child.id !== id)
                )
              }
            >
              <FontAwesomeIcon icon={faClose} />
            </CircleButton>
          </div>
        </article>
      ))}
      {component?.id && (
        <ComponentModal
          {...{
            document,
            modalState,
            setModalState,
            component,
            modalType: "edit",
            onDelete,
            onEdit,
          }}
        />
      )}
    </section>
  );
};

export default function Children({
  value,
  onChange,
  parentId,
  document,
  types,
  onDelete,
  onEdit,
  setParentModalState,
}: {
  types?: string[];
  onDelete: (props: onDeleteProps) => void;
  onEdit: (props: onEditProps) => void;
  document: Component;
  value?: Component[];
  parentId: string;
  onChange: (value: { [key: string]: Component[] }) => void;
  setParentModalState: React.Dispatch<SetStateAction<boolean>>;
}) {
  const [currentChildren, setCurrentChildren] = useState<Component[]>(
    value || []
  );
  console.log(currentChildren);
  const [modalState, setModalState] = useState(false);
  const [inputs, setInputs] = useState<ReactNode>();
  const [attrs, setAttrs] = useState<Component>({
    options: {},
    type: "",
    id: `${parentId}-${generateRandomId(4)}`,
  });

  const create = () => {
    // if (value) onChange({ children: [...value, attrs] });
    currentChildren.push(attrs);
    setCurrentChildren([...currentChildren]);
    setModalState(false);
  };

  const node = useMemo(
    () => (
      <GetComponent attrs={{ ...attrs }} folder="documents" name={attrs.type} />
    ),
    [attrs]
  );
  return (
    <div>
      <ChildrenPreview
        {...{ document, setModalState, setCurrentChildren, onDelete, onEdit }}
        childrenArray={currentChildren}
      />
      <Buttons>
        <Button
          onClick={() => {
            onEdit &&
              onEdit({
                id: parentId,
                newProps: { children: currentChildren },
                page: document,
              });
            onChange && onChange({ children: currentChildren });
            setParentModalState && setParentModalState(false);
          }}
        >
          Guardar
        </Button>
        <Button color="white" onClick={() => setModalState(true)}>
          Agregar hijo
        </Button>
      </Buttons>
      <Modal {...{ modalState, setModalState }} title="Nuevo componente">
        <OptionsInput
          name="Tipo de componente"
          dataKey="type"
          onChange={({ type }) => {
            const isValid = componentsNames.includes(type);
            if (!isValid) return;
            setAttrs((attrs) => ({ ...attrs, type }));
            setInputs(
              getInputs(
                type,
                attrs,
                (data) =>
                  setAttrs((attrs) => ({
                    ...attrs,
                    options: { ...attrs.options, ...data },
                  })),
                true
              )
            );
          }}
          options={types?.length ? types : componentsNames}
        />
        <Preview {...{ attrs }} />
        {inputs && <section>{inputs}</section>}
        {attrs.type && <Button onClick={create}>Crear</Button>}
      </Modal>
    </div>
  );
}
