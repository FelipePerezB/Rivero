// import styles from "@styles/ProgressVar.module.css";

export const ProgressVar = ({
  progress,
  color = "var(--primary-color)",
}: {
  progress: number;
  color?: string;
}) => {
  return (
    <div className="h-2 w-full bg-gray-100 rounded-full overflow-hidden">
      <div
        style={{ width: `${progress}%`}}
        className={"bg-blue-500 h-full rounded-full transition-all duration-900"}
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
      {label && <p className={""}>{label}</p>}
    </div>
  );
};
