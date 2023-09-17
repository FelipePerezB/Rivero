/* eslint-disable @next/next/no-img-element */
import React, { useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChartSimple,
  faChevronRight,
  faClose,
  faFolder,
  faMoon,
  faPlus,
  faShieldDog,
  IconDefinition,
} from "@fortawesome/free-solid-svg-icons";
import Link from "next/link";
import SwitchToogle from "@components/SwitchToogle";
import { useUser } from "@clerk/nextjs";
import capFirst from "src/utils/capFirst";
import Blur from "@components/modals/blur/blur";



export default function Sidevar({
  visibility,
  setVisibility,
}: {
  visibility: boolean;
  setVisibility: any;
}) {
  const { user } = useUser();
  const role = user?.publicMetadata?.role as string | undefined;

  return (
    <div className="fixed z-40 top-0 left-0 h-full">
      <Blur {...{ setVisibility, visibility }} />
      <article
        className={`${
          visibility ? "-" : "-translate-x-96"
        } rounded-md p-4 h-[100dvh] w-80 bg-white fixed top-4 left-4 z-50 transition-transform duration-500`}
      >
        {user?.username && (
          <Link
            className="flex items-center gap-3  p-2 hover:bg-slate-100 rounded-md"
            href={"/profile"}
          >
            <img
              alt="Perfil"
              className="w-10 h-10 rounded-full"
              src={user?.imageUrl}
            ></img>
            <div className="flex flex-col">
              <span className="text-lg">
                {(user?.username as string | undefined) &&
                  capFirst(user?.username as string)}
              </span>
              <span className="text-xs border w-max p-0.5 rounded font-bold">{role}</span>
            </div>
          </Link>
        )}
        <div className="w-full h-0.5 bg-slate-100 my-1"></div>
        <section>
          <ul className="flex flex-col gap-1 text-slate-800 text-lg">
            <Option link={`/docs`} icon={faFolder} text="Documentos" />
            {(role === "DIRECTOR" || role === "ADMIN") && (
              <Option
                link={`/dashboard/${user?.publicMetadata?.schoolId}`}
                icon={faChartSimple}
                text="Dashboard"
              />
            )}
            {role === "ADMIN" && (
              <Option link={`/edit`} icon={faPlus} text="Crear documentos" />
            )}
            <Option icon={faMoon} text="Modo oscuro" />
          </ul>
          <div
            // className={styles["close-menu"]}
            onClick={() => setVisibility(false)}
          >
            {/* <Option text="Cerrar menu" icon={faClose} /> */}
          </div>
        </section>
      </article>
    </div>
  );
}

function Option({
  iconColor = "currentColor",
  link,
  icon,
  text,
  toogle,
  callback,
}: {
  iconColor?: string;
  link?: string;
  icon: IconDefinition;
  text: string;
  callback?: (data: any) => void;
  toogle?: {
    state: boolean;
    setState: any;
  };
}) {
  const node = (
    <li
      className="flex items-center justify-between hover:bg-slate-100 hover:text-blue-600 p-2.5 rounded-md cursor-pointer"
      onClick={() => {
        callback && callback("");
        toogle && toogle.setState(!toogle.state);
      }}
    >
      <div className="flex items-center gap-2.5">
        <FontAwesomeIcon
          size="xs"
          className="w-4 h-4"
          style={{ color: iconColor }}
          icon={icon}
        />
        <span>{text}</span>
      </div>
      {link && <FontAwesomeIcon size="xs" icon={faChevronRight} />}
      {callback && <SwitchToogle createFormData={callback} />}
    </li>
  );
  return (
    <>
      {link ? (
        <Link className="text-current" style={{ width: "100%" }} href={link}>
          {node}
        </Link>
      ) : (
        node
      )}
    </>
  );
}
