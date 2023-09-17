import { ReactNode } from "react";
import Blur from "../blur/blur";

export default function ModalContainer({
  setVisibility,
  visibility,
  children,
}: {
  visibility: boolean;
  setVisibility: React.Dispatch<React.SetStateAction<boolean>>;
  children: ReactNode;
}) {
  return (
    <div className="fixed top-0 left-0 h-full">
      <Blur {...{ setVisibility, visibility }} />
      <article
        className={`${
          visibility ? "" : "-translate-x-96"
        } rounded-md p-4 h-[100dvh] w-80 bg-white fixed top-4 left-4 z-50 transition-all duration-500`}
      >
        {children}
      </article>
    </div>
  );
}
