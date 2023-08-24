import styles from "@styles/ProgressVar.module.css";

export const ProgressVar = ({
  progress,
  color = "var(--primary-color)",
}: {
  progress: number;
  color?: string;
}) => {
  return (
    <div className={styles["progress-container"]}>
      <div
        style={{ width: `${progress}%`, background: color }}
        className={styles.progress}
      ></div>
    </div>
  );
};
export const CompletedProgress = ({
  progress,
  size = "sm",
  color = "var(--primary-color)",
}: {
  size?: "lg" | "sm";
  progress: number;
  color?: string;
}) => {
  const text = `${progress}% ${size === "lg" ? "completado" : ""}`
  return (
    <div className={styles[size]}>
      <span className={styles["completed-progress"]}>
        <ProgressVar color={color} progress={progress} />
        <span>{text}</span>
      </span>
    </div>
  );
};
