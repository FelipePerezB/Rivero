import React, { DialogHTMLAttributes, Suspense, useRef } from "react";
import SidevarImage from "./sidevar-image";
import Blur from "@components/modals/blur/blur";
import Image from "next/image";
import capFirst from "src/utils/capFirst";
import Link from "next/link";
import { currentUser } from "@clerk/nextjs";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars } from "@fortawesome/free-solid-svg-icons";

type Props = {
  searchParams: Record<string, string> | null | undefined;
};

export default function Sidevar() {
  // const dialogRef = useRef<HTMLDialogElement>(null);
  // const user = await currentUser();
  return (
    <>
      <button
        className="h-max w-max"
        // onClick={() => dialogRef.current?.showModal()}
      >
        <FontAwesomeIcon  className="h-4 w-4" icon={faBars} />
      </button>
      <dialog
        className="m-6 p-4 w-72 h-full z-30 backdrop:bg-slate-900/70 rounded"
        // ref={dialogRef}
      >
        <section className="duration-30'  open:translate-x-0">
          {/* <ProfileInfo /> */}
        </section>
      </dialog>
    </>
  );
}
