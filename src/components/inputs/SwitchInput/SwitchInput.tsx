/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect } from "react";
import styles from "./SwitchInput.module.css";
import createFormData from "src/utils/createFormData";
import { capFirst } from "src/utils/capFirst";

export default function SwitchInput({
  value,
  onChange,
  name,
}: {
  name: string;
  value?: boolean;
  onChange: (data: any) => void;
}) {
  const [state, setState] = useState(value || false);
  useEffect(() => {
    createFormData(name, state, onChange);
  }, [state]);

  const handleToogle = () => {
    setState(!state);
  };
  return (
    <div>
      <span>{capFirst(name)}</span>
      <span className={styles.boleean}>
        <button
          type="button"
          onClick={handleToogle}
          className={styles["switch-toogle-" + state]}
        >
          <div></div>
        </button>
        <span>{String(state)}</span>
      </span>
    </div>
  );
}
