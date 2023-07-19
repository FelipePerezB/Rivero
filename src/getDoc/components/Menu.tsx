import NewCompModal from "../containers/NewCompModal";
import styles from "../styles/Doc.module.css";
import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faClose,
  faGear,
  faPlus,
} from "@fortawesome/free-solid-svg-icons";

type props = { type: string; options: any };

export default function Menu({
  deleteComponentCB,
  coords,
  setModalData,
  component,
  setModalType,
  modalType,
}: {
  modalType: string;
  coords: { x: number; y: number };
  component?: props;
  setModalData: any;
  setModalType: (type: "add" | "edit" | "addChild") => void;
  deleteComponentCB: (component: any) => void;
}) {
  const [modalState, setModalState] = useState(false);
  const openModal = (type: "add" | "edit" | "addChild") => {
    setModalState(true);
    setModalType(type);
  };

  const [menuState, setMenuState] = useState(true);

  useEffect(() => {
    setMenuState(true);
    const timeout = setTimeout(() => {
      setMenuState(false);
    }, 1500);

    return () => {
      clearTimeout(timeout);
    };
  }, [coords]);

  // console.log

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
              // style={{ background: "black" }}
              // className={styles.config}
            >
              {/* <span> */}
              <FontAwesomeIcon className={styles["config-btn__icon"]} icon={faGear} />
              {/* </span> */}
              {/* <span>Configurar</span> */}
            </p>
            {component && (
              <p
                // style={{ background: "white" }}
                onClick={() => deleteComponentCB(component)}
                // style={style.delete}
                className={styles["delete-btn"]}
              >
                <FontAwesomeIcon  className={styles["icon"]} icon={faClose} />
                {/* <span>Eliminar</span> */}
              </p>
            )}
            {component?.options?.childrens && (
              <p
                // style={{ background: "white" }}
                onClick={() => openModal("addChild")}
                // style={{background: "#5066e8"}}
                className={styles["add-btn"]}
              >
                <FontAwesomeIcon icon={faPlus}  className={styles["icon"]}/>
                {/* <span>Añadir</span> */}
              </p>
            )}
          </div>
        )}
        <NewCompModal
          setModalData={setModalData}
          modalState={modalState}
          setModalState={setModalState}
          selectedComponent={modalType === "edit" ? component : undefined}
        />
      </>,
      document.querySelector("#modal") as HTMLDivElement
    );
  } else return <></>
}
