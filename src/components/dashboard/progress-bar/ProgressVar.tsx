// import styles from "@styles/ProgressVar.module.css";

export const ProgressVar = ({
  progress,
  size = "sm",
  color = "var(--primary-color)",
}: {
  size?: "sm" | "md" 
  progress: number;
  color?: string;
}) => {
  return (
    <div className={`${size === "md" ?  "h-1.5" : "h-1"} w-full bg-gray-100 rounded-full overflow-hidden`}>
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
      <span className="flex gap-3.5 items-center">
        <ProgressVar color={color} progress={progress} />
        <span className="text-sm font-light">{text}</span>
      </span>
      {label && <p>{label}</p>}
    </div>
  );
};
