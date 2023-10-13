import { useEffect, useState } from "react";
import CircleButton from "@components/button/circle-button/circle-button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClose, faPen } from "@fortawesome/free-solid-svg-icons";
import { Component } from "src/app/documents/edit/models/component";
import ClientModal from "src/app/components/modal/client-modal";
import Form from "./form";
import DynamicElement from "../../components/elements/files/dynamic-file";

const FormChildren = ({
  document,
  children,
  onChange,
}: {
  onChange: (value: { [key: string]: Component[] }) => void;
  document: Component;
  children?: Component[];
}) => {
  // const [data, setData] = useState({});
  // useEffect(() => {
  //   const newChild = data as { id?: string; options: {}; type: string };
  //   if (!children?.length || !newChild?.id) return;
  //   const newChildIndex = children?.findIndex(
  //     (child) => child.id === newChild.id
  //   );
  //   if (!newChildIndex && newChildIndex === -1) return;
  //   children[newChildIndex] = newChild;
  //   onChange && onChange({ children });
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, [data]);
  return (
    <section className="flex basis-4 flex-col gap-2">
      {children?.map(({ type, id, options }) => (
        <article
          key={`modal-item-${id}`}
          className=" w-full border-2 rounded-sm flex justify-between items-center"
        >
          <div className="flex">
            <DynamicElement attrs={{ options, type, id }} name={type} />
          </div>
          <div className="flex gap-2 border-l-2 py-0.5 px-1.5">
            <CircleButton
              onClick={() =>
                onChange &&
                onChange({
                  children: children.filter((child) => child.id !== id),
                })
              }
            >
              <FontAwesomeIcon icon={faClose} />
            </CircleButton>
          </div>
        </article>
      ))}
    </section>
  );
};

export default FormChildren;
