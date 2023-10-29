import Link from "next/link";
import React from "react";
import {
  FontAwesomeIcon,
  FontAwesomeIconProps,
} from "@fortawesome/react-fontawesome";
import {
  faBook,
  faChartSimple,
  faChevronRight,
  faHome,
  faPlus,
} from "@fortawesome/free-solid-svg-icons";
import SearchSidebar from "../sidebar/search-sidebar";
import { currentUser } from "@clerk/nextjs";
import Image from "next/image";
import { Role } from "@prisma/client";

export default async function NavSidebar() {
  const user = await currentUser();
  const firstName = user?.firstName;
  const lastName = user?.lastName;
  const imageUrl = user?.imageUrl;
  const role = user?.publicMetadata?.role as string | undefined;
  const organization = user?.publicMetadata?.organizationId as
    | string
    | undefined;
  return (
    <SearchSidebar id="nav">
      {/* {firstName && ( */}
      <section>
        <Link
          className="flex items-center gap-3  p-2 hover:bg-slate-100 rounded-md"
          href={"/profile"}
        >
          {imageUrl && (
            <Image
              width={100}
              height={100}
              alt="Perfil"
              className="w-10 h-10 rounded-full"
              src={imageUrl}
            />
          )}
          <div className="flex flex-col">
            <span className="text-lg">{`${firstName} ${lastName}`}</span>
            <span className="text-xs border w-max p-0.5 rounded font-bold">
              {role}
            </span>
          </div>
        </Link>
        <hr className="my-2" />
      </section>
      {/* )} */}
      <section>
        <ul className="flex flex-col gap-1 text-slate-800 text-md">
          <Option icon={faHome} link="home" name="Home" />
          <Option
            icon={faChartSimple}
            link={
              role === Role.ADMIN
                ? "dashboard/organizations"
                : `dashboard/organizations/${organization}`
            }
            name="Dashboard"
          />
          {role === Role.ADMIN ? (
            <Option
              icon={faPlus}
              link="documents/edit"
              name="Documentos"
            />
          ) : (
            <></>
          )}
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
