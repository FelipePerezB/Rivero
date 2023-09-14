import styles from "@styles/Button.module.css";
import { ButtonAttrs } from "src/models/StandartInputAttr";

export default function Button({
  children,
  style = "primary",
  onClick,
}: ButtonAttrs) {
  return (
    <div className={styles[style]}>
      <button type="button" onClick={onClick}>
        <span>{children}</span>
      </button>
    </div>
  );
}
