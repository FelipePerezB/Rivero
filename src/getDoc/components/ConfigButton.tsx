import React, { useEffect, useState } from "react";
import styles from "../styles/ConfigButton.module.css";
import { createPortal } from "react-dom";
import NewCompModal from "../containers/NewCompModal";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGear, faPlusCircle } from "@fortawesome/free-solid-svg-icons";

export default function ConfigButton({
  component,
  setComponent,
}: {
  component: any;
  setComponent: any;
}) {
  const [modalData, setModalData] = useState<any>();
  const [loaded, setLoaded] = useState<any>();
  const [modalState, setModalState] = useState(false);

  useEffect(() => {
    if (modalData) setComponent({ ...modalData });
  }, [modalData, setComponent]);

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
            icon={faGear}
          />
        </button>
        <NewCompModal
          setModalData={setModalData}
          modalState={modalState}
          setModalState={setModalState}
          selectedComponent={component}
        />
      </>,
      document.querySelector("#modal") as HTMLDivElement
    );
  return <></>;
}
