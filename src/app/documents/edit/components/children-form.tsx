/* eslint-disable react-hooks/exhaustive-deps */
import { useState } from "react";
import { Component } from "src/app/documents/edit/models/component";
import DynamicElement from "../../components/elements/files/dynamic-file";
import StandardInput from "@components/inputs/StandardInput/StandardInput";
import ClientModal from "src/app/components/modal/client-modal";
import Form from "./form";

const FormChildren = ({
  children,
  onChange,
}: {
  onChange: (value: { [key: string]: Component[] }) => void;
  children?: Component[];
}) => {
  const [filter, setFilter] = useState("");
  const [modalState, setModalState] = useState(false);
  const [component, setComponent] = useState<Component>();

  const changeChild = (component: Component) => {
    const newChild = component as { id?: string; options: {}; type: string };
    if (!children?.length || !newChild?.id) return;
    const newChildIndex = children?.findIndex(
      (child) => child.id === newChild.id
    );
    if (!newChildIndex && newChildIndex === -1) return;
    children[newChildIndex] = newChild;
    onChange && onChange({ children });
    setModalState(false);
  };

  const deleteChild = (component: Component) => {
    const newChild = component as { id?: string; options: {}; type: string };
    if (!children?.length || !newChild?.id) return;
    const newChildIndex = children?.findIndex(
      (child) => child.id === newChild.id
    );
    if (!newChildIndex && newChildIndex === -1) return;
    children.splice(newChildIndex, 1);
    onChange && onChange({ children });
    setModalState(false);
  };

  const filteredChildren = children?.filter(({ options }) => {
    if (!filter) return true;
    const [key, expectedValue] = filter
      .split(":")
      .map((element) => element?.trim()?.toLowerCase());
    const childValue = String(options[key]);
    if (key && !expectedValue.length && childValue) return true;
    return childValue?.toLowerCase()?.includes(expectedValue);
  });

  return (
    <section className="flex flex-col gap-2">
      {children?.length ? (
        <StandardInput
          attrs={{ placeholder: "Atributo: valor" }}
          name=""
          dataKey="filter"
          onBlur={(search) => setFilter(search)}
        />
      ) : (
        <></>
      )}
      {children &&
        filteredChildren?.map(({ type, id, options }) => (
          <article
            onClick={() => {
              setComponent({ type, options, id });
              setModalState(true);
            }}
            key={`modal-item-${id}`}
            className="w-full border-2 text-xs rounded-md flex justify-center items-center p-2 cursor-pointer hover:bg-slate-50"
          >
            <DynamicElement attrs={{ options, type, id }} name={type} />
          </article>
        ))}
      {component?.id && modalState && (
        <ClientModal
          state={modalState}
          setState={setModalState}
          title="Editar componente"
        >
          <Form
            defaultValues={{ ...component?.options }}
            id={component?.id}
            type={component.type}
            onDelete={deleteChild}
            onSave={changeChild}
          />
        </ClientModal>
      )}
    </section>
  );
};

export default FormChildren;
