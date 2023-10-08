"use client";
import Button from "@components/Button";
import { faClose } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { Dispatch, ReactNode, SetStateAction } from "react";
import Blur from "src/app/components/modal/blur";

export default function Sidebar({
  onSave,
  sidebarState,
  setSidebarState,
  children,
}: {
  onSave: ()=>void,
  sidebarState: boolean;
  setSidebarState: Dispatch<SetStateAction<boolean>>;
  children: ReactNode;
}) {
  console.log("A")
  return (
    <>
      <Blur state={sidebarState} setState={setSidebarState} />
      <article
        className={`fixed bottom-0 left-0 translate-x-[calc(50vw-50%)] z-40 h-3/5 w-11/12 max-w-md sm:left-auto sm:right-6 sm:bottom-6 sm:h-[calc(100vh-3rem)] sm:w-96 flex flex-col bg-white rounded-none sm:rounded-md transition-all duration-[400ms] p-4 rounded-t-lg ${
          sidebarState
            ? "translate-y-0 sm:translate-x-0"
            : "translate-y-[800px] sm:translate-x-[800px] sm:translate-y-0"
        }`}
      >
        <div className="w-full py-1 flex justify-between items-center">
          <h3 className="text-xl font-semibold">Modificar</h3>
          <FontAwesomeIcon className="w- h-6" icon={faClose} />
        </div>
        <hr className="my-2" />
        <form className="h-full gap-4 grid grid-rows-[1fr,2rem]">
          {children}
          <div className="flex gap-3">
            <Button onClick={onSave} >Guardar</Button>
            <Button color="red">Eliminar</Button>
          </div>
        </form>
      </article>
    </>
  );
}
