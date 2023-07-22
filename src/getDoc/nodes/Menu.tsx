import NewCompModal from "../containers/NewCompModal";
import styles from "../styles/Doc.module.css";
import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClose, faGear, faPlus } from "@fortawesome/free-solid-svg-icons";

type props = { type: string; options: any };

export default function Menu({
  deleteComponentCB,
  coords,
  setModalData,
  component,
  // setModalType,
  // modalType,
}: {
  addChild: (component: props, newChild: props) => void;
  // modalType: string;
  coords: { x: number; y: number };
  component?: props;
  setModalData: any;
  // setModalType: (type: "add" | "edit" | "addChild") => void;
  deleteComponentCB: (component: any) => void;
}) {
  const [selectedComponent, setSelectedComponent] = useState<props | undefined>(undefined);
  const [modalState, setModalState] = useState(false);
  const [menuState, setMenuState] = useState(true);

  const openModal = (type: "add" | "edit" | "addChild") => {
    if(type === "edit") setSelectedComponent(component)
    setModalState(true);
    // setModalType(type);
  };

  useEffect(() => {
    setMenuState(true);
    const timeout = setTimeout(() => {
      setMenuState(false);
    }, 1500);

    return () => {
      clearTimeout(timeout);
    };
  }, [coords]);

  if (coords?.x && coords?.y) {
    return createPortal(
      <>
        {coords?.y && coords?.x && menuState && (
          <div
            style={{ top: coords?.y + "px", left: coords?.x + "px" }}
            className={styles["menu-btns"]}
          >
            <p
              onClick={() => openModal("edit")}
              id="menu"
              className={styles["config-btn"]}
            >
              <FontAwesomeIcon
                className={styles["config-btn__icon"]}
                icon={faGear}
              />
            </p>
            {component && (
              <p
                onClick={() => deleteComponentCB(component)}
                className={styles["delete-btn"]}
              >
                <FontAwesomeIcon className={styles["icon"]} icon={faClose} />
              </p>
            )}
            {component?.options?.childrens && (
              <p
                onClick={() => openModal("addChild")}
                className={styles["add-btn"]}
              >
                <FontAwesomeIcon icon={faPlus} className={styles["icon"]} />
              </p>
            )}
          </div>
        )}
        <NewCompModal
          setModalData={setModalData}
          modalState={modalState}
          setModalState={setModalState}
          selectedComponent={selectedComponent}
        />
      </>,
      document.querySelector("#modal") as HTMLDivElement
    );
  }
}
