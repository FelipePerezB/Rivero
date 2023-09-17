import { ReactNode } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClose } from "@fortawesome/free-solid-svg-icons";
import { createPortal } from "react-dom";
import Blur from "../blur/blur";

export default function Modal({
  modalState,
  setModalState,
  children,
  title,
}: {
  modalState: boolean;
  title: string;
  setModalState: any;
  children?: ReactNode;
}) {
  return modalState ? (
    createPortal(
      <div
        key={title}
        className={`flex  z-40 fixed top-0 left-0 justify-center items-center w-full h-full`}
      >
        <Blur {...{ setVisibility: setModalState, visibility: modalState }} />
        <div
          className={`fixed max-w-md w-11/12 h-max bg-white z-50 p-4 rounded-md ${
            modalState ? "inline-block" : "hidden"
          }`}
        >
          <div className="flex justify-between items-center">
            <h2>{title}</h2>
            <span onClick={() => setModalState(false)}>
              <FontAwesomeIcon
                className="cursor-pointer hover:text-red-500 hover:scale-110 transition-all duration-200"
                size="xl"
                icon={faClose}
              />
            </span>
          </div>
          <div className="w-full h-[1px] bg-gray-900 my-2.5 rounded-full"></div>
          <div className="flex flex-col gap-4">{children}</div>
        </div>
      </div>,
      document?.querySelector("#modal") as HTMLDivElement
    )
  ) : (
    <></>
  );
}
