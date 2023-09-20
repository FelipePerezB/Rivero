/* eslint-disable react-hooks/exhaustive-deps */
import styles from "../styles/Doc.module.css";
import onEdit from "src/utils/create-doc/onEdit";
import React, { SetStateAction, useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClose, faGear, faPlus } from "@fortawesome/free-solid-svg-icons";
import onDelete from "src/utils/create-doc/onDelete";
import { Component } from "src/pages/docs/edit/[id]";
import getNode from "src/utils/create-doc/getNode";
import iterateObj from "src/utils/create-doc/iterateObject";
import ComponentModal from "@components/create-components/edit-document/modal";

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
  }, [divRef?.current]);

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
    console.log(documentComponent);
    callback();
    console.log(documentComponent);
    setDocument({ ...documentComponent });
  };


  if (coords?.x && coords?.y) {
    return createPortal(
      <>
        {coords?.y && coords?.x && "a" && (
          <div
            style={{ top: coords?.y + "px", left: coords?.x + "px" }}
            className={`${
              styles["menu-btns"] 
            } print:opacity-0 hover:opacity-100 hover:translate-x-0 hover:flex transition-all duration-200 ${
              menuState ? "opacity-100 flex" : "opacity-5 translate-x-[100vw] transition-transform duration-1000"
            }`}
          >
            <p
              onClick={() => {
                setModalType("edit");
                setModalState(true);
              }}
              id="menu"
              className={styles["config-btn"]}
            >
              <FontAwesomeIcon
                className={styles["config-btn__icon"]}
                icon={faGear}
              />
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
                className={styles["delete-btn"]}
              >
                <FontAwesomeIcon className={styles["icon"]} icon={faClose} />
              </p>
            )}
            {component?.options?.children && (
              <p
                onClick={() => {
                  setModalType("addChild");
                  setModalState(true);
                }}
                className={styles["add-btn"]}
              >
                <FontAwesomeIcon icon={faPlus} className={styles["icon"]} />
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
      </>,
      document.querySelector("#modal") as HTMLDivElement
    );
  } else return <></>;
}
