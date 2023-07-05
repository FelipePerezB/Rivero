import React, { useEffect, useState } from "react";
import styles from "../styles/ConfigButton.module.css";
import { createPortal } from "react-dom";
// import NewCompModal from "../containers/NewCompModal";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGear, faPlusCircle } from "@fortawesome/free-solid-svg-icons";
import Modal from "./Modal";
import { IconProp } from "@fortawesome/fontawesome-svg-core";

export default function ConfigButton({
  icon,
  callback,
}: {
  callback: (data: any) => void;
  icon: IconProp;
}) {
  const [loaded, setLoaded] = useState<any>();
  const [modalState, setModalState] = useState(false);

  useEffect(() => {
    setLoaded(true);
  }, []);

  if (loaded)
    return createPortal(
      <>
        <button
          className={styles["config-button"]}
          onClick={() => setModalState(true)}
        >
          <FontAwesomeIcon
            onClick={() => setModalState(true)}
            color="white"
            className={styles["config-button__icon"]}
            icon={icon}
          />
        </button>
        <Modal
          callback={callback}
          modalState={modalState}
          setModalState={setModalState}
          title="Crear documento"
          options={[
            {
              text: "Curso",
              type: "select",
              selectConfig: [
                "4° Medio",
                "3° Medio",
                "2° Medio",
                "1° Medio",
                "Todos",
              ],
            },
            {
              type: "select",
              text: "Asignatura",
              selectConfig: ["Matemática", "Otro"],
            },
            {
              type: "select",
              text: "Eje",
              selectConfig: ["Geometria", "Algebra", "Otro"],
            },
            {
              type: "text",
              text: "Nombre",
            },
          ]}
        ></Modal>
      </>,
      document.querySelector("#modal") as HTMLDivElement
    );
  return <></>;
}
