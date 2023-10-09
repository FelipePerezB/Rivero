/* eslint-disable react-hooks/exhaustive-deps */
// import styles from "./styles/menu.module.css";
import React, { SetStateAction, useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClose, faGear, faPlus } from "@fortawesome/free-solid-svg-icons";
import ComponentModal from "@components/create-components/edit-document/modal";
import { Component } from "../../models/component";
import iterateObj from "../../utils/iterateObj";
import onDelete from "../../utils/onDelete";
import onEdit from "../../utils/onEdit";
import getNode from "../../utils/getNode";

type props = { type: string; options: any; id: string };

export default function Menu({
  // coords,
  // component,
  divRef,
  documentComponent,
  setDocument,
}: {
  divRef?: React.RefObject<HTMLDivElement>;
  documentComponent?: Component;
  setDocument: React.Dispatch<SetStateAction<Component | undefined>>;
  setModalData?: any;
}) {
  const [menuState, setMenuState] = useState(false);
  const [modalState, setModalState] = useState(false);
  const [modalType, setModalType] = useState<"edit" | "addChild">("edit");
  const [component, setComponent] = useState<Component>();
  const [coords, setCoords] = useState<{ x?: number; y?: number }>({});

  useEffect(() => {
    if (divRef?.current)
      divRef.current.onclick = (event) => {
        const node = getNode(event.target as HTMLElement);
        const id = node?.dataset.component;
        if (id && documentComponent) {
          const getComponent = (obj?: Component) => {
            obj && setComponent(obj);
            setCoords({
              x: event.clientX,
              y: event.clientY,
            });
          };
          iterateObj(id, documentComponent, getComponent);
        }
      };
  }, [divRef?.current, documentComponent]);

  useEffect(() => {
    setMenuState(true);
    const timeOut = setTimeout(() => {
      setMenuState(false);
    }, 1500);
    return () => {
      clearInterval(timeOut);
    };
  }, [coords.x, coords.y]);

  const edit = (callback: () => void) => {
    if (!documentComponent?.id) return;
    callback();
    setDocument({ ...documentComponent });
  };

  if (coords?.x && coords?.y) {
    <>
      {coords?.y && coords?.x && "a" && (
        <div
          style={{ top: coords?.y + "px", left: coords?.x + "px" }}
          className={`
            // styles["menu-btns"]
           print:opacity-0 hover:opacity-100 hover:translate-x-0 hover:flex transition-all duration-200 ${
             menuState
               ? "opacity-100 flex"
               : "opacity-5 translate-x-[100vw] transition-transform duration-1000"
           }`}
        >
          <p
            onClick={() => {
              setModalType("edit");
              setModalState(true);
            }}
            id="menu"
            className={"config-btn"}
          >
            <FontAwesomeIcon className={"config-btn__icon"} icon={faGear} />
          </p>
          {component?.id && documentComponent?.id && (
            <p
              onClick={() => {
                edit(
                  () =>
                    component.id &&
                    onDelete({ id: component.id, page: documentComponent })
                );
              }}
              className={"delete-btn"}
            >
              <FontAwesomeIcon className={"icon"} icon={faClose} />
            </p>
          )}
          {component?.options?.children && (
            <p
              onClick={() => {
                setModalType("addChild");
                setModalState(true);
              }}
              className={"add-btn"}
            >
              <FontAwesomeIcon icon={faPlus} className={"icon"} />
            </p>
          )}
        </div>
      )}
      {documentComponent?.id && component?.id && (
        <ComponentModal
          {...{
            onEdit: (data) => {
              edit(() => {
                component.id && onEdit(data);
              });
            },
            document: documentComponent,
            modalState,
            setModalState,
            component,
            modalType,
            onDelete: (data) => {
              edit(() => onDelete(data));
            },
          }}
        />
      )}
    </>;
  } else return <></>;
}
