import React, { useEffect, useState } from "react";
import styles from "@styles/SwitchToogle.module.css";

export default function SwitchToogle({
  createFormData,
}: {
  createFormData: (data: any) => void;
}) {
  const [state, setState] = useState(false);
  const handleToogle = () => {
    createFormData(!state);
    setState(!state);
  };

  return (
    <button onClick={handleToogle} className={styles["switch-toogle-" + state]}>
      <div></div>
    </button>
  );
}
