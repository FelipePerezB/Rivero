import { SetStateAction, useEffect, useState } from "react";
import { Component } from "src/pages/docs/edit/[id]";
import { onEditProps } from "src/utils/create-doc/onEdit";
import GetComponent from "./get-component";
import CircleButton from "@components/button/circle-button/circle-button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClose, faPen } from "@fortawesome/free-solid-svg-icons";
import ComponentModal from "./modal";

const FormChildren = ({
  document,
  // onEdit,
  children,
  onChange,
}: // setChildren,
{
  onChange: (value: { [key: string]: Component[] }) => void;
  // onEdit?: (props: onEditProps) => void;
  document: Component;
  children?: Component[];
  // setChildren: React.Dispatch<SetStateAction<Component[]>>;
}) => {
  const [modalState, setModalState] = useState(false);
  const [component, setComponent] = useState<Component>();
  const [data, setData] = useState({});
  const onEdit = (data: any) => {
    console.log(data);
  };
  useEffect(() => {
    const newChild = data as { id?: string; options: {}; type: string };
    if (!children?.length || !newChild?.id) return;
    const newChildIndex = children?.findIndex(
      (child) => child.id === newChild.id
    );
    if (!newChildIndex && newChildIndex === -1) return;
    children[newChildIndex] = newChild;
    onChange && onChange({ children });
  }, [data]);
  return (
    <section className="flex basis-4 flex-col gap-2">
      {children?.map(({ type, id, options }) => (
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
                setComponent({ type, options, id });
                setModalState(true);
              }}
            >
              <FontAwesomeIcon icon={faPen} />
            </CircleButton>
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
      {component?.id && (
        <ComponentModal
          {...{
            setData,
            document,
            modalState,
            setModalState,
            component,
            modalType: "edit",
            onEdit,
          }}
        />
      )}
    </section>
  );
};

export default FormChildren;
