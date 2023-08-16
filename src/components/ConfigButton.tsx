import React, { useEffect, useState } from "react";
import styles from "../styles/ConfigButton.module.css";
import { createPortal } from "react-dom";
// import NewCompModal from "../containers/NewCompModal";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGear, faPlusCircle } from "@fortawesome/free-solid-svg-icons";
import Modal, { FormModal } from "./Modal";
import { IconProp } from "@fortawesome/fontawesome-svg-core";
import CustomModal from "./CustomModal";

export default function ConfigButton({
  schema = [],
  setData,
  icon,
  callback,
}: {
  callback?: () => any;
  schema?: {}[];
  setData?: (value: any) => void;
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
          onClick={() => {
            callback && callback();
            schema && setData && setModalState(true);
          }}
        >
          <FontAwesomeIcon
            color="white"
            className={styles["config-button__icon"]}
            icon={icon}
          />
        </button>
        {schema && setData && (
          <FormModal
            setData={setData}
            schema={schema}
            modalState={modalState}
            setModalState={setModalState}
            title="Crear documento"
          />
        )}
      </>,
      document.querySelector("#modal") as HTMLDivElement
    );
  return <></>;
}
