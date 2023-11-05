/* eslint-disable react-hooks/exhaustive-deps */
import { useState } from "react";
import { Component } from "src/app/documents/edit/models/component";
// import DynamicElement from "../../components/elements/files/dynamic-file";
import StandardInput from "@components/inputs/StandardInput/StandardInput";
import ClientModal from "src/app/components/modal/client-modal";
import Form from "./form";
import DynamicElement from "src/app/subjects/components/elements/files/dynamic-file";
import iterateObj from "../utils/iterateObj";
import Button from "@components/Button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronCircleUp, faUpLong } from "@fortawesome/free-solid-svg-icons";

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

  console.log(children);

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
        filteredChildren?.map(({ type, id, options }, i) => {
          return (
            <article
              key={`modal-item-${id}`}
              className="w-full border-2 text-xs rounded-md flex justify-center items-center p-2 cursor-pointer hover:bg-slate-50"
            >
              <div className="relative w-full">
                <Button
                  color="white"
                  onClick={(event) => {
                    event.preventDefault();
                    const child = children.find(
                      ({ id: childId }) => childId === id
                    );
                    if (!child?.id) return;
                    const childIndex = children.findIndex(
                      ({ id: childId }) => childId === id
                    );
                    if (childIndex <= 0) return;
                    children.splice(childIndex, 1);
                    children.splice(childIndex - 1, 0, child);
                    onChange && onChange({ children });
                  }}
                  className="absolute top-0 right-0 z-30"
                >
                  <FontAwesomeIcon className="h-3 w-3" icon={faUpLong} />
                </Button>
                <div
                  className="w-full inline-block"
                  onClick={() => {
                    setComponent({ type, options, id });
                    setModalState(true);
                  }}
                >
                  <DynamicElement attrs={{ options, type, id }} name={type} />
                </div>
              </div>
            </article>
          );
        })}
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
