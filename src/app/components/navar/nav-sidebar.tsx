import Link from "next/link";
import React, { Suspense } from "react";
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
import SearchSidebar from "../sidebar/search-sidebar";
import { currentUser } from "@clerk/nextjs";
import Image from "next/image";
// import UserInfo from "./user-info";
import dynamic from "next/dynamic";
import UserInfo from "./user-info";

export default function NavSidebar() {
  // const UserInfo = dynamic(()=>import('./user-info'), {ssr:false})
  return (
    <SearchSidebar id="nav">
      {/* {firstName && ( */}
      <section>
        <Link
          className="flex items-center gap-3  p-2 hover:bg-slate-100 rounded-md"
          href={"/profile"}
        >
          <Suspense fallback={<>Loading...</>}>
            <UserInfo />
          </Suspense>
        </Link>
        <hr className="my-2" />
      </section>
      {/* )} */}
      <section>
        <ul className="flex flex-col gap-1 text-slate-800 text-md">
          <Option icon={faBook} link="documents" name="Asignaturas" />
          {/* <Option
            icon={faChartSimple}
            link={`dashboard/${organization}`}
            name="Dashboard"
          /> */}
          <Option
            icon={faPlus}
            link="documents/edit/all"
            name="Crear documentos"
          />
        </ul>
      </section>
    </SearchSidebar>
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
