import { ReactNode } from "react";
import styles from "./blur.module.css";

export default function Blur({
  show,
  CloseWrapper,
}: {
  show: boolean;
  CloseWrapper: React.FC<{ children: ReactNode }>;
}) {
  return (
    <CloseWrapper>
      <div
        className={` cursor-default fixed z-40 top-0 left-0 opacity-0 h-screen w-screen bg-slate-900/50 transition-opacity duration-500
        ${
          show
            ? `opacity-100 ${styles["blur-open"]}`
            : `opacity-0 scale-0 ${styles["blur-close"]}`
        }`}
      ></div>
    </CloseWrapper>
  );
}
