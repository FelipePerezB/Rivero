import styles from "@styles/ProgressVar.module.css";

export const ProgressVar = ({
  progress,
  color = "var(--primary-color)",
}: {
  progress: number;
  color?: string;
}) => {
  return (
    <div className="h-2 w-full bg-slate-100 rounded-full">
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
  label
}: {
  size?: "lg" | "sm";
  progress: number;
  color?: string;
  label?: string
}) => {
  const text = `${progress}% ${size === "lg" ? "completado" : ""}`
  return (
    <div className="w-full">
      <span className="flex gap-3 items-center">
        <ProgressVar color={color} progress={progress} />
        <span>{text}</span>
      </span>
      {label && <p className={styles.label}>{label}</p>}
    </div>
  );
};
