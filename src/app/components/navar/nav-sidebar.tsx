// 'use client'
import Image from "next/image";
import Link from "next/link";
import React from "react";
import Sidebar from "../modal/sidebar";
import { currentUser, useUser } from "@clerk/nextjs";
import {
  FontAwesomeIcon,
  FontAwesomeIconProps,
} from "@fortawesome/react-fontawesome";
import {
  faBook,
  faChartSimple,
  faChevronRight,
  faPlus,
} from "@fortawesome/free-solid-svg-icons";

export default async function NavSidebar() {
  let user;
  // try {
  //   user = await currentUser();
  // } catch (error) {
  //   console.error(error)
  // }
  // const firstName = user?.firstName;
  // const lastName = user?.lastName;
  // const imageUrl = user?.imageUrl;
  // const role = user?.publicMetadata?.role as string | undefined;
  return (
    <Sidebar id="nav">
      <section>
        <Link
          className="flex items-center gap-3  p-2 hover:bg-slate-100 rounded-md"
          href={"/profile"}
        >

          {/* {imageUrl && (
            <Image
              width={100}
              height={100}
              alt="Perfil"
              className="w-10 h-10 rounded-full"
              src={imageUrl}
            />
          )} */}
          <div className="flex flex-col">
            {/* <span className="text-lg">{`${firstName} ${lastName}`}</span> */}
            <span className="text-xs border w-max p-0.5 rounded font-bold">
              {/* {role} */}
            </span>
          </div>
        </Link>
        <hr className="my-2" />
      </section>
      <section>
        <ul className="flex flex-col gap-1 text-slate-800 text-md">
          <Option icon={faBook} link="documents" name="Asignaturas" />
          <Option icon={faChartSimple} link="dashboard" name="Dashboard" />
          <Option icon={faPlus} link="edit" name="Crear documentos" />
        </ul>
      </section>
    </Sidebar>
  );
}

const Option = ({
  name,
  link,
  icon,
}: {
  name: string;
  link: string;
  icon: FontAwesomeIconProps["icon"];
}) => (
  <li className="flex items-center justify-between hover:bg-slate-100 hover:text-blue-600 p-2.5 rounded-md cursor-pointe">
    <Link
      className="w-full flex justify-between items-center"
      href={"/" + link}
    >
      <span className="flex items-center gap-2">
        <FontAwesomeIcon className="w-4 h-4" icon={icon} />
        {name}
      </span>
      <FontAwesomeIcon className="w-3 h-3" icon={faChevronRight} />
    </Link>
  </li>
);
